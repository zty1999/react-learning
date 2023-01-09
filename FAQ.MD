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