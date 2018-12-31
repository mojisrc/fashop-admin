//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Page from '../../components/public/page'
import { getRoutes } from "../../utils";
import { Route, Switch } from "react-router-dom";
import { historyType } from "../../utils/flow";
import { dispatchProps } from "../../utils/defaultProps";
import Loadable from "react-loadable";
import { Spin } from "antd";
const ShopListTable = Loadable({
    loader: () => import('../../components/shop/shopList/index'),
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

@connect()
export default class Second extends Component<Props, {}> {
    static defaultProps = {
        userType: 2 //设置查询2级分销商
    }
    render() {
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
            <Switch>
                {routes.map((item) => {
                    return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                })}
                <Route key="/list" render={() => (
                    <Page>
                        {/*<UserListHeader {...this.props}/>*/}
                        <ShopListTable {...this.props} />
                    </Page>
                )} />
            </Switch>
        )
    }
}
