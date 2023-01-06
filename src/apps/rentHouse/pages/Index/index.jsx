import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

// 获取当前地理位置所在城市
import { getCurrentCity } from "src/utils/geoPosition.js";

// 导入组件
// import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";
import { Swiper, Grid, Space, Toast } from "antd-mobile";

// 导入axios
import axios from "axios";

// 导入导航菜单图片
import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";

// 导入样式文件
import "./index.scss";

// 导入搜索导航栏组件
import SearchHeader from "src/components/SearchHeader";

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: "整租",
    path: "/home/list",
  },
  {
    id: 2,
    img: Nav2,
    title: "合租",
    path: "/home/list",
  },
  {
    id: 3,
    img: Nav3,
    title: "地图找房",
    path: "/map",
  },
  {
    id: 4,
    img: Nav4,
    title: "去出租",
    path: "/rent/add",
  },
];
const tabs = [
  { title: "首页", icon: "", description: "", key: "/home" },
  { title: "找房", icon: "", description: "", key: "/map" },
  { title: "首页", icon: "", description: "", key: "/" },
  { title: "我的", icon: "", description: "", key: "/profile" },
];
const location = { longitude: "", latitude: "" };
// 获取地理位置信息
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("当前位置信息：", position);
    // longitude 经度 latitude 纬度 accuracy 获取到的经度或纬度的精度(m) altitude 海拔高度(不存在为null)
    let { longitude, latitude } = position.coords;
    // 高德地图逆地理编码接口 经纬度小数点后不超过 6 位 此处做切割
    location.longitude = longitude;
    location.latitude = latitude;
    console.log(location);
  },
  (code, message) => {
    console.log(code, message);
    switch (code) {
      // 用户拒绝了位置服务
      case 1:
        break;
      // 获取不到位置信息
      case 2:
        break;
      // 获取位置信息超时
      case 3:
        break;
      default:
        console.log(code, message);
        break;
    }
  }
);
export default class Home extends React.Component {
  state = {
    // 轮播图状态数据
    swipers: [],
    isSwiperLoaded: false,

    // 租房小组数据
    groups: [],
    // 最新资讯
    news: [],
    // 当前城市名称
    curCityName: "上海",
  };

  // 获取轮播图数据
  async getSwipers() {
    const res = await axios.get("http://localhost:4000/banner");
    console.log(res);
    this.setState({
      swipers: res.data.data,
      isSwiperLoaded: true,
    });
    return null;
  }
  // 获取租房小组数据
  async getGroups() {
    const res = await axios.get(
      "http://localhost:4000/groups"
      // {
      //   params: {
      //     area: "AREA%7C88cff55c-aaa4-e2e0",
      //   },
      // }
    );
    console.log(res);
    this.setState({
      groups: res.data.data,
    });
  }

