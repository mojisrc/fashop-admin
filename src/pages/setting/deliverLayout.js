import React, { Component } from 'react';
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
@connect()
class DeliverLayout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'shipper':
                router.push(`${match.url}/shipper`);
                break;
            case 'express':
                router.push(`${match.url}/express`);
                break;
            case 'freight':
                router.push(`${match.url}/freight`);
                break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: 'shipper',
                tab: '商家地址库',
            },
            {
                key: 'express',
                tab: '物流管理',
            },
            {
                key: 'freight',
                tab: '运费模板',
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

export default DeliverLayout;
