import React, { Component } from "react";
import FreightListTable from '@/components/freight/list/table/index'
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import { Card } from "antd";
export default class Deliver extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <FreightListTable {...this.props} />
            </Card>
            </PageHeaderWrapper>
        )
    }
}
