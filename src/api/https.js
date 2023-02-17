import request from './request';
import upload from './upload';


/***
 * 文件上传
 * @param 
 * 
 ***/
const getWxJsConfig = url => upload.post(
    'wechat/getWxJsConfig',
    { url },
);


/***
 * @param 
 * 
 ***/
const generateShortUrl = url => request.post(
    '/s/generateShortUrl',
    { url },
);


/***
  * @param 
 * 
 ***/
const userInfo = () => request.post('/user/userInfo', {});

export default {
    getWxJsConfig,
    generateShortUrl,
    userInfo,
};