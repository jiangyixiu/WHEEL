var app = getApp();
Page({
    data:{
        _data:{},
        headnopay_title:'',
        head_background:'http://weixin.zx-tour.com/static/xcx_img/orderinfo_headblue.png',
        race_status:'等待开赛',
        pay_status:'报名成功',
        game_over:false,
        user_full:false,
        over_sign:false,
        righticon_pic:'',
        begin_time:'',
        meal_name:'',
        race_group:'',
        add_service:'',
        show_user:'',
        count_time:'',
        runner_show:false,
        btn_show:true,
    },
    getDate:function(strDate) {
        var st = strDate;
        var a = st.split(" ");
        var b = a[0].split("-");
        var c = a[1].split(":");
        var date = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2])
        return date;
    },
    endGame:function(gtime,ntime){
        var gameTime =this.getDate(gtime);
        var nowTime =this.getDate(ntime);
        return (gameTime-nowTime)>0?'1':'0';
    },
    head_change:function(){
        if (this.data._data.data.m_placesleft<=0 && this.data._data.data.paystats =='3'){
            this.setData({
                race_status:'名额已满',
                user_full:true
            })
        }
        if (this.endGame(this.data._data.data.m_untilTime, this.data._data.datetime) == '0' && this.data._data.data.paystats == '3'){
             this.setData({
                race_status:'报名截止',
                over_sign:true
            })
        }
        if(this.endGame(this.data._data.data.m_GameTime,this.data._data.datetime)=='0'){
            this.setData({
                race_status:'赛事结束',
                game_over:true
            })
        }
        switch (this.data._data.data.paystats){
            case '1' : {
                this.setData({
                    head_background:'http://weixin.zx-tour.com/static/xcx_img/orderinfo_headgreen.png',
                    pay_status:'未完善资料',
                    righticon_pic:'no_perfecticon'
                })
            }break;
            case '3':{
                 this.setData({
                     head_background:'http://weixin.zx-tour.com/static/xcx_img/orderinfo_headred.png',
                    pay_status:'支付过期',
                    righticon_pic:'over_pay',
                })
            }break;
            case '5':{
                 this.setData({
                     head_background:'http://weixin.zx-tour.com/static/xcx_img/orderinfo_headorange.png',
                    pay_status:'未支付',
                    righticon_pic:'no_pay',
                    race_status: '等待支付',
                    headnopay_title: 'no_pay_title',
                })
                var that = this;
                this.count_timefn(that);
            }break;
            case '10':{
                this.setData({
                    runner_show:true,
                })
            }
        }
    },
    count_timefn:function(that){
        var _page = that;
        var last_time = (new Date(_page.data._data.data.pay_deadline)-new Date(_page.data._data.datetime))/1000;
        var lastDay = Math.floor(last_time/(3600*24));
        var lastHour =  Math.floor((last_time - lastDay*3600*24)/3600);
        var lastMinute =  Math.floor((last_time - lastDay*3600*24 -lastHour * 3600)/60);
        if(lastMinute < 0){lastMinute = 0;}
            var lastSecond = Math.floor(last_time - lastDay*3600*24 - lastHour * 3600 - lastMinute*60);
        if(lastSecond < 0){lastSecond = 0;}
        if(lastSecond < 10) lastSecond = '0' + lastSecond;
        if(lastMinute < 10) lastMinute = '0' + lastMinute;
        if(lastHour < 10) lastHour = '0' + lastHour;
        _page.setData({
            count_time:lastHour + ':' + lastMinute + ':' + lastSecond
                });
        last_time -=1;
        var timer = setInterval(function(){
           if(last_time <= 0){
                clearInterval(timer)
               }
           else{
                 var lastDay = Math.floor(last_time/(3600*24));
                 var lastHour =  Math.floor((last_time - lastDay*3600*24)/3600);
                 var lastMinute =  Math.floor((last_time - lastDay*3600*24 -lastHour * 3600)/60);
                 if(lastMinute < 0){lastMinute = 0;}
                 var lastSecond = Math.floor(last_time - lastDay*3600*24 - lastHour * 3600 - lastMinute*60);
                if(lastSecond < 0){lastSecond = 0;}
                if(lastSecond < 10) lastSecond = '0' + lastSecond;
                if(lastMinute < 10) lastMinute = '0' + lastMinute;
                if(lastHour < 10) lastHour = '0' + lastHour;
                _page.setData({
                    count_time:lastHour + ':' + lastMinute + ':' + lastSecond
                })
           }
           last_time -= 1;
       },1000)
    },
    setshowuser:function(){
        var cn_num = ['一','两','三','四','五','六','七','八','九','十'];
        var num = this.data._data.count-1;
        if(num > 0){
            this.setData({
                show_user:cn_num[num] + '人'
            })
        }else{
            if(!this.data._data.data.name){
                this.setData({
                    show_user:'无'
                }) 
            }else{
                this.setData({
                    show_user:this.data._data.data.name
                })
            }
        }
    },
    setRaceinfo:function(){
        var bg_time = this.data._data.data.m_GameTime.split(' ')[0];
        var _meal = '',_group = '',_service = '无';
        var _arr = this.data._data.data.info;
        for(var i = 0 ; i<_arr.length; i++){
           if(_arr[i].type=='套餐') _meal = _arr[i].g_name;
           if(_arr[i].type=='赛程') _group = _arr[i].g_name;
           if(_arr[i].type=='附加优质服务') _service = _arr[i].g_name;
        }
        console.log(_arr);
        this.setData({
            begin_time:bg_time,
            meal_name:_meal,
            race_group:_group,
            add_service:_service
        })
    },
    call_phone:function(){
        wx.makePhoneCall({
            phoneNumber: '4000-842-195'
        })
    },
    count_time:function(btime,ntime){
        var begin_time = 1;
    },
    go_trip:function(event){
        wx.navigateTo({
            url: '/pages/trip/trip?meal_id='+event.target.dataset.mealId,
        })
    },
    go_perfect: function (event){
        wx.navigateTo({
            url: '/pages/perfect/perfect?_group_id=1&order_id=' + event.target.dataset.orderid,
        })
    },
    go_pay: function (event){
        wx.redirectTo({
            url: '/pages/payorder/payorder?order_id=' + event.target.dataset.orderid,
        })
    },
    re_sign: function (event){
        wx.redirectTo({
            url: '/pages/Matchinfo/Matchinfo?m_id=' + event.target.dataset.mid,
        })
    },
    onLoad:function(options){
        var that = this;
        app.wx_request('https://api.h5.zx-tour.com/H5Order/getorderinfo?orderid=' + options.orderid,'post','json',{},that,function(res,that){
            that.setData({
                _data: res.data
            })
            that.setshowuser();
            that.setRaceinfo();
            that.head_change();
        })
       
        // wx.request({
        //     url: 'https://api.h5.zx-tour.com/H5Order/getorderinfo?uid=31390&orderid='+ options.orderid,
        //     success:function(res){
        //         that.setData({
        //             _data:res.data
        //         })
        //         console.log(res);
        //         that.head_change();
        //         that.setshowuser();
        //         that.setRaceinfo();
        //     }
        // })
        // 获得URL上的参数
        // var order_id = event.orderid;
        // wx.request({
        //   url: 'https://weixin.zx-tour.com/Ajax/orderinfo?orderid='+order_id,
        //   method: 'GET',
        //   // header: {}, // 设置请求的 header
        //   success: function(res){
        //     console.log(res);
        //   }
        // })

        wx.setNavigationBarTitle({
            title: '订单详情'
        })
    }
})