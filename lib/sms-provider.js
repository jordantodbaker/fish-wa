const dotenv = require("dotenv");
dotenv.config({ path: `../.env.local`, override: true });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  send: ({ body, from, to }) => {
    client.messages
      .create({ body, from, to })
      .then((message) => console.log(message.sid));
  },
};
