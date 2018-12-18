import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Row, Col, Card } from "antd";
import { View } from "@/components/flexView";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import styles from "@/styles/customer/customerDetail.css";
import ShoppingInfo from "@/components/user/shopping";
import ReceiveInfo from "@/components/user/receive";
import Image from "@/components/image";
import moment from "moment/moment";

const TabPane = Tabs.TabPane;
// type Props = {
//     location: { state: { type: string, record: {} }, search: string },
//     history: { push: Function }
// }
// type States = {
//     user: {
//         avatar: string,
//         nickname: string,
//         sex: number,
//         create_time: number,
//         phone: string,
//         birthday: number,
//         customer_source: string,
//     },
//     statistics: {
//         refund_times: number,
//         refund_total: number,
//         buy_times: number,
//         cost_average: number,
//         cost_total: number,
//     },
//     tabsActiveKey: string
// }
@connect()
export default class Detail extends Component {
    state = {
        user: {
            avatar: "",
            nickname: "",
            sex: 0,
            create_time: 0,
            phone: "",
            birthday: 0,
            customer_source: ""
        },
        statistics: {
            refund_times: 0,
            refund_total: 0,
            buy_times: 0,
            cost_average: 0,
            cost_total: 0
        },
        tabsActiveKey: "1"
    };

    async componentWillMount() {
        const { location } = this.props;
        const { id } = parseQuery(location.search);
        const response = await getUserInfo({ params: { id } });
        if (response.code === 0) {
            const { info } = response.result;
            this.setState({
                user: info
            });
        }
        const statisticsResponse = await getUserStatistics({ params: { id } });
        if (statisticsResponse.code === 0) {
            const { info } = statisticsResponse.result;
            this.setState({
                statistics: info
            });
        }
    }

    render() {
        const { location, history } = this.props;
        const { user, statistics, tabsActiveKey } = this.state;
        const { id } = parseQuery(location.search);
        const { avatar, nickname, sex, create_time, phone, birthday, customer_source } = user;
        const { refund_times, refund_total, buy_times, cost_average, cost_total } = statistics;
        const tabsList = [
            {
                key: `1`,
                name: "交易状况",
                render: () => <Card bordered={false}>
                    <ShoppingInfo
                        user_id={id}
                        history={history}
                        refund_times={refund_times}
                        refund_total={refund_total}
                        buy_times={buy_times}
                        cost_average={cost_average}
                        cost_total={cost_total}
                    />
                </Card>
            }, {
                key: `2`,
                name: "收货信息",
                render: () => <Card bordered={false}>
                    <ReceiveInfo
                        user_id={id}
                    />
                </Card>
            }
        ];
        return (
            <View className={`${styles.refundEditWarp} refundEdit`}>
                <Row className={styles.detailTop}>
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
                            <p>注册时间：<span>{moment(create_time, "X").format("YYYY-MM-DD HH:mm:ss")}</span></p>
                        </View>
                    </Col>
                    <Col span={5}>
                        <View className={styles.infoView}>
                            <p>手机号：<span>{phone}</span></p>
                            <p>生日：<span>{birthday ? moment(birthday, "X").format("YYYY-MM-DD HH:mm:ss") : "-"}</span>
                            </p>
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
            </View>
        );
    }
}
