import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const ArticleApi = {
    list: {
        url: `${ROOT_URL}Article/list`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    info: {
        url: `${ROOT_URL}Article/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    }
}
