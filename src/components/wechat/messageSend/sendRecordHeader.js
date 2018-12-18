import React,{ Component } from 'react'
import { Select, Row, Col, Button } from 'antd'
import { View } from '@/components/flexView'
import styles from './index.css'
import { sendRecordData} from './testData'
const Option = Select.Option

export default class SendRecordHeader extends Component {
    render() {
        return (
            <Row
                gutter={16}
                style={{
                    padding:'10px 0 24px 0'
                }}
            >
                <Col span={5}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>群发类型:</p>
                        <Select style={{ width: "60%" }} defaultValue="textImg">
                            <Option value="textImg">图文</Option>
                            <Option value="text">文字</Option>
                            <Option value="picture">图片</Option>
                            <Option value="audio">语音</Option>
                            <Option value="vidio">视频</Option>
                        </Select>
                    </View>
                </Col>
                <Col span={5}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>发送状态:</p>
                        <Select defaultValue="all" style={{ width: "60%" }}>
                            <Option value="all">全部</Option>
                            <Option value="load">待发送</Option>
                            <Option value="sended">已发送</Option>
                        </Select>
                    </View>
                </Col>
                <Col span={4}>
                    <Button
                        type="primary"
                        onClick={() => {

                        }}
                        style={{ marginRight: 10 }}
                    >
                        筛选
                    </Button>
                </Col>
            </Row>
        )
    }
}
