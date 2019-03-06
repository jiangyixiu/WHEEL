import axios from 'axios'
import { baseUrl, timeout, storeTokenName, code } from '@/config/env'
import { getStore, removeStore } from '@/config/util'
import qs from 'qs'

//添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
})

/**
 * 封装axios请求
 * 
 * @param {*} method 请求类型 get|post|put|delete 
 * @param {*} url 请求地址
 * @param {*} params 请求实际参数类
 * @param {*} extend 扩展参数类
 */
function apiAxios(method, url, params, extend) {

    if(extend.that === null || extend.that === undefined){
        return Promise.reject('参数[that]错误')
    }

    //非异步
    if (extend.async === false) {

        //开启loading - 默认
        if (extend.showLoading === null) {
            extend.that.vloading = true
        }

        //开启loading - 自定义
        if (typeof extend.showLoading === 'function') {
            extend.showLoading(extend.that)
        }
    }

    //校验登录状态
    if (extend.checkLogin) {
        let token = getStore(storeTokenName)
        //console.log(token); 
        //token过期     
        if (token === null || token === undefined || token === '') {

            //关闭loading - 默认
            if (extend.hideLoading === null) {
                extend.that.vloading = false
            }

            //关闭loading - 自定义
            if (typeof extend.hideLoading === 'function') {
                extend.hideLoading(extend.that)
            }

            //===============start 登录过期显示情况=====================
            //默认处理方法              
            if (extend.noLogin === null) {
                extend.that.vexpired = true
                extend.that.vexpiredMsg = 'Token过期，请重新登录。^_^'
            }

            //自定义处理
            if (typeof extend.noLogin === 'function') {
                extend.noLogin(extend.that)
            }
            return Promise.reject('授权过期')
            //===============end 登录过期显示情况=====================
        }
    }

    //请求参数对象
    //let method = method.toLowerCase()
    let httpDefault = {
        baseURL: baseUrl,
        url: url,
        method: method,
        //`params` 是即将与请求一起发送的URL参数
        //`data` 是作为请求主体被发送的数据
        params: method === 'get' || method === 'delete' ? params : null,
        data: method === 'post' || method === 'put' ? qs.stringify(params) : null,
        timeout: timeout
    }

    //注意**Promise**使用(Promise首字母大写)
    return new Promise((resolve, reject) => {
        //此处的then属于axios的
        axios(httpDefault).then((result) => {

            //关闭loading - 默认
            if (extend.hideLoading === null) {
                extend.that.vloading = false
            }

            //关闭loading - 自定义
            if (typeof extend.hideLoading === 'function') {
                extend.hideLoading(extend.that)
            }
            
            //then的回调函数 - null
            if(extend.thenCallBack === null){
                //Token过期，未登录
                if(result.code === code.noLogin){

                    //移除本地token值
                    removeStore(storeTokenName)

                    //默认处理方法              
                    if (extend.noLogin === null) {
                        extend.that.vexpired = true
                        extend.that.vexpiredMsg = result.msg
                    }

                    //自定义处理
                    if (typeof extend.noLogin === 'function') {
                        extend.noLogin(extend.that)
                    }
                    resolve(result)
                }

                //请求返回错误code码时
                if(result.code !== code.success){
                    extend.valert = true
                    extend.alertMsg = result.msg
                }
            }

            //then的回调函数 - 自定义function
            if(typeof extend.thenCallBack === 'function'){
                extend.thenCallBack(extend.that, result)
            }

            resolve(result)
                        
        }).catch((error) => {
            if(extend.catchCallBack === null){
                console.log(error);
            }

            if(typeof extend.catchCallBack === 'function'){
                extend.catchCallBack(error)
            }
            reject(error)
        })
    })
}

// 输出函数getAxios、postAxios、putAxios、delectAxios，供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
    install: function (Vue) {
        /**
         * get请求
         */
        Vue.prototype.getAxios = (url, params, extend = {}) => apiAxios('get', url, params, Object.assign({
            that: null,
            async: false,                    
            showLoading: null,
            hideLoading: null,
            checkLogin: false,
            noLogin: null,
            thenCallBack: null,
            catchCallBack: null,
        }, extend))

        /**
         * post请求
         */
        Vue.prototype.postAxios = (url, params, extend = {}) => apiAxios('post', url, params, Object.assign({
            that: null,
            async: false,                    
            showLoading: null,
            hideLoading: null,
            checkLogin: false,
            noLogin: null,
            thenCallBack: null,
            catchCallBack: null,
        }, extend))

        /**
         * put请求
         */
        Vue.prototype.putAxios = (url, params, extend = {}) => apiAxios('put', url, params, Object.assign({
            that: null,
            async: false,                    
            showLoading: null,
            hideLoading: null,
            checkLogin: false,
            noLogin: null,
            thenCallBack: null,
            catchCallBack: null,
        }, extend))

        /**
         * delect请求
         */
        Vue.prototype.delectAxios = (url, params, extend = {}) => apiAxios('delect', url, params, Object.assign({
            that: null,
            async: false,                    
            showLoading: null,
            hideLoading: null,
            checkLogin: false,
            noLogin: null,
            thenCallBack: null,
            catchCallBack: null,
        }, extend))
    }
}