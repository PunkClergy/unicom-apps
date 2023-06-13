# unicom

 [乾坤](https://qiankun.umijs.org/zh) 应用。

## 怎么用

```shell
yarn install:unicom # 安装主应用(联通)
yarn install:inspection # 安装子应用(纪检)
yarn install:executing # 安装子应用(执纪)

yarn start:unicom   # 开启主应用(联通)
yarn start:inspection   # 开启子应用(纪检)
yarn start:executing   # 开启子应用(执纪)
```

## 主应用访问

* unicom: 主应用，访问: https://localhost:7099
* inspection: 主应用，访问: https://localhost:7099/inspection
* executing: 主应用，访问: https://localhost:7099/executing
  
### 子应用单独访问

* inspection: 子应用，访问: https://localhost:7101
* executing: 子应用，访问: https://localhost:7102


主、子两者区别：

## 主应用
* 统治各个子应用的应用，也即合并结果页面
* 负责子应用的注册、路由分发。可以简单理解为 React.js 和 Vue.js 里的 App 组件，主要做一些初始化、路由注册、全局状态注册、销毁时* 的动作

## 子应用
* 各个 SPA 应用，可以理解为 SPA 里的页面组件
* 负责暴露一些函数，以此对接主应用，让主应用知道：哦，原来你是子应用，要和我对接。常见的对应函数有：bootstrap, mount, unmount




## 名词解释
### PostMessage
* PostMessage 是 html5 新引进的一个可跨源通信 api，你可以通过这个 api，让主页面和任意 frame 类页面或 window.open 打开的页面进行双向通信。
