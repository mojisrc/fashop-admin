import React, { Component } from "react";
import { connect } from "react-redux";
import {  Card, Spin } from "antd";
import DescriptionList from '@/components/descriptionList';

import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const { Description } = DescriptionList;

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

            }
        });
    }

    render() {
        const { location: { query: { id } }, userInfo,  userInfoLoading } = this.props;

        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'asetswithdrawal/detail'}>
                <Card bordered={false}>
                        <Spin size="large" spinning={userInfoLoading}>
                            <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
                                <Description term="用户ID">xxxxxxxx</Description>
                                <Description term="昵称">xxxxxxxx</Description>
                                <Description term="姓名">xxxxxxxx</Description>
                                <Description term="手机号">xxxxxxxx</Description>
                            </DescriptionList>
                            <DescriptionList size="large" title="提现信息" style={{ marginBottom: 32 }}>
                                <Description term="申请金额">¥ 588.00</Description>
                                <Description term="提现方式">支付宝</Description>
                                <Description term="审核状态">待审核</Description>
                                <Description term="支付宝账号">xxxxxxxx</Description>
                                <Description term="姓名">xxxxxxxxx</Description>
                                <Description term="申请时间">xxxxxxx</Description>
                            </DescriptionList>
                        </Spin>

                    备注：xxxxxxxx  输入框
                    通过审核         驳回审核   如果做出弹出层呢？
                </Card>
            </PageHeaderWrapper>
        );
    }
}
