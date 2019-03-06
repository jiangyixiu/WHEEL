<template>    
    <section class="blocklistbox dpdb40">
        <div v-for="(item, index) in merchantList" :key="index">
            <div class="dlistblock">
                <img :src="item.logo" width="73" class="dbor dpd1">
                <div class="mFlex1">
                    <section class="title colo333 ftn15 nowraps">{{item.name}}</section>
                    <section class="title colo666 mBxMid">
                        <div class="wmlist mFlex1 nowraps">{{item.initialDeliveryPrice}}元起送 | 送餐费:{{item.roomServiceCharge}}元</div>
                    </section>
                    <section class="title ftn12 colo666 nowraps">送餐时间: {{item.sendTime}}</section>
                </div>
            </div>
            <article v-for="(promotion, i) in item.promotions" :key="i" 
                    class="backgroundfbb900 colFFF ftn12 cuxiao">{{promotion.titlle}}<div></div></article>  
        </div>

        <div>
            <div class="dlistblock">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/def.png" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">600m</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>
            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao">满60元免送餐费<div></div></article>        
        </div>

        <div>
            <div class="dlistblock">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">600m</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao">满60元免送餐费<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <div>
            <div class="dlistblock opacity60">
                <a  href="javascript:void(0)" class="mBx">
                    <img src="../../images/try1.jpg" width="73" class="dbor dpd1">
                    <div class="mFlex1">
                        <section class="title colo333 ftn15 nowraps">绿茶餐厅</section>
                        <section class="title colo666 mBxMid">
                            <div class="wmlist mFlex1 nowraps">30元起送 | 送餐费:6元</div>
                            <span class="red02" style="display:none">30km</span>
                        </section>
                            <section class="title ftn12 colo666 nowraps">送餐时间：10:30-22:30</section>
                    </div>
                </a>

            </div>
            <article class="backgroundfbb900 colFFF ftn12 cuxiao opacity60">满200元免送王老吉3罐，或者可乐一瓶<div></div></article>
        </div>

        <input type="button" value="点击继续加载" class="loadingbtn" onclick="loading()">
        <div class="loadingbtnzhong">

            <div class="mBxCm"><i class="bkgdSz125 rateo"></i><span class="padLf5">加载中...</span></div>

        </div>
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


