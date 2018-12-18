import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import EvaluateListHeader from "@/components/order/evaluate/list/header";
import EvaluateListTable from "@/components/order/evaluate/list/table";
import { Card } from "antd";
@connect()
export default class Evaluate extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <EvaluateListHeader {...this.props} />
                <EvaluateListTable {...this.props} />
            </Card>
            </PageHeaderWrapper>
        );
    }
}
