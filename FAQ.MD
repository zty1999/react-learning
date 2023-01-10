## tsconfig.json 配置相对路径引用无效
```ts
    "paths": {
      "@/*": ["src/*"]
    } 
```

react18 create-react-app5   默认使用webpack中配置的 alias 别名，不支持tsconfig.json 配置相对路径
暂代方法：
webpack 配置中添加 alias 别名配置

残留问题：
多入口配置下，子项目内相对路径配置引用问题待解决



## material-ui  使用 style-component 模式 安装使用报错
使用 style-component 模式仍需要安装 @emotion/react @emotion/styled
```
npm install @mui/material @emotion/react @emotion/styled @mui/styled-engine-sc styled-components
```