import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
@connect()
class SearchList extends Component {
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
            >
                {children}
            </PageHeaderWrapper>
        );
    }
}

export default SearchList;
