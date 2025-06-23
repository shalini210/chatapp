const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "shalini.rathore210@gmail.com",
    pass: "gqrv vuwl oayn ripe",
  },
});
( async  () => {
  const info = await transporter.sendMail({
    from: '"shalini rathore" <shalini.rathore210@gmail.com>',
    to: "prince.patel3628@gmail.com,chakranidaxil@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    // html: "<b>Hello world?</b>", // HTML body
  })
  console.log("Message sent:", info.messageId);
})();
