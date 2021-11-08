"use strict";
const nodemailer = require("nodemailer");
const axios = require('axios');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const access_key=process.env.FOREX_EMAIL_NOTIFIER_AK;
  const user=process.env.FOREX_EMAIL_NOTIFIER_USER;
  const pass=process.env.FOREX_EMAIL_NOTIFIER_PASSWORD;
  const receivers=process.env.FOREX_EMAIL_NOTIFIER_RECIPIENTS;

  const result = await axios.get(`http://data.fixer.io/api/latest?access_key=${access_key}&base=EUR&symbols=AED`);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user,
      pass
    },
  });

  const content = `EUR to AED rate as of ${result.data.date}: ${result.data.rates.AED}`;
 
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: receivers, // list of receivers
    subject: `${result.data.rates.AED}`,
    text: content, // plain text body
    html: content, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(e => {
    console.error(e);
    process.exit(1);
  });
