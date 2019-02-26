import { stringify } from "qs";

import Model from "@/utils/models";

const options = {
    namespace: "auth",
    api: [
        {
            request: "GET /admin/auth/moduleList",
            response: { result: { list: [] } }
        },
        {
            request: "GET /admin/auth/actionList",
            response: { result: { list: [] } }
        },
        {
            request: "GET /admin/auth/policyList",
            response: { result: { total_number: 0, list: [] } }
        },
        {
            request: "GET /admin/auth/policyInfo",
            response: { result: { info: {} } }
        },
        {
            request: "POST /admin/auth/policyAdd"
        },
        {
            request: "POST /admin/auth/policyEdit"
        },
        {
            request: "POST /admin/auth/policyDel"
        },
        {
            request: "GET /admin/auth/groupList",
            response: { result: { info: {} } }
        },
        {
            request: "POST /admin/auth/groupAdd"
        },
        {
            request: "POST /admin/auth/groupEdit"
        },
        {
            request: "GET /admin/auth/groupInfo",
            response: { result: { info: {} } }
        },
        {
            request: "POST /admin/auth/groupDel"
        },
        {
            request: "GET /admin/auth/groupPolicyList",
            response: { result: { total_number: 0, list: [] } }
        },
        {
            request: "POST /admin/auth/groupPolicyAdd"
        },
        {
            request: "POST /admin/auth/groupPolicyDel"
        },
        {
            request: "GET /admin/auth/groupMemberList",
            response: { result: { total_number: 0, list: [] } }
        },
        {
            request: "POST /admin/auth/groupMemberAdd"
        },
        {
            request: "POST /admin/auth/groupMemberDel"
        },
        {
            request: "GET /admin/auth/userList",
            response: { result: { total_number: 0, list: [] } }
        },
        {
            request: "GET /admin/auth/selfPolicy",
            response: { result: { list: [] } }
        }
    ],
    state: {},
    effects: {},
    reducers: {},
    subscriptions: {}
};
export default Model.getInstance(options).create();