  // 获取最新资讯
  async getNews() {
    const res = await axios.get("http://localhost:4000/articles");
    this.setState({
      news: res.data.data,
    });
  }
  // 获取地理位置相关信息
  async getLocationInfo() {
    // 调用高德地图坐标转换接口 将坐标转换成地图平台坐标
    console.log(location.longitude + "," + location.latitude);
    const mapLocation = await axios.get(
      "https://restapi.amap.com/v3/assistant/coordinate/convert",
      {
        params: {
          key: "203a243191cdcc800d2aa9fd48eca003",
          locations: location.longitude + "," + location.latitude,
        },
      }
    );
    console.log("mapLocation", mapLocation);
    if (mapLocation.status != 200) {
      return Toast.show({
        content: "网络错误",
        afterClose: () => {
          console.log("after");
        },
      });
    }
    if (mapLocation.data.status != "1") {
      return Toast.show({
        content: "坐标转换接口请求失败",
        afterClose: () => {},
      });
    }
    let locations = mapLocation.data.locations.split(";");
    console.log("locations", locations);
    let locationStr = locations[0];
    // 调用 高德地图 逆地理编码 接口 https://lbs.amap.com/api/webservice/guide/api/georegeo
    const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
      params: {
        key: "203a243191cdcc800d2aa9fd48eca003",
        location: locationStr,
      },
    });
    console.log("地理位置相关信息", res);
    if (res.status != 200) {
      return Toast.show({
        content: "网络错误",
        afterClose: () => {
          console.log("after");
        },
      });
    }
    if (res.data.status != "1") {
      return Toast.show({
        content: "地理位置信息接口请求失败",
        afterClose: () => {
          console.log(res.data.infocode, res.data.info);
        },
      });
    }
    console.log(res.data.regeocode, res.data.regeocode.addressComponent);
    // 省 市 区 乡镇/街道 社区信息列表 楼信息列表 门牌信息列表
    let {
      province,
      city,
      district,
      township,
      neighborhood,
      building,
      streetNumber,
    } = res.data.regeocode.addressComponent;

    console.log(
      province,
      city,
      district,
      township,
      neighborhood,
      building,
      streetNumber
    );
  }

  // 获取当前地理位置所在城市名称
  async getAmapGeoCityInfo() {
    // 当前城市
    const city = await getCurrentCity();
    this.setState({
      curCityName: city,
    });
  }
  async componentDidMount() {
    this.getSwipers();
    this.getGroups();
    this.getNews();
    // this.getLocationInfo();  // 浏览器获取的地理位置 在高德jsapi中无法解析出数据  弃用

    /* 
      1 打开地图JS API 定位文档 。
      2 通过 IP 定位获取到当前城市名称。
      3 调用我们服务器的接口，换取项目中的城市信息（有房源的城市的名称和id）。
      4 将接口返回的城市信息展示在顶部导航栏中。
    */
    // 高德地图jsapi CitySearch 插件 获取当前地理位置所在城市信息
    await this.getAmapGeoCityInfo();
  }

  // 渲染轮播图结构
  renderSwipers() {
    console.log(this.state.swipers);
    return this.state.swipers.map((item) => (
      <Swiper.Item key={item._id}>
        <a
          href={item.url}
          style={{
            display: "inline-block",
            width: "100%",
            height: 212,
          }}
        >
          <img
            src={item.cover}
            alt=""
            style={{ width: "100%", height: "100%", verticalAlign: "top" }}
          />
        </a>
      </Swiper.Item>
    ));
  }
  // 渲染导航菜单
  renderNavs() {
    // const navigate = useNavigate();
    return navs.map((item) => (
      <Grid.Item key={item.id}>
        <Link to="/main/map">
          {/* onClick={() => navigate("/main/map")} */}
          <img src={item.img} alt="" />
          <h2>{item.title}</h2>
        </Link>
      </Grid.Item>
    ));
  }
  // 渲染小组宫格
  renderGroups() {
    return this.state.groups.map((item) => (
      <Grid.Item className="group-item" key={item._id}>
        <Space justify="around">
          <img src={item.cover} alt="" />
          <div className="desc">
            <p className="title">{item.name}</p>
            <span className="info">{item.desc}</span>
          </div>
        </Space>
      </Grid.Item>
    ));
  }
  // 渲染最新资讯
  renderNews() {
    return this.state.news.map((item) => (
      <div className="news-item" key={item._id}>
        <div className="imgwrap">
          <img className="img" src={item.cover} alt="" />
        </div>
        <div className="content">
          <h3 className="title">{item.name}</h3>
          <Space className="info" direction="horizontal" justify="between">
            <span>{item.author}</span>
            <span>{item.createdAt}</span>
          </Space>
        </div>
      </div>
    ));
  }
  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="swiper">
          {this.state.isSwiperLoaded ? (
            <Swiper autoplay loop autoplayInterval={3000}>
              {this.renderSwipers()}
            </Swiper>
          ) : (
            ""
          )}
          {/* 搜索框 */}
          <SearchHeader
            className="searchbar"
            cityName={this.state.curCityName}
          />
        </div>

        {/* 导航菜单 */}
        <Grid className="nav" columns={4} gap={8}>
          {this.renderNavs()}
        </Grid>
        {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>
          {/* 宫格组件 */}
          <Grid columns={2} gap={8}>
            {this.renderGroups()}
          </Grid>
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          {this.renderNews()}
        </div>
      </div>
    );
  }
}
