import React, { PureComponent } from "react";
import Policy from "fashop-policy";

@connect(({ auth }) => ({
    policyList: auth.selfPolicy.result.list
}))
export default class CheckAuth extends PureComponent {
    static defaultProps = {
        policyList: [],
        action: ""
    };

    render() {
        const { policyList, action, children } = this.props;
        let policy = new Policy;
        if (Array.isArray(policyList)) {
            policyList.map(({ structure }) => {
                policy.addPolicy(structure);
            });
        }
        return policy.viewVerify(action) ? children : null;
    }
}
