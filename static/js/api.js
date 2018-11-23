// sockt host
var socktHost = 'ws://113.207.26.29:8080/jbz/';

// GPS
var gpsUrl = socktHost + 'gps';

// 生产数据
var productUrl = socktHost + 'product';

// 称重过磅
var weightUrl = socktHost + 'weight';

// host 
var host= 'http://113.207.26.29:8080/jbz';

// 获取材料类型
var pbUrl = host +'/api/data/ajaxGetPB';

// 获取油石比页面的材料类型
var pbhUrl = host + '/api/data/ajaxGetPBH';

// 获取车辆列表
var carList = host + '/api/location/ajaxGet';

//获取材料类型和批次(选择时间)
var PBHByDateUrl = host + '/api/data/ajaxGetPBHByDate';

//获取材料类型和批次(选择类型)
var BatchByDateAndPBHUrl = host + '/api/data/ajaxGetBatchByDateAndPBH';

//获取材料类型和批次(选择批次)
var GetYSBUrl = host + '/api/data/ajaxGetYSB';

// 车辆历史轨迹
var carTrail = host + '/api/location/history/ajaxGet';

/*统计分析*/
// 生产动态表
var produceStsteUrl = host + '/api/data/ajaxList';

// 生产量分析
var produceNumUrl = host + '/api/data/ajaxSCL';

// 核算量分析

// 消耗量统计
var xhlUrl = host + '/api/data/ajaxXHL';

// 温度波动
var tempUrl = host + '/api/temperature/out/ajaxList';

// 油石比波动分析
var ysbUrl = host + '/api/data/ajaxGetYSB';

// ajax数据请求
function ajaxData(url,params,callback){
	$.ajax({
		type:"get",
		url:url,
		data:params,
		success:function(res){
			callback(res)
		}
	});
}

// websocket函数
function WebSocketFn(url,callback){
    if ("WebSocket" in window){
       // console.log("您的浏览器支持 WebSocket!");
       // 打开一个 web socket
       var ws = new WebSocket(url);
        
       ws.onopen = function(){
          // Web Socket 已连接上，使用 send() 方法发送数据
          //ws.send("发送数据");
          //alert("数据发送中...");
       };
        
       ws.onmessage = function (evt) { 
          var received_msg = evt.data;
          //console.log(received_msg);
          callback(received_msg);
          //alert("数据已接收...");
       };
        
       ws.onclose = function(){ 
          // 关闭 websocket
          console.log("连接已关闭..."); 
       };
    }else{
       // 浏览器不支持 WebSocket
       alert("您的浏览器不支持 WebSocket!");
    }
}

// 获取本地时间
function timeFn() {
	var nowdate = new Date();
	var y = nowdate.getFullYear();
	var m = nowdate.getMonth() + 1;
	var d = nowdate.getDate();
	var h = nowdate.getHours();
	var minutes = nowdate.getMinutes();
	var s = nowdate.getSeconds();
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	h = h < 10 ? '0' + h : h;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	s = s < 10 ? '0' + s : s;

	return {
		y:y,
		m:m,
		d:d,
		h:h,
		min:minutes,
		s:s
	}
	
}

timeFn();
