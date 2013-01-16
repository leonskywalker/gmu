/**
 * Created with JetBrains WebStorm.
 * User: Liuyang
 * Date: 13-1-15
 * Time: 下午7:02
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.ui.define('fortunewheel',{
        _$root:null,

        _data: {
            numDivides:6,
            draggable:true,
            openFunc:null,
            startFunc:null,
            result:null,
            resultID:null,
            noAnimation:false
        },

        _create:function(){

        },

        _setup:function(){

        },

        _init:function(){
            this._$root = this.root();
            this._start();
        },

        _start:function(){
            this._playWaitingAnimation();
            this._addInteractive();
            return this;
        },

        restart:function(){
            $('.prize>*',this._$root).hide();
            return this._start();
        },

        _playWaitingAnimation:function(){
            //TODO:现在没有等待动画
            return this;
        },

        _addInteractive:function(){
            var _self = this;

            $('.button',this._$root).on('click',function(event){
                _self._playOpenAnimation();
            });
        },

        _removeInteractive:function(){
            $('.button',this._$root).off('click');
        },

        _playOpenAnimation:function(){

            var self= this;

            var $wheel = $(".wheel-body",this._$root);

            var resultID = this.data("resultID") || 1;

            $wheel.animate({
                rotateZ:(360*(this.data("numDivides")-1) + (360/this.data("numDivides"))*resultID)+ "deg"
            },5000,"ease",function(){
                self._playPrizeAnimation(200);
                $wheel.css({
                    "-webkit-transform":"rotateZ("+360/self.data("numDivides")*resultID+"deg)"
                })
            });



            this._removeInteractive();
            //TODO:按钮变灰

            return this;
        },

    _playPrizeAnimation:function (delay) {

        //没有动画
        if(this.data("noAnimation")){
            var $prize = $('.prize', this._$root);
            $prize.append($(this.data("result")).show());
            $prize.css({
                "marginLeft":-$(this.data("result"))[0].offsetWidth / 2 + "px",
                "marginTop":-$(this.data("result"))[0].offsetHeight / 2 + "px",
                "top":180
            });

            return;
        }

        //有动画
        var self = this;
        var delay = (delay === undefined)? 1200:delay;
        $.later(function () {
            if($.isFunction(self._data.openFunc)) {
                self._data.openFunc.call(null);
            }


            var $prize = $('.prize', self._$root);
            $prize.append($(self.data("result")).show());


            $prize.css({
                "marginLeft":-$(self.data("result"))[0].offsetWidth / 2 + "px",
                "marginTop":-$(self.data("result"))[0].offsetHeight / 2 + "px",
                //TODO:确定中心点
                "-webkit-transform-origin":"center" + " " + 0 + "px",
                "-webkit-transform":"scale(0.1,0.1)"

            }).hide();

            $prize.show().animate({
                "scale":"1,1",
                "top":180
            }, 280, "ease-out");
        }, delay);
    }

    });
})(Zepto);