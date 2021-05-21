import React, { Component } from 'react';
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from '@/components/pageHeaderWrapper/index';
@connect()
class MicroblogLayout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'page':
                router.push(`${match.url}/page`);
                break;
            case 'info':
                router.push(`${match.url}/info`);
                break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: 'page',
                tab: '页面列表',
            },
            {
                key: 'info',
                tab: '基本信息',
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

export default MicroblogLayout;
