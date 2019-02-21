import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card } from "antd";

export default class FreebieEdit extends Component {
    render() {
        return <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card></Card>
        </PageHeaderWrapper>
    }
}
