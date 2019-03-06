<template>    
    <section class="blocklistbox pdb0">
        <div v-for="(item, index) in merchantList" :key="index">
            <div class="dlistblock">
                <a  href="javascript:void(0)" class="mBx">
                    <img :src="item.logo" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">{{item.name}}</section>
                        <section class="title colo666 mBxMid">
                                <div class="wmlist mFlex1 nowraps">人均:{{item.avgPirce}}元 | 菜品:东北菜</div>

                        </section>
                            <section class="title ftn12 colo666 nowraps">地址:{{item.address}}<div></div></section>
                    </div>
                </a>
            </div>        
            <article v-for="(promotion, i) in item.promotions" :key="i" 
                class="backgroundfbb900 colFFF ftn12 cuxiao">{{promotion.titile}}</article>
        </div>
            
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>        
        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>        
        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>        
        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>        
        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>        
        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>        
        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>        
        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>        
        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>

        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>

        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>

        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>
            <div class="jiaobiao1 bkgdSz125">预定享0元招牌菜，再减50元</div>
        </div>
        <div class="dlistblock">
            <a  href="javascript:void(0)" class="mBx">
                <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                    <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">人均:100元 | 菜品:东北菜</div>

                    </section>
                    <section class="title ftn12 colo666 nowraps">快餐&nbsp;&nbsp;人均:20元</section>
                </div>
            </a>

        </div>
        <article class="backgroundfbb900 colFFF ftn12 cuxiao">预定享0元招牌菜，再减50元<div></div></article>
        <input type="button" value="点击继续加载" class="loadingbtn">
    </section>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props:['merchantList']
}
</script>
<style scoped>
.blocklistbox{
    padding-top: 90px;
}
</style>


