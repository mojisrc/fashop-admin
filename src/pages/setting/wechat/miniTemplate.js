import { Icon } from '@ant-design/compatible';
import { Form } from '@ant-design/compatible';
import React, { Component, Fragment } from "react";
import { connect } from "umi";
import { Switch,  Input, Button, message, Spin, Card, Table, Alert } from "antd";

const FormItem = Form.Item;
const TemporaryKeys = ["order_pay_success", "order_pay_wait", "order_send", "order_refund_handle"];

@Form.create()
@connect(({ setting, loading }) => ({
    settingInfoLoading: loading.effects["wechat/miniTemplateInfo"],
    settingEditLoading: loading.effects["wechat/miniTemplateEdit"]
}))
class MiniTemplate extends Component {
    static defaultProps = {
        settingInfoLoading: true,
        settingInfo: { info: {} }
    };
    state = {
        info: {
            status: 1,
            config: {
                template_list: {
                    "order_pay_success": {
                        "template_id": "Y1blRZEdiqSXSDOfiKT9rG4oEmlpfeq_rjcpuuo",
                        "template_name": "订单支付成功",
                        "template_status": 1,
                    }
                }
            }
        }
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "wechat/miniTemplateInfo",
            callback: (response) => {
                if (response.code === 0) {
                    const { info } = response.result;
                    const { config } = info;
                    if (config) {
                        this.setState({
                            info
                        });
                    }
                } else {
                    message.warning(response.msg);
                }
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { template_list, status } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "wechat/miniTemplateEdit",
                    payload: {
                        config: {
                            template_list
                        },
                        status: status ? 1 : 0
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
                        } else {
                            message.warn(response.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { info } = this.state;
        const { form, settingEditLoading, settingInfoLoading } = this.props;
        const { getFieldDecorator } = form;
        const columns = [{
            title: "模板名称",
            dataIndex: "name"
        }, {
            title: "模板ID",
            dataIndex: "id"
        }
            //     {
            //     title: "模板内容",
            //     dataIndex: "content"
            // }
        ];
        let data = ((template_list) => {
            let arr = [];
            Object.keys(template_list).forEach(function(key) {
                arr.push({
                    key: `template_list${key}`,
                    name: template_list[key].template_name,
                    id: <Fragment>
                        <FormItem className="ant-form-item-hidden">
                            {getFieldDecorator(`template_list.${key}.template_name`, { initialValue: template_list[key].template_name })(
                                <Input />)}
                        </FormItem>
                        <FormItem className="ant-form-item-hidden">
                            {getFieldDecorator(`template_list.${key}.template_variable`, { initialValue: template_list[key].template_variable })(
                                <Input />)}
                        </FormItem>
                        <FormItem className="ant-form-item-hidden">
                            {getFieldDecorator(`template_list.${key}.template_status`, { initialValue: template_list[key].template_status })(
                                <Input />)}
                        </FormItem>
                        <FormItem className="ant-form-item-table-style">
                            {getFieldDecorator(`template_list.${key}.template_id`, {
                                rules: [
                                    {
                                        message: "请输入，如：Y1blRZEdiq........."
                                    }
                                ],
                                initialValue: template_list[key].template_id
                            })(<Input placeholder="请输入" style={{ width: "auto", minWidth: 300 }} />)}
                        </FormItem>
                    </Fragment>,
                    content: template_list[key].template_content
                });
            });
            return arr;
        })(info.config.template_list);
        return (
            <Card bordered={false}>
                <Spin size="large" spinning={settingInfoLoading}>
                    <Alert
                        description={
                            <span style={{ fontWidth: 400 }}>
                                    模板消息仅用于微信小程序向用户发送服务通知，因微信限制，每笔支付订单可允许向用户在7天内推送最多3条模板消息。
                                </span>
                        }
                        type="info"
                        showIcon
                    />
                    <Form
                        onSubmit={this.handleSubmit}
                        style={{
                            marginTop: 24
                        }}
                    >
                        <FormItem {...formItemLayout} label="使用场景" className="ant-form-item-table-style">
                            {getFieldDecorator("private_key", {
                                initialValue: info.signature ?? ""
                            })(<Table bordered={true} columns={columns} dataSource={data} pagination={false} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="是否开启" extra={"关闭后，提醒功能将不可使用"}>
                            {getFieldDecorator("status", {
                                valuePropName: "checked",
                                initialValue: info.status === 1
                            })(<Switch />)}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" loading={settingEditLoading}>
                                保存
                            </Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Card>
        );
    }
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 10,
            offset: 2
        }
    }
};
export default MiniTemplate;
