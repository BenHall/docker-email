var mailer = require('./../mailer');
exports.index = function(req, res){
  mailer.send(req.body);
  res.end('OK');
};
