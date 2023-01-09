## Geolocation
Geolocation 接口是一个用来获取设备地理位置的可编程的对象，它可以让 Web 内容访问到设备的地理位置，这将允许 Web 应用基于用户的地理位置提供定制的信息。

- Geolocation.getCurrentPosition()
确定设备的位置并返回一个携带位置信息的 Position 对象。

- Geolocation.watchPosition()
注册一个位置改变监听器，每当设备位置改变时，返回一个 long 类型的该监听器的 ID 值。

- Geolocation.clearWatch()
取消由 watchPosition() 注册的位置监听器。

### Geolocation.getCurrentPosition()
 Geolocation.getCurrentPosition()确定设备的位置并返回一个携带位置信息的 Position 对象。

Position 接口表示在给定的时间的相关设备的位置。返回一个 Coordinates 对象和时间戳。 Coordinates对象用来表示设备的位置。

Coordinates：
```
latitude 当前位置纬度
longitude 当前位置精度
altitude 海拔高度(不存在为null)
accuracy 获取到的经度或纬度的精度(m)
altitudeAccuracy 海拔高度的精度(m)
heading 设备前进方向(用面朝正北的顺时针角度来表述,不存在为null)
speed 前进速度(m,不存在为null)
timestamp 获取位置信息的时间戳

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationCoordinates)
```


### 获取到的地理位置跟GPS、IP地址、WIFI和蓝牙的MAC地址、GSM/CDMS的ID有关
比如：手机优先使用 GPS 定位，笔记本等最准确的定位是WIFI

根据网络环境的不同，定位的精准度也会有一定的偏差。






## 高德地图 JSApi 使用

### 定位

#### 获取当前所在城市信息
##### CitySearch：IP定位获取当前所在城市信息
```jsx
// 插件 CitySearch getLocalCity 方法 获取当前城市信息
const citySearch = new AMap.CitySearch();
citySearch.getLocalCity(function (status, result) {
  if (status === "complete" && result.info === "OK") {
    // 查询成功，result即为当前所在城市信息
  }
});
```









## FAQ:

### 使用getCurrentPosition() 获取的当前地理位置经纬度，无法通过地图api解析成功获取位置详细信息。
**解决**
使用 高德 JSApi CitySearch 获取当前所在城市信息

