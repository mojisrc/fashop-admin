import React, { Component } from "react";
import ExpressListTable from '@/components/express/list/table/index'
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import { Card } from "antd";
export default class List extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <ExpressListTable history={this.props.history} />
            </Card>
            </PageHeaderWrapper>
        )
    }

}
