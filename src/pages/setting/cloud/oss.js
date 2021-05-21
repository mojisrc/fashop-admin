import { Icon } from '@ant-design/compatible';
import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { connect } from "umi";
import { Card } from "antd";
import { Alert, Switch,  Input, Button, message, Spin } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const FormItem = Form.Item;

@Form.create()
@connect(({ oss, loading }) => ({
    ossInfoLoading: loading.effects["oss/info"],
    ossEditLoading: loading.effects["oss/edit"]
}))
export default class OSS extends Component {
    componentDidMount() {
        const { dispatch, form: { setFieldsValue } } = this.props;
        dispatch({
            type: "oss/info",
            callback: (response) => {
                if (response.code === 0) {
                    const { config, status } = response.result.info;
                    if (config) {
                        setFieldsValue({
                            status: status === 1,
                            endpoint: config.endpoint,
                            bucket: config.bucket,
                            access_key_id: config.access_key_id,
                            access_key_secret: config.access_key_secret
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
                const { status, bucket, endpoint, access_key_id, access_key_secret } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "oss/edit",
                    payload: {
                        config: {
                            bucket,
                            endpoint,
                            access_key_id,
                            access_key_secret
                        },
                        status: status ? 1 : 0
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            } else {
                console.log(err);
            }
        });
    };

    render() {
        const { ossEditLoading, ossInfoLoading, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'oss/settingEdit'}>
                <Card bordered={false}>
                    <Spin size="large" spinning={ossInfoLoading} policy={'oss/settingEdit'}>
                        <Alert
                            description={
                                <span>
                                    如果您不了解OSS，
                                    <a href={`https://help.aliyun.com/product/31815.html`} target="_blank">
                                        详情请见
                                    </a>
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
                            <FormItem {...formItemLayout} label="Bucket">
                                {getFieldDecorator("bucket")(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Endpoint"
                            >
                                {getFieldDecorator("endpoint", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ]
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="AccessKeyID"
                            >
                                {getFieldDecorator("access_key_id", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ]
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="AccessKeySecret">
                                {getFieldDecorator("access_key_secret", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ]
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="启用开关">
                                {getFieldDecorator("status", {
                                    valuePropName: "checked"
                                })(<Switch />)}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" loading={ossEditLoading}>
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
        sm: { span: 10 }
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
