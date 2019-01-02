const init = require( '../DataBase/init');

module.exports =  (router) => {
  router.get('/welcome', async function (ctx, next) {
    init.deleteUser();
  })
};
