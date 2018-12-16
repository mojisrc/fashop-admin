import React, { Component } from "react";
import { connect } from "react-redux";
import Page from "@/components/public/page";
import Loadable from "react-loadable";
import { Spin } from "antd";

const UserListTable = Loadable({
    loader: () => import("@/components/user/list/table"),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    }
});
// type Props = {
//     history: historyType,
//     routerData: {},
//     dispatch: dispatchProps,
//     location: { state: { type: string, record: {} }, search: string, pathname: string },
//     match: { url: string, path: string }
// }

@connect()
export default class List extends Component {
    render() {
        return (
            <Page>
                <UserListTable {...this.props} />
            </Page>
        );
    }
}
