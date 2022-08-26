/*
 * @Description: 请求封装
 * @Author: Gongjinwei
 * @Date: 2020-03-20 15:36
 * @LastEditors: Gongjinwei
 * @LastEditTime: 2021-05-21 18:13
 */

import axios from "axios";
import {
  MAINHOST,
  ISMOCK,
  conmomPrams,
  QAHOST,
  ignoreToken,
  oss
} from "@/config";
import requestConfig from "@/config/requestConfig";
import {
  getToken,
  deleteToken
} from "@/utils/common";
import router from "@/router";
import qs from "qs";
import Vue from 'vue'
import { Message } from 'element-ui'

//const baseURL = process.env.NODE_ENV === "production" ? MAINHOST : '/api';
//测试代码
 const baseURL = process.env.NODE_ENV === "production" ? MAINHOST : QAHOST;
let loading = true;
let CType = '';

let HttpRequest = (function () {
  this.queue = {};
  this.destroy = function (url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // hide loading
      window.$loading(false)
    }
  };
  this.interceptors = function (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        config.headers = {
          'Content-Type': CType == 'form' ? 'application/x-www-form-urlencoded' : 'application/json;charset=UTF-8',
        };
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // show loading
          if (loading) window.$loading(true);
        }
        if (url) {
          this.queue[url] = true;
        }
        let form = new FormData();
        if (CType == 'form') {
          if (config.data != undefined && config.data.file != undefined) {
            for (let key in config.data) {
              form.append(key, config.data[key]);
            }
            config.data = form
          } else {
            if (CType == 'form') config.data = qs.stringify(config.data);
          }
        }
        return config;
      },
      (error) => {
        console.error(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        if (url) {
          this.destroy(url);
        }
        const {data, status} = res;
        if (status === 200 && ISMOCK) {
          return data;
        } // 如果是mock数据，直接返回
        // debugger
        if (status === 200 && data && (data.status === 1 || data.code == '200')) {// 请求成功
          return data && (data.data || data.data == 0) ? data.data: true;
        }else {
          if(data.code === 500 || data.code === 404 || data.status === 2 ){
            Message({
              message: data.msg,
              type: 'error',
            })
          }
        }

        return requestFail(res); // 失败回调
      },
      (error) => {
        if (url) {
          this.destroy(url);
        }
        console.error(error);
      }
    );
  }
  this.request = function (options) {
    const instance = axios.create();
    this.interceptors(instance, options.url);
    return instance(options);
  }
})

// 请求失败
const requestFail = (res) => {
  // token失效重新登陆
  if (res.data.code == 10034) {
    deleteToken();
    router.replace({
      name: "Login"
    });
    return;
  }
  if (res.data.code == 1) {
    window.$MessageBox(res.data.message, 'error');
    return;
  }
};

// 合并axios参数
const conbineOptions = (
  _opts,
  data,
  method
) => {
  let opts = _opts;
  if (typeof opts === "string") {
    opts = {
      url: opts
    };
  }
  const _data = {
    ...conmomPrams,
    ...opts.data,
    ...data
  };
  const options = {
    method: opts.method || data.method || method || "GET",
    url: opts.url,
    header: {
      "user-token": getToken()
    },
    baseURL,
  };
  return options.method !== "GET" ?
    Object.assign(options, {
      data: _data
    }) :
    Object.assign(options, {
      params: _data
    });
};

const HTTP = new HttpRequest();
/**
 * 抛出整个项目的api方法
 */
const Api = (() => {
  const apiObj = {};
  const requestList = requestConfig;
  const fun = (opts) => {
    return function (data, method, config) {
      config == undefined || config.loading == undefined ?
        (loading = true) :
        (loading = false);
      config == undefined || config.type == undefined ? CType = '' : CType = config.type
      // if (!token && getToken()) token = getToken();
      // if (!getToken() && !(opts in ignoreToken)) {
      //   console.error("No Token");
      //   router.replace({
      //     name: "Login"
      //   });
      //   return;
      // }
      const newOpts = conbineOptions(opts, data, method);
      const res = HTTP.request(newOpts);
      if (res == undefined) {
        return Promise.reject();
      }
      return res
    };
  };
  Object.keys(requestConfig).forEach((key) => {
    apiObj[key] = fun(requestList[key]);
  });
  return apiObj;
})();

export default Api;
