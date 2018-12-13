import React, { Component } from "react";
import { connect } from "dva";
import Page from "@/components/public/page";
import { Spin } from "antd";
import { getRoutes } from "@/utils";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Query from "@/utils/query";
import moment from "moment/moment";
import article from "@/services/article";

const TableList = Loadable({
    loader: () => import("@/components/article/list"),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    }
});
@connect()
export default class List extends Component {
    state = {
        articleList: {
            list: [],
            total_number: 0,
            page: 1,
            rows: 10
        }
    };

    async componentDidMount() {
        const params = Query.invokerForListParams([
            { key: "state", rule: ["eq", "all"] },
            { key: "keywords_type", rule: ["rely", "keywords"] }
        ]);
        if (params["create_time"] !== undefined) {
            params["create_time"] = [moment(params["create_time"][0]).unix(), moment(params["create_time"][1]).unix()];
        }
        const response = await article.list({ params });
        if (response.code === 0) {
            const { result } = response;
            const { list, total_number } = result;
            this.setState({
                articleList: {
                    list,
                    total_number,
                    page: 1,
                    rows: 10
                }
            });
        }
    }

    render() {
        const { match, routerData } = this.props;
        const { articleList } = this.state;
        const routes = getRoutes(match.path, routerData);

        return (
            <Switch>
                {routes.map((item) => {
                    return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />;
                })}
                <Route key="/list" render={() => (
                    <Page>
                        <TableList
                            articleList={articleList}
                            {...this.props}
                        />
                    </Page>
                )} />
            </Switch>
        );
    }
}
