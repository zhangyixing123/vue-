export default {
    // 判断手机号
    isPhoneNumber: (value) => /^1[3456789]\d{9}$/.test(value),
    //身份证号合法性验证
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    isIdCard: (code) => {
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        var pass = true;
        //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
        if (
            !code ||
            !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
                code
            )
        ) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split("");
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }

        return pass;
    },

    //判断某个字符串中是否包含某个字符串
    isContent: (str, str1) => {
        let res = str.indexOf(str1) > -1 ? true : false
        return res
    },

    // 判断是否为特定格式日期 2000.01.01 
    isYMDformat: (val) => {
        let value = /^((?:19|20)\d\d).(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[01])$/.test(val);
        return value;
    },
}
// 节流
export const throttle = function (fn, interval = 1000) {
    let lastTime = 0
    return function (...args) {
        const nowTime = new Date().getTime()
        const remainTime = nowTime - lastTime
        if (remainTime - interval >= 0) {
            fn.apply(this, args)
            lastTime = nowTime
        }
    }
}

// 倒计时
export const downTime = function (obj, num) {
    if (typeof (obj.times) == 'number') {
        return
    }
    if (!num) {
        num = 120
    }
    let oldTimes = obj.times;
    obj.times = --num;
    let timer = setInterval(function () {
        num--;
        if (num <= 0) {
            let str = "重新";
            if (oldTimes.indexOf("重新") > -1) {
                str = '';
            }
            num = str + oldTimes;
            sessionStorage.removeItem('times');
            clearInterval(timer)
        }
        obj.times = num;
        sessionStorage.setItem('times', num)
    }, 1000)
}


// 登录校验token
export function getToken() {
    const token = window.localStorage.getItem('token') || '';
    return token
}

export function setToken(token) {
    if (token) {
        window.localStorage.setItem('token', token);
    }
}

export function removeToken() {
    window.localStorage.removeItem('token');
}

// 埋点userId
export function getUid() {
    const userId = window.localStorage.getItem('userId') || '';
    return userId
}

export function setUid(uid) {
    if (uid) {
        window.localStorage.setItem('userId', uid);
    }
}

export function removeUid() {
    window.localStorage.removeItem('userId');
}


// 下载文件方法调用
export function downLoadFile(url) {
    const a = document.createElement("a");
    a.href = url;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 文件上传状态筛选
export function statusFilter(value) {
    const val = Number(value);
    switch (val) {
        case 1:
            return "已上传";
        default:
            return "未上传";
    }
}

// 融资状态筛选
export function FundStatusFilter(value) {
    const val = String(value);
    switch (val) {
        case '02':
            return "处理中";
        case '03':
            return "放款成功";
        case '98':
            return "放款拒绝";
        case '99':
            return "已取消";
        default:
            return "待发起";
    }
}