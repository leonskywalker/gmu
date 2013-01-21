module("box", {
    setup: function(){
        $("body").append('<div id="luckchest"></div>');

    },
    teardown: function(){
        $("#luckchest").remove();
        $('#prize_1').remove();
    }

});

var animationDuration = 1300;

test("create方式创建 & 参数默认",function(){
    stop();

    expect(22);
    ua.loadcss(["luckydraw/box/box.css"], function(){
        var luckchest = $.ui.luckydrawbox("#luckchest",{});

        ok(ua.isShown(luckchest._el[0]), "组件显示");
        equals(luckchest._el.attr("id"), "luckchest", "The el is right");
        
        equals(luckchest._data.numChests, 3, "默认参数numChests正确");
        equals(luckchest._data.result, null, "默认参数result正确");
        equals(luckchest._data.startFunc, null, "默认参数startFunc正确");
        equals(luckchest._data.openFunc, null, "默认参数openFunc正确");
        equals(luckchest._data.noAnimation, false, "默认参数noAnimation正确");
        
        equals(luckchest._el.find('.prize').length, 1, "dom 渲染正确");
        ok(!ua.isShown(luckchest._el.find('.prize')[0]), "dom 渲染正确");
        equals(luckchest._el.find('.chest').length, 3, "dom 渲染正确");
        equals(luckchest._el.find('.chest')[0].childNodes[0].className, "chest-top", "dom 渲染正确");
        ok(ua.isShown(luckchest._el.find('.chest')[0].childNodes[0]), "dom 渲染正确");
        equals(luckchest._el.find('.chest')[0].childNodes[1].className, "chest-opened-top", "dom 渲染正确");
        ok(!ua.isShown(luckchest._el.find('.chest')[0].childNodes[1]), "dom 渲染正确");
        equals(luckchest._el.find('.chest')[0].childNodes[2].className, "key", "dom 渲染正确");
        ok(!ua.isShown(luckchest._el.find('.chest')[0].childNodes[2]), "dom 渲染正确");
        equals(luckchest._el.find('.chest')[0].childNodes[3].className, "glow", "dom 渲染正确");
        ok(!ua.isShown(luckchest._el.find('.chest')[0].childNodes[3]), "dom 渲染正确");
        equals(luckchest._el.find('.chest')[0].childNodes[4].className, "chest-bottom", "dom渲染正确");
        ok(ua.isShown(luckchest._el.find('.chest')[0].childNodes[4]), "dom 渲染正确");

        equals(luckchest._el.find('.chest').length,3,"默认创建3个箱子");
        equals(luckchest._el.find('.chest-top').css("-webkit-animation-play-state"),"running","自动播放动画");
        start();
    });
});

test("setup方式创建",function(){
    stop();
    expect(22);

    var prize = $('<div class="prize animate"></div>');
    $('#luckchest').append(prize);
    var chest;
    for(var i = 0;i<4;i++){
        chest = ($(
            '<div class="chest animate">'+
                '<div class="chest-top">'+
                '</div>'+
                '<div class="chest-opened-top">'+
                '</div>'+
                '<div class="key">'+
                '</div>'+
                '<div class="glow">'+
                '</div>'+
                '<div class="chest-bottom">'+
                '</div>'+
                '</div>'));
        $('#luckchest').append(chest);
    }
    var luckchest = $("#luckchest").luckydrawbox({}).luckydrawbox("this");
    
    ok(ua.isShown(luckchest._el[0]), "组件显示");
    equals(luckchest._el.attr("id"), "luckchest", "The el is right");
    
    equals(luckchest._data.numChests, 4, "默认参数正确");
    equals(luckchest._data.result, null, "默认参数正确");
    equals(luckchest._data.startFunc, null, "默认参数正确");
    equals(luckchest._data.openFunc, null, "默认参数正确");
    equals(luckchest._data.noAnimation, false, "默认参数正确");
    
    equals(luckchest._el.find('.prize').length, 1, "dom 渲染正确");
    ok(!ua.isShown(luckchest._el.find('.prize')[0]), "dom 渲染正确");
    equals(luckchest._el.find('.chest').length, 4, "dom 渲染正确");
    equals(luckchest._el.find('.chest')[0].childNodes[0].className, "chest-top", "dom 渲染正确");
    ok(ua.isShown(luckchest._el.find('.chest')[0].childNodes[0]), "dom 渲染正确");
    equals(luckchest._el.find('.chest')[0].childNodes[1].className, "chest-opened-top", "dom 渲染正确");
    ok(!ua.isShown(luckchest._el.find('.chest')[0].childNodes[1]), "dom 渲染正确");
    equals(luckchest._el.find('.chest')[0].childNodes[2].className, "key", "dom 渲染正确");
    ok(!ua.isShown(luckchest._el.find('.chest')[0].childNodes[2]), "dom 渲染正确");
    equals(luckchest._el.find('.chest')[0].childNodes[3].className, "glow", "dom 渲染正确");
    ok(!ua.isShown(luckchest._el.find('.chest')[0].childNodes[3]), "dom 渲染正确");
    equals(luckchest._el.find('.chest')[0].childNodes[4].className, "chest-bottom", "dom渲染正确");
    ok(ua.isShown(luckchest._el.find('.chest')[0].childNodes[4]), "dom 渲染正确");

    equals(luckchest._el.find('.chest').length,4,"默认创建3个箱子");
    equals(luckchest._el.find('.chest-top').css("-webkit-animation-play-state"),"running","自动播放动画");
    
    start();
});

