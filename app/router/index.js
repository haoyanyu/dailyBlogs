const Router = require('koa-router');
const render = require('../helper/render.js');

const router = new Router();

router.get('/page1', async(ctx, next) => {
  const html = await render('page1');
  ctx.body = html;
});

router.get('/page2', async(ctx, next) => {
  const html = await render('page2');
  ctx.body = html;
});

module.exports = router;