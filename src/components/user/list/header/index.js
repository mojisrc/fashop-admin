import React, { Component } from "react";
import {
    Row,
    Col,
    Button,
    Input,
    Select,
    DatePicker,
} from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";

const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;
const { RangePicker } = DatePicker;

export default class UserListHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue:undefined,
        };
    }
    render() {
        const { searchValue } = this.state
        return (
            <Row
                gutter={16}
                style={{
                    paddingBottom:'24px',
                    marginBottom:'24px',
                    borderBottom:'1px dashed #ededed'
                }}
            >
                <Col span={6}>
                    <InputGroup compact>
                        <Select
                            style={{ minWidth: '36%' }}
                            placeholder="搜索条件"
                            value={searchValue}
                            onChange={(searchValue)=>{
                                this.setState({searchValue})
                            }}
                        >
                            <Option value="name">姓名</Option>
                            <Option value="nick_name">昵称</Option>
                            <Option value="phone">手机号</Option>
                        </Select>
                        <Search
                            placeholder={`请输入${searchValue ? this.returnSearchValue(searchValue) : ''}`}
                            onSearch={value => console.log(value)}
                            style={{ width: '56%' }}
                        />
                    </InputGroup>
                </Col>
                <Col span={4}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>购买次数</p>
                        <Select
                            placeholder="请选择"
                            style={{ flex: 1 }}
                        >
                            <Option value="all">全部</Option>
                            <Option value="1">1+</Option>
                            <Option value="5">5+</Option>
                            <Option value="10">10+</Option>
                        </Select>
                    </View>
                </Col>
                <Col span={4}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>累计消费</p>
                        <Select
                            placeholder="请选择"
                            style={{ flex: 1 }}
                        >
                            <Option value="all">全部</Option>
                            <Option value="100">￥100+</Option>
                            <Option value="500">￥500+</Option>
                            <Option value="1000">￥1000+</Option>
                        </Select>
                    </View>
                </Col>
                <Col span={4}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>客单价</p>
                        <Select
                            placeholder="请选择"
                            style={{ flex: 1 }}
                        >
                            <Option value="all">全部</Option>
                            <Option value="100">￥20+</Option>
                            <Option value="500">￥50+</Option>
                            <Option value="1000">￥100+</Option>
                        </Select>
                    </View>
                </Col>
                <Col span={6}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>注册时间</p>
                        <RangePicker
                            style={{ flex: 1 }}
                            onChange={() => {}}
                        />
                    </View>
                </Col>
                <Col span={6}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>最后消费</p>
                        <RangePicker
                            style={{ flex: 1 }}
                            onChange={() => {}}
                        />
                    </View>
                </Col>
                <Col span={6}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>排序</p>
                        <Select
                            placeholder="请选择"
                            style={{ flex: 1 }}
                        >
                            <Option value="1">购次多到少</Option>
                            <Option value="2">购次少到多</Option>
                            <Option value="3">累计消费多到少</Option>
                            <Option value="4">累计消费少到多</Option>
                            <Option value="5">客单价多到少</Option>
                            <Option value="6">客单价少到多</Option>
                            <Option value="7">最后消费早到晚</Option>
                            <Option value="8">最后消费晚到早</Option>
                        </Select>
                    </View>
                </Col>
                <Col span={4}>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Button
                            // size="large"
                            type="primary"
                            onClick={() => {

                            }}
                            style={{ marginRight: 10 }}
                        >
                            筛选
                        </Button>
                        <Button
                            onClick={() => {

                            }}
                        >
                            清空筛选
                        </Button>
                    </View>
                </Col>
            </Row>
        );
    }
    returnSearchValue(serachValue){
        switch (serachValue) {
            case 'name': return '姓名'
            case 'nick_name': return '昵称'
            case 'phone': return '手机号'
            default:
        }
    }
}
