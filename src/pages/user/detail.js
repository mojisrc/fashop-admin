import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Row, Col, Card, Spin } from "antd";
import { View } from "@/components/flexView";
import styles from "@/styles/customer/customerDetail.css";
import ShoppingInfo from "@/components/user/detail/shopping";
import ReceiveInfo from "@/components/user/detail/receive";
import Image from "@/components/image";
import { Tabs, Row, Col } from 'antd';
import { View } from "react-web-dom";
import Page from '../../components/public/page'
import styles from '../../styles/customer/customerDetail.css'
import ShoppingInfo from "../../components/user/shoppingInfo";
import ReceiveInfo from "../../components/user/receiveInfo";
import Retailer from "../../components/user/retailer";
import Image from "../../components/image";
import moment from "moment/moment";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const TabPane = Tabs.TabPane;

@connect(({ user, loading }) => ({
    userInfo: user.info.result.info,
    userStatistics: user.statistics.result.info,
    userInfoLoading: loading.effects["user/info"]
}))

export default class Detail extends Component {
    static defaultProps = {
        userInfoLoading: true,
        userInfo: {
            avatar: "",
            nickname: "",
            sex: 1,
            create_time: null,
            phone: null,
            birthday: null,
            customer_source: null
        },
        userStatistics: {
            refund_times: 0,
            refund_total: 0,
            buy_times: 0,
            cost_average: 0,
            cost_total: 0
        }
    };
    state = {
        tabsActiveKey: "1"
    };


    componentWillMount() {
        const { location: { query: { id } }, dispatch } = this.props;
        dispatch({
            type: "user/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    dispatch({
                        type: "user/statistics",
                        payload: { id }
                    });
                }
            }
        });
    }

    render() {
        const { tabsActiveKey } = this.state;
        const { location: { query: { id } }, userInfo, userStatistics, userInfoLoading } = this.props;
        const { avatar, nickname, sex, create_time, phone, customer_source } = userInfo;
        const { refund_times, refund_total, buy_times, cost_average, cost_total } = userStatistics;
        const tabsList = [
            {
                key: `1`,
                name: "交易状况",
                render: () =>
                    <ShoppingInfo
                        user_id={id}
                        refund_times={refund_times}
                        refund_total={refund_total}
                        buy_times={buy_times}
                        cost_average={cost_average}
                        cost_total={cost_total}
                    />
            }, {
                key: `2`,
                name: "收货信息",
                render: () =>
                    <ReceiveInfo
                        user_id={id}
                    />
                </Page>
            }, {
                key: `3`,
                name: '分销商设置',
                render: () => <Page>
                    <Retailer
                        user_id={id}
                    />
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <View className={`${styles.refundEditWarp} refundEdit`}>
                        <Spin size="large" spinning={userInfoLoading}>
                            <Row>
                                <Col span={2}>
                                    <Image
                                        type='avatar'
                                        src={avatar}
                                        style={{ width: 90, height: 90 }}
                                    />
                                </Col>
                                <Col span={5}>
                                    <View className={styles.infoView}>
                                        <p>昵称：<span>{nickname}</span></p>
                                        <p>性别：<span>{sex === 1 ? "男" : sex === 2 ? "女" : "未知"}</span></p>
                                        <p>注册时间：<span>{moment(create_time, "X").format("YYYY-MM-DD HH:mm:ss")}</span>
                                        </p>
                                    </View>
                                </Col>
                                <Col span={5}>
                                    <View className={styles.infoView}>
                                        <p>手机号：<span>{phone}</span></p>
                                        {/*<p>生日：<span>{birthday ? moment(birthday, "X").format("YYYY-MM-DD HH:mm:ss") : "-"}</span></p>*/}
                                        <p>客户来源：<span>{customer_source ? customer_source : "-"}</span></p>
                                    </View>
                                </Col>
                            </Row>
                            <Tabs
                                activeKey={tabsActiveKey}
                                onChange={(key) => {
                                    this.setState({
                                        tabsActiveKey: key
                                    });
                                }}
                            >
                                {
                                    tabsList.map(({ name, key, render }) =>
                                        <TabPane tab={name} key={key}>
                                            {
                                                render()
                                            }
                                        </TabPane>
                                    )
                                }
                            </Tabs>
                        </Spin>
                    </View>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
