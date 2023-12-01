const axios = require("axios");
const mysql = require("serverless-mysql");
const smsClient = require("../lib/sms-provider.js");
const schedule = require("node-schedule");

const { url, GetLakes, ConvertFishPerLb } = require("./utils/lake-scraping");

const dotenv = require("dotenv");
dotenv.config({ path: `../.env.local`, override: true });

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  },
});

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
    db.query("UPDATE users SET lastNotification = NOW() WHERE id = ?", [
      notification.userId,
    ]);

    console.log("SENDING MESSAGE: ", message);

    smsClient.send({
      body: message,
      from: "+15005550006",
      to: `+${notification.phoneNumber}`,
    });
  });
};

const GetNotifications = () => {
  const sql = `SELECT u.id, u.phoneNumber, l.name, sr.date, sr.number, sr.species, sr.size 
                 FROM users u 
            LEFT JOIN usersLakes ul ON u.id = ul.userId
           INNER JOIN lakes l ON l.id = ul.lakeID 
           INNER JOIN stockingReport sr ON sr.lakeId = l.id 
                WHERE sr.date > u.lastNotification`;
  db.query(sql)
    .then((result) => {
      let allNotifcations = [];
      if (result.length > 0) {
        let notifications = [];
        let lastUser = result[0];
        allNotifcations = result.reduce((acc, curr, idx) => {
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
          } else if (idx === result.length - 1) {
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
      console.log({ result });
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
    db.query("SELECT date FROM stockingReport ORDER BY date DESC LIMIT 1").then(
      (result) => {
        const newReports = GetNewReports(result, lakes);
        console.log({ newReports });
        Promise.all(
          newReports.map((report) => {
            return db.query(
              "INSERT INTO stockingReport (lakeId, date, number, size, species) SELECT l.id, ?, ?, ?, ? FROM lakes l WHERE l.name = ?",
              [
                new Date(report.stockDate)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " "),
                parseInt(report.number),
                parseFloat(report.fishPerLb),
                report.species,
                report.name.name,
              ]
            );
          })
        ).then(GetNotifications());
      }
    );
    db.end();
  });
// });
