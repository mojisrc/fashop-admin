import React, { Component } from "react";
import { connect } from "dva";
import { Card } from "antd";
import { View } from "@/components/flexView";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import WechatPay from "@/components/setting/payment/wechatPay/index";
import UploadApi from "@/services/upload";

@connect()
export default class Index extends Component {

    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <WechatPay
                        action={UploadApi.addCert.url}
                        headers={{
                            todo:'todo'
                        }}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }

}
