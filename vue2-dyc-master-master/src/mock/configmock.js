import apiPath from '@/service/apiPath'
import {baseUrl} from '@/config/env'

const Mock = require('mockjs');
Mock.mock(baseUrl+apiPath.filterType.list, 'get',{
    'code':0,
    'msg': 'success',
    'data':{
        'cuisine|30': [{
            'key':'@integer(1, 100)',
            'value':'@cword(3, 5)'
        }],
        'filterAvgType|5':[{
                'key':'@integer(1, 100)',
                'value':'@cword(3, 5)'
            }],
        'orderType|4':[{
            'key':'@integer(1, 100)',
            'value':'@cword(3, 5)'
        }]
    }    
})