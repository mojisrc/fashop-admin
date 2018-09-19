//@flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import { Row, Col } from 'antd';
import styles from './index.css'


@connect(
    ({})=>({}),
    {}
)
export default class SystemInfo extends Component<
   {},
   {}
> {
   render() {
       return (
           <View className={styles.systemInfoWarp}>
               <h3 className={styles.infoTitle}>系统信息</h3>
               <Row className={styles.systemInfoRow}>
                   <Col span={4}>服务器操作系统</Col>
                   <Col span={8}>LinuxiZ2ze36ko76auog28w4oskZ3.10.0-514.10.2.el7.x86_64</Col>
                   <Col span={4}>服务器域名／IP</Col>
                   <Col span={8}>fashop.chitj.com:80 [47.93.124.60]</Col>
               </Row>
               <Row className={styles.systemInfoRow}>
                   <Col span={4}>服务器环境</Col>
                   <Col span={8}>nginx/1.12.0</Col>
                   <Col span={4}>PHP版本</Col>
                   <Col span={8}>7.0.1</Col>
               </Row>
               <Row className={styles.systemInfoRow}>
                   <Col span={4}>文件上传限制</Col>
                   <Col span={8}>2M</Col>
                   <Col span={4}>GD版本</Col>
                   <Col span={8}>bundled (2.1.0 compatible)</Col>
               </Row>
           </View>
       )
   }
}