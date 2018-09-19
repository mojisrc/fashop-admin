//@flow
import React,{ Component } from "react";
import { View } from "react-web-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { getRoutes } from "../../utils";
import { dispatchProps } from "../../utils/defaultProps";
type Props = {
    location:{state:{type:string}},
    history:{push:Function},
    routerData: {},
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string }
}

export default class Index extends Component<Props,{}> {
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
