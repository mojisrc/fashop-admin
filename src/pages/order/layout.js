import React, { Component } from 'react';
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from '@/components/pageHeaderWrapper/index';
@connect()
export default class Layout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'list':
                router.push(`${match.url}/list`);
                break;
            case 'refund':
                router.push(`${match.url}/refund`);
                break;
            case 'evaluate':
                router.push(`${match.url}/evaluate`);
                break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: 'list',
                tab: '订单管理',
            },
            {
                key: 'refund',
                tab: '退款售后',
            },
            {
                key: 'evaluate',
                tab: '评价管理',
            }
        ];

        const { match, children, location } = this.props;

        return (
            <PageHeaderWrapper
                hiddenBreadcrumb={true}
                tabList={tabList}
                tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
                onTabChange={this.handleTabChange}
                notPolicy
            >
                {children}
            </PageHeaderWrapper>
        );
    }
}

