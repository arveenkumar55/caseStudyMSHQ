var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secureConnection: false,
  port: 587,
  requiresAuth: true,
  domains: ["gmail.com", "googlemail.com"],
  auth: {
    user: "custechautomation@gmail.com",
    pass: "cfwxhklyasyzlphg",
  },
});


function sendPasswordEmail(email, id) {

  const emailContent = `<html>
  <head>
    <style>
      background-image: url("paper.gif");
    </style>
  </head>
  <body>
    <p> Hello, </p>
    <p>We have sent you this email in response to your request to reset your password on CustAutomation Website.</p>
    <p> To reset your password, please follow the link below: </p>

    <a href=http://localhost:5173/PasswordChange/${id}> Reset Password</a>
    <p>If you have any questions or need assistance, feel free to contact us.</p>
    <p>Best regards,</p>
    <p>CustAutomation Team</p>
  </body>
</html>`

var mailOptions = {
  from: 'custechautomation@gmail.com',
  to: email,
  cc: 'xenophontos1georgia@gmail.com',
  subject: 'Please reset your password',
  html:emailContent
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}


function sendEmail (customer) {


    const emailContent = `
    <html>
      <head>
        <style>
          background-image: url("paper.gif");
        </style>
      </head>
      <body>
        <img src="https://dribbble.com/shots/7971141-Success-Registration" width ="50" height="333">
        <p> Hi, ${customer.FirstName}, </p>
        <p>Welcome. We are excited to have you as a ${customer.cusTechRole} member.</p>
        <p> Your temp password is ${customer.pass} for Login on CustAutomation Website.</p>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p>Best regards,</p>
        <p>CustAutomation Team</p>
      </body>
    </html>
  `;

  // console.log('emailContent', emailContent)

    // console.log('emailContent', emailContent)
    
    var mailOptions = {
        from: 'custechautomation@gmail.com',
        to: customer.email,
        cc: 'xenophontos1georgia@gmail.com',
        subject: 'Welcome to Our CustTech',
        html:emailContent
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
}

module.exports = { sendEmail , sendPasswordEmail};
