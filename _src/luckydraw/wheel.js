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
            noAnimation:false,
            rotationTime:6000,
            prizeDelay:500
        },

        _create:function(){
            var prize = $('<div class="prize"></div>');
            this.root().append(prize);
            var wheel = $(
                '<div class="wheel">'+
                    '<div class="wheel-ring"></div>'+
                    '<div class="wheel-body"></div>'+
                    '<div class="wheel-pointer"></div>'+
                    '<div class="wheel-button"></div>'+
                '</div>'
            );
            this.root().append(wheel);
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

        setResult:function(result, id, startImmediately){
            /*

            var shouldPlay = false;

            if(!this.data("result") && this._clickedChest){
                shouldPlay = true;
            }

            this._data.result = result;
            if(id && this._chests[id]){
                this._playOpenAnimation($(this._chests[id]));
            }else if(shouldPlay){
                this._playPrizeAnimation(this._clickedChest,0);
            }
            */

            this._data.result = result;
            this._data.resultID = id;

            if(startImmediately){
                this._playOpenAnimation();
            }

            return this;
        },

        _playWaitingAnimation:function(){
            $(".wheel-body",this._$root).animate({
                "rotateZ":"0deg"
            },{
                duration:1000,
                easing:"ease"
            });
            return this;
        },

        _addInteractive:function(){
            var _self = this;

            $('.wheel-button',this._$root).on('click',function(event){
                _self._playOpenAnimation();
            }).removeClass("disabled");
        },

        _removeInteractive:function(){
            $('.wheel-button',this._$root).off('click').addClass("disabled");

        },

        _playOpenAnimation:function(){

            var self= this;

            var $wheel = $(".wheel-body",this._$root);

            var resultID = this.data("resultID");


            if(this.data("noAnimation")){
                self._playPrizeAnimation(self.data("prizeDelay"));
                $wheel.css({
                    "-webkit-transform":"rotateZ("+360/self.data("numDivides")*resultID+"deg)"
                });
            }else{
                $wheel.animate({
                    rotateZ:(360*4 + (360/this.data("numDivides"))*resultID)+ "deg"
                },{
                    duration:this.data("rotationTime"),
                    easing:   "ease",
                    queue:false,
                    complete:function(){
                        self._playPrizeAnimation(self.data("prizeDelay"));
                        $wheel.css({
                            "-webkit-transform":"rotateZ("+360/self.data("numDivides")*resultID+"deg)"
                        });
                    }
                });
            }


            this._removeInteractive();

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