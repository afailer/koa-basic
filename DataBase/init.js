const query = require( './query');
const sql = require( './sql');
const user = {
  userName: 'v30',
  password: 'v30',
};
const initUserTable = () => {
  const { CREATE_TABLE } = sql;
  query.query(CREATE_TABLE('user', user))
};

const insertUser = () => {
  const { INSERT } = sql;
  query.query(INSERT('user', {
    userName: 'andy',
    password: 'lt1990'
  }))
};

const updateUser = () => {
  const { UPDATE } = sql;
  query.query(UPDATE('user', {
    id: 1,
    password: '19900728'
  }))
};

const selectUser = () => {
  const { SELECT } = sql;
  query.query(SELECT('user', {
    id: 1
  })).then(res => {
    console.log(res)
  })
};

const deleteUser = () => {
  const { DELETE } = sql;
  query.query(DELETE('user',{
    id: 1
  }))
};

module.exports = {
  initUserTable,
  insertUser,
  updateUser,
  selectUser,
  deleteUser
};
