import imageUpload from "./imageUpload";
import { parse, stringify } from "qs";

function getPageQuery() {
    return parse(window.location.href.split("?")[1]);
}

function getQueryPath(path = "", query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}


/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

function isUrl(path) {
    return reg.test(path);
}

function parsePrice(price) {
    price = isNaN(price) || !price ? 0.00 : price;
    return parseFloat(parseFloat(price).toFixed(2));
}

export const isObject = (obj) => {
    return typeof obj === "object" && obj !== null;
};

export const isEqual = (obj1, obj2) => {
    // 两个数据有任何一个不是对象或数组
    if (!isObject(obj1) || !isObject(obj2)) {
        // 值类型(注意：参与equal的一般不会是函数)
        return obj1 === obj2;
    }
    // 如果传的两个参数都是同一个对象或数组
    if (obj1 === obj2) {
        return true;
    }

    // 两个都是对象或数组，而且不相等
    // 1.先比较obj1和obj2的key的个数，是否一样
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    // 如果key的个数相等,就是第二步
    // 2.以obj1为基准，和obj2依次递归比较
    for (let key in obj1) {
        // 比较当前key的value  --- 递归
        const res = isEqual(obj1[key], obj2[key]);
        if (!res) {
            return false;
        }
    }
    return true;
};
export const isEmpty = (value) => {

    if (value == null) {
        return true;
    }
    if (value === "") {
        return true;
    }
    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    if (typeof value === "object") {
        var arr = Object.keys(value);
        if (arr.length === 0) {
            return true;
        }
    }
    return false;
};
export {
    imageUpload,
    getPageQuery,
    getQueryPath,
    isUrl,
    parsePrice
};

