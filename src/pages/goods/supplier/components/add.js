import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Button, Table, Modal,  Input, message, Switch } from "antd";
import { connect } from "umi";
import Image from "@/components/image";
import SelectUser from "./selectUser";

const FormItem = Form.Item;
@Form.create()
@connect(({ loading }) => ({
    supplierAddLoading: loading.effects["supplier/add"]
}), null, null, {
    forwardRef: true
})
export default class SupplierAdd extends Component {
    static defaultProps = {
        supplierAddLoading: false,
        onAdd: () => {
        }
    };
    state = {
        visible: false,
        userInfo: { id: 0 }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { dispatch } = this.props;
            if (!err) {
                dispatch({
                    type: "supplier/add",
                    payload: {
                        title: values.title,
                        user_id: values.user_id,
                        state: values.state ? 1 : 0
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("添加成功");
                            this.props.onAdd();
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

    show() {
        this.setState({
            visible: true
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { visible, userInfo } = this.state;
        const { supplierAddLoading } = this.props;
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        return <Modal
            title="添加供应商"
            visible={visible}
            width={756}
            footer={false}
            onCancel={() => {
                this.setState({
                    visible: false
                });
            }}
        >
            <SelectUser
                ref={(e) => this.selectUser = e}
                onOk={(e) => {
                    this.selectUser.close();
                    this.setState({
                        userInfo: e.checkedData[0]
                    });
                    setFieldsValue({
                        user_id: e.checkedData[0].id
                    });

                }} />
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
                    {getFieldDecorator("user_id", {
                        rules: [{ required: true, message: "请选择一个用户" }]
                    })(<a onClick={() => {
                            this.selectUser.show();
                        }}>选择用户</a>
                    )}
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
                    <Button type="primary" htmlType="submit" loading={supplierAddLoading}>保存</Button>
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

