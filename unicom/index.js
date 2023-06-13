import {
  registerMicroApps,//接受两个参数:注册信息和生命周期钩子
  runAfterFirstMounted,//默认微应用过载后执行的钩子
  setDefaultMountApp,//设置主应用启动后默认进入的微应用
  start,//启动程序（主应用）-常规模式下只会启动主应用，如果wenpack特殊配置会按需启动
  initGlobalState//通信阶段，定义全局所需状态，微应用可通过props获取（*重要）
} from 'qiankun';
import './index.less';

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
import render from './Render';
// import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = loading => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  // 注册信息
  [
    {
      name: 'inspection',
      entry: '//localhost:7101',
      container: '#subapp-viewport',
      loader,
      activeRule: '/inspection',
    },
    {
      name: 'executing',
      entry: '//localhost:7102',
      container: '#subapp-viewport',
      loader,
      activeRule: '/executing',
    },
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

// onGlobalStateChange: 当前应用监听全局状态, 接收两个参数(callback和fireImmediately);有变更触发 callback, fireImmediately  = true 立即触发 callback
// setGlobalState: 设置全局状态，微应用中只能修改已存在的属性
// offGlobalStateChange:移除当前应用的状态监听，微应用 umount 时会默认调用
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev), true);//理解为发布订阅

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/inspection');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
