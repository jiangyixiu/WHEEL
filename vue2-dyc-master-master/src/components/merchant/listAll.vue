<template>
    <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        @top-status-change="handleTopChange"
        ref="loadmore">
        <section class="blocklistbox">        
        <div v-for="(item, index) in merchantList" :key="index">
            <div class="dlistblock">
            <a href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                <section class="title colo333 ftn15">{{item.name}}</section>
                <section class="title colo666 mBxMid">
                    <div>评价：
                    <span class="dred03">{{item.score}}</span>
                    </div>
                    <span
                    v-for="(b, i) in item.business"
                    :key="i"
                    :class="[htmlico, {song:1, tuan:2, ding:3, pai: 4,dian:5,huo:6,quan:7}[b.key]]"
                    >{{b.value}}</span>
                </section>
                <section
                    class="title ftn12 colo666 nowraps"
                >{{item.cuisine}}&nbsp;&nbsp;人均：{{item.avgPrice}}元</section>
                </div>
            </a>
            </div>
            <article v-for="(promotion, i) in item.promotions" :key="i"
            :class="{'backgroundfbb900 colFFF ftn12 cuxiao':1,'bgec3333 colFFF ftn12 cuxiao mgx10 hongcuxiao':2}[promotion.type]">
            {{promotion.title}}
            <div></div>
            </article>
        </div>      
        </section>
    </mt-loadmore>  
</template>

<script>
import apiPath from "@/service/apiPath";
import { limit, baseUrl } from "@/config/env";

export default {
  data() {
    return {
      page: 1,
      limit: limit,
      allLoaded: false,      

      topStatus:'',
      topLoadingText:'加载中...',
      topDistance:20,
      bottomDistance: 20
    };
  },
  props: ["merchantList"],
  methods: {
    //从列表顶部下拉刷新
    loadTop: function() {
      this.page = 1;
      this.getMerchantData();
      this.$refs.loadmore.onTopLoaded();      
    },
    //从列表底部上拉加载更多
    loadBottom: function() {
      //this.page += 1;
      this.getMerchantData();
      //this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    getMerchantData: function() {
        var that = this;
        setTimeout(function(){
            console.log('begin-send');
            //发送请求-重新加载值
            that.$axios.get(baseUrl + apiPath.merchant.index, {
                page: this.page,
                limit: this.limit,
                type: 1
            }).then(res => {
                var data = res.data.data;
                that.merchantList = that.merchantList.concat(data);
                console.log(that.merchantList);
            });
        },2000);      
    },
    //组件状态的变化
    handleTopChange: function(status){
        this.topStatus = status;
    }
  }
};
</script>

<style scoped>
.blocklistbox {
  padding-top: 90px;
}
</style>

