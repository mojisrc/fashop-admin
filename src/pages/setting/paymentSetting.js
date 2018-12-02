//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {  Tabs } from 'antd';
import { View } from "react-web-dom";
import Page from '../../components/public/page'
import styles from '../../styles/setting/paymentSetting.css'
import WechatPay from '../../components/setting/paymentSetting/wechatPay'
import { formType, historyType } from "../../utils/flow";
import { dispatchProps } from "../../utils/defaultProps";
import { getHeaders } from '../../utils/index';
import { UploadApi } from '../../config/api/upload'

const TabPane = Tabs.TabPane;
type Props = {
    history: historyType,
    routerData: {},
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string },
    form: formType,
}
type State = {}

@connect()
export default class PaymentSetting extends Component<Props, State> {

    render() {
        const { location, history } = this.props
        const tabsList = [
            {
                id: `1`,
                tab: '微信支付',
                type: 'wechat_pay',
                view: () => <WechatPay
                    action={UploadApi.addCert.url}
                    headers={getHeaders()}
                />
            }
        ]
        return (
            <View className={`${styles.paymentSettingWarp} paymentSetting`}>
                <Tabs
                    activeKey={location.state ? location.state.type : 'wechat_pay'}
                    onChange={(key) => {
                        history.push({
                            pathname: '/setting/paymentSetting',
                            state: {
                                type: key
                            }
                        })
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
        )
    }

}
