import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
@connect()
class SearchList extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'page':
        router.push(`${match.url}/page`);
        break;
      case 'category':
        router.push(`${match.url}/category`);
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
      {
        key: 'page',
        tab: '店铺主页',
      },
      {
        key: 'category',
        tab: '店铺分类页',
      }
    ];

    const { match, children, location } = this.props;

    return (
      <PageHeaderWrapper
        title="搜索列表"
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
        hiddenBreadcrumb={true}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
