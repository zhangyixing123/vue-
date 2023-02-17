import axios from 'axios';
import constants from './constants';

const request = axios.create({
    baseURL: `${constants.baseUrl}`,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

request.interceptors.request.use((conf) => {
    let formdata = new FormData();
    //循环赋值
    for (const key in conf.data) {
        const element = conf.data[key];
        formdata.append(key, element);
    }
    let file = ''
    formdata.append('os', window.sessionStorage.os || 'wap'); // 终端
    formdata.append('wap', true);
    formdata.append('msydChannel', 1);// 总渠道
    formdata.append('msydSubChannel', window.sessionStorage.subChannel || 192);// 子渠道
    formdata.append('msydEquipment', window.sessionStorage.msydEquipment || 4);// 微站
    formdata.append('token', window.localStorage.token ? window.localStorage.token : '');
    formdata.append('sourceId', window.sessionStorage.sourceId || '');
    formdata.append('recommended', window.sessionStorage.recommended || '');
    formdata.append('couponChannel', window.sessionStorage.couponChannel || '');
    formdata.append("file", file); // 文件对象
    conf.data = formdata;
    return conf;
}, err => Promise.reject(err));

request.interceptors.response.use(
    (resp) => {
            let data;
            if (typeof resp.data === 'string') {
                try {
                    data = JSON.parse(resp.data);
                } catch (err) {
                    console.error(err);
                    data = resp.data;
                }
            } else {
                data = resp.data;
            }

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









