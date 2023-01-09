
interface window {
  AMap: any;
}

declare module 'src/utils/area.js';
declare module 'src/utils/zntofirstLetter.js';
declare module 'src/utils/geoPosition.js';
declare module 'src/components/NavHeader';




// 解决样式文件引入报错问题
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}