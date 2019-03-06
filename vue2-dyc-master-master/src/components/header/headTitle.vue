<template>
    <header class="mBxCm mLinear_ffec00_fbb900">
        <a @click="prev();" href="javascript:void(0)" class="ico aback"></a>
        <h3 class="mFlex1 mBxCm">
            <div class="dycIcon">{{pageTitle}}</div>
        </h3>
        <a href="javascript:void(0)" class="ico aico"></a>
    </header>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    props:['pageTitle'],
    methods:{
        prev: function(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>

</style>


