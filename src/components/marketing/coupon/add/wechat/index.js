import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input } from "antd";
import styles from "./index.css";
import router from "umi/router";

const FormItem = Form.Item;

@connect()
class Wechat extends Component {
    render() {
        const { form, title, formItemLayout } = this.props;
        const { getFieldDecorator, setFieldsValue } = form;
        return (
            <View className={styles.warp}>
                <View className={styles.left}>
                    
                </View>
                <View className={styles.right}>
                    <h3>卡券同步设置</h3>
                    <FormItem
                        {...formItemLayout}
                        label='优惠券名称'
                    >
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "请输入优惠券名称!" }],
                            initialValue: title
                        })(
                            <Input
                                placeholder="请输入优惠券名称"
                            />
                        )}
                    </FormItem>
                </View>
            </View>
        );
    }
}
export default Wechat
