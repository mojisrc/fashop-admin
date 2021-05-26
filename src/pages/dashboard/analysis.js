import React, { Component } from "react";
import { connect } from "umi";
import styles from "@/styles/index/index.css";
import { Row, Col, Card } from "antd";
import { dynamic } from "umi";

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
          <Card className={styles.indexWarp} bordered={false} policy={"statistics/quantity"}>
              <Row gutter={24}>
                  <Col span={17 + 7}>
                      <Quantity {...this.props} />
                      <Charts {...this.props} />
                  </Col>
              </Row>
          </Card>
        );
    }
}

export default Analysis;
