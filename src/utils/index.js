import imageUpload from "./imageUpload";
import { parse, stringify } from "qs";

export { fetchStatus, storageModule } from "ws-web-utils";
const getHeaders = () => {
    const { member } = store.getState().app;
    const { userInfo } = member;
    return {
        "User-Id": userInfo ? userInfo.user_id : null,
        "Access-Token": userInfo ? userInfo.access_token : null
    };
};

function unique(arr) {
    const seen = new Map();
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1));
}

function type(o) {
    var s = Object.prototype.toString.call(o);
    return s.slice(s.indexOf(" ") + 1, s.length - 1).toLowerCase();
}


function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn("Two path are equal!"); // eslint-disable-line
    }
    const arr1 = str1.split("/");
    const arr2 = str2.split("/");
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1;
    } else if (arr1.every((item, index) => item === arr2[index])) {
        return 2;
    }
    return 3;
}

function getRenderArr(routes) {
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i += 1) {
        // 去重
        renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
        // 是否包含
        const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    }
    return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(
        routePath => routePath.indexOf(path) === 0 && routePath !== path
    );
    // Replace path to '' eg. path='user' /user/name => name
    routes = routes.map(item => item.replace(path, ""));
    // Get the route to be rendered to remove the deep rendering
    const renderArr = getRenderArr(routes);
    // Conversion and stitching parameters
    return renderArr.map(item => {
        const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
        return {
            exact,
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`
        };
    });
}


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

export {
    imageUpload,
    getHeaders,
    getRoutes,
    getPageQuery,
    getQueryPath,
    isUrl,
    parsePrice
};
