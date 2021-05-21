import { Form } from '@ant-design/compatible';
import React, { Component, Fragment } from "react";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Switch,  Input, Button, message, Spin, Card, Table } from "antd";

const FormItem = Form.Item;

@Form.create()
@connect(({ setting, loading }) => ({
    settingInfoLoading: loading.effects["setting/info"],
    settingEditLoading: loading.effects["setting/edit"]
}))
class Sms extends Component {
    static defaultProps = {
        settingInfoLoading: true,
        settingInfo: { info: {} }
    };
    state = {
        info: {
            sign: "alidayu",
            status: 1,
            config: {
                access_key_id: "xxxxxxxxxx",
                access_key_secret: "xxxxxxxxxx",
                signature: "FaShop",
                template_list: {
                    "register": {
                        "template_id": "SMS_xxxxx",
                        "template_name": "注册",
                        "template_variable": "code",
                        "template_status": 1,
                        "template_content": "您的验证码：${code}，如非本人操作，请忽略本短信！"
                    },
                    "find_password": {
                        "template_id": "SMS_xxxxx",
                        "template_name": "找回密码",
                        "template_variable": "code",
                        "template_status": 1,
                        "template_content": "您的验证码：${code}，如非本人操作，请忽略本短信！"
                    }
                }
            }
        }
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "setting/info",
            payload: {
                sign: "alidayu"
            },
            callback: (response) => {
                if (response.code === 0) {
                    const { config } = response.result.info;
                    if (config) {
                        this.setState({
                            info: response.result.info
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
                const { access_key_id, access_key_secret, signature, template_list, status } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "setting/edit",
                    payload: {
                        sign: "alidayu",
                        config: {
                            access_key_id,
                            access_key_secret,
                            signature,
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
        }, {
            title: "模板内容",
            dataIndex: "content"
        }];
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
                                        message: "请输入，如：SMS_xxxxx"
                                    }
                                ],
                                initialValue: template_list[key].template_id
                            })(<Input placeholder="请输入" style={{ width: "auto", minWidth: 300 }} />)}
                        </FormItem>
                    </Fragment>,
                    content: template_list[key].template_content
                });
            })
            return arr;
        })(info.config.template_list);
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"smsprovider/add || smsscene/edit"}>
                <Card title={<div>
                    阿里云短信
                    <a href={`https://www.domain.com/help/sms`} target="_blank"
                       style={{ fontSize: 14, marginLeft: 15, fontWeight: 400 }}>
                        如何申请？
                    </a>
                </div>} bordered={false}>
                    <Spin size="large" spinning={settingInfoLoading}>
                        <Form
                            onSubmit={this.handleSubmit}
                            style={{}}
                        >
                            <FormItem
                                {...formItemLayout}
                                label="Access KeyID"
                            >
                                {getFieldDecorator("access_key_id", {
                                    initialValue: info.config.access_key_id??""
                                })(<Input placeholder="请输入" style={{ width: "auto", minWidth: 300 }} />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="Access KeySecret">
                                {getFieldDecorator("access_key_secret", {
                                    initialValue: info.config.access_key_secret??""
                                })(<Input placeholder="请输入" style={{ width: "auto", minWidth: 300 }} />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="短信签名">
                                {getFieldDecorator("signature", {
                                    initialValue: info.config.signature??""
                                })(<Input placeholder="请输入，如FaShop" style={{ width: "auto", minWidth: 100 }} />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="使用场景" className="ant-form-item-table-style">
                                <Table bordered={true} columns={columns} dataSource={data} pagination={false} />
                                <a href={`https://www.domain.com/help/sms#如何获得模板ID`} target="_blank">
                                    如何获取模板ID？
                                </a>
                            </FormItem>
                            <FormItem {...formItemLayout} label="是否开启" extra={"关闭后，短信提醒功能将不可使用"}>
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
            </PageHeaderWrapper>
        );
    }
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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
            offset: 3
        }
    }
};
export default Sms;
