import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Input, Button,  Card, message, Spin, Switch } from "antd";
import { connect } from "umi";
import { history as router } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const FormItem = Form.Item;

@Form.create()
@connect(({ area, loading }) => ({
    expressInfoLoading: loading.effects["express/info"],
    expressEditLoading: loading.effects["express/edit"]
}))
class ExpressEdit extends Component {
    static defaultProps = {
        expressEditLoading: false,
        expressInfoLoading: true
    };
    state = {
        info: {
            id: 0,
            company_name: "",
            is_commonly_use: 0
        }
    };

    async componentDidMount() {
        const { location: { query: { id } }, dispatch } = this.props;
        dispatch({
            type: "express/info",
            payload: { id },
            callback: (e) => {
                dispatch({
                    type: "area/list"
                });
                if (e.code === 0) {
                    const { info } = e.result;
                    this.setState({ info });
                } else {
                    message.error(e.msg);
                    router.goBack;
                }
            }
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { location: { query: { id } }, dispatch } = this.props;
                let payload = {
                    id,
                    company_name: values.company_name,
                    is_commonly_use: values.is_commonly_use ? 1 : 0
                };
                dispatch({
                    type: "express/edit",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
                            router.goBack();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { info } = this.state;
        const { company_name, is_commonly_use } = info;
        const { getFieldDecorator } = this.props.form;
        const { expressEditLoading, expressInfoLoading } = this.props;

        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"express/edit"}>
                <Card bordered={false}>
                    <Spin size="large" spinning={expressInfoLoading}>
                        <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                            <FormItem
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 4 }}
                                label='物流公司名称'
                            >
                                {getFieldDecorator("company_name", {
                                    initialValue: company_name,
                                    rules: [{ required: true, message: "请输入物流公司名称" }]
                                })(
                                    <Input
                                        placeholder="请输入物流公司名称"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 6 }}
                                label='设为常用'
                            >
                                {getFieldDecorator("is_commonly_use", {
                                    initialValue: !!is_commonly_use,
                                    valuePropName: "checked",
                                    rules: [{ required: true, message: "请选择是否常用" }]
                                })(
                                    <Switch />
                                )}
                            </FormItem>
                            <FormItem
                                wrapperCol={{ sm: { offset: 3 } }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={expressEditLoading}
                                >
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

export default ExpressEdit;
