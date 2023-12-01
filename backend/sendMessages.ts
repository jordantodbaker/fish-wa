smsClient = require("../lib/sms-provider.js");

smsClient.send({
  body: "test message",
  from: "+15005550006",
  to: "+13609618248",
});
