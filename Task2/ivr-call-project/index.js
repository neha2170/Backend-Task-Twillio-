const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/ivr-call", (req, res) => {
  const response = new twilio.twiml.VoiceResponse();

  response.say(
    "Hello! This is a personalized call for you. Press 1 if you are interested."
  );

  response.gather({
    action: "/handle-keypress",
    numDigits: "1",
    method: "POST",
  });

  res.type("text/xml");
  res.send(response.toString());
});

app.post("/handle-keypress", (req, res) => {
  const digit = req.body.Digits;

  const response = new twilio.twiml.VoiceResponse();

  if (digit === "1") {
    response.say(
      "Thank you for your interest! A personalized interview link will be sent to your number shortly."
    );

    twilioClient.messages
      .create({
        body: `Here is your personalized interview link: ${process.env.PERSONALIZED_INTERVIEW_LINK}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.YOUR_PHONE_NUMBER,
      })
      .then((message) => console.log("Message sent: ", message.sid))
      .catch((err) => console.error("Error sending message: ", err));
  } else {
    response.say("You did not press 1. Goodbye!");
  }

  res.type("text/xml");
  res.send(response.toString());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
