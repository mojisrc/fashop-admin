import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import styles from "@/styles/index/index.css";
import { Row, Col,Card } from "antd";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';

import Quantity from "@/components/analysis/quantity";
import Charts from "@/components/analysis/charts";

@connect()
class Analysis extends Component {
    render() {
        return (
            <Card className={styles.indexWarp}  bordered={false}>
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
