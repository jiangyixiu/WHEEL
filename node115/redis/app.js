var config = require('./config');
var redis = require("redis");
const client = require('redis').createClient(config.RDS_PORT, config.RDS_HOST);
client.auth(config.RDS_PWD);


// 链接成功
client.on('ready', function (res) {
  console.log('ready');
});
// 链接失败
client.on("error", function (err) {
  console.error("Error " + err);
});

const QUEUE_NAME = 'AddCourseCertificate';
var test = { "catalog_id": "319", "date": new Date(), "target_employee_id": "0", "price": 0, "employee_id": "31665" };



client.rpush(QUEUE_NAME, JSON.stringify(test))  // 向上插入
client.lpush(QUEUE_NAME, JSON.stringify(test))  // 向下插入
client.lrange(QUEUE_NAME,0,10, function (err, obj) {  // 查看lrange
    console.dir(obj);
});

client.lpop(QUEUE_NAME,0,10, function (err, obj) {  // 出队lrange（出队了，里面就就少一条）
    console.dir(obj);
});