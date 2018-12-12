import React, { Component } from "react";
import { connect } from "react-redux";
import Page from '../../components/public/page'
import { historyType } from '../../utils/flow'
import Loadable from 'react-loadable';
import { Spin } from "antd";
import { getRoutes } from "../../utils";
import { Route, Switch } from "react-router-dom";
const OrderHeader = Loadable({
    loader: () => import('../../components/order/orderListHeader'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
const OrderTable = Loadable({
    loader: () => import('../../components/order/orderListTable'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})

@connect()
export default class List extends Component {

    render() {
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);

        return (
            <Switch>
                {routes.map((item)=>{
                    return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                })}
                <Route key="/list" render={() => (
                    <Page>
                        <OrderHeader {...this.props} />
                        <OrderTable {...this.props} />
                    </Page>
                )} />
            </Switch>
        )
    }
}
