import apiPath from '@/service/apiPath'
import { baseUrl } from '@/config/env'

const Mock = require('mockjs');
const Random = Mock.Random;

//不加正则时，使用的全匹配。请求加参数，就匹配失败-拦截失败。
Mock.mock(RegExp(baseUrl + apiPath.banner.list), "get", {
    'code': 0,
    'data|1-5': [{
        'title': '@title',
        'sort': '@increment',
        'imgPath': Random.image('640x300', '#fddd59', '@word')
    }],
    'msg': 'success'
})