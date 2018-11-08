const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path')

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

app.use(async function (ctx) {
  let data = ['aaa', 'bbb', 'ccc']
  await ctx.render('user', {
    list: data
  });
});

app.listen(8080, () => {
  console.log('app is running 8080');

});