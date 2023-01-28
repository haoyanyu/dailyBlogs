const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
console.log('%cserver is listening......', 'color: green;');
console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
