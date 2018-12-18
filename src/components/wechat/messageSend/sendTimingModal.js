import React,{ Component } from 'react'
import {  Row, Col, TimePicker, Select, Alert } from 'antd'
import { View } from '@/components/flexView'
import moment from 'moment'
const Option = Select.Option;

export default class SendTimingModal extends Component {
    state = {
        day:'',
        time:'',
    }
    render() {
        let today = moment().format('YYYY-MM-DD')
        let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
        // console.log('today',today);
        // console.log('tomorrow',tomorrow);
        return (
            <View style={{ width: "100%" }}>
                <Alert
                    message=""
                    description="你可以选择5分钟后的今、明两天内任意时刻定时群发，成功设置后不支持修改，
                    但在设定的时间之前可取消，取消后不占用群发条数。"
                    type="info"
                    showIcon
                />
                <Row
                    style={{
                        margin:'44px 0 20px 0'
                    }}
                >
                    <Col span={4}>
                        <span style={{lineHeight: '30px'}}>发送时间:</span>
                    </Col>
                    <Col span={8}>
                        <Select
                            placeholder="请选择日期"
                            style={{
                                width:140
                            }}
                            onChange={(value)=>{
                                // console.log(value);
                                this.setState({
                                    day:value
                                })
                            }}
                        >
                            <Option value={today}>今天</Option>
                            <Option value={tomorrow}>明天</Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <TimePicker
                            placeholder="请选择时间"
                            style={{
                                width:140
                            }}
                            onChange={(time)=>{
                                // console.log(time);
                                if(time){
                                    console.log(time.format('hh:mm:ss'));
                                    this.setState({
                                        time:time.format('hh:mm:ss')
                                    })
                                }
                            }}
                        />
                    </Col>
                </Row>
            </View>
        )
    }
}
