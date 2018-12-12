import { env } from '../root';
import Fetch from "@/utils/fetch";
const ROOT_URL = `${env.domain}/admin/`;
export const ImageApi = {
    list: {
        url: `${ROOT_URL}image/list`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    add: {
        url: `${ROOT_URL}image/add`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    }
}
