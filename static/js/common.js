// 移动端响应式匹配 px转rem=20
(function () {
  document.addEventListener('DOMContentLoaded', function () {
	var deviceWidth = document.documentElement.clientWidth;
	var deviceHeight = document.documentElement.clientHeight;
			document.documentElement.style.fontSize = deviceWidth / 96 + 'px';
	   }, false);
	   
	window.onresize = function(){
		var deviceWidth = document.documentElement.clientWidth;
		var deviceHeight = document.documentElement.clientHeight;
			document.documentElement.style.fontSize = deviceWidth / 96+ 'px';
	};
})();


 // 顶部导航切换效果
//$('.header .nav>a').hover(function() {
//	$(this).addClass('active').siblings().removeClass('active');
//	var imgUrl = $(this).children('img').attr('src');
//	var newImgUrl = imgUrl.replace(/1/, "2");
//	$(this).children('img').attr('src', newImgUrl);
//}, function() {
//	var imgUrl = $(this).children('img').attr('src');
//	var newImgUrl = imgUrl.replace(/2/, "1");
//	$(this).children('img').attr('src', newImgUrl);
//})

// 二级导航
$('#tongji').hover(function(){
	$('.subnav').slideDown(200);
},function(){
	setTimeout(function(){
		$('.subnav').slideUp(200);
	},3000)
})


// 顶部导航显示隐藏	
var on = true;
$('.top-title h1').on('click', function() {
	if(on) {
		$('.header').hide();
	} else {
		$('.header').show();
	}
	on = !on;
})

