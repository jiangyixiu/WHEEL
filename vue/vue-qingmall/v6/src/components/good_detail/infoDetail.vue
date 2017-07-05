<script>
export default {
  props: {
    data: {
      default: {}
    }
  },
  data() {
    return {}
  }
}
</script>
<template>
  <div>
    <div class="property">
      <div class="info">
        <h1 class="name" id="productNames">{{data.name}}</h1>
        <p class="desc">{{data.introduce}}</p>
      </div>
      <div class="price-container">
        <span class="price" id="productPrices">￥{{data.presentPrice}}</span>
      </div>
    </div>
    <div class="specification">
      <div class="service">
        <div v-for="item in data.productExplainDto">
          <img :src="item.icon">
          <span>{{item.explain}}</span>
        </div>
      </div>
    </div>
    <div class="sales clearfix">
      <span style="margin-right: 10px;">销量: {{data.saleSum}}</span>
      <span>快递费: {{data.freight}}</span>
    </div>
    <div class="btn-spec">
      <span>规格 颜色分类: 白色</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.property {
  padding: 24px 15px 20px;
  .name {
    color: #1b1b1b;
    margin-top: 0;
    margin-bottom: 5px
  }

  .desc {
    color: #888;
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 10px
  }

  .price-container {
    padding-right: 0
  }

  .price-container .sign {
    color: #eda287;
    font-size: 25px
  }

  .price-container .price {
    color: #FF508A;
    font-size: 20px;
    font-weight: 700
  }
}

.specification {
  padding: 0 0 18px;

  .service {
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    align-items: center
  }
  .service div {
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 0 4px;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    align-items: center
  }

  .service img {
    width: 20px;
    margin-right: 5px
  }
}


.sales {
  padding: 0 15px;
  line-height: 30px;
  background: #f8f8f8;
  font-size: 12px;
  color: #666;
  box-shadow: 0 2px 10px 0 #f0f0f0
}

.btn-spec {
  color: #444;
  background: #fff;
  width: 100%;
  display: block;
  height: 49px;
  font-size: 14px;
  padding: 0 15px;
  line-height: 49px;
  box-sizing: border-box
}

.btn-spec i {
  line-height: 49px;
  font-size: 23px;
  color: #aaa
}
</style>
