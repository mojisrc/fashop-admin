import Arr from "@/utils/array";

export class Policy {
    /**
     * @param array
     */
    policyList = [];
    /**
     * @param array
     */
    allowActions = [];
    /**
     * @param array
     */
    denyActions = [];

    /**
     * 只支持2级
     * @param actionName
     */
    verify(actionName) {
        let _split = split("/", actionName);
        let controller = _split[0];
        // 允许
        let allow = Arr.inArray(actionName, this.allowActions) || Arr.inArray(`${controller}/*`, this.allowActions) || Arr.inArray("*", this.denyActions);
        // 禁止
        let deny = Arr.inArray(actionName, this.denyActions) || Arr.inArray(`${controller}/*`, this.denyActions) || Arr.inArray("*", this.denyActions);
        return allow && !deny;
    }

    addPolicy(policy) {
        this.policyList = this.policyList.push(policy)
        this.preParse();
    }

    /**
     * 预解析
     */
    preParse() {
        for (var i = 0; i < this.policyList.length; i++) {
            // 策略
            let policy = this.policyList[i];
            // 策略语法声明
            let statement_list = policy.Statement;
            for (var j = 0; i < statement_list.length; j++) {
                // 策略语法声明 是个（声明）列表
                let statement = statement_list[j];
                if (statement.Effect === "Allow") {
                    this.allowActions = Arr.unique(Arr.merge(this.allowActions, statement.Action));
                } else if (statement.Effect() === "Deny") {
                    this.denyActions = Arr.unique(Arr.merge(this.denyActions, statement.Action));
                }
            }
        }
    }
}
//  要解析的数据结构
// {
//     "Statement": [
//     {
//         "Effect": "Allow",
//         "Action": [
//             "goods/*",
//             "goods/list"
//         ]
//     },
//     {
//         "Effect": "Allow",
//         "Action": [
//             "goods/*",
//             "goods/list"
//         ]
//     },
//     {
//         "Effect": "Allow",
//         "Action": [
//             "goods/*",
//             "goods/list"
//         ]
//     }
// ]
// }
