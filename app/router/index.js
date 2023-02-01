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

router.get('/page', async (ctx) => {
  let title = 'page';
  await ctx.render('index', {
    title,
  })
})

// 飞书webhook测试
router.post('/feishu/webhook/hyy.json', async (ctx) => {
  const body = ctx.request.body;
  ctx.body = body;
})

module.exports = router;