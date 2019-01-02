const typeMapping = require('../utils/MySqlTypeMapping');
const PAGE_SIZE = 'pageSize';
const PAGE_NO = 'pageNo';

const CREATE_TABLE = (tableName, params) => {
  let paramStr = '';
  Object.keys(params).forEach(p => {
    paramStr += p + ' ' + typeMapping[params[p]];
  });
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} ( id INT AUTO_INCREMENT, ${paramStr} PRIMARY KEY (id))`;
  return sql
};

const getParamStr = (params) => {
  return Object.keys(params).map(p => {
    return `${p}='${params[p]}'`;
  }).join(',');
};

const SELECT = (tableName, param, pagination = {pageSize: 10, pageNo: 1}) => {
  let paramStr = '';
  Object.keys(param).forEach(p => {
    paramStr += (p + '=' + param[p]);
  });
  let startNo = (Number(pagination[PAGE_NO]) - 1) * Number(pagination[PAGE_SIZE]);
  return `select * from ${tableName} where ${paramStr} limit ${startNo},${pagination[PAGE_SIZE]}`;
};

const INSERT = (tableName, params) => {
  return `INSERT INTO ${tableName} (${Object.keys(params).join(',')}) VALUES (${getParamStr(params)})`
};

const UPDATE = (tableName, params) => {
  return `UPDATE ${tableName} SET ${getParamStr(params)}`
};

const DELETE = (tableName, params) => {
  return `DELETE FROM ${tableName} where ${getParamStr(params)}`
};

module.exports = {
 CREATE_TABLE,
 INSERT,
 UPDATE,
 SELECT,
 DELETE
};
