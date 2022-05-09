const nodemailer = require('nodemailer'); 
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'pepete96@gmail.com',
      pass: process.env.EMAIL_PWD
    }
  });

  module.exports.sendEmail = (user) => {
    transporter.sendMail({
        from: '"NoReplyPosts " <noreply-posts@project.com>',
        to: user.email, 
        subject: 'Validar usuario', 
        html: `Pulse en el siguiente enlace para validar su usuario <br> 
        <a href="http://localhost:8000/api/${user.id}/validate">Validar email</a>`
    })
    .then(() => console.log("Email sent"))
    .catch((err) => console.error("Error sending email: ", err))
  }
  
  