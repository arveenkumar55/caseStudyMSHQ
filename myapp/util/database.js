var sql = require("mssql");

// config for your database
var config = {
  user: "sa",
  password: "sql12345#",
  server: "127.0.0.1",
  database: "custTech",
  trustServerCertificate: true,
};

// connect to your database
sql.connect(config, function (err) {
  if (err) console.log(err);
});

module.exports = sql;
// var connection = sql.createConnection({
//   host     : 'localhost',
//   user     : 'sa',
//   password : 'sql12345#',
//   database:  'custTech',
// });
// connection.connect();
// module.exports = connection;
