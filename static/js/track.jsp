<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>  
<head>
    <link rel="stylesheet" href="../../layui/css/layui.css?v=${css}"/>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Track</title>  
<style type="text/css">  
    html{height:100%}  
    body{height:100%;margin:0px;padding:0px}  
    #controller{width:100%; border-bottom:3px outset; height:30px; filter:alpha(Opacity=100); -moz-opacity:1; opacity:1; z-index:10000; background-color:lightblue;}  
    #container{height:100%}  
</style>    
<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=D2b4558ebed15e52558c6a766c35ee73&s=1"></script>
    <script type="text/javascript" src="../../jquery/jquery.min.js"></script>
<script type="text/javascript">  
var points = [  
]; 
var startLon;
var startLat;
var endLon;
var endLat;
$(function(){
	
	//获取所有点的坐标  
	
	var lon = document.getElementsByClassName("longitude");
	
	var loArr = new Array();

	for(var i=0;i<lon.length;i++){
		var str = lon[i].value;
		points.push(new BMap.Point( str.split(",")[0], str.split(",")[1]   ))
	}
	startLon=lon[0].value.split(",")[0];
	startLat = lon[0].value.split(",")[1];
	endLon=lon[lon.length-1].value.split(",")[0];
	endLat=lon[lon.length-1].value.split(",")[1];
	
	init();
});
var map;   
var car;   
var label; 
var centerPoint;  
  
var timer;    
var index = 0; 
  
var followChk, playBtn, pauseBtn, resetBtn; 
  
function play() {  
    playBtn.disabled = true;  
    pauseBtn.disabled = false;  
      
    var point = points[index];  
    if(index > 0) {  
        map.addOverlay(new BMap.Polyline([points[index - 1], point], {strokeColor: "red", strokeWeight: 1, strokeOpacity: 1}));  
    }  
    label.setContent("经度: " + point.lng + "<br>纬度: " + point.lat);  
    car.setPosition(point);  
    index++;  
    if(followChk.checked) {  
        map.panTo(point);  
    }  
    if(index < points.length) {  
        timer = window.setTimeout("play(" + index + ")", 100);  
    } else {  
        playBtn.disabled = true;  
        pauseBtn.disabled = true;  
        map.panTo(point);  
    }  
}  
  
function pause() {  
    playBtn.disabled = false;  
    pauseBtn.disabled = true;  
      
    if(timer) {  
        window.clearTimeout(timer);  
    }  
}  
  
function reset() {  
    followChk.checked = false;  
    playBtn.disabled = false;  
    pauseBtn.disabled = true;  
      
    if(timer) {  
        window.clearTimeout(timer);  
    }  
    index = 0;  
    car.setPosition(points[0]);  
    map.panTo(centerPoint);  
}  
function init() {  
	  followChk = document.getElementById("follow");  
    playBtn = document.getElementById("play");  
    pauseBtn = document.getElementById("pause");  
    resetBtn = document.getElementById("reset");
  
    
    
    //初始化地图,选取第一个点为起始点  
    map = new BMap.Map("container");  
    map.centerAndZoom( points[0] , 18);  
    
    map.enableScrollWheelZoom();  
    map.addControl(new BMap.NavigationControl());  
    map.addControl(new BMap.ScaleControl());  
    map.addControl(new BMap.OverviewMapControl({isOpen: true}));  
      
    var driving = new BMap.DrivingRoute(map,{renderOptions:{map:map,autoViewport:true}});  
    driving.search(new BMap.Point(startLon, startLat), new BMap.Point(endLon, endLat));  
    
     driving.setSearchCompleteCallback(function() {  
      
        centerPoint = new BMap.Point((points[0].lng + points[points.length - 1].lng)/2, (points[0].lat + points[points.length - 1].lat) / 2);  
        map.panTo(centerPoint);  
        map.addOverlay(new BMap.Polyline(points, {strokeColor: "black", strokeWeight: 5, strokeOpacity: 1}));  
          
        label = new BMap.Label("", {offset: new BMap.Size(-20, -20)});  
        car = new BMap.Marker(points[0]);  
        car.setLabel(label);  
        map.addOverlay(car);  
          
        playBtn.disabled = false;  
        resetBtn.disabled = false;   
    }); 
} 
</script>  
</head>    
     
<body>
	<c:forEach items="${orderTrack}" var="orderTrack">
		<input type="hidden" class="longitude" value="${orderTrack.longitude},${orderTrack.latitude}" />
		
	</c:forEach>
    <div id="controller" align="center" style="height: 40px">
        <input id="follow" type="checkbox" /><span style="font-size:12px;">画面跟随</span>
        <input id="play" type="button" class="layui-btn layui-btn-radius layui-btn-normal" value="播放" onclick="play();" disabled />
        <input id="pause" type="button" class="layui-btn layui-btn-radius layui-btn-warm" value="暂停" onclick="pause();" disabled />
        <input id="reset" type="button" class="layui-btn layui-btn-radius layui-btn-danger" value="重置" onclick="reset();" disabled />
    </div>
    <div id="container"></div>  
</body>    
</html> 