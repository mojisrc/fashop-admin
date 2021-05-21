import React, { Component } from 'react';
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
@connect()
class WechatLayout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'goods':
                router.push(`${match.url}/goods`);
                break;
            // case 'groupGoods':
            //     router.push(`${match.url}/groupGoods`);
            //     break;
            // case 'wechat':
            //     router.push(`${match.url}/wechat`);
            //     break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: 'goods',
                tab: '商品海报',
            },
            // {
            //     key: 'groupGoods',
            //     tab: '拼团海报',
            // },
            // {
            //     key: 'wechat',
            //     tab: '小程序海报',
            // }
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

export default WechatLayout;
