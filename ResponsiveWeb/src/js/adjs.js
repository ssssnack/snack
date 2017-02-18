/**
 * Created by zzzz on 2016/10/10.
 */

window.onload=function(){
    var container=document.getElementById('container');
    var list=document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var index=1;
    var timer;
    list.style.left="0px";
    function animate(offset){
        var newleft= parseInt(list.style.left) +offset;
        var time=100;//位移总时间；
        var interval=5;//位移间隔时间；
        var speed = offset /(time/interval);//每次位移量
        function go(){
            if(speed<0&& parseInt(list.style.left)>newleft||speed>0&&parseInt(list.style.left)<newleft  ){list.style.left = parseInt(list.style.left) + speed + 'px';
            setTimeout(go,interval);
            }
            else{
                if(newleft< -1500){
                    list.style.left= 0 +"px";
                }
                if(newleft >0){
                    list.style.left= -1500 +"px";
                }
            }
        }
        go();

       /* list.style.left = parseInt(list.style.left) +offset + 'px';*/
       /* if(newleft< -1500){
            list.style.left= 0 +"px";
        }
        if(newleft >0){
            list.style.left= -1500 +"px";
        }*/
    }
    function showbutton(offset){
        index=index+offset;
        if(index>4){
            index=1;
        }
        if(index<1){
            index=4;
        }
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className=="on"){
                buttons[i].className=" ";
                break;
            }
        }
        buttons[index-1].className="on";


    }
    right.onclick = function(){
        animate(-500);
        showbutton(1);
    }
    left.onclick = function(){
        animate(500);
        showbutton(-1);
    }
    for(var i =0;i<buttons.length;i++){
        if(this.className=="on"){
            return;
        }
        buttons[i].onclick=function(){
            var myIndex= parseInt(this.getAttribute("index"));
            var offset = -500*(myIndex- index);
            animate(offset);
            index = myIndex;
            showbutton(0);
        }

    }

    function play(){
        timer = setInterval(function(){
            right.onclick();
        },3000)
    }
    function stop(){
        clearInterval(timer);
    }
    container.onmouseover = stop;
    container.onmouseout = play;

    play();
}
