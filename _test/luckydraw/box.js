module("box", {
    setup: function(){
        $("body").append('<div id="luckchest""></div>');

    },
    teardown: function(){
        $("#luckchest").remove();
        $('#prize_1').remove();
    }

});


test("create方式创建 & 参数默认",function(){
    stop();

    expect(4);
    ua.loadcss(["luckydraw/box.css"], function(){
        var luckchest = $.ui.luckydrawbox("#luckchest",{});

        ok(ua.isShown(luckchest._el[0]), "组件显示");
        equals(luckchest._el.attr("id"), "luckchest", "The el is right");

        equals($('#luckchest .chest').length,3,"默认创建3个箱子");
        equals($('#luckchest .chest-top').css("-webkit-animation-play-state"),"running","自动播放动画");
        start();
    });
});

test("setup方式创建",function(){
    stop();

    expect(4);

    var prize = $('<div class="prize animate"></div>');
    $('#luckchest').append(prize);
    var chest;
    for(var i= 0;i<3;i++){
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
        $('#luckchest').append(chest);
    }
        var luckchest = $("#luckchest").luckydrawbox({}).luckydrawbox("this");

        ok(ua.isShown(luckchest._el[0]), "组件显示");
        equals(luckchest._el.attr("id"), "luckchest", "The el is right");

        equals($('#luckchest .chest').length,3,"默认创建3个箱子");
        equals($('#luckchest .chest-top').css("-webkit-animation-play-state"),"running","自动播放动画");



    start();
});


test("初始化参数:numChests",function(){
        stop();
        expect(1);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            numChests:5
        });

        equals($('#luckchest .chest').length,5,"创建5个箱子");
        start();
    }
);

test("初始化参数:noAnimation",function(){
        stop();
        expect(1);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            noAnimation:true
        });

        notEqual($('#luckchest .chest-top').css("-webkit-animation-play-state"),"running","不播放动画");
        start();
    }
);

test("初始化参数:startFunc",function(){
        stop();
        expect(2);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            startFunc:function(chest){
                ok(true,"调用了startFunc");
                equals(chest[0], $(".chest")[1]);
            }
        });

        ua.click($(".chest")[1]);
        start();
    }
);

test("初始化参数:openFunc在未设置prize情况下不调用",function(){
        stop();
        expect(1);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            openFunc:function(){
                ok(false,"错误！调用了openFunc");
            }
        });

        ua.click($(".chest")[1]);
        ok(true,"点击了宝箱,1.2秒后开奖");
        $.later(start,1300);
    }
);

test("初始化参数:openFunc在设置result情况下调用",function(){
        stop();

        $("body").append('<div id="prize_1"></div>');

        expect(2);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            openFunc:function(){
                ok(true,"调用了openFunc");
            },
            result:"#prize_1"
        });

        ua.click($(".chest")[1]);
        ok(true,"点击了宝箱,1.2秒后开奖");
        $.later(start,1300);
    }
);

test("接口:setResult只设置result",function(){
        stop();

        $("body").append('<div id="prize_1"></div>');

        expect(2);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            startFunc: function(){
                ok(true,"用户点击后再开奖，不直接调用startFunc");
                start();
            }
        });

        luckchest.setResult("#prize_1");

        $.later(function(){
            ok(true,"用户点击前没有开奖");
            ua.click($(".chest")[1]);
        },200);

    }
);

test("接口:setResult设置result和id",function(){
        stop();

        $("body").append('<div id="prize_1"></div>');

        expect(3);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            startFunc: function(chest){
                ok(true,"直接开奖，调用startFunc");
                equals(chest[0], $(".chest")[1]);
            },
            openFunc:function(){
                ok(true,"调用了openFunc");
                $.later(start);
            }
        });

        luckchest.setResult("#prize_1",1);
    }
);

test("接口:restart",function(){
        stop();

        $("body").append('<div id="prize_1">prize</div>');

        expect(6);
        var luckchest = $.ui.luckydrawbox("#luckchest",{
            result:"#prize_1"
        });

        ok(!ua.isShown($('.prize')),"点击前，奖品不显示");
        equals($('#luckchest .chest-top').css("-webkit-animation-play-state"),"running","播放动画");

        ua.click($(".chest")[1]);

        $.later(function(){
           ok(ua.isShown($('.prize')[0]),"点击后，奖品1.2秒后显示");
           notEqual($('#luckchest .chest-top').css("-webkit-animation-play-state"),"running","奖品显示后不播放动画");

            luckchest.restart();

            ok(!ua.isShown($('.prize')),"restart，奖品不显示");
            equals($('#luckchest .chest-top').css("-webkit-animation-play-state"),"running","播放动画");

            start();
        },1300);

    }
);