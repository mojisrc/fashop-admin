import React, { Component } from 'react';
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
@connect()
class WechatLayout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'oss':
                router.push(`${match.url}/oss`);
                break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: 'oss',
                tab: 'OSS',
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

export default WechatLayout;