test("初始化参数:numChests",function(){
        stop();
        expect(2);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            numChests:5
        });

        equals(luckchest._data.numChests, 5, "创建5个箱子");
        equals(luckchest._el.find('.chest').length,5,"创建5个箱子");
        start();
    }
);

test("初始化参数:noAnimation",function(){
        stop();
        expect(2);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            noAnimation:true
        });

        equals(luckchest._data.noAnimation, true, "不播放动画");
        notEqual(luckchest._el.find('.chest-top').css("-webkit-animation-play-state"),"running","不播放动画");
        start();
    }
);

test("初始化参数:startFunc",function(){
        stop();
        expect(2);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            startFunc:function(chest){
                ok(true,"调用了startFunc");
                equals(chest[0], luckchest._el.find(".chest")[1]);
            }
        });

        ua.click(luckchest._el.find(".chest")[1]);
        start();
    }
);

test("初始化参数:openFunc在未设置result情况下不调用",function(){
        stop();
        expect(3);
        $("body").append('<div id="prize_1">你中奖了!</div>');
        
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            openFunc:function(){
                ok(false,"错误！调用了openFunc");
            }
        });

        ua.click(luckchest._el.find(".chest")[1]);
        $.later(function(){
        	equals(luckchest._el.find('.chest')[1].className, "chest animate opening", "显示开奖动画");
        	ok(!ua.isShown(luckchest._el.find('.prize')[0]), "不显示中奖信息");
         	equals(luckchest._el.find('.prize').children().length, 0, "不显示中奖信息");
        	start();
        },animationDuration);
    }
);

test("初始化参数:openFunc在设置result情况下调用",function(){
        stop();

        $("body").append('<div id="prize_1">你中奖了!</div>');

        expect(4);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            openFunc:function(){
            	ok(true,"调用了openFunc");
            },
            result:"#prize_1"
        });

        ua.click(luckchest._el.find(".chest")[1]);
        $.later(function(){
        	equals(luckchest._el.find('.chest')[1].className, "chest animate opening", "显示开奖动画");
        	ok(ua.isShown(luckchest._el.find('.prize')[0]), "显示中奖信息");
         	equals(luckchest._el.find('.prize').children().attr("id"), "prize_1", "显示中奖信息");
        	start();
        },animationDuration);
    }
);

test("接口:setResult只设置result",function(){
        stop();

        $("body").append('<div id="prize_1">prize</div>');

        expect(6);
        
        var count = 0;
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            startFunc: function(){
            	count ++;
            	equals(count, 2, "用户点击后再开奖");
                ok(true,"调用startFunc");
            },
            openFunc:function(){
            	ok(true,"调用了openFunc");
            }
        });

        luckchest.setResult("#prize_1");

        $.later(function(){
        	count ++;
            ua.click(luckchest._el.find(".chest")[1]);
            $.later(function(){
            	equals(luckchest._el.find('.chest')[1].className, "chest animate opening", "显示开奖动画");
            	ok(ua.isShown(luckchest._el.find('.prize')[0]), "显示中奖信息");
             	equals(luckchest._el.find('.prize').children().attr("id"), "prize_1", "显示中奖信息");
            	start();
            },animationDuration);
        },200);

    }
);

