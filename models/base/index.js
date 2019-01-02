const mysql = require('mysql');
const config = require('../../config/index.js');

const pool = mysql.createPool(config.dbConfig);

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err){
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if(err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release();
        })
      }
    })
  })
};

let users =
  `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     pass VARCHAR(100) NOT NULL,
     avator VARCHAR(100) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`;
let createTable = function( sql ) {
  return query( sql, [] )
};
createTable(users);
