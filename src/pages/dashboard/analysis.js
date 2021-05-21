import React, { Component } from "react";
import { connect } from "umi";
import styles from "@/styles/index/index.css";
import { Row, Col,Card } from "antd";

import Quantity from "@/pages/dashboard/components/quantity";
import Charts from "@/pages/dashboard/components/charts";

@connect()
class Analysis extends Component {
    render() {
        return (
            <Card className={styles.indexWarp}  bordered={false} policy={'statistics/quantity'}>
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
