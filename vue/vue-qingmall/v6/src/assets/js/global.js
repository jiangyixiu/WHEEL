import each from 'lodash/each'
import axios from 'axios'
import shareSign from './shareSign'
let _com = '.sythealth.com'

/**
   * 获取地址参数
   *
   * @param {string} data N 链接
   * @returns JSON
   */
export const getUrlParameter = data => {
  let query = {}
  let url = data
    ? data.substr(data.indexOf('?'))
    : document.location.search.replace('?', '')
  let urlParams = []
  if (url) {
    urlParams = url.split('&')
    urlParams.forEach(item => {
      let value = item.split('=')
      query[value[0]] = value[1]
    })
  }
  return query
}

const getApiHost = (() => {
  const query = getUrlParameter()
  if (query.goHost) {
    return query.goHost
  } else {
    return 'api'
  }
})()

export const isClient = (() => {
  if (window.fitness_app) {
    return true
  } else {
    return false
  }
})()
export const host = {
  mall: 'https://' + getApiHost + _com,
  qm: 'https://' + getApiHost + _com
}

function getAllowhost() {
  let allowhost = 5
  let hostname = window.location.hostname
  switch (hostname) {
    case 'test.sythealth.com':
      allowhost = 3
      break

    case 'm.sythealth.com':
      allowhost = 2
      break
  }
  return allowhost
}
export const tokenid = 'tokenid_undefined'
export const allowhost = getAllowhost()
export const statisticsFireye = (eventid, id) => {
  let data = {
    tokenid: tokenid,
    allowhost: allowhost,
    eventid: eventid
  }
  let userid = getUrlParameter().userid
  if (userid) {
    data.userid = userid
  }
  if (id) {
    data.id = id
  }
  axios.get('https://fireye.sythealth.com', {
    params: data
  })
}
/**
   * 拼接参数
   *
   * @param {Object} data Y 参数对象
   * @returns string
   */
export const setUrlParameter = data => {
  let string = ''
  each(data, (item, key) => {
    string += '&' + key + '=' + item
  })
  return '?' + string.replace('&', '')
}
/**
   * 返回App版本
   *
   * @returns 版本号
   */
export const getAppVersion = () => {
  if (!getUrlParameter('appversion')) return 0

  var version = getUrlParameter('appversion').split('.')
  var _version = ['0', '0', '0']

  each(version, function(index, s) {
    _version[index] = version[index]
  })

  var str = ''

  each(_version, function(index, s) {
    str += s
  })

  version = parseInt(str)

  return version
}
export const getMobileOperatingSystem = () => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (
    userAgent.match(/iPad/i) ||
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPod/i)
  ) {
    return 'iOS'
  } else if (userAgent.match(/Android/i)) {
    return 'Android'
  } else {
    return 'unknown'
  }
}
