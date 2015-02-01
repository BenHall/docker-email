config = {};

config.mail = {};
config.mail.enabled = (process.env.NODE_ENV && process.env.NODE_ENV == "production" && true || false);
config.mail.username = process.env.USERNAME;
config.mail.password = process.env.PASSWORD;
config.mail.from = process.env.FROM;
config.mail.adminTo = config.mail.to = process.env.TO;
config.mail.subject = process.env.SUBJECT;

module.exports = config;
