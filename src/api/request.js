import axios from 'axios';
import qs from 'qs';
import constants from './constants';

const request = axios.create({
  baseURL: `${constants.baseUrl}`,
  transformRequest: [(data) => {
    const newData = qs.stringify(data);
    return newData;
  }],
});

request.interceptors.request.use((conf) => {
  const defaultData = {
    msydChannel: 1, // 总渠道
    msydSubChannel: window.sessionStorage.subChannel || 192, // 子渠道
    msydEquipment: 4, // 微站
    wap: true, // 终端类型
    os: window.sessionStorage.os || 'wap', // 终端
    sourceId: window.sessionStorage.sourceId || '', // ios设备信息
    recommended: window.sessionStorage.recommended || '', // 推荐
    couponChannel: window.sessionStorage.couponChannel || '', // 券渠道号
  };
  if (window.localStorage.token) {
    defaultData.token = window.localStorage.token;
  }
  const newConfig = conf;
  const newData = { ...defaultData, ...conf.data };
  newConfig.data = newData;
  return newConfig;
}, err => Promise.reject(err));

request.interceptors.response.use(
  (resp) => {
    let ret;
    switch (data.ec) {
      case 'M00000': {
        ret = Promise.resolve(data);
        break;
      }
      case 'M00003': {
        window.localStorage.removeItem('token');
        ret = Promise.reject(data);
        break;
      }
      default: {
        ret = Promise.reject(data);
        break;
      }
    }
    return ret;
  },
  (err) => {
    return Promise.reject(err.response || err);
  },
);

export default request;
