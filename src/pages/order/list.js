//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Page from '../../components/public/page'
import { historyType } from '../../utils/flow'
import Loadable from 'react-loadable';
import { Spin } from "antd";
import { getRoutes } from "../../utils";
import { Route, Switch } from "react-router-dom";
import { dispatchProps } from "../../utils/defaultProps";

const OrderManagementHeader = Loadable({
    loader: () => import('../../components/order/orderListHeader'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
const OrderManagementTable = Loadable({
    loader: () => import('../../components/order/orderListTable'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
type Props = {
    history: historyType,
    routerData: {},
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string }
}
type State = {}

@connect()
export default class List extends Component<Props, State> {

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
                        <OrderManagementHeader {...this.props} />
                        <OrderManagementTable {...this.props} />
                    </Page>
                )} />
            </Switch>
        )
    }
}
