const { Service } = require("feathers-mongoose");
const nodemailer = require("nodemailer");

function generateRandomPassword() {
  const randomPassword =
    Math.random().toString(32).slice(2) + Math.random().toString(32).slice(2);
  return randomPassword;
}
exports.Emails = class Emails extends Service {
  async create(data) {
    const stmpTransport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1809f44bbfff7c",
        pass: "feb2a0ebcea075",
      },
    });
;

    const Password = generateRandomPassword();

    const confirmationTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
    
        <style>
            .email-container {
                background-color: #fff;
                display: flex;
                flex-direction: column;
                gap: 3rem;
                justify-content: center;
                align-items: center;
            }
            h1 {
                font-weight: bold;
                color: orange;
            }
            h3 {
                color: gray;
            }
            .link-container {
              padding: 1rem;
              background-color: orange;
              border-radius: 15px;
            }
            a {
              text-decoration: none;
            }
            .email-heading {
              font-size: 20px;
              color: black;
            }
    
        </style>
    </head>
    <body>
        <div class="email-container">
            <h1>Thanks for registering on our website!</h1>
            <h3>Your account has been verified!</h3>
            <div class="link-container"><a href="http://localhost:3000"><p class="email-heading">Now you can succesfully login on our website!</p></a></div>
        </div>
        
    </body>
    </html>`;

    const requestTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
    
        <style>
            .email-container {
                background-color: #fff;
                display: flex;
                flex-direction: column;
                gap: 3rem;
                justify-content: center;
                align-items: center;
            }
            h1 {
                font-weight: bold;
                color: orange;
            }
            h3 {
                color: gray;
            }
            .link-container {
              padding: 1rem;
              background-color: orange;
              border-radius: 15px;
            }
            a {
              text-decoration: none;
            }
            .email-heading {
              font-size: 20px;
              color: black;
            }
    
        </style>
    </head>
    <body>
        <div class="email-container">
            <h1>Thanks for registering on our website!</h1>
            <h3>Now all you need to do is verify your account by clicking the link below this message!</h3>
            <div class="link-container"><a href="http://localhost:3000/emailConfirm/${data.token}"><p class="email-heading">Please click this link to verify your account!</p></a></div>
        </div>
        
    </body>
    </html>`;

    const confirmation = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      type: data.type,
      text: data.text,
      html: confirmationTemplate,
    };

    const request = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      type: data.type,
      text: data.text,
      html: requestTemplate,
    };
    if (data.type === "confirmation") {
      stmpTransport.sendMail(confirmation);
    } else {
      stmpTransport.sendMail(request);
    }
    return super.create(data);
  }
};
