<template>
  <div>
    <section class="headerbox">
      <head-title-vue page-title="全部商户列表"></head-title-vue>
      <filter-conditional-vue
        @selectMerchantFilter="selectMerchantFilter"
        @tab="tab"
        @closeOption="closeOption"
        :selected="selected"
        :filters="filters"
        :current-type="currentType"
        :current-value="currentValue"
        :tab-class="tabClass"
      ></filter-conditional-vue>
    </section>

    <section class="blocklistbox">      
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
      <router-link v-for="(item, index) in merchantList" :key="index" :to="'/merchant/detail/'+item.id">
        <div class="dlistblock">
          <a href="javascript:void(0)" class="mBx">
            <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
            <div class="mFlex1">
              <section class="title colo333 ftn15">{{item.name}}</section>
              <section class="title colo666 mBxMid">
                <div>
                  评价：
                  <span class="dred03">{{item.score}}</span>
                </div>
                <span
                  v-for="(b, i) in item.business"
                  :key="i"
                  :class="[htmlico, {song:1, tuan:2, ding:3, pai: 4,dian:5,huo:6,quan:7}[b.key]]">{{b.value}}</span>
              </section>
              <section
                class="title ftn12 colo666 nowraps">{{item.cuisine}}&nbsp;&nbsp;人均：{{item.avgPrice}}元</section>
            </div>
          </a>
        </div>
        <article
          v-for="(promotion, i) in item.promotions"
          :key="i"
          :class="{'backgroundfbb900 colFFF ftn12 cuxiao':1,'bgec3333 colFFF ftn12 cuxiao mgx10 hongcuxiao':2}[promotion.type]">
          {{promotion.title}}
          <div></div>
        </article>
      </router-link>     
      </scroller> 
    </section>
    
    <foot-vue></foot-vue>
  </div>
</template>

<script>
import headTitle from "@/components/header/headTitle";
import filterConditional from "@/components/merchant/filterConditional";
import foot from "@/components/footer/footFixed";
import apiPath from "@/service/apiPath";
import { baseUrl, limit } from "@/config/env";
import lodash from "lodash";

export default {
  data() {
    return {
      merchantList: [], //商户列表数据集合
      selected: {
        //菜系
        cuisine: {
          key: "",
          value: ""
        },
        //人均消费
        filterAvgType: {
          key: "",
          value: ""
        },
        //排序
        orderType: {
          key: "",
          value: ""
        }
      }, //已选择筛选条件集合
      filters: [], //需筛选的数据集合
      currentType: "", //当前选中的条件类型(菜系，人均，排序)
      currentValue: 0, //当前选中的具体值
      tabClass:"",  //tab切换时的选中样式
      totalCount: 0, //总条数
      page: 0, //页码

      noData:true,//这是一个判断是否加载的开关
    };
  },
  beforeMount() {
    var that = this;
    //获取菜系类型，人均消费筛选条件，排序规则
    this.$axios.get(baseUrl + apiPath.filterType.list, {}).then(res => {
      var response = res.data;
      this.filters = response.data;
      lodash.forEach(response.data, function(value, key) {
        that.$set(that.selected, key, value.slice(0, 1)[0]);
      });
    });
  },
  mounted() {
    //初始化商户列表数据
    this.initMerchantList();
  },
  components: {
    headTitleVue: headTitle,
    filterConditionalVue: filterConditional,
    footVue: foot
  },
  watch:{
    currentType:function(val, oldVal){          
      if(val == ''){
        this.tabClass = '';
        return;
      }

      let w = document.documentElement.clientWidth || document.body.clientWidth;
      let tabWidth = w / 3;
      let left = 0;
      switch(val){
        // case "cuisine":
        //   left = 0;
        //   break;
        case "filterAvgType":
          left = tabWidth;
          break;
        case "orderType":
          left = tabWidth * 2;
          break;
      }
      this.tabClass = "display: block;width: "+tabWidth+"px;left: "+left+"px";      
    }
  },
  methods: {
    //切换tab(菜系，人均，排序)
    tab: function(type) {
      //参数值为已选择的类型时 且 已选择类型不为空时 -> 设置为空，关闭弹层
      if (type === this.currentType && this.currentType != "") {
        this.currentType = "";
        return;
      }

      //重新设置 已选择的类型及具体值
      this.currentType = type;
      switch (type) {
        case "cuisine":
          this.currentValue = this.selected.cuisine.key;
          break;
        case "filterAvgType":
          this.currentValue = this.selected.filterAvgType.key;
          break;
        case "orderType":
          this.currentValue = this.selected.orderType.key;
          break;
      }
    },
    //关闭
    closeOption: function() {
      //重置为空
      this.currentType = '';      
    },
    //选择筛选条件
    selectMerchantFilter: function(params) {
      //设置空，关闭弹层
      this.currentType = '';
      //重新设置选中值
      this.$set(this.selected, params.selectType, params.selected);
      //重新获取商户集合数据
      this.initMerchantList();
    },

    //下拉刷新
    refresh: function(done) {
      this.noData = false;
			this.initMerchantList();
			this.$refs.myscroller.finishPullToRefresh();//刷新完毕关闭刷新的转圈圈
    },
    //上拉加载
		infinite: function(done) {	
      console.log('infinite', this.noData);
      //console.log(this.page, limit, this.totalCount);		
			if(this.noData){
        this.$refs.myscroller.finishInfinite(true);  //这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
      }else{        
        this.appendMerchantlist();                
        done();//进行下一次加载操作
      }
    },
      
    //初始化列表值
    initMerchantList: function() {
      console.log('initMerchantList');
      this.page = 1; //页码重置
      //发送请求
      this.$axios.get(baseUrl + apiPath.merchant.index, {
          cuisine: this.selected.cuisine,
          filterAvgType: this.selected.filterAvgType,
          orderType: this.selected.orderType,
          page: this.page,
          limit: limit,
          type: 1 //商户类型(1全部)
        }).then(res => {          
          var response = res.data;
          this.merchantList = response.data;
          this.totalCount = response.count; 
          this.noData = this.totalCount < limit;        
        });
    },
    //追加数据
    appendMerchantlist: function() {
      let currentCount = this.page * limit; //当前已请求的数据总条数 
      console.log(this.page,limit, currentCount, this.totalCount);                 
      //当前数据总条数小于实际总条数时
      //if (currentCount < this.totalCount) {
        this.page += 1; //页码重新赋值     
        console.log('准备加载第'+this.page+'页数据');   
        //发送请求
        this.$axios.get(baseUrl + apiPath.merchant.index, {
            cuisine: this.selected.cuisine,
            filterAvgType: this.selected.filterAvgType,
            orderType: this.selected.orderType,
            page: this.page,
            limit: limit,
            type: 1 //商户类型(1全部)
          }).then(res => {
            var response = res.data;  
            console.log(response);          
            this.merchantList = this.merchantList.concat(response.data);
            this.totalCount = response.count;
            if(this.totalCount <= this.page * limit){
              this.noData = true;
            }
        });        
     // }      
    }
  }
};
</script>

<style scoped>
._v-container{
  top:82px;  
}
</style>