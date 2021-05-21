import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import {  Input, Divider } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";

const FormItem = Form.Item;
export default class PageTool extends Component {
    render() {
        const { leftIndex, data, setData } = this.props;
        const current = data[leftIndex];
        return (
            <View className={styles.warp}>
                {Array.isArray(data) && data.length>0? <Form style={{ marginLeft: 15 }}>
                    <FormItem
                        label='左侧名称'
                    >
                        <Input
                            value={current.title}
                            placeholder="请输入组名称"
                            onChange={(e) => {
                                let _data = [...data];
                                _data[leftIndex].title = e.target.value;
                                setData(_data);
                            }}
                        />
                    </FormItem>
                    <a
                        onClick={() => {
                            let _data = [...data];
                            _data[leftIndex].children.push({
                                type: "banner",
                                options: {},
                                data: []
                            });
                            setData(_data);
                        }}
                    >+ 轮播图</a>
                    <Divider type="vertical" />
                    <a
                        onClick={() => {
                            let _data = [...data];
                            _data[leftIndex].children.push({
                                type: "icon",
                                options: {
                                    title: "组标题"
                                },
                                data: []
                            });
                            setData(_data);
                        }}
                    >+ 图标文字</a>
                </Form>:<div />}
            </View>
        );
    }
}
