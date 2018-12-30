import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
@connect()
class WechatLayout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'base':
                router.push(`${match.url}/base`);
                break;
            case 'miniTemplate':
                router.push(`${match.url}/miniTemplate`);
                break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: 'base',
                tab: '基础设置',
            },
            {
                key: 'miniTemplate',
                tab: '小程序模板消息',
            }
        ];

        const { match, children, location } = this.props;

        return (
            <PageHeaderWrapper
                hiddenBreadcrumb={true}
                tabList={tabList}
                tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
                onTabChange={this.handleTabChange}
            >
                {children}
            </PageHeaderWrapper>
        );
    }
}

export default WechatLayout;
