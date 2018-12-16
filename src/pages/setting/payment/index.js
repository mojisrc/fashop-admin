import React, { Component } from "react";
import { connect } from "dva";
import { Tabs } from "antd";
import { View } from "react-web-dom";
import Page from "@/components/public/page/index";
import styles from "@/styles/setting/paymentSetting.css";
import WechatPay from "@/components/setting/payment/wechatPay/index";
import { getHeaders } from "@/utils/index";
import UploadApi from "@/services/upload";

const TabPane = Tabs.TabPane;
@connect()
export default class Index extends Component {

    render() {
        const { location } = this.props;
        const tabsList = [
            {
                id: `1`,
                tab: "微信支付",
                type: "wechat_pay",
                view: () => <WechatPay
                    action={UploadApi.addCert.url}
                    headers={getHeaders()}
                />
            }
        ];
        return (
            <View className={`${styles.paymentSettingWarp} paymentSetting`}>
                <Tabs
                    activeKey={location.state ? location.state.type : "wechat_pay"}
                    onChange={(key) => {
                        router.push({
                            pathname: "/setting/payment",
                            state: {
                                type: key
                            }
                        });
                    }}
                >
                    {
                        tabsList.map(({ tab, id, type, view }) =>
                            <TabPane tab={tab} key={type}>
                                <Page>
                                    {
                                        view ? view() : null
                                    }
                                </Page>
                            </TabPane>
                        )
                    }
                </Tabs>
            </View>
        );
    }

}
