import React, { Component } from "react";
import { connect } from "umi";
import { Tabs, Row, Col, Card, Spin } from "antd";
import { View } from "@/components/flexView";
import styles from "@/styles/customer/customerDetail.css";
import ShoppingInfo from "@/pages/user/components/detail/shopping";
import ReceiveInfo from "@/pages/user/components/detail/receive";
import Image from "@/components/image";
import dayjs from "dayjs";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import User from "@/utils/user";

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
            source: null
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
        const { avatar, nickname, sex, create_time, phone, source } = userInfo;
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
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"user/info"}>
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
                                        <p>注册时间：<span>{dayjs(create_time * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
                                        </p>
                                    </View>
                                </Col>
                                <Col span={5}>
                                    <View className={styles.infoView}>
                                        <p>手机号：<span>{phone}</span></p>
                                        {/*<p>生日：<span>{birthday ? dayjs(birthday* 1000).format("YYYY-MM-DD HH:mm:ss") : "-"}</span></p>*/}
                                        <p>注册来源：<span>{User.sourceString(source)}</span></p>
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
