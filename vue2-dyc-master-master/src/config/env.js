/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl = '//wap.dyc.com';
let routerMode = 'hash';
let imgBaseUrl = '';
let limit = 8;
let timeout = 10000;  //请求超时时间
let storeTokenName = 'token';  //记录的token - key值名称
let requestCount = 0;  //当前并发请求的连接
let code = {
    'success': 0,
    'noLogin': 1002
};  //与后台接口的状态码保持一致

export {
    baseUrl,
    routerMode,
    imgBaseUrl,    
    limit,
    timeout,
    storeTokenName,
    requestCount,
    code,
}