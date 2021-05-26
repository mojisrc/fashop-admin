import React, { Component } from "react";
import { connect } from "umi";
import { Card } from "antd";
import { dynamic } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const Quantity = dynamic({
    loader: async function() {
        const { default: C } = await import("@/pages/dashboard/components/quantity"  );
        return C;
    }
});
const Charts = dynamic({
    loader: async function() {
        const { default: C } = await import("@/pages/dashboard/components/charts");
        return C;
    }
});

@connect()
class Analysis extends Component {
    render() {
        return (
          <PageHeaderWrapper hiddenBreadcrumb={true} policy={"statistics/quantity"}>
              <Card bordered={false}>
                  <Quantity {...this.props} />
              </Card>
              <Card bordered={false}>
                  <Charts {...this.props} />
              </Card>
          </PageHeaderWrapper>
        );
    }
}

export default Analysis;
