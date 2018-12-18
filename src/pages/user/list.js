import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import UserListTable from "@/components/user/list/table";
import { Card } from "antd";

@connect()
export default class List extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <UserListTable {...this.props} />
                </Card>
            </PageHeaderWrapper>
        );
    }
}
