$(function(){
	//轮播图
   	$('#banner').slideBox({
		duration :.5,//滚动持续时间，单位：秒
		easing : 'linear',//swing,linear//滚动特效
		delay : 3,//滚动延迟时间，单位：秒
		hideClickBar : false,//不自动隐藏点选按键
		clickBarRadius : 10
	});

	// 专享优惠
	$('#discountScroll').slide({
		//titCell:".hd ul",
		mainCell:".discountPics ul",
		autoPage:true,
		effect:"left",
		autoPlay:false,
		vis:5,
        scroll: 5,
		trigger:"click"
	});
	//新品上线
	$('#newproductsScroll').slide({
		//titCell:".hd ul",
		mainCell:".newproductsPics ul",
		autoPage:true,
		effect:"left",
		autoPlay:false,
		vis:4,
        scroll: 4,
		trigger:"click"
	});
	// 专享优惠的长度大于5时,鼠标悬浮出现箭头
	if($('#discountScroll .discountPics .picList .active-list').length>5){
		$('#discountScroll').hover(function(){
			$('#discountScroll .arrow').show();
		},function(){
			$('#discountScroll .arrow').hide();
		})
	}
	// 新品上线的长度大于4时,鼠标悬浮出现箭头
	if($('#newproductsScroll .newproductsPics .picList .active-list').length>4){
		$('#newproductsScroll').hover(function(){
			$('#newproductsScroll .arrow').show();
		},function(){
			$('#newproductsScroll .arrow').hide();
		})
	}

	
})