import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = (props) => {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

const storeTest = (props) => {
  props.onGlobalStateChange((value, prev) => console.log('智慧', `[onGlobalStateChange - ${props.name}]:`, value, prev), true);
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
  });
}

// 生命周期
// Unload:删除当前应用的钩子(常规模式下无需关注)

// bootstrap:微应用初始化的时候调用一次,再次进入不会调用
export async function bootstrap() {
  console.log('[智慧] react app bootstraped');
}

// Mount:每次进入都会调用，一般用于触发应用的渲染
export async function mount(props) {
  console.log('[智慧] props from main framework', props);
  storeTest(props);
  render(props);
}

// Unmount:卸载调用的钩子
export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
  // unmountComponentAtNode(官网原文):从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。
}
