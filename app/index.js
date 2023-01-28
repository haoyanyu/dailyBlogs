const Koa = require('koa');
const router = require('./router/index.js');

const app = new Koa();

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.use(router.routes());
app.use(router.allowedMethods()); // 丰富请求头信息

app.listen(3000);
console.log('server is listening......');

app.on('error', (err, ctx) => {
  console.error('server error:', err);
})