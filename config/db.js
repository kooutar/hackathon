const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kaoutar',
  database: 'SAM'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
  });
  
  module.exports = { db };