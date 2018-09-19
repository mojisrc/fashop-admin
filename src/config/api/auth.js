import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const AuthApi = {
    groupAuthorise: {
        url: `${ROOT_URL}auth/groupAuthorise`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    ruleTree: {
        url: `${ROOT_URL}auth/ruleTree`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    groupInfo: {
        url: `${ROOT_URL}auth/groupInfo`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    groupMemberEdit: {
        url: `${ROOT_URL}auth/groupMemberEdit`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    groupDel: {
        url: `${ROOT_URL}auth/groupDel`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    groupAdd: {
        url: `${ROOT_URL}auth/groupAdd`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    groupEdit: {
        url: `${ROOT_URL}auth/groupEdit`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    groupMemberList: {
        url: `${ROOT_URL}auth/groupMemberList`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    groupList: {
        url: `${ROOT_URL}auth/groupList`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    }
}
