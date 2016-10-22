var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

test

connection.connect();

connection.query('SELECT * from tblusers', function (err, rows, fields) {
    if (err)
	throw err;

    console.log('The solution is: ', rows[0].username);
});

connection.end();/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


