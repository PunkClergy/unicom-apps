

import axios from 'axios';
import React from 'react';
import { message } from 'antd';

// 创建axios实例
const service = axios.create({
    baseURL: 'https://autumnfish.cn/', // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // if (store.getters.token) {
        //     // 让每个请求携带token
        //     config.headers['X-Token'] = getToken();
        // }
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.log(error);
        Promise.reject(error);
    }
);

// response拦截器
service.interceptors.response.use(
    /**
     * 如果你想要获取诸如headers或状态之类的http信息
     * 请返回response => response
     */
    /**
     * 通过自定义代码确定请求状态
     * 这里只是一个例子
     * 你还可以通过HTTP状态码判断状态
     */
    response => {
        const res = response.data;
        if (res.code !== 200) {
            console.log(res)
            message.warning(res.msg);

            // 假设401表示Token失效
            if (res.code === 401) {
                // MessageBox.confirm(
                //     '登录状态已过期，您可以继续留在该页面，或者重新登录',
                //     '系统提示',
                //     {
                //         confirmButtonText: '重新登录',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     }
                // )
            }
            return Promise.reject(response.data);
        } else {
            return response.data;
        }
    },
    error => {
        console.log('err' + error);
        // 特别注意：error.message是请求失败的错误信息，
        // 而error.response.data.message才是后端返回的错误信息，可以根据这个来调试错误。
        message.error(error.response.data.message ? error.response.data.message : '网络异常')
        return Promise.reject(error);
    }
);

const request = ({ url, method, data }) => {
    return new Promise((resolve, reject) => {
        service({
            url: url,
            method: method,
            data: data
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export default request;
