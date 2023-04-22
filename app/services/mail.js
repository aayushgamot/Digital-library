const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  service: "Gmail",
  secure: false,
  port: 25,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailSend = (email, name, Title, Topic, Quantity, return_Date) => {
  const mailOption = {
    to: email,
    subject: "User Details",
    text:
      " " +
      name +
      " your are added in Digital library , and " +
      " you took " +
      Title +
      " book which topic is " +
      Topic +
      " with number of " +
      Quantity +
      " book's copies ." +
      " your last date for returning the book is " +
      return_Date +
      ".", // Plain text body
  };

  const mailSending = transport.sendMail(mailOption, function (error, res) {
    if (error) throw error;

    logger.info("email has been sent");
  });
  return mailSending;
};

const registermailSend = (email, name) => {
  const mailOption = {
    to: email,
    subject: "User Details",
    text:
      "Hello MR/MS " +
      name +
      " welcome to the Digital Library, Now you are a member of our community. you have access of our library where you can read or take a book anytime ",
    // Plain text body
  };

  const mailSending = transport.sendMail(mailOption, function (error, res) {
    if (error) throw error;

    logger.info("email has been sent");
  });
  return mailSending;
};

const staffmailSend = (email, name, surname) => {
  const mailOption = {
    to: email,
    subject: "staff Details",
    text:
      "Hello MR/MS " +
      name +
      " " +
      surname +
      " Congratulations and welcome to Digital Library! We’re so glad we chose you to help us rise to the next level. Never feel shy about sharing your thoughts and ideas that’s why we brought you on Our Library!",
    // Plain text body
  };

  const mailSending = transport.sendMail(mailOption, function (error, res) {
    if (error) throw error;

    logger.info("email has been sent");
  });
  return mailSending;
};
module.exports = {
  mailSend,
  registermailSend,
  staffmailSend,
};
