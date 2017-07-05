<script>
import each from 'lodash/each'
import find from 'lodash/find'
import extend from 'lodash/extend'
export default {
  props: {
    data: {
      default: {}
    },
    isOther: {
      default: ''
    },
    isShow: {
      default: false
    },
    selectValue: {
      default: ''
    },
    size: {
      default: 1
    }
  },
  data() {
    return {
      img: '',
      itemIds: extend({}, this.data.itemIds)
    }
  },
  watch: {
    isShow(value) {
      let overflow = 'auto'
      if (value) {
        overflow = 'hidden'
      }
      document.body.style.overflow = overflow
    }
  },
  mounted() {
    this.getChecked()
  },
  methods: {
    getChecked() {
      const form = this.$refs.form.querySelectorAll('input')
      let itemIds = []
      each(form, (item) => {
        if (item.checked) {
          itemIds.push(item.value)
        }
      })
      this.$emit('getChecked', itemIds.sort())
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<template>
  <transition name="fade">
    <div class="buy-layout" v-show="isShow" @click="close">
      <div class="buy-wrap" @click.stop>
        <a class="close" @click="close"></a>
        <div class="header clearfix">
          <img :src="itemIds[selectValue]&&data.itemIds[selectValue].iconUrl" alt="">
          <h5>￥{{itemIds[selectValue]&&data.itemIds[selectValue].price}}</h5>
          <p>{{data.productDto.name}}</p>
        </div>
        <div class="container" ref="form" v-once>
          <template v-for="item in data.attributes">
            <p class="tit">{{item.name}}</p>
            <form class="form-horizontal form2 bg-white base-form">
              <div class="form-group no-margin">
                <div class="radio-inline no-padding-top" v-for="items in item.values">
                  <input type="radio" :name="items.attributeId" :id="items.valueId" :value="items.valueId" @change="getChecked" :checked="items.first ? true : false">
                  <label class="no-margin" :for="items.valueId">
                    <span></span>{{items.name}}</label>
                </div>
              </div>
            </form>
          </template>
        </div>
        <div class="purchase-quantity clearfix">
          <div class="size-group clearfix">
            <button class="minus" @click="$emit('handleSize', -1)">-</button>
            <span class="quantity">{{size}}</span>
            <button class="add" @click="$emit('handleSize', 1)">+</button>
          </div>
          <div class="txt">购买数量</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.buy-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  z-index: 4;
  .buy-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding-bottom: 55px;
    .close {
      position: absolute;
      right: 1em;
      top: 1em;
      width: 2em;
      height: 2em;
      background: url('../img/close.png') no-repeat center center;
      background-size: 100% 100%;
    }
    .header {
      img {
        float: left;
        width: 110px;
        height: 110px;
        position: relative;
        bottom: 30px;
        margin-right: 15px;
        margin-left: 15px;
        background: #fff;
        box-shadow: 0 0 10px rgba(25, 25, 25, .3)
      }
      h5 {
        font-size: 18px;
        margin: 0;
        padding-bottom: 3px;
        padding-top: 24px;
        color: #FF508A;
      }
      p {
        font-size: 16px;
        margin-bottom: 0;
        margin-top: 0;
        padding-top: 4px;
        color: #888;
      }
    }

    .container {
      padding: 0 15px 15px;
      .tit {
        font-size: 1.2em;
        color: #888;
        padding-bottom: 10px;
      }
      input[type=radio] {
        display: none
      }

      input[type=radio]+label {
        font-family: Arial, sans-serif;
        font-size: 14px
      }

      input[type=radio]:checked+label span {
        background-image: url('../img/radio_on.png')
      }

      input[type=radio]+label span {
        width: 15px;
        height: 15px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        background-image: url('../img/radio_off.png');
        background-repeat: no-repeat;
        background-size: cover
      }

      .radio-inline {
        position: relative;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        vertical-align: middle;
        cursor: pointer;
        height: 30px;
        margin-right: 1em;
      }
      label {
        line-height: 30px;
      }
      .label {
        display: flex;
        color: #333;
        font-size: 14px;
        align-items: center;
        justify-content: flex-start
      }

      .attribute-name {
        color: #888;
        font-size: 16px
      }

      .attribute {
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 10px
      }
    }

    .purchase-quantity {
      padding: 20px 15px;
      border-top: 1px solid #f0f0f0;
      overflow: hidden;
      .txt {
        font-size: 16px;
        color: #444;
        line-height: 30px;
        width: 6em;
        float: left;
      }

      .size-group {
        float: right;
        border: 1px solid #aaa;
        border-radius: 5px;
        width: 170px;
        height: 30px
      }

      .size-group button[disabled] {
        background: #f6f6f6;
        color: #b9b9b9
      }

      .add,
      .minus {
        background: 0 0;
        border: none;
        height: 28px;
        color: #444;
        font-size: 12px;
        width: 39px;
        text-align: center;
        padding: 0;
        outline: 0
      }

      .add,
      .minus,
      .quantity {
        float: left;
        display: block
      }

      .add:active {
        background: #eee
      }

      .quantity {
        color: #444;
        font-size: 12px;
        height: 28px;
        line-height: 28px;
        width: 88px;
        text-align: center;
        display: inline-block;
        border-left: 1px solid #aaa;
        border-right: 1px solid #aaa
      }
    }


    .purchase-tip-wrapper {
      height: 25px
    }

    .purchase-tip {
      display: none;
      color: #f97e5c;
      padding-right: 15px;
      text-align: right
    }
  }
}
</style>
