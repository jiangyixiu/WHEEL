import apiPath from '@/service/apiPath'
import { baseUrl } from '@/config/env'

const Mock = require('mockjs')
const Random = Mock.Random

Mock.mock(baseUrl + apiPath.user.collect, 'post', {
    'code': 0,
    'msg': 'success',
    'data': {}
})