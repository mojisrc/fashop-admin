//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs } from 'antd';
import { historyType } from '../../utils/flow';
import { Redirect, Route, Switch } from "react-router-dom";
import { getRoutes } from "../../utils";
import { dispatchProps } from "../../utils/defaultProps";
import * as routerRedux from 'react-router-redux';

const TabPane = Tabs.TabPane;

type Props = {
    history: historyType,
    getShopInfo: Function,
    editGoodsCategoryStyle: Function,
    editShopColorScheme: Function,
    editPortalTemplate: Function,
    shopInfo: {
        info: {
            logo: string,
            name: string,
            contact_number: string,
            description: string,
            portal_template_id: number,
            goods_category_style: number,
            color_scheme: number,
        }
    },
    routerData: {},
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string }
}
type State = {}

@connect()
export default class ShopList extends Component<Props, State> {
    render() {
        const tabList = [
            {
                key: 'main',
                tab: '总店',
            }, {
                key: 'second',
                tab: '二级分销商',
            }, {
                key: 'third',
                tab: '三级分销商',
            }, {
                key: 'applylist',
                tab: '申请列表',
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
            (path === 'main' || path === 'second' || path === 'third' || path === 'applylist') ?
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
                        <Redirect key="/shop/shopList" exact from="/shop/shopList" to="/shop/shopList/main" />
                    </Switch>
                }
            </div>
        )
    }
}
