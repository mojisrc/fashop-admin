import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import FreebieListHeader from "@/components/marketing/freebie/listHeader";
import FreebieListTable from "@/components/marketing/freebie/listTable";
import { connect } from "dva";
import { Card } from "antd";

@connect()
class Freebie extends Component {
    render() {
        return <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <FreebieListHeader {...this.props} />
                <FreebieListTable {...this.props} />
            </Card>
        </PageHeaderWrapper>
    }
}
export default Freebie
