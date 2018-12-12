import React,{ Component } from "react";
import Page from '../../components/public/page'
import Loadable from "react-loadable";
import { Spin } from "antd";
import { getRoutes } from "../../utils";
import {  Route, Switch } from "react-router-dom";

const GoodsListHeader = Loadable({
    loader: () => import('../../components/goods/listHeader'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
const GoodsListTable = Loadable({
    loader: () => import('../../components/goods/listTable'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
export default class GoodsList extends Component {
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
                        <GoodsListHeader {...this.props}/>
                        <GoodsListTable {...this.props}/>
                    </Page>
                )} />
            </Switch>

        )
    }
}
