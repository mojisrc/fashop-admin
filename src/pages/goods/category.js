import React, { Component } from "react";
import GoodsCategoryTable from '../../components/goods/categoryTable'
import { Route, Switch } from "react-router-dom";
import { getRoutes } from "../../utils";
import Page from "../../components/public/page";
export default class GoodsCategory extends Component {
    render() {
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
            <Page>
                <Switch>
                    {routes.map(item => (
                        <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                    ))}
                    <Route key="/category" render={() => (
                        <GoodsCategoryTable {...this.props} />
                    )} />
                </Switch>
            </Page>
        )
    }
}
