<template>
    <section class="headerbox">
        <head-title-vue v-bind:page-title="pageTitle"></head-title-vue>
        <filter-conditional-vue 
        @selectMerchantFilter="selectMerchantFilter"
        @changeMetchantFilterType="changeMetchantFilterType"
        v-bind:current-type="currentType"
        v-bind:current-select="currentSelect"></filter-conditional-vue>
    </section>
</template>

<script>
import headTitle from '@/components/header/headTitle'
import filterConditional from '@/components/merchant/filterConditional'

export default {
    data(){
        return {
            
        }
    },
    props:['pageTitle', 'currentType', 'currentSelect'],
    components: {
        headTitleVue: headTitle,
        filterConditionalVue: filterConditional,
    },
    methods: {
        selectMerchantFilter: function(params){
            this.$emit('selectMerchantFilter', params);
        }
    }
}
</script>

<style scoped>

</style>


