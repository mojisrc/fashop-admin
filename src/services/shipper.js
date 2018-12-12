import { env } from '../root';
import Fetch from "@/utils/fetch";
const ROOT_URL = `${env.domain}/admin/`;
export const ShipperApi = {
    list:{
        url: `${ROOT_URL}shipper/list`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    info:{
        url: `${ROOT_URL}shipper/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    add:{
        url: `${ROOT_URL}shipper/add`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    edit:{
        url: `${ROOT_URL}shipper/edit`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    del:{
        url: `${ROOT_URL}shipper/del`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setDefault:{
        url: `${ROOT_URL}shipper/setDefault`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    }
}