test("接口:setResult设置result和id",function(){
        stop();

        $("body").append('<div id="prize_1">prize</div>');

        expect(6);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            startFunc: function(chest){
                ok(true,"直接开奖，调用startFunc");
                equals(chest[0], luckchest._el.find(".chest")[1]);
            },
            openFunc:function(){
                ok(true,"调用了openFunc");
            }
        });

        luckchest.setResult("#prize_1",1);
        
        $.later(function(){
        	equals(luckchest._el.find('.chest')[1].className, "chest animate opening", "显示开奖动画");
        	ok(ua.isShown(luckchest._el.find('.prize')[0]), "显示中奖信息");
         	equals(luckchest._el.find('.prize').children().attr("id"), "prize_1", "显示中奖信息");
        	start();
        },animationDuration);
    }
);

test("接口:setResult(result配置项也设置)",function(){
    stop();

    $("body").append('<div id="prize_1">prize</div>');
    $("body").append('<div id="prize_2">prize2</div>');

    expect(3);

    var luckchest = $.ui.luckydrawbox("#luckchest",{
    	result: "#prize_2",
        startFunc: function(){
            ok(true,"调用startFunc");
        },
        openFunc:function(){
        	ok(true,"调用了openFunc");
        }
    });

    luckchest.setResult("#prize_1");
    ua.click(luckchest._el.find(".chest")[1]);
    $.later(function(){
     	equals(luckchest._el.find('.prize').children().attr("id"), "prize_1", "显示中奖信息");
    	start();
    },animationDuration);
}
);

test("接口:restart",function(){
        stop();

        $("body").append('<div id="prize_1">prize</div>');

        expect(6);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            result:"#prize_1"
        });

        ok(!ua.isShown(luckchest.root().find('.prize')[0]),"点击前，奖品不显示");

        ua.click(luckchest.root().find('.chest')[1]);

        $.later(function(){
            ok(ua.isShown(luckchest.root().find('.prize')[0]),"点击后，奖品1.2秒后显示");

            luckchest.restart();

            equals(luckchest._el.find('.chest')[1].className, "chest animate waiting", "显示等待动画");
            ok(!ua.isShown(luckchest.root().find('.prize')[0]),"restart，奖品不显示");

            ua.click(luckchest.root().find('.chest')[1]);

            $.later(function(){
            	equals(luckchest._el.find('.chest')[1].className, "chest animate opening", "显示开奖动画");
                ok(ua.isShown(luckchest.root().find('.prize')[0]),"再次点击后，奖品1.2秒后显示");
                start();
            },animationDuration);
        },animationDuration);

    }
);

test("交互：设置result后，点击宝箱",function(){
        stop();

        $("body").append('<div id="prize_1">prize</div>');

        expect(2);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            result:"#prize_1"
        });

        ok(!ua.isShown(luckchest._el.find('.prize')),"点击前，奖品不显示");

        ua.click(luckchest._el.find(".chest")[1]);

        $.later(function(){
            ok(ua.isShown(luckchest._el.find('.prize')[0]),"点击后，奖品1.2秒后显示");
            start();
        },animationDuration);

    }
);

test("交互：未设置result，点击宝箱，等待setResult",function(){
        stop();

        $("body").append('<div id="prize_1">prize</div>');

        expect(3);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
        });

        ok(!ua.isShown(luckchest._el.find('.prize')),"点击前，奖品不显示");

        ua.click(luckchest._el.find(".chest")[1]);

        $.later(function(){
            ok(!ua.isShown(luckchest._el.find('.prize')[0]),"点击后，奖品不显示");

            luckchest.setResult("#prize_1");

            $.later(function(){
                ok(ua.isShown(luckchest._el.find('.prize')[0]),"设置result后，奖品才显示");

                start();

            },200);


        },animationDuration);

    }
);

test("多实例",function(){
    stop();
    expect(4);
    $("body").append('<div id="luckchest1"></div>');
    
    var luckchest = $.ui.luckydrawbox("#luckchest",{});
    
    var luckchest1 = $.ui.luckydrawbox("#luckchest1",{});

    ok(ua.isShown(luckchest._el[0]), "组件显示");
    equals(luckchest._el.attr("id"), "luckchest", "The el is right");
    
    ok(ua.isShown(luckchest1._el[0]), "组件显示");
    equals(luckchest1._el.attr("id"), "luckchest1", "The el is right");
    
    $("#luckchest1").remove();
    start();
}
);