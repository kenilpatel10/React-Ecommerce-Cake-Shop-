const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: 'gmail',
    auth: {
      user: "cakeparadise60@gmail.com",
      pass: "Cake@paradise10",
    },
  });

  const mailOptions = {
    from: "cakeparadise60@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;