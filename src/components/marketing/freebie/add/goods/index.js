import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, Button } from "antd";
import styles from "./index.css";
import router from "umi/router";

const FormItem = Form.Item;

@connect()
class Wechat extends Component {
    render() {
        const { form, title, formItemLayout } = this.props;
        const { getFieldDecorator, setFieldsValue } = form;
        return (
            <View>
                <h3>选择商品</h3>
                <FormItem
                    {...formItemLayout}
                >
                    <Button
                        type="primary"
                        style={{marginRight: 10}}
                    >添加商品</Button>
                    <Button>创建无规格商品</Button>
                </FormItem>
            </View>
        );
    }
}
export default Wechat
