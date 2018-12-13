import React,{ Component } from "react";
import { connect } from 'dva';
import { View } from "react-web-dom";
import styles from "@/styles/index/index.css";
import { Row, Col } from "antd";

import DataDisplay from '@/components/pageIndex/dataDisplay'
import Charts from '@/components/pageIndex/charts'
@connect()
export default class Index extends Component {
    render() {
        return (
            <View className={styles.indexWarp}>
                <Row gutter={24}>
                    <Col span={17+7} >
                        <DataDisplay {...this.props} />
                        <Charts {...this.props} />
                    </Col>
                </Row>
            </View>
        )
    }
}
