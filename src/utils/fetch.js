import { fetchData } from "ws-web-utils";
import store from "../store";
import { replace } from 'react-router-redux'
import { userSignOut } from '../actions/member'
import { message } from 'antd';
import { getHeaders } from './index';
// TODO 升级错误码
export default class Fetch {
    static fetch({ api, params = {} }) {
        return fetchData.fetch({ api, params, })
            .then((e) => {
                switch (e.code) {
                    case 10005:
                        store.dispatch(userSignOut())
                        store.dispatch(replace('/member/login'))
                        break;
                    case 90001:
                        message.error('没有权限')
                        break;
                    default:
                        break;
                }
                return e
            })
            .catch((err, arr) => {
                if (err) {
                    console.log(err)
                    return { code: -1, msg: err.name + ':' + err.message }
                } else {
                    console.log(arr)
                    return { code: -1, msg: '服务器返回异常' }
                }
            })
    }

    static formData(url, formdata) {
        return fetch(url, {
            method: "POST",
            headers: {
                ...getHeaders(),
            },
            body: formdata,
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
    }
}
