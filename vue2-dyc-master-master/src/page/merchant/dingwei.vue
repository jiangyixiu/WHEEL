<template>
    <div>
        <head-merchant-vue page-title="订位子"  @getMerchantList="getMerchantList"></head-merchant-vue>
        <dingwei-vue :merchantList="merchantList"></dingwei-vue>
    </div>
</template>

<script>
import headMerchant from '@/components/header/headMerchant'
import dingwei from '@/components/merchant/listDingWei'

export default {
    data(){
        return {
            merchantList: []
        }
    },
    components:{
        headMerchantVue: headMerchant,    
        dingweiVue: dingwei
    },
    methods:{
        getMerchantList: function(params){
            console.log('dingwei');
            console.log(params);
        }
    }
}
</script>

<style scoped>

</style>


