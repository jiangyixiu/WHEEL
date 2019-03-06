<template>
    <div>
        <head-merchant-vue page-title="外卖"  @getMerchantList="getMerchantList"></head-merchant-vue>
        <waimai-vue :merchantList="merchantList"></waimai-vue>
    </div>
</template>

<script>
import headMerchant from '@/components/header/headMerchant'
import waimai from '@/components/merchant/listWaiMai'

export default {
    data(){
        return {
            merchantList: []
        }
    },
    components:{
        headMerchantVue: headMerchant,    
        waimaiVue: waimai
    },
    methods:{
        getMerchantList: function(params){
            console.log('waimai');
            console.log(params);
        }
    }
}
</script>

<style scoped>
.wmlist{
    padding-top: 4px!important;
    padding-bottom:3px!important;
}
.blocklistbox{
    padding-bottom: 5px;
}
</style>


