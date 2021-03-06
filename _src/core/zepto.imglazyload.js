/**
 *  @file
 *  @name imglazyload
 *  @desc 图片延迟加载
 *  @import core/zepto.extend.js
 */
(function ($) {
    /**
     * @name imglazyload
     * @grammar  imglazyload(opts)   ⇒ self
     * @desc 图片延迟加载
     * **Options**
     * - ''placeHolder''     {String}:              (可选, 默认值:\'\')图片显示前的占位符
     * - ''container''       {Array|Selector}:      (可选, 默认值:window)图片延迟加载容器
     * - ''threshold''       {Array|Selector}:      (可选, 默认值:0)阀值，为正值则提前加载
     * - ''dataName''        {String}:             (可选, 默认值:data-url)图片url名称
     * - ''eventName''        {String}:             (可选, 默认值:scrollStop)绑定事件方式
     *
     * **events**
     * - ''startload'' 开始加载图片
     * - ''loadcomplete'' 加载完成
     * - ''error'' 加载失败
     *
     * @example $('.lazy-load').imglazyload();
     * $('.lazy-load').imglazyload().on('error', function (e) {
     *     e.preventDefault();      //该图片不再加载
     * });
     */
    $.fn.imglazyload = function (opts) {
        var pedding = $.slice(this),
            loading = [],
            splice = Array.prototype.splice,
            opts = $.extend({
                threshold:0,
                container:window,
                urlName:'data-url',
                placeHolder:'',
                eventName:'scrollStop'
            }, opts),
            $container = $(opts.container),
            cTop = $container.scrollTop(),
            cHeight = $container.height(),
            detect = {
                init:function (top, height) {    //初始条件
                    return cTop >= top - opts.threshold - cHeight && cTop <= top + height + cHeight;
                },
                default:function (top, height) {      //每次滚动时发生变化，滚动条件
                    var cTop = $container.scrollTop(),
                        cHeight = $container.height();
                    return cTop >= top - opts.threshold - cHeight && cTop <= top + height + cHeight;
                }
            };

        function _load(div) {
            var $div = $(div), $img;
            $div.trigger('startload');
            $img = $('<img />').on('load',function () {
                $div.trigger('loadcomplete').replaceWith($img);
                $img.off('load');
            }).on('error',function () {     //图片加载失败处理
                    var errorEvent = $.Event('error');       //派生错误处理的事件
                    $div.trigger(errorEvent);
                    errorEvent.defaultPrevented || pedding.push(div);
                    $img.off('error').remove();
                }).attr('src', $div.attr(opts.urlName));
        }

        function _detect(type) {
            var i, $image, offset, div;
            for (i = pedding.length; i--;) {
                $image = $(div = pedding[i]);
                offset = $image.offset();
                detect[type || 'default'](offset.top, offset.height) && (loading.concat(splice.call(pedding, i, 1)), _load(div));
            }
        }

        $(document).ready(function () {
            opts.placeHolder && $(pedding).append(opts.placeHolder);     //初化时将placeHolder存入
            _detect('init');
        });

        (opts.container === window ? $(document) : $container).on(opts.eventName || 'scrollStop', function () {
            _detect();
        });

        return this;
    };
})(Zepto);
