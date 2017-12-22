// producer.js 自身应用 API，用来接受用户请求并将任务加入任务队列
'use strict';

var config = require('./config');
const redisClient = require('redis').createClient(config.RDS_PORT, config.RDS_HOST);
redisClient.auth(config.RDS_PWD, function () {
  console.log('认证成功');
});
const QUEUE_NAME = 'AddCourseCertificate';

function addTaskToQueue(taskName, callback) {
  // 先判断任务是否已经存在，存在：跳过，不存在：加入任务队列
  redisClient.zscore(QUEUE_NAME, taskName, (error, task) => {
    if (error) {
      console.log(error);
    } else {
      if (task) {
        console.log('任务已存在，不新增相同任务');
        callback(null, task);
      } else {
        redisClient.zadd(QUEUE_NAME, taskName, (error, result) => {
          if (error) {
            callback(error);
          } else {
            callback(null, result);
          }
        });
      }
    }
  });
}

var test = { "catalog_id": "319", "date": "2017-08-23 18:59:02", "target_employee_id": "0", "price": 0, "employee_id": "31665" };

addTaskToQueue(JSON.stringify(test), (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log('正在查询中......')
    console.log(result)
  }
});