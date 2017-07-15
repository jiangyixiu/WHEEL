import each from 'lodash/each'
import axios from 'axios'
import { getUrlParameter, host, tokenid, allowhost } from 'js/global'

export const url = {
  getCart: host.mall + '/mall/v1/shoppingcart/getcart',
  setCart: host.mall + '/mall/v1/shoppingcart/addtocart',
  getProductInfo: host.mall + '/mall/v1/item/getitembyproductid'
}
export const getCart = () => {
  let query = getUrlParameter()
  let params = {
    tokenid,
    allowhost,
    userid: query.userid
  }
  return axios.get(url.getCart, {
    params
  })
}
