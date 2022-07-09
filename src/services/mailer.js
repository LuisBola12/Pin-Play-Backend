const nodemailer = require( 'nodemailer' );

const getTransporter = function () {
  let transporter;
  transporter = nodemailer.createTransport( 
    {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    } );
  return transporter;
};

export const  sendRecoveyEmail = async ( userEmail, randomToken ) => {
  let transporter = getTransporter();
  await transporter.sendMail({
    from: "PinPlayCi0137@gmail.com",
    to: userEmail,
    subject: "Código de recuperación",
    html: `
    <div style='
    background: #3673be; 
    color: white; font-size: 22px; 
    font-weight: bold; 
    text-align: center; 
    line-height: 48px;
    margin-bottom: 30px;'>
    PinPlay
  </div>
    <div>Utilice este código para recuperar su contraseña: <strong>${randomToken}</strong><div>`,
  });
};
