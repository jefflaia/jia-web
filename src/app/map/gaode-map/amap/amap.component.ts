import { Component, OnInit } from '@angular/core';
declare var AMap: any;

@Component({
    moduleId: module.id,
    selector: 'amap',
    templateUrl: 'amap.component.html',
    styleUrls: ['amap.component.scss']
})
export class AmapComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        //自定义Marker
        var customMarker = new AMap.Marker({
            offset: new AMap.Pixel(-14, -34),//相对于基点的位置
            icon: new AMap.Icon({  //复杂图标
                size: new AMap.Size(27, 36),//图标大小
                image: "http://webapi.amap.com/images/custom_a_j.png", //大图地址
                imageOffset: new AMap.Pixel(-28, 0)//相对于大图的取图位置
            })
        });

        let map = new AMap.Map('gaodemap-container', {
            resizeEnable: true
        });

        map.setCity("重庆");//如：重庆

         map.plugin('AMap.Geolocation', () => {
             let geolocation = new AMap.Geolocation({
                 enableHighAccuracy: true,//是否使用高精度定位，默认:true
                 timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                 maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                 convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                 showButton: true,        //显示定位按钮，默认：true
                 buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                 buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                 showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                 showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                 panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                 zoomToAccuracy: true     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
             });
             map.addControl(geolocation);
         });

         //加载地图工具条
         map.plugin(["AMap.ToolBar"], function () {
             var toolBar = new AMap.ToolBar({ locationMarker: customMarker });
             map.addControl(toolBar);
         });

        //加载比例尺
         map.plugin(["AMap.Scale"], function () {
             var scale = new AMap.Scale();
             map.addControl(scale);
         });

        ////加载地图实景（含路况）
        // map.plugin(["AMap.MapType"], function () {
        //     var type = new AMap.MapType();
        //     map.addControl(type);
        // });

         ////加载地图鹰眼
         //map.plugin(["AMap.OverView"], function () {
         //    var view = new AMap.OverView();
         //    view.open();
         //    map.addControl(view);
         //});
    }
}
