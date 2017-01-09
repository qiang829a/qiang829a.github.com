var common = {
    clickNumber: 0,

    init: function () {
        this.isTrue($('.menu-sus .menu-icon')[0], function () {
            common.menuLayer();
        });
        this.hideLayer();
    },

    isTrue: function (bl, fn) {
        bl && fn && fn(this);
    },

    // 判断是否有效点击
    isMove: function (obg, fn) {
        bOk = true;

        $(obg).on('touchstart', function () {
            bOk = true;
        });

        $(document).on('touchmove', function () {
            bOk = false;
        });

        $(obg).on('touchend', function (ev) {
            if (!bOk) return true;
            fn(this, ev);
            ev.preventDefault();
            return true;
        });
    },

    // 隐藏弹框
    hideLayer: function(){
        var _This = this;
        this.isTrue($('.layer-box')[0],function(){
            _This.isMove($('.layer-box'),function(){
                $('.m-layer').removeClass('show').children().removeClass('show');
            });
        });

        $('.m-layer .layer-box').on('touchmove',function(ev){
            ev.preventDefault();
        });
    },

    // 倒计时
    countDown: function (t, json, b) {
        var ms = 99,
        m = s = 0;
        var timer = timer2 = null;
        if (t == 0) {
            json.callback && json.callback();
            return;
        }
        if (!b) {
            t--;
            m = parseInt(t / 60);
            s = t % 60;

            timer = setInterval(function () {
                t--;
                m = parseInt(t / 60);
                s = t % 60;
                if (t <= 0) {
                    clearInterval(timer);
                }
            }, 1000);
            timer2 = setInterval(function () {
                ms <= 0 && (ms = 99);
                ms -= 3;
                json.continued && json.continued(m, s, ms);
                if (t <= 0 && ms <= 0 && m <= 0) {
                    json.callback && json.callback(m, s, ms);
                    clearInterval(timer2);
                }
            }, 30);
        }
        else {
            var oDate = new Date(),
            oDate2 = new Date();
            oDate2.setSeconds(oDate.getSeconds() + t); //设置时间
           
            var oT2 = oDate2.getTime();
            timer = setInterval(function () 
            {
                oDate = new Date();
                var oT1 = oDate.getTime();
                var ms = oT2 - oT1;
                ms %= 1000;
                s = parseInt((oT2 - oT1) / 1000);
                m = parseInt(s / 60);
                s %= 60;

                if (s <= 0 && ms <= 0) {
                    ms = 0;
                }
                if (s <= -1 && m <= 0) {
                    ms = 0;
                    s = 0;
                    clearInterval(timer);
                    json.callback && json.callback(m, s, ('' + ms).substring(0, 2));
                    return false;
                }
                json.continued && json.continued(m, s, ('' + ms).substring(0, 2));
            }, 30);
        }
    },

    // 补零
    tuDou: function (iNum) {
        return iNum < 10 ? '0' + iNum : iNum;
    },

    // 触底检测
    loadMore: function (fn, calc) {
        window.onscroll = window.onresize = function () {
            if (!common.loadMore.b) return false;
            var oSHeight = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
            var oEleHeight = document.body.offsetHeight;
            if (oSHeight >= oEleHeight - (calc || 0)) {
                fn && fn();
                common.loadMore.b = false;
            }
        }
    },

    // 弹窗
    PopupText: function(stringText, autoClose)
    {
        $('.common_popup').detach();
        var popupHtml = '<div class="common_popup transform_popup">' +
        '<div class="common_popup_text"><p>' + stringText + '</p></div>' +
        '<div class="common_popup_bj"></div>' +
        '</div>';

        $("body").prepend(popupHtml);

        $(".common_popup_bj").on("touchstart touchend touchmove", function () {
            return false;
        });
        $(".common_popup_text").on("touchstart touchmove", function () {
            return false;
        });

        if (autoClose) {
            setTimeout(function () {
                $(".common_popup").detach();
            }, 2000);
        }
    },
    
    // loading
    loadingText: function (StringText,opacity) {
        var PopupHTML = '<div class="common_popup transform_popup">' +
                          '<div class="loading_popup_text" style="'+ (opacity ? 'background: rgba(0,0,0,0);' : '') +'">' +
                          '<img src="/images/'+ (opacity ? 'loading_img.gif' : 'loading_img.png') +'" class="loading_img '+ (opacity ? '' : 'rotateimg2') +'">' +
                          '<p style="'+ (opacity ? 'display:none;' : 'display:block;') +'">' + StringText + '</p>' +

                          '</div>' +
                          '<div class="common_popup_bj" style="'+ (opacity ? 'background: rgba(0,0,0,0);' : '') +'"></div>' +
                        '</div>';

        $('body').prepend(PopupHTML);

        $('.common_popup_bj').on('touchstart touchend touchmove', function () {
            return false;
        });
        $('.loading_popup_text').on('touchstart touchmove', function () {
            return false;
        });
    }
};

common.init();