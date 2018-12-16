import React, { Component } from "react";
import GoodsCategoryTable from "@/components/goods/category/list/table/index";
import Page from "@/components/public/page/index";
import { connect } from "dva";
@connect()
export default class GoodsCategory extends Component {
    render() {
        return (
            <Page>
                <GoodsCategoryTable {...this.props} />
            </Page>
        );
    }
}
