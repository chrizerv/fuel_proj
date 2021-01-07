//import express from 'express';
//import bodyParser from 'body-parser';
const bcrypt = require('bcrypt');
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
 input: fs.createReadStream('/home/chris/Desktop/project_ko/passwords.txt'),

 console: false
});

readInterface.on('line', function (line) {
 bcrypt.hash(line, 10, function (err, hash) {
  // Store hash in database
  console.log(hash);
 });
});

//const app = express();

//const PORT = 5000;

//app.use(bodyParser.json());



