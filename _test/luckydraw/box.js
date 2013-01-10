module("box", {
    setup: function(){
        $("body").append('<div class="luckchest""></div>');

        //console.log("setup");
    },
    teardown: function(){
        $("div.luckchest").remove();
//        lineChart = null;
        //console.log("teardown");
        //console.log("==========================");
    }

});


test("create方式创建 & 参数默认",function(){
    stop();

    ua.loadcss(["luckydraw/box.css"], function(){
        var luckchest= $.ui.luckydrawbox("div.luckchest",{
            "openFunc":sendToSerever
        });
    });
});
