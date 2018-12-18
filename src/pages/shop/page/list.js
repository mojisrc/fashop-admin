import React, { Component } from "react";
import { View } from "@/components/flexView";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "dva";
import { Card } from "antd";
import MyTemplate from "@/components/shop/index/myTemplate";
@connect()
export default class DecoratePortal extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "shop/info",
        });
    }

    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <MyTemplate {...this.props} />
            </Card>
            </PageHeaderWrapper>
        );
    }
}
