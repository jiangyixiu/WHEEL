import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import HelloWorld2 from '../page/index/HelloWorld2'
import index from '@/page/index/index'
import login from '@/page/login/index'
import merchantIndex from '@/page/merchant/index'
import merchantWaiMai from '@/page/merchant/waimai'
import merchantDingWei from '@/page/merchant/dingwei'
import merchantPaiDui from '@/page/merchant/paidui'
import merchantDetail from '@/page/merchant/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',      
      component: login
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: merchantIndex
    },
    {
      path: '/merchant/index',
      name: 'merchantIndex',
      component: merchantIndex
    },
    {
      path: '/merchant/waimai',
      name: 'merchantWaiMai',
      component: merchantWaiMai
    },
    {
      path: '/merchant/dingwei',
      name: 'merchantDingWei',
      component: merchantDingWei
    },
    {
      path: '/merchant/paidui',
      name: 'merchantPaiDui',
      component: merchantPaiDui
    },
    {
      path: '/merchant/detail/:merchantId',
      name: 'merchantDetail',
      component: merchantDetail
    }
  ]
})
