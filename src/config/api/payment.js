import { env } from '../root';

const ROOT_URL = `${env.domain}/admin/`;
export const PaymentApi = {
    edit: {
        url: `${ROOT_URL}payment/edit`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    info: {
        url: `${ROOT_URL}payment/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    }
}
