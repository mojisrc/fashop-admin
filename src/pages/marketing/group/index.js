import React, { Component } from "react";
import { connect } from "react-redux";
import Page from '../../../components/public/page/index'
import { historyType } from '../../../utils/flow'
import Loadable from 'react-loadable';
import { Spin } from "antd";
import { getRoutes } from "../../../utils/index";
import { Redirect, Route, Switch } from "react-router-dom";
import { dispatchProps } from "../../../utils/defaultProps";

const ListTable = Loadable({
    loader: () => import('../../../components/marketing/group/listTable/index'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
@connect()
export default class GroupIndex extends Component {

    render() {
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        console.log(routerData)
        return (
            <Switch>
                {/*{routes.map((item)=>{*/}
                    {/*return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />*/}
                {/*})}*/}
                {/*<Route exact path="/marketing/group" render={() => <Redirect to="/marketing/group/list"/>}/>*/}
            </Switch>
        )
    }
}
