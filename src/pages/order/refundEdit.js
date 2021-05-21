import React, { Component } from "react";
import { View } from "@/components/flexView";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import RefundDetail from "@/pages/order/components/refund/detail";
import { Card } from "antd";

export default class RefundEdit extends Component {
    render() {
        const { location : {query}, history } = this.props;
        const { id } = query;

        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'orderrefund/info'}>
                <View className={`refundEdit`}>
                    <Card bordered={false}>
                        <RefundDetail
                            id={id}
                            history={history}
                            location={location}
                        />
                    </Card>
                </View>
            </PageHeaderWrapper>
        );
    }
}
