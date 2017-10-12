$(function(){
	//右边二维码的显示与隐藏
	var $APPDownload = $('#APPDownload');
	//楼层滚动变量声明
	var $stairNav = $('.stairNav'),
		$stairNavLi = $('.stairNav ul li'),
		$scrollpart = $('.scrollpart'),
		isScroll = true,
		isIndexUrl = location.href,//获取当前url;
		$appDownloadTips = $APPDownload.find('.appDownloadTips-wrap');
	if(isIndexUrl == 'http://localhost/newIndex/' || isIndexUrl == 'https://10.16.17.206:9002/' || isIndexUrl == 'https://www.cmyynet.com' || isIndexUrl == 'https://10.16.17.207:9002/'){
		$appDownloadTips.show();
        $APPDownload.addClass('active');
        $(window).scroll(function (){
	        var state = true;	
	        //右边二维码的显示与隐藏
	        if($(window).scrollTop()>100){
	            state = true ;
	            $appDownloadTips.hide();
	            $APPDownload.removeClass('active');
	            if(state){
	                $APPDownload.hover(function(){
	                	$APPDownload.addClass('active');
	                    $appDownloadTips.show();
	                },function(){
	                	$APPDownload.removeClass('active');
	                    $appDownloadTips.hide();
	                })
	            }
	            
	        }else if($(window).scrollTop() < 100){
	            state = false ;
	            $appDownloadTips.show();
	            $APPDownload.addClass('active');
	        }
	    });
	}else{
		$appDownloadTips.hide();
	    $APPDownload.removeClass('active');
	}

	//鼠标悬浮显示移开隐藏
	$APPDownload.hover(function(){
		$appDownloadTips.show();
	    $APPDownload.addClass('active');
	},function(){
		$appDownloadTips.hide();
	    $APPDownload.removeClass('active');
	})
    

    //楼层滚动
    $(window).scroll(function(){
        var referenceVal = $(this).scrollTop();
		if(isScroll){
			if(referenceVal>=1650){
				$stairNav.show();
				$stairNavLi.eq(6).addClass('hover').siblings().removeClass('hover');
			}else if(referenceVal>=400){
				$stairNav.show();
				$scrollpart.each(function(i,val){
					if(referenceVal - $(this).offset().top+200 >= 0){
				 		$stairNavLi.eq(i).addClass('hover').siblings().removeClass('hover');	
				 	}
				})
			}else if(referenceVal>=1500){
				$stairNavLi.eq(6).addClass('hover').siblings().removeClass('hover');
			}else{
				$stairNav.hide();
			}
		}
    })
    //关闭app二维码展示
    $('.closeAppDownload').on('click',function(){
    	$APPDownload.removeClass('active');
    	$(this).parents('.appDownloadTips-wrap').hide();
    })

 
	//点击回到当前楼层
	$stairNavLi.on('click',function(){
		isScroll = false;
		var _index = $(this).index(),
			$top;
		if(_index == 3 || _index == 4 || _index ==5){
			$top = $scrollpart.eq(3).offset().top;
			$(this).addClass('hover').siblings().removeClass('hover');
		}else if(_index == 6){
			$top = $scrollpart.eq(4).offset().top;	
		}else{
			$top = $scrollpart.eq(_index).offset().top;
		}
		$('body,html').stop().animate({"scrollTop":$top-100},500);
		$(this).addClass('hover').siblings().removeClass('hover');
		setTimeout(function(){
			isScroll = true;
		},500);
	});

	 //返回顶部
    $('.toTop').on('click',function(){
    	isScroll = false;
    	$('.stairNav').hide();
    	$('body,html').animate({"scrollTop":0},500);
    	$APPDownload.addClass('active');
    	$('#APPDownload .appDownloadTips-wrap').show();
    	setTimeout(function(){
			isScroll = true;
		},500);
    })

	//控制楼层距离内容的距离
	function changeStairNav (){
		var winW = Number($(window).width()),
			//leftDistance浏览器宽度-主体内容宽度/2 =  浏览器左边与主体内容的距离 - 楼层的宽度
			leftDistance = (winW-1200)/2-68;
		if(leftDistance > 0){
			$('.stairNav').css('left',leftDistance);
		}else{
			$('.stairNav').css('left','0');
		}

	}
	changeStairNav()

	$(window).resize(function(){
		changeStairNav()
	})


	//登录判断
	$('#loginForm .submitBtn').on('click',function(evt){
		var obj = $('#protocol-select').attr('checked'),
			$userName = $('#userName').val(),
			$userPass = $('#userPass').val();
		if(!obj){
			console.log(12)
			evt.preventDefault();
			return false;
		}else{
			console.log(34)
			if($userName == '' || $userPass == ''){
				layer.msg('用户名和密码不能为空', {
					icon : 2,
					offset : [ '45%', '45%'  ]
				});
				evt.preventDefault();
			}else{
				var formParam = $("#form1").serialize();
				$.ajax({
					url:'https://www.cmyynet.com/',
					type:'post',
					data:formParam,
					success:function(){
						layer.msg('登陆成功',{
							icon : 1,
							offset : [ '45%', '45%'  ]
						})
					},
					error:function(){
						layer.msg('登陆失败,请稍后再试',{
							icon : 2,
							offset : [ '45%', '45%'  ]
						})
					}
				})
				evt.preventDefault();
			}
		}
	});
	//判断是否同意协议
	$('#protocol-select').on('click',function(){
		if($(this).is(':checked')){
			$('#loginForm .submitBtn button').css({'backgroundColor':'#004B97','cursor':'pointer'});
		}else{
			$('#loginForm .submitBtn button').css({'backgroundColor':'#dddddd','cursor':'not-allowed'});
			
		}
	});
})