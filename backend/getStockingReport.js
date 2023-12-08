const axios = require("axios");
const mysql = require("serverless-mysql");
//const smsClient = require("../lib/sms-provider.js");
const schedule = require("node-schedule");
const ps = require("@planetscale/database");

const { url, GetLakes, ConvertFishPerLb } = require("./utils/lake-scraping");

const dotenv = require("dotenv");
dotenv.config({ path: `../.env.local`, override: true });

const config = {
  host: process.env.PLANETSCALE_DB_HOST,
  username: process.env.PLANETSCALE_DB_USERNAME,
  password: process.env.PLANETSCALE_DB_PASSWORD,
};

const db = ps.connect(config);

const GetNewReports = (lastReport, scrapedReports) => {
  let newReports = [];
  console.log({ lastReport });
  if (lastReport.length > 0) {
    newReports = scrapedReports.filter((report) => {
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

const GetMessage = (notifications) => {
  const notificationParts = notifications.map((notification) => {
    return `${notification.name} was stocked on ${notification.date} with ${
      notification.number
    } ${ConvertFishPerLb(notification.size)} lb ${notification.species}`;
  });
  return notificationParts.join("\n");
};

const SendNotifications = (notifications) => {
  notifications.forEach((notification) => {
    const message = GetMessage(notification.notifications);
    db.execute("UPDATE users SET lastNotification = NOW() WHERE id = ?", [
      notification.userId,
    ]);

    console.log("SENDING MESSAGE: ", message);

    // smsClient.send({
    //   body: message,
    //   from: "+15005550006",
    //   to: `+${notification.phoneNumber}`,
    // });
  });
};

const GetNotifications = () => {
  const sql = `SELECT u.id, u.phoneNumber, l.name, sr.date, sr.number, sr.species, sr.size 
                 FROM users u 
            LEFT JOIN usersLakes ul ON u.id = ul.userId
           INNER JOIN lakes l ON l.id = ul.lakeID 
           INNER JOIN stockingReport sr ON sr.lakeId = l.id 
                WHERE sr.date > u.lastNotification`;
  db.execute(sql)
    .then((result) => {
      console.log({ result });
      let allNotifcations = [];
      if (result.rows.length > 0) {
        let notifications = [];
        let lastUser = result.rows[0];
        allNotifcations = result.rows.reduce((acc, curr, idx) => {
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
      }
      return allNotifcations;
    })
    .then((result) => {
      //console.log({ result });
      if (result.length > 0) {
        SendNotifications(result);
      } else {
        console.log("No new notifications");
      }
    });
};

let jobCount = 0;

// const job = schedule.scheduleJob({ hour: 6 }, function () {
jobCount++;
console.log(`Running job #${jobCount} at ${new Date().toString()}`);

axios
  .get(`${url}0`)
  .then((response) => {
    const { data } = response;
    return GetLakes(data);
  })
  .then((result) => {
    const lakes = result;
    // Test empty case again
    db.execute(
      "SELECT date FROM stockingReport ORDER BY date DESC LIMIT 1"
    ).then((result) => {
      const newReports = GetNewReports(result.rows, lakes);
      console.log({ newReports });
      Promise.all(
        newReports.map((report) => {
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
      ).then(GetNotifications());
    });
  });
// });
