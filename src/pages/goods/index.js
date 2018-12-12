import React,{ Component } from "react";
import { View } from "react-web-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { getRoutes } from "../../utils";
export default class Index extends Component {
    render() {
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
            <Switch>
                {routes.map((item)=>{
                    console.log(item)
                    return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                })}
                <Redirect key="/goods" exact from="/goods" to="/goods/list" />
            </Switch>
        )
    }
}
