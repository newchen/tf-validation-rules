export const patternPhone = /^0?1[3|4|5|7|8][0-9]{9}$/; // 手机

export const patternTel = /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-?[0-9]{1,4})?$/; // 固话

export const patternVolume = /^(([0-9]|([1-9][0-9]{0,7}))((\.[0-9]{1,2})?))$/;

export const patternBankCard = /^([0-9]{16,20})$/;

// 验证是否是手机号
export const isPhone = str => {
    return !!patternPhone.test(str);
};

// 验证是否是固话
export const isTel = str => {
    return !!patternTel.test(str);
};

// 验证是否是手机号和固话
export const isPhoneAndTel = str => {
    return isPhone(str) || isTel(str);
};

// 驾驶证号
export const isDrivingLicenseNumber = str => {
    return /^[0-9a-zA-Z]{15}$/.test(str) || /^[0-9a-zA-Z]{18}$/.test(str);
};

// 体积(整数<9位,小数<3位)
export const isVolume = str => {
    return !!patternVolume.test(str);
};

// 金额
export const isAmount = str => {
    return !!/^\d+(\.\d{1,2})?$/.test(str);
};

// 验证是否是银行卡
export const isBankCard = str => {
    return !!patternBankCard.test(str);
};

// 身份证有些是15位的
function isValidityBrithBy15IdCard(idCard15) {
    let year = idCard15.substring(6, 8);
    let month = idCard15.substring(8, 10);
    let day = idCard15.substring(10, 12);
    let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (
        temp_date.getYear() != parseFloat(year) ||
        temp_date.getMonth() != parseFloat(month) - 1 ||
        temp_date.getDate() != parseFloat(day)
    ) {
        return false;
    }

    return true;
}

/**
 * 校验身份证合法性
 * @param {String} code
 * @returns {Boolean} true:合法，false:非法
 */
export function isIdentityCodeValid(code) {
    code = code.toUpperCase();

    let reg,
        city = {
            11: '北京',
            12: '天津',
            13: '河北',
            14: '山西',
            15: '内蒙古',
            21: '辽宁',
            22: '吉林',
            23: '黑龙江 ',
            31: '上海',
            32: '江苏',
            33: '浙江',
            34: '安徽',
            35: '福建',
            36: '江西',
            37: '山东',
            41: '河南',
            42: '湖北 ',
            43: '湖南',
            44: '广东',
            45: '广西',
            46: '海南',
            50: '重庆',
            51: '四川',
            52: '贵州',
            53: '云南',
            54: '西藏 ',
            61: '陕西',
            62: '甘肃',
            63: '青海',
            64: '宁夏',
            65: '新疆',
            71: '台湾',
            81: '香港',
            82: '澳门',
            91: '国外 ',
        };

    if (!city[code.substr(0, 2)]) {
        return false;
    }

    if (code.length == 15) {
        reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

        if (reg.test(code)) {
            return isValidityBrithBy15IdCard(code);
        }

        return false;
    } else if (code.length == 18) {
        reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;

        if (!reg.test(code)) {
            return false;
        } else {
            code = code.split('');
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // 校验位
            let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }

            if (parity[sum % 11] != code[17]) {
                return false;
            }
            return true;
        }
    }

    return false;
}
