<script>
import { i18n } from 'js/base'
import shareTop from '../../components/common/shareTop'
import vLoading from '../../components/common/loading'
import shareBot from '../../components/common/shareBot'
import banner from './components/banner'
import infoDetail from './components/infoDetail'
import btnSpec from './components/btnSpec'
import moreDetail from './components/moreDetail'
import buttonGroup from './components/buttonGroup'
import buyWrap from './components/buyWrap'
import axios from 'axios'
// 数据处理插件，通过单文件引入，减小体积
import _ from './_lodash'
import { getUrlParameter, setUrlParameter, tokenid, allowhost, isClient } from 'js/global'
import shareSign from 'js/shareSign'
import { url, getCart } from './g'
export default {
  data() {
    let query = getUrlParameter()
    return {
      query,
      show: true,
      data: null,
      selectValue: '',
      showBuyWrap: false,
      size: 1,
      youmengUrl: '',
      cartCount: 0,
      isClient
    }
  },
  async mounted() {
    const params = this.query
    if (params === {}) {
      return false
    }
    const { data } = await axios.get(url.getProductInfo, {
      params
    })
    this.getCartCount()
    if (data.head.ret === 0) {
      let { productDto } = data.data
      document.title = productDto.name
      shareSign({
        title: (productDto.subTitle || '') + ' ' + productDto.name,
        desc: productDto.introduce,
        pic: productDto.showPic,
        uuid: '/qingmall/6/good_detail?' + productDto.productId
      })
      this.show = false
      this.setData(data.data)
      this.data = data.data
      // 获取友盟链接跳转
      let pay = _.find(data.data.attributeDto, item => {
        return item.isChoose === 'Y'
      }) || data.data.attributeDto[0]
      if (pay && pay.buyUrl) {
        this.shareUrl = pay.buyUrl
      }
    } else {
      alert(data.head.msg)
    }
  },
  methods: {
    // 数据格式修改
    setData(data) {
      let attributes, itemIds
      attributes = data['attributes'] = []
      itemIds = data['itemIds'] = {}
      _.each(data.attributeDto, (attribute, index) => {
        _.each(attribute.attributeValueDto, (value, index) => {
          // generate attributes
          let attr = _.find(attributes, function (attr) {
            return value.name === attr.name
          })

          if (attr) {
            let v = _.find(attr.values, function (v) {
              return v.valueId === value.attributeValueDto[0].attributeId
            })
            if (!v) {
              attr.values.push({
                name: value.attributeValueDto[0].name,
                valueId: value.attributeValueDto[0].attributeId,
                attributeId: value.attributeId
              })
            }
          } else {
            attr = {
              name: value.name,
              values: [{
                first: true,
                name: value.attributeValueDto[0].name,
                valueId: value.attributeValueDto[0].attributeId,
                attributeId: value.attributeId
              }]
            }
            attributes.push(attr)
          }

          // generate itemIds
          if (!itemIds[attribute.itemId]) {
            itemIds[attribute.itemId] = {
              iconUrl: attribute.iconUrl,
              price: attribute.price,
              valueIds: [value.attributeValueDto[0].attributeId],
              remark: value.attributeValueDto[0].remark,
              itemEventId: attribute.itemEventId
            }
          } else {
            itemIds[attribute.itemId].valueIds.push(value.attributeValueDto[0].attributeId)
          }
        })
      })
      if (this.isOther === 'haosepai') {
        // 因为菜品要放在最后，所以单独处理
        for (let key in attributes) {
          if (attributes[key].name === '') {
            data['dishes'] = attributes[key]
          } else {
            attributes[key].noDishes = true
          }
        }
      }
    },
    // 统计购物车内的数量
    getCartCount() {
      getCart().then(({ status, data }) => {
        if (status === 200 && data.head.ret === 0) {
          this.cartCount = _.reduce(_.map(data.data.items, item => item.count), (sum, n) => sum + n, 0)
        }
      })
    },
    /**
     * 点击购买事件
     * type 事件类型
     */
    payEvent(type) {
      if (!this.showBuyWrap) {
        this.showBuyWrap = true
        return false
      }
      let param = {}
      param = {
        type: 1,
        camptypeid: this.selectValue,
        count: this.size,
        price: this.data.itemIds[this.selectValue].price,
        camprecruitid: this.data.productDto.productId,
        body: this.data.productDto.bodyParams
      }
      // 直接购买
      if (type === 'buy') {
        document.location.href = 'fitness://campBuy' + setUrlParameter(param)
      }
      // 加入购物车
      if (type === 'joinCar') {
        axios.post(url.setCart, {
          tokenid,
          allowhost,
          userId: this.query.userid,
          itemId: this.selectValue,
          count: this.size
        }).then(({ status, data }) => {
          if (status === 200 && data.head.ret === 0) {
            this.getCartCount()
            this.showBuyWrap = false
          }
        })
      }
    },
    // 购买数量加减事件
    handleSize(value) {
      if (value > 0 && this.size >= 5) {
        return ''
      }
      if (value < 0 && this.size <= 1) {
        return ''
      }
      this.size = this.size + value
    },
    // 关闭选项
    close() {
      this.showBuyWrap = false
    },
    // 返回选中产品
    getChecked(itemIds) {
      _.each(this.data.itemIds, (item, key) => {
        if (itemIds.join('.') === item.valueIds.join('.')) {
          this.selectValue = key
        }
      })
    }
  },
  components: {
    shareTop,
    vLoading,
    banner,
    infoDetail,
    btnSpec,
    moreDetail,
    buttonGroup,
    buyWrap,
    shareBot
  }
}
</script>
<template>
  <div class="gooddetail">
    <share-top :open-url="'good?productid='+query.productid"></share-top>
    <template v-if="!show">
      <banner :slides="data.productDto.bannerUrl"></banner>
      <info-detail :data="data.productDto"></info-detail>
      <btn-spec :data="data" :select-value="selectValue" @payEvent="payEvent" v-if="selectValue&&isClient"></btn-spec>
      <more-detail :data="data.productDto" :query="query"></more-detail>
      <button-group :data="data" :cart-count="cartCount" @retur="payEvent" v-if="isClient"></button-group>
      <buy-wrap v-if="isClient" :data="data" :is-show="showBuyWrap" :size="size" @handleSize="handleSize" :select-value="selectValue" @close="close" @getChecked="getChecked"></buy-wrap>
      <share-bot :url="shareUrl"></share-bot>
    </template>
    <v-loading :show="show"></v-loading>
  </div>
</template>
<style lang="scss">
body,
html {
  height: 100%;
  position: relative;
}

.gooddetail {
  height: 100%;
}
</style>

