import React, { Component } from "react";
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import '../utils/global.css'
import IndexLayout from "../components/index/layout"
import {getRoutes} from "../utils"
import {getRouterData} from "../config/router"
// import {
//     Exception403,
//     Exception404,
//     Exception500,
// } from "../pages/exception/view";
export default class BasicLayout extends Component {
    render() {
        const routerData = getRouterData();
        const {
            match,
            location
        } = this.props;
        const routes = getRoutes(match.path, routerData);
        // todo 面包屑不变的问题
        return (
            <IndexLayout location={location} routes={routes} routerData={routerData}>
                <Switch>
                    {getRoutes(match.path, routerData).map(item => (
                        <Route key={item.key} path={item.path} exact={item.exact} component={item.component} />
                    ))}
                    <Redirect exact from="/" to='/home/analysis' />
                </Switch>
            </IndexLayout>
        )
    }
}
