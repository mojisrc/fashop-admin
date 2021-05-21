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

export {
    imageUpload,
    getPageQuery,
    getQueryPath,
    isUrl,
    parsePrice
};
