var email = require("nodemailer");
var config = require("./conf");

send = function(to, subject, body, attachment) {
  if(config.mail.enabled === false) {
    console.log("Subject", subject);
    console.log("Body", body);
    return;
  }

  var transport = email.createTransport("SMTP", {
    service: "SendGrid",
    auth: {
      user: config.mail.username.toString("base64"),
      pass: config.mail.password.toString("base64")
    }
  });

  var message = {
    host : "smtp.sendgrid.net",
    port : "587",
    to : to,
    from : config.mail.from,
    subject : subject,
    html: body,
    generateTextFromHTML: true
  };

  if(attachment) 
    message.attachments = [{fileName: attachment.replace(/^.*[\\\/]/, ''),filePath:attachment, cid:"image@node"}];

  transport.sendMail(message, function(err, result){
    if(err){
      console.log("Error sending" + subject + ". " + body);
      console.log("Error", err);
    }
    console.log("Success", result);
    transport.close();
  });
};

var outputData = function(data) {
  var result = "";
  for(var i in data) {
    result += "<br/>" + i + ": " + data[i];
  }

  return result;
};

exports.send = function(data) {
  try {
    if(data.subject === undefined || data.subject === "")
      data.subject = config.mail.subject;

    send(config.mail.to, data.subject,
        outputData(data) +
        "<br/>Date:" + new Date().toString(),  undefined);
  } catch(e) {
    console.log("Email Error", e);
    console.log("Send Failed", data);
  }
};
