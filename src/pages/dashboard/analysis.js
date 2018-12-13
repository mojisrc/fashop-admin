import React,{ Component } from "react";
import { connect } from 'dva';
import { View } from "react-web-dom";
import styles from "@/styles/index/index.css";
import { Row, Col } from "antd";

import DataDisplay from '@/components/analysis/dataDisplay'
import Charts from '@/components/analysis/charts'


export default class Analysis extends Component {
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
//
// const portal = store => {
//   return {
//     login: store.app.member.login
//   }
// }
//
// export default connect(portal)(Index)
