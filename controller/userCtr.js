const mysql = require( './query');
const sql = require( './sql');
const ResponseMsg = require('../utils/ResponseMsg');
const TABLE_NAME = 'user';

const registUser = async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  let resMsg = {};
  if (userName && password) {
    const { INSERT } = sql;
    mysql.query(INSERT(TABLE_NAME, {
      userName: userName,
      password: password
    })).then(res => {
      Object.assign(resMsg, ResponseMsg.successMsg, { detail: res })
    }).catch(err => {
      Object.assign(resMsg, ResponseMsg.sqlError, {detail: err})
    })
  }else{
    Object.assign(resMsg, ResponseMsg.paramError)
  }
  ctx.response.body = JSON.stringify(resMsg);
};

const login = async (ctx, next) => {
  const userName = ctx.request.userName;
  const password = ctx.request.password;
  if (userName && password) {
    const { SELECT } = sql;
    mysql.query(SELECT(TABLE_NAME, {userName: userName})).then(res => {
      if (res.password === password) {
        ctx.response.body = JSON.stringify(ResponseMsg.successMsg)
      }else{
        ctx.response.body = JSON.stringify(ResponseMsg.basicError)
      }
    }).catch(err => {
      ctx.response.body = JSON.stringify(ResponseMsg.sqlError)
    })
  }
};

module.exports = {
  'POST /registUser': registUser,
  'POST /login': login
};
