const mysql = require('mysql');
const MYSQL_CONFIG = require('./config');

const pool = mysql.createPool(MYSQL_CONFIG);
const query = (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if(err) {
        reject(err)
      }else{
        connection.query(sql, (err, fields) => {
          if(err){
            reject(err);
          } else {
            resolve(fields);
            connection.release()
          }
        })
      }
    })
  })
};
module.exports = {
  query
};
