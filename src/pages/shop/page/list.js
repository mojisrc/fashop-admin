import React, { Component } from "react";
import { View } from "react-web-dom";
import Page from "@/components/public/page/index";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "dva";
import MyTemplate from "@/components/shop/index/myTemplate";
@connect()
export default class DecoratePortal extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "shop/info",
        });
    }

    render() {
        return (
            <Page>
                <MyTemplate {...this.props} />
            </Page>
        );
    }
}
