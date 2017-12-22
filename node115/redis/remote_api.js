// remote_api.js 模拟第三方 API
'use strict';

const app = require('express')();

app.get('/', (req, res) => {
    setTimeout(() => {
        let arr = [200, 300];  // 200 代表成功，300 代表失败需要重新请求
        res.status(200).send({ 'status': arr[parseInt(Math.random() * 2)] });
    }, 3000);
});

app.listen('9001', () => {
    console.log('API 服务监听端口：9001');
});