import React, { Component } from "react";
import { connect } from "dva";
import { View } from "react-web-dom";
import styles from "@/styles/index/index.css";
import { Row, Col } from "antd";
import Quantity from "@/components/analysis/basis";

@connect()
class Analysis extends Component {
    render() {
        return (
            <View className={styles.indexWarp}>
                <Row gutter={24}>
                    <Col span={17 + 7}>
                        <DataDisplay {...this.props} />
                        <Quantity {...this.props} />
                    </Col>
                </Row>
            </View>
        );
    }
}

export default Analysis;
