// 高德地图 jsapi-loader
import AMapLoader from "@amap/amap-jsapi-loader";
// window["_AMapSecurityConfig"] = {
//   securityJsCode: "683e8bd32b41ba9f78be4bc8e93fce24",
// };

// 创建并导出获取定位城市的函数 getCurrentCity 通过 IP 定位获取到当前城市名称。
export const getCurrentCity = () => {
  // 3 判断 localStorage 中是否有定位城市
  const localCity = JSON.parse(localStorage.getItem("curCity"))
  console.log(localCity);
  if (!localCity) {
    // 4 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
    return new Promise((resolve, reject) => {
      console.log('this', this);
      AMapLoader.load({
        key: "3208d381736af0804d8b356b7eba5721", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.CitySearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          const citySearch = new AMap.CitySearch();
          // controlBar.addTo(this.map); //添加方向盘到地图
          citySearch.getLocalCity((status, result) => {
            if (status === "complete" && result.info === "OK") {
              // 查询成功，result即为当前所在城市信息
              console.log("citySearch", result);
              let { province, city } = result;
              // 返回该城市名称
              console.log(city);
              resolve(city)
              localStorage.setItem("curCity", JSON.stringify(result));
            } else {
              console.log(status, result);
              // 获取定位城市失败
              reject({ status, result })
            }
          });
        })
        .catch((e) => {
          console.log(e);
          // 获取定位城市失败
          reject(e)
        });
    })
  }

  // 5 如果有，直接返回本地存储中的城市数据
  // 注意：因为上面为了处理异步操作，使用了Promise，因此，为了该函数返回值的统一，此处，也应该使用Promise
  // 因为此处的 Promise 不会失败，所以，此处，只要返回一个成功的Promise即可
  return Promise.resolve(localCity.city)
}