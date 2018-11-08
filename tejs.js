const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const ejs = require('ejs')


let app = new Koa()
let router = new Router()
app.use(static(path.join(__dirname, './static')));
app.use(views(`${__dirname}/views`, {
  map: {
    html: 'ejs'
  }
}))

router.get('/add',async(ctx)=>{
  let title='标题'
  await ctx.render('index',{title})
})


app.use(async (ctx, next) => {
  console.log(`app已经启动，第一次请求时间是${new Date()}`);
  await next();
})
app.use(bodyParser());









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