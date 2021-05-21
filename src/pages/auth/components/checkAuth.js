import React, { PureComponent } from "react";
import Policy from "fashop-policy";

@connect(({ auth, member }) => ({
    policyList: auth.selfPolicy.result.list,
    self: member.self.result.info
}))
export default class CheckAuth extends PureComponent {
    static defaultProps = {
        policyList: [],
        action: ""
    };

    render() {
        if (self.id !== 1) {
            const { policyList, action, children } = this.props;
            let policy = new Policy;
            if (Array.isArray(policyList)) {
                policyList.map(({ structure }) => {
                    policy.addPolicy(structure);
                });
            }
            return policy.viewVerify(action) ? children : null;
        } else {
            return children;
        }
    }
}
