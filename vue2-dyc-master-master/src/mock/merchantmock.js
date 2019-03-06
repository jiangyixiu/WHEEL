import apiPath from '@/service/apiPath'
import {baseUrl} from '@/config/env'

const Mock = require('mockjs');
const Random = Mock.Random;

Mock.mock(RegExp(baseUrl +apiPath.merchant.index),'get',{
    'code':0,
    'msg':'success',
    'count':17,
    'data|8':[{
        'id':'@integer(1, 100)',
        'name':'@cword(5,8)餐厅',
        'address':'@county(true)',
    }]
})

Mock.mock(RegExp(baseUrl + apiPath.merchant.detail),'get',{
    'code':0,
    'msg':'success',
    'data':{
        'id':'@integer(1,100)',
        'name':'@cword(5,8)餐厅',
        'address':'@county(true)',
        'img':Random.image('640x300', '#323232', '#e6e5e6', 'png', 'merchant-img'),
        'logo':Random.image('148x148', '#894FC4', '#FFF', 'png', 'merchant-logo'),
        'telphone':'010-34567876',
        'isCollect|1-2':true,
    }
})