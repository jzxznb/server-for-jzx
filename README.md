# server-for-jzx 服务端

## 开发须知

-   安装依赖包 npm install 启动项目 npm start
-   该项目使用 koa2 来作为服务端框架
-   该项目使用 mongodb 作为数据库 [安装 mongodb 教程](https://www.runoob.com/mongodb/mongodb-osx-install.html)
-   当 component-for-jzx 项目中的组件进行更新发布后, 由于组件库中的组件时作为 npm 包导入到服务端的, 因此需要重新导入包,可以执行命令 npm install git+ssh://git@github.com:jzxznb/jzxznb.github.io.git 来更新组件包
-   当更新完组件包后, 需要执行命令 npm run build 对渲染的入口文件进行重新打包, 因为此时渲染 js 文件使用的时之前使用的组件库

## 目录结构

### routes

路由 放置各种接口

### src

基础代码

### ssrConfig

ssr 和页面渲染的配置
