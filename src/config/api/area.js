import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const AreaApi = {
    list: {
        url: `${ROOT_URL}Area/list`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    }
}
