const Koa = require('koa')
const path = require('path')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const URL = require('url')


let app = new Koa()
let router = new Router()
app.use(static(path.join(__dirname,'./static')));
app.use(async (ctx, next) => {
  console.log(`app已经启动，第一次请求时间是${new Date()}`);
  await next();
})
app.use(bodyParser());
router.get('/', (ctx, next) => {
  ctx.body = 'hello koa'
}).get('/news', (ctx, next) => {
  ctx.body = '新闻页面';
}).get('/test', (ctx, next) => {
  let pram = URL.parse("http://localhost:3000/test?aa=122&t=12#77777")
  let params = ctx.ips
  let req = ctx.request
  let req_query = req.query
  let req_querystring = req.querystring
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring
  ctx.body = {
    pram,
    params,
    req,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
}).get('/product/:id', async (ctx) => {
  console.log(ctx.params)
  ctx.body = `动态参数获取${JSON.stringify(ctx.params)}`
})
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx, next) => {
  next();
  if (ctx.status == 404) {
    ctx.status = 404;
    ctx.body = "这是一个404 页面"
  }
});
app.listen(3000, () => {
  console.log(`app正在启动，时间是${new Date()}`);
});