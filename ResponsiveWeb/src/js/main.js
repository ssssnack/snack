/**
 * Created by zzzz on 2016/9/21.
 */
/*让页面完成渲染*/
window.onload=function() {
    /*获取元素*/
    var ad = document.getElementById("ad");
    var list = document.getElementById("aditem");
    var img = document.getElementById("aditem").getElementsByTagName("img");
    var butttons = document.getElementById("adbuttons").getElementsByTagName("span");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var wtf =document.getElementById("wtf");
    var sonheight=wtf.offsetHeight;
    var index =0;
    var animated=false;
    var timer;
    ad.style.height=sonheight + "px";
    /*实现*/
    list.style.left = 0;
    function animate(offset){
        animated=true;
        var newLeft=parseInt(list.style.left)+offset;
        var time =200;
        var interval =10;
        var speed =offset/(time/interval);
         function go(){
             if(speed<0 &&parseInt(list.style.left)>newLeft||speed>0 &&parseInt(list.style.left)<newLeft  ){
                 list.style.left=parseInt(list.style.left)+speed+"%";
                 setTimeout(go,interval);/*定时器，10毫秒后运行go函数*/
             }
             else{
                 animated=false;
                 /*list.style.left=parseInt(list.style.left)+offset+"%";*/
                 if(newLeft<-200){
                     list.style.left=0;
                 }

                 if(newLeft>0){
                     list.style.left=-200+"%";
                 }
             }
         }

        go();
    }
    function showButton(offset){
        index=index+offset;
        if(index>2){
            index=0;
        }
        if(index<0){
            index=2;
        }
        for(var i=0;i<butttons.length;i++){
            if(butttons[i].className == "on"){
                butttons[i].className="";
                break;
            }
        }
        butttons[index].className="on";

    }
    function play(){
        /*setInterval 和setTimout 的区别就是前者可以一直去执行*/
        timer = setInterval(function(){
            right.onclick();
        },3000)

    }
    function stop(){
        clearInterval(timer);
    }
    function change(){
        var screenWidth=window.screen.width;
        if(screenWidth<800&&screenWidth>481){
              wtf.src="img/ad001-m.png";
            img[1].setAttribute("src","img/ad002-m.png");
        }
    }
    right.onclick=function(){
        if(!animated){ animate(-100);}
       /*animate(-100);*/
        showButton(1);
    }
    left.onclick=function(){
        if(!animated){animate(100);}
        showButton(-1);
    }
    /*按钮的点击切换代码*/
    for(var i=0;i<butttons.length;i++){
        if(this.className =="on"){
            return;

        }
        butttons[i].onclick=function(){
            var myIndex= parseInt(this.getAttribute("index"));
            var offset=-100*(myIndex-index-1);
            if(!animated){animate(offset);}
            index=myIndex-1;
            showButton(0);
        }
    }
    ad.onmouseover = stop;
    ad.onmouseout = play;

    play();
    change();
}

