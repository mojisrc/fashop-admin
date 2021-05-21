import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Button, Table, Modal,  Input, message, Switch } from "antd";
import { connect } from "umi";
import Image from "@/components/image";

const FormItem = Form.Item;

@Form.create()
@connect(({ loading }) => ({
    supplierEditLoading: loading.effects["supplier/edit"]
}), null, null, {
    forwardRef: true
})
export default class SupplierEdit extends Component {
    static defaultProps = {
        supplierEditLoading: false,
        onEdit: () => {
        }
    };
    state = {
        id: 0,
        visible: false,
        userInfo: { id: 0 }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { id } = this.state;
            if (!err) {
                const { dispatch } = this.props;
                dispatch({
                    type: "supplier/edit",
                    payload: {
                        id,
                        title: values.title,
                        user_id: values.user_id,
                        state: values.state ? 1 : 0
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
                            this.props.onEdit();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            } else {
                message.error(err);
            }
        });
    };

    initInfo() {
        const { dispatch } = this.props;
        const { id } = this.state;
        const { setFieldsValue } = this.props.form;
        dispatch({
            type: "supplier/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    this.setState({
                        userInfo: {
                            id: response.result.info.id,
                            avatar: response.result.info.user.avatar,
                            username: response.result.info.user.username,
                            nickname: response.result.info.user.nickname,
                            phone: response.result.info.user.phone
                        }
                    });
                    setFieldsValue({
                        title: response.result.info.title,
                        user_id: response.result.info.user.id,
                        state: !!response.result.info.state
                    });
                } else {
                    message.warning("供货商详情获取失败");
                }
            }
        });
    }

    show({ id }) {
        this.setState({
            id,
            visible: true
        }, () => {
            this.initInfo();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { visible, userInfo } = this.state;
        const { supplierEditLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        return <Modal
            title="修改供应商"
            visible={visible}
            width={756}
            footer={false}
            onCancel={() => {
                this.setState({
                    visible: false
                });
            }}
        >
            <Form onSubmit={this.handleSubmit} style={{ maxWidth: 600 }}>
                <FormItem
                    label="供应商名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator("title", {
                        rules: [{
                            required: true,
                            message: "请输入供应商名称"
                        }]
                    })(
                        <Input
                            placeholder='请输入供应商名称'
                            style={{ width: "100%" }}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='选择用户'
                    extra="每个用户只能当一家供应商"
                    required={true}
                >
                    {userInfo.id > 0 ? <Table
                        dataSource={[
                            {
                                id: userInfo.id,
                                nickname: userInfo.nickname,
                                username: userInfo.username,
                                phone: userInfo.phone,
                                avatar: userInfo.avatar
                            }
                        ]}
                        columns={[
                            {
                                title: "头像",
                                dataIndex: "avatar",
                                width: 50,
                                render: (e) => (
                                    <Image
                                        type='avatar'
                                        src={e}
                                        style={{ width: 50, height: 50 }}
                                    />
                                )
                            },
                            {
                                title: "昵称",
                                dataIndex: "nickname",
                                width: 230
                            },
                            {
                                title: "手机",
                                dataIndex: "phone",
                                width: 230
                            }
                        ]}
                        rowKey={record => record.id}
                        pagination={false}
                    /> : null}
                </FormItem>

                <FormItem
                    label='是否开启'
                    {...formItemLayout}
                >
                    {getFieldDecorator("state", {
                        initialValue: true,
                        valuePropName: "checked",
                        rules: [{ required: true, message: "请选择是否开启" }]
                    })(
                        <Switch />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={supplierEditLoading}>保存</Button>
                </FormItem>
            </Form>
        </Modal>;
    }
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 4
        }
    }
};
