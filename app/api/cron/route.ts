import { NextResponse } from "next/server";

const axios = require("axios");
const ps = require("@planetscale/database");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const {
  url,
  GetLakes,
  ConvertFishPerLb,
} = require("../../../backend/utils/lake-scraping");

const dotenv = require("dotenv");

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const db = ps.connect(config);

const GetMessage = (notifications: any[]) => {
  const notificationParts = notifications.map((notification) => {
    return `${notification.name} was stocked on ${notification.date} with ${
      notification.number
    } ${ConvertFishPerLb(notification.size)} lb ${notification.species}`;
  });
  return notificationParts.join("\n");
};

const SendNotifications = async (notifications: any[]) => {
  notifications.forEach(async (notification) => {
    const message = GetMessage(notification.notifications);
    //   db.execute("UPDATE users SET lastNotification = NOW() WHERE id = ?", [
    //     notification.userId,
    //   ]);

    const fromNumber =
      process.env.IS_DEV === "true" ? "+15005550006" : "+18889618226";

    const messageId = await client.messages.create({
      body: message,
      from: fromNumber,
      to: `+1${notification.phoneNumber}`,
    });
    console.log("Message: ", messageId);
  });
};

const GetNewReports = (lastReport: any, scrapedReports: any) => {
  let newReports = [];
  if (lastReport.length > 0) {
    newReports = scrapedReports.filter((report: any) => {
      return (
        new Date(report.stockDate).getTime() >
        new Date(lastReport[0].date).getTime()
      );
    });
  } else {
    newReports = scrapedReports;
  }
  return newReports;
};

const GetNotifications = async () => {
  const sql = `SELECT u.id, u.phoneNumber, l.name, sr.date, sr.number, sr.species, sr.size 
    FROM users u 
LEFT JOIN usersLakes ul ON u.id = ul.userId
INNER JOIN lakes l ON l.id = ul.lakeID 
INNER JOIN stockingReport sr ON sr.lakeId = l.id 
   WHERE sr.date > u.lastNotification AND u.phoneNumber IS NOT NULL AND sendText = 1`;
  const result = await db.execute(sql);
  console.log({ result });
  let allNotifcations = [];
  if (result.rows.length > 0) {
    let notifications = [] as any[];
    let lastUser = result.rows[0];
    console.log({ lastUser });
    allNotifcations = result.rows.reduce((acc: any, curr: any, idx: any) => {
      if (lastUser.id !== curr.id) {
        acc.push({
          userId: lastUser.id,
          phoneNumber: lastUser.phoneNumber,
          notifications: notifications,
        });
        notifications = [];
        notifications.push({
          name: curr.name,
          date: curr.date,
          number: curr.number,
          species: curr.species,
          size: curr.size,
        });
      } else if (idx === result.rows.length - 1) {
        notifications.push({
          name: curr.name,
          date: curr.date,
          number: curr.number,
          species: curr.species,
          size: curr.size,
        });
        acc.push({
          userId: lastUser.id,
          phoneNumber: lastUser.phoneNumber,
          notifications: notifications,
        });
      } else {
        notifications.push({
          name: curr.name,
          date: curr.date,
          number: curr.number,
          species: curr.species,
          size: curr.size,
        });
      }
      lastUser = curr;
      return acc;
    }, []);

    return allNotifcations;
  }
};

export async function GET() {
  const { data } = await axios.get(`${url}0`);
  const lakes = GetLakes(data);
  const latestReportQuery = await db.execute(
    "SELECT date FROM stockingReport ORDER BY date DESC LIMIT 1"
  );
  const newReports = GetNewReports(latestReportQuery.rows, lakes);
  await Promise.all(
    newReports.map((report: any) => {
      return db.execute(
        "INSERT INTO stockingReport (lakeId, date, number, size, species) SELECT l.id, ?, ?, ?, ? FROM lakes l WHERE l.name = ?",
        [
          new Date(report.stockDate)
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          parseInt(report.number.replace(",", "")),
          parseFloat(report.fishPerLb),
          report.species,
          report.name.name,
        ]
      );
    })
  );

  const notifications = await GetNotifications();
  await SendNotifications(notifications);

  return NextResponse.json({ ok: true });
}
