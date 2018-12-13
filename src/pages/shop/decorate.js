import React, { Component } from "react";
import { connect } from 'dva';
import { Tabs } from 'antd';
import { historyType } from '@/utils/flow';
import { Redirect, Route, Switch } from "react-router-dom";
import { getRoutes } from "@/utils";
import * as routerRedux from 'react-router-redux';
const TabPane = Tabs.TabPane;
@connect()
export default class Decorate extends Component {
    render() {
        const tabList = [
            {
                key: 'portal',
                tab: '店铺主页',
            }, {
                key: 'category',
                tab: '店铺分类页',
            }
        ]
        const TabsStyle = {
            tab: {
                paddingLeft: "20px",
                backgroundColor: "#fff",
                borderBottom: "1px solid #e9e9e9",
                marginBottom: "0px"
            }
        }
        const { match, routerData, location, dispatch } = this.props;
        const routes = getRoutes(match.path, routerData);

        const path = location.pathname.replace(`${match.path}/`, '')
        const TabsView = (
            (path === 'portal' || path === 'category') ?
                <Tabs
                    activeKey={path}
                    tabBarStyle={TabsStyle.tab}
                    onChange={(activeKey) => {
                        dispatch(routerRedux.push(`${match.url}/${activeKey}`))
                    }}
                >
                    {tabList.map((tabListItem) => <TabPane tab={tabListItem.tab} key={tabListItem.key} />)}
                </Tabs> : null
        )
        return (
            <div>
                {TabsView ? TabsView : null}
                {
                    <Switch>
                        {routes.map((item)=>{
                            return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                        })}
                        <Redirect key="/shop/decorate" exact from="/shop/decorate" to="/shop/decorate/portal" />
                    </Switch>
                }
            </div>
        )
    }
}
