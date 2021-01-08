const mysql = require('mysql');

const dbConnection = mysql.createConnection({
 host: "172.17.0.2",
 user: 'root',
 password: '1234',
 database: 'mydb'
});

dbConnection.connect(function (error) {
 if (error) throw error;
 console.log('Dsatabase Connected Successfully!');
});

module.exports = dbConnection;