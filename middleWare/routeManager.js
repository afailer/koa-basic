const fs = require('fs');
const path = require('path');
const METHOD = 'method';

function addMapping(router, mapping) {
  for(let url in mapping){
    if(url.startsWith('GET')){
      const path = url.substring(4);
      router.get(path, mapping[url])
    }else if(url.startsWith('POST')){
      const path = url.substring(5);
      router.post(path, mapping[url])
    }else{
      console.log(`invalid URL: ${url}`)
    }
  }
}
function addControllers(router, dir) {
  const files = fs.readdirSync(dir);
  const js_files = files.filter(f => {
    return f.endsWith('.js')
  });
  js_files.forEach((element) => {
    let mapping = require(path.resolve(dir, element))
    addMapping(router, mapping)
  })
}

module.exports = function (dir) {
  const controllers_dir = dir || 'controller';
  const router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};
