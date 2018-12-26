import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import GroupListHeader from "@/components/marketing/group/listHeader";
import GroupListTable from "@/components/marketing/group/listTable";
import { connect } from "dva";
import { Card } from "antd";

@connect()
class Group extends Component {
    render() {
        return <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <GroupListHeader {...this.props} />
                <GroupListTable {...this.props} />
            </Card>
        </PageHeaderWrapper>
    }
}
export default Group

