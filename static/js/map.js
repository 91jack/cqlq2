// 地图初始化
var map = new BMap.Map("map"); // 创建Map实例
var point = new BMap.Point(106.662101,29.501584);//
map.centerAndZoom(point, 14); // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(true); // 缩放地图
		


// 添加标注函数
function addMarker(point,icon,label,InfoWindow){
  	var marker1 = new BMap.Marker(point,{icon:icon});
  
  	map.addOverlay(marker1);
	var opts = {
	  position : point,    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(30,-5)    //设置文本偏移量
	}
	
	var label = new BMap.Label(label, opts);  // 创建文本标注对象
	label.setStyle({
		 color : "red",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 fontFamily:"微软雅黑"
	});
  
 	marker1.setLabel(label);
 	
 	marker1.addEventListener('click',function(){
 		map.openInfoWindow(InfoWindow,point); //开启信息窗口
 	})
}

