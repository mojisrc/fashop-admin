import React,{ Component } from 'react'
import { Input, Button, Select, Row, Col, Checkbox } from 'antd';
import { View } from '@/components/flexView'
import styles from './index.css'
const Search = Input.Search;
const Option = Select.Option;


export default class MessageManagementHeader extends Component {
    render() {
        return (
            <Row gutter={24} style={{ padding: "12px 0 24px 0" }}>
                <Col span={6}>
                    <Search
                        placeholder={"请输入消息内容"}
                        onSearch={value => console.log(value)}
                    />
                </Col>
                <Col span={12}>
                    <View className={styles.select1}>
                        <span style={{ marginRight: 10 }}> 时间筛选 : </span>
                        <Select defaultValue="recently" style={{ width: "30%", marginRight: 24 }}>
                            <Option value="recently">最近五天</Option>
                            <Option value="today">今天</Option>
                            <Option value="yesterday">昨天</Option>
                            <Option value="qiantian">前天</Option>
                        </Select>
                        <Button type="primary">筛选</Button>
                    </View>
                </Col>
                <Col span={6}>
                    <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                        <Checkbox >显示自动回复</Checkbox>
                    </View>
                </Col>
            </Row>
        )
    }
}
