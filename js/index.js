$(function(){
	var hang=20;
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var shiwu={};
	var timerId;
	var fangxiang=39;

	var zb2id=function(x,y){
		return x+'-'+y;
	}

	//画场景
	var huachangjing=function(){			
		var i=0,j=0,sence=$('#sence'),wh=Math.floor(600/hang);
		hang=hang||20;
		sence.empty();
		for(;i<hang;i++){
			for(j=0;j<hang;j++){
				$('<div>').addClass('block')
				.attr('id',zb2id(i,j))
				.width(wh-1)
				.height(wh-1)
				.appendTo('#sence');
			}
		}
		sence.width(wh.hang).height(wh*hang);
	}
	huachangjing();


    // 画蛇
    var huashe=function(){
    	she.forEach(function(v){
    		$('#'+zb2id(v.x,v.y)).addClass('she');
    	});
    }
    she=huashe();
	

    // 放食物
	var fangshiwu=function(){
		var _x=Math.floor(Math.random()*hang);
		var _y=Math.floor(Math.random()*hang);
		$('#'+zb2id(_x,_y)).addClass('shiwu');
		return{x:_x,y:_y};
	}
	shiwu=fangshiwu();


	// 移动
	var move=function(){
		var jiutou=she[she.length-1];
		if(fangxiang===39){
			var xintou={x:jiutou.x,y:jiutou.y+1};
		}else if(fangxiang===40){
			var xintou={x:jiutou.x+1,y:jiutou.y};
		}else if(fangxiang===37){
			var xintou={x:jiutou.x,y:jiutou.y-1};
		}else if(fangxiang===38){
			var xintou={x:jiutou.x-1,y:jiutou.y};
		} 

		/// 撞墙了
		if(xintou.x<0||xintou.x>hang-1||xintou.y<0||xintou.y>hang-1){
			clearInterval(timerId);
			return;
			// 吃食物
		}else if(xintou.x===shiwu.x&&xintou.y===shiwu.y){
			she.push(xintou);
			$('#'+zb2id(xintou.x,xintou.y)).addClass('she');
			$('.shiwu').removeClass('shiwu');
			shiwu=fangshiwu();
			// 没有吃到食物
		}else{
			she.push(xintou);
			var weiba=she.shift();			
			$('#'+zb2id(xintou.x,xintou.y)).addClass('she');
			$('#'+zb2id(weiba.x,weiba.y)).removeClass("she");
		}


		$(document).bind('keydown',function(e){
			if(e.keyCode<37||e.keyCode>40){
				return;
			}else{
				fangxiang=e.keyCode;
			}			
		})
	}
			



	// 点击选择行列
	$('ul li[data-row]').bind('click',function(){
		var row=Number($(this).attr('data-row'));
		$('.active').removeClass('active');
		hang=row;
		huachangjing(hang);
		$(this).addClass('active');
		she=huashe();
		shiwu=fangshiwu();	
	})


	//自定义行列
	$('#hangxuanze').bind('keydown',function(e){
		if(e.keyCode==13){
			hang=$(this).val();
			if(isNaN(Number(hang))){
				alert('好好写');
			}else if(hang<5||hang>40){
				alert('正常点');
			}else{
				$('.active').removeClass('active');
				huachangjing(hang);
				$('li[data-row='+hang+']').addClass('active');
			}
		}
	})


	// 开关
	$('ul li[data-cotroll]').bind('click',function(){
		var str=$(this).attr('data-cotroll');
		if(str==='kaishi'){
			timerId=setInterval(move,200);
		}else if(str==='zanting'){
			clearInterval(timerId);
		}else if(str==='restart'){
			clearInterval(timerId);
			huachangjing();
			she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
			shiwu=fangshiwu();
			she.forEach(function(v){
				$('#'+zb2id(v.x,v.y)).addClass('she');
			});
			setInterval(move,200);
		}
	})


})