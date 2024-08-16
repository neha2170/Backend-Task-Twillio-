const twilio = require("twilio");
require("dotenv").config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

client.calls
  .create({
    url: `${process.env.NGROK_URL}/ivr-call`,
    to: process.env.YOUR_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER,
  })
  .then((call) => console.log(`Call initiated with SID: ${call.sid}`))
  .catch((err) => console.error("Error initiating call: ", err));
