/**
 * @file luckchest.js
 * @name LuckChest
 * @desc 宝箱抽奖
 * @import core/zepto.js, core/zepto$core.js, core/zepto$ui.js, core/zepto$fx.js
 */

(function($){
    $.ui.define('luckydrawbox',{

        _chests:null,
        _$root:null,

        _data: {
            numChests:3,
            openFunc:null,
            startFunc:null,
            result:null,
            noAnimation:false
        },

        _create:function(){
            if(this.data("noAnimation")){
                var prize = $('<div class="prize still"></div>');
                this.root().append(prize);
                var chest;
                for(var i= 0;i<this.data("numChests");i++){
                    chest = ($(
                        '<div class="chest still">'+
                         '</div>'));
                    this.root().append(chest);
                    //TODO:多次append优化
                }

            }else if(!this.data("noAnimation")){
                var prize = $('<div class="prize animate"></div>');
                this.root().append(prize);
                var chest;
                for(var i= 0;i<this.data("numChests");i++){
                    chest = ($(
                        '<div class="chest animate">'+
                        '<div class="chest-top">'+
                        '</div>'+
                        '<div class="chest-opened-top">'+
                        ' </div>'+
                        '<div class="key">'+
                        '</div>'+
                        '<div class="glow">'+
                        '</div>'+
                        ' <div class="chest-bottom">'+
                        ' </div>'+
                        '</div>'));
                    this.root().append(chest);
                    //TODO:多次append优化
                }

            }
            console.log("create");
        },

        _setup:function(fullMode){
            console.log("setup");
        },

        _init:function(){
            this._$root = this.root();
            this._chests = $('div.chest',this._$root);
            this._start();
        },

        _start:function(){
            this._playWaitingAnimation();
            this._addInteractive();
            return this;
        },

        setResult:function(result,id){
            this._data.result = result;
            if(id && this._chests[id]){
                this._playOpenAnimation($(this._chests[id]));
            }
            return this;
        },

        restart:function(){
            $('.prize>*',this._$root).hide();
            return this._start();
        },

        _playWaitingAnimation:function($chest){
            if(!$chest){
                this._chests.removeClass('opening').removeClass("end").addClass('waiting');
            }else{
                $chest.removeClass('opening').removeClass("end").addClass('waiting');
            }
            return this;
        },

         _playOpenAnimation:function($chest){
            var _self = this;

            if($.isFunction(this._data.startFunc)) {
                this._data.startFunc.call(null,$chest);
            }
            this._chests.removeClass('waiting').removeClass("end").addClass('idle');
            this._removeInteractive();

            //箱子
            $chest.removeClass('idle').addClass('opening');


            if(this.data("result")){
                if(this.data("noAnimation")){
                    var $prize = $('.prize', this._$root);
                    $prize.append($(this.data("result")).show());
                    $prize.css({
                        "marginLeft":-$(this.data("result"))[0].offsetWidth / 2 + "px",
                        "marginTop":-$(this.data("result"))[0].offsetHeight / 2 + "px",
                        "top":180
                    });
                }else{
                    this._playPrizeAnimation($chest);
                }
            }else{
                   //TODO:wait for setResult
            }
            //Android2.x不支持animation-fill-mode，需要对结束状态单独处理
            if($.os.android && ($.os.version[0] == "2" || !$.os.version)){
                $('.key',$chest).on('webkitAnimationEnd', _self._animationEndListener);
            }

            return this;
        },

        _playPrizeAnimation:function ($chest) {
            $.later((function () {
                if($.isFunction(this._data.openFunc)) {
                    this._data.openFunc.call(null);
                }


                var $prize = $('.prize', this._$root);
                $prize.append($(this.data("result")).show());


                $prize.css({
                    "marginLeft":-$(this.data("result"))[0].offsetWidth / 2 + "px",
                    "marginTop":-$(this.data("result"))[0].offsetHeight / 2 + "px",
                    "-webkit-transform-origin":"center" + " " + $chest[0].offsetTop + "px",
                    "-webkit-transform":"scale(0.1,0.1)"

                }).hide();

                $prize.show().animate({
                    "scale":"1,1",
                    "top":180
                }, 280, "ease-out");
            }).bind(this), 1200);
        },

        _animationEndListener:function(event){
            //console.log('end');
            $(event.currentTarget).closest('.chest').removeClass('opening').addClass('end');
            $(event.currentTarget).off('animationend');
        },

        _addInteractive:function(){
            var _self = this;

            this._chests.on('click',function(event){
                _self._playOpenAnimation($(event.currentTarget));
            });
        },

        _removeInteractive:function(){
            this._chests.off('click');
        }

    });
})(Zepto);