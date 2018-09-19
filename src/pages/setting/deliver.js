//@flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { Tabs } from 'antd';

import {
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

//可配送区域
import { getRoutes } from "../../utils"
import * as routerRedux from 'react-router-redux';

const TabPane = Tabs.TabPane;
type Props = {
    history: { push: Function },
    location: { state: { activeKey: string } }
}
type State = {
    activeKey: string
}

@connect()
export default class Deliver extends Component<Props, State> {
    state = {
        activeKey: 'shipper'
    }

    render() {
        const {  dispatch } = this.props
        const { match, routerData, location } = this.props;

        console.log(this.props)
        const routes = getRoutes(match.path, routerData);
        const TabsStyle = {
            tab: {
                paddingLeft: "20px",
                backgroundColor: "#fff",
                borderBottom: "1px solid #e9e9e9",
                marginBottom: "0px"
            }
        }
        const tabList = [
            {
                key: 'shipper',
                tab: '商家地址库',
            }, {
                key: 'express',
                tab: '物流管理',
            }, {
                key: 'freight',
                tab: '运费模板',
            }
        ]
        const path = location.pathname.replace(`${match.path}/`, '')
        const TabsView = (
            (path === 'shipper' || path === 'express' || path === 'freight') ?
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
                {
                    TabsView ? TabsView : ''
                }
                {
                    <Switch>
                        {routes.map(item => (
                            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                        ))}
                        <Redirect exact from="/setting/deliver" to="/setting/deliver/shipper" />
                    </Switch>
                }

            </div>
        )
    }
}
