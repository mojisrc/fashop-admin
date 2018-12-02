import { env } from '../root';

const ROOT_URL = `${env.domain}/admin/`;
export const UploadApi = {
    addImage: {
        url: `${ROOT_URL}Upload/addImage`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    addCert: {
        url: `${ROOT_URL}Upload/addCert`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    }
}
