import React, { Component } from "react";
import {
    Row,
    Col,
    Button,
    Input,
    Select,
    Icon,
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";

const Option = Select.Option;
const Search = Input.Search;


export default class ManageConfigHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Row gutter={24}>
                <Col xl={{ span: 4 }} md={{ span: 8 }} className={styles.div1}>
                    <Search
                        placeholder="标题"
                        size="large"
                        onSearch={() => {}}
                    />
                </Col>
                <Col xl={{ span: 4 }} md={{ span: 8 }} className={styles.div1}>
                    <Select
                        defaultValue="default"
                        style={{ width:'100%' }}
                        size={"large"}
                    >
                        <Option value="default">全部分类</Option>
                        <Option value="lucy">基本</Option>
                        <Option value="disabled">内容</Option>
                        <Option value="lucy2">用户</Option>
                    </Select>
                </Col>
                <Col
                    xl={{ span: 16 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    className={styles.div1}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            <Button
                                type="primary"
                                size="large"
                                className="margin-right"
                                onClick={() => {}}
                                style={{ marginRight: 16 }}
                            >
                                Search
                            </Button>
                            <Button size="large" onClick={() => {}}>
                                Reset
                            </Button>
                        </div>
                        <div>
                            {
                                // <Button
                                //     size="large"
                                //     type="primary"
                                //     onClick={() => {
                                //         this.props.history.push('/setting/configGroup')
                                //     }}
                                //     style={{ marginRight: 16 }}
                                // >
                                //     <Icon type="area-chart"/>
                                //     分组管理
                                // </Button>
                            }
                            <Button
                                size="large"
                                type="primary"
                                onClick={() => {
                                    this.props.history.push('/setting/addConfig')
                                }}
                                style={{ marginRight: 16 }}
                            >
                                添加
                            </Button>
                            <Button
                                size="large"
                                onClick={() => {}}
                            >
                                删除
                            </Button>
                        </div>
                    </View>
                </Col>
            </Row>
        );
    }
}
