const Koa = require('koa');
const path = require('path');
// const { parse } = require('qs');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const views = require('koa-views');
const router = require('./router/index.js');

const app = new Koa();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../static'
app.use(static(
  path.join(__dirname,  staticPath)
))
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }));
app.use(bodyParser()); // 将post请求的参数处理到ctx.request.body上
app.use(router.routes());
app.use(router.allowedMethods()); // 丰富请求头信息

app.listen(3000);
console.log('server is listening......');

app.on('error', (err, ctx) => {
  console.error('server error:', err);
})