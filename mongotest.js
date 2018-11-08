const MongodbClient = require('mongodb').MongoClient
const assert = require('assert')
const dbName = 'koa'
const url = 'mongodb://localhost:27017/'
console.log('start to connection mongodb');

console.time('connet')
MongodbClient.connect(url, (err, client) => {
  // if (err) {
  //   console.error(`数据库错误信息${err}`);
  // }
  assert.equal(null, err);
  console.log("Connected successfully to server");
  var db = client.db(dbName);
  console.log('start');
  //增加数据

  db.collection('user').insertOne({
    'username': "haha",
    'age': 26,
    'sex': "男",
    "status": "1"
  }, function (err, result) {

    if (!err) {
      client.close();
      console.timeEnd('test')
      console.timeEnd('connet');
      
    }
  })
})