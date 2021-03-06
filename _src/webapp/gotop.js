
/**
 * @file
 * @name Gotop
 * @desc 提供一个快速回到页面顶部的按钮
 * @import core/zepto.extend.js, core/zepto.ui.js,core/zepto.fix.js
 */
(function($, undefined) {
    /**
     * @name     $.ui.gotop
     * @grammar  $(el).gotop(options) ⇒ self
     * @grammar  $.ui.gotop([el [,options]]) =>instance
     * @desc **el**
     * css选择器, 或者zepto对象
     * **Options**
     * - ''container'' {selector}: (可选，默认：body) 组件容器
     * - ''iScrollInstance'' {Object}: (可选) 使用iscroll时需要传入iScroll实例，用来判定显示与隐藏
     * **Demo**
     * <codepreview href="../gmu/_examples/webapp/gotop/gotop.html">
     * ../gmu/_examples/webapp/gotop/gotop.html
     * ../gmu/_examples/webapp/gotop/gotop_demo.css
     * </codepreview>
     */
    $.ui.define('gotop', {
        _data: {
            container:          '',
            useFix:             true,
            position:           {bottom: 10, right: 10},
        	afterScroll:        null,
            iScrollInstance:    null,
            disablePlugin:      false,
            _isShow:            false
        },

        _create: function() {
            var me = this;
            (me.root() || me.root($('<div></div>'))).addClass('ui-gotop').append('<div></div>').appendTo(me.data('container') || (me.root().parent().length ? '' : document.body));
            return me;
        },

        _setup: function(mode) {
            var me = this;
            me._create();
            return me;
        },

        _init: function() {
            var me = this,
                root = me.root(),
                _eventHandler = $.proxy(me._eventHandler, me);
            $(document).on('touchmove touchend touchcancel scrollStop', _eventHandler);
            $(window).on('scroll ortchange', _eventHandler);
            root.on('click', _eventHandler);
            me.on('destroy', function() {
                $(document).off('touchmove touchend touchcancel scrollStop', _eventHandler);
                $(window).off('scroll ortchange', _eventHandler);
            });
            me.data('useFix') && root.fix(me.data('position'));
            me.data('root', root[0]);
            return me;
        },

        /**
         * 事件处理中心
         */
        _eventHandler: function(e) {
            var me = this;
            switch (e.type) {
                case 'touchmove':
                    me.hide();
                    clearTimeout(me.data('_TID'));
                    me.data('_TID', $.later(function(){
                        me._check.call(me);
                    }, 300));
                    break;
                case 'scroll':
                    clearTimeout(me.data('_TID'));
                    break;
                case 'touchend':
                case 'touchcancel':
                    clearTimeout(me.data('_TID'));
                    me.data('_TID', $.later(function(){
                        me._check.call(me);
                    }, 300));
                    break;
                case 'scrollStop':
                case 'mousewheel':
                    me._check();
                    break;
                case 'ortchange':
                    me._check.call(me);
                    break;
                case 'click':
                    me._scrollTo();
                    break;
            }
        },

        /**
         * 判断是否显示gotop
         */
        _check: function(position) {
            var me = this;
            (position !== undefined ? position : window.pageYOffset) > document.documentElement.clientHeight ? me.show() : me.hide();
            return  me;
        },

		/**
         * 滚动到顶部或指定节点位置
         */
		_scrollTo: function() {
            var me = this;
            clearTimeout(me.data('_TID'));
            me.hide();
            window.scrollTo(0, 0);
            me.trigger('afterScroll');
            return me;
		},

        /**
         * @desc 显示gotop
         * @name show
         * @grammar show() => self
         *  @example
         * //setup mode
         * $('#gotop').gotop('show');
         *
         * //render mode
         * var demo = $.ui.gotop();
         * demo.show();
         */

        show: function() {
            var me = this;
            me.data('root').style.display = 'block'; //写style让浏览器repaint,不能用zepto方法
            me.data('_isShow', true);
            return me;
        },

        /**
         * @desc 隐藏gotop
         * @name hide
         * @grammar hide() => self
         * @example
         * //setup mode
         * $('#gotop').gotop('hide');
         *
         * //render mode
         * var demo = $.ui.gotop();
         * demo.hide();
         */
        hide: function() {
            var me = this;
            if(me.data('_isShow')) {
                me.data('root').style.display = 'none';
                me.data('_isShow', false);
            }
            return me;
        }
        /**
         * @name Trigger Events
         * @theme event
         * @desc 组件内部触发的事件
         * ^ 名称 ^ 处理函数参数 ^ 描述 ^
         * | init | event | 组件初始化的时候触发，不管是render模式还是setup模式都会触发 |
         * | afterScroll | event | 返回顶部后触发的事件 |
         * | destory | event | 组件在销毁的时候触发 |
         */
    });

})(Zepto);
