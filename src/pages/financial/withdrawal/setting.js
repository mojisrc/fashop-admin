import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { connect } from "umi";
import { Card } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper/index";
import { Alert,  InputNumber, Button, message, Spin } from "antd";
import SelectPage from "../components/selectPage";

const FormItem = Form.Item;

@Form.create()
@connect(({ loading }) => ({
    settingInfoLoading: loading.effects["withdrawal/settingInfo"],
    settingEditLoading: loading.effects["withdrawal/settingEdit"]
}))
class Payment extends Component {
    static defaultProps = {
        settingInfoLoading: true,
        settingInfo: {
            info: {
                config: {
                    individual_income_tax: "",
                    service_fee: "",
                    page_id: 0
                }
            }
        }
    };
    state = {
        pageInfo: {
            id: 0,
            title: ""
        }
    };

    componentDidMount() {
        const { dispatch, form } = this.props;
        dispatch({
            type: "withdrawal/settingInfo",
            callback: (response) => {
                if (response.code === 0) {
                    // 项目初始化的时候为空
                    const { config, page } = response.result.info;
                    if (config) {
                        const { setFieldsValue } = form;
                        setFieldsValue({
                            individual_income_tax: config.individual_income_tax,
                            service_fee: config.service_fee,
                            page_id: config.page_id
                        });
                    }
                    page["id"] > 0 && this.setState({
                        pageInfo: page
                    });
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
                const { individual_income_tax, service_fee, page_id } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "withdrawal/settingEdit",
                    payload: {
                        config: {
                            individual_income_tax,
                            service_fee,
                            page_id
                        }
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
        const { form, settingEditLoading, settingInfoLoading } = this.props;
        const { getFieldDecorator, setFieldsValue } = form;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"asetswithdrawal/settingEdit"}>
                <Card bordered={false}>
                    <Spin size="large" spinning={settingInfoLoading}>
                        <Alert
                            message="结算周期提示"
                            description={<div>
                                <strong>整个周期为系统自动确认收货时间N+N天无理由退款（买家主动确认收货或N为0时，则N天后可申请提现，具体N天可以在订单设置里进行配置）</strong>
                            </div>}
                            type="warning"
                            style={{ marginBottom: 14 }}
                        />
                        <Form
                            onSubmit={this.handleSubmit}
                            style={{
                                width: "88%",
                                marginTop: 24
                            }}
                        >
                            <FormItem
                                {...formItemLayout}
                                label="扣除个税"
                                extra="提现扣除个人所得税，为0时不扣除"
                            >
                                {getFieldDecorator("individual_income_tax", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ]
                                })(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace("%", "")}
                                />)}
                            </FormItem>
                            <FormItem {...formItemLayout}
                                      label="提现服务费"
                                      extra="提现时平台收取服务费，为0时不收取"

                            >
                                {getFieldDecorator("service_fee", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ]
                                })(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace("%", "")}
                                />)}
                            </FormItem>
                            <Form.Item
                                {...formItemLayout}
                                label="钱包使用说明"
                            >
                                {getFieldDecorator("page_id", {
                                    rules: [{ required: true, message: "选择钱包使用说明" }]
                                })(
                                    <div>
                                        <a
                                            onClick={() => {
                                                this.selectPage.show();
                                            }}
                                        >选择页面</a> {typeof this.state.pageInfo["id"] !== "undefined" && this.state.pageInfo["id"] > 0 ?
                                        `页面：${this.state.pageInfo.name}` : null}

                                        <SelectPage
                                            ref={(e) => this.selectPage = e}
                                            getState={(state) => {
                                                this.selectPage.close();
                                                this.setState({
                                                    pageInfo: state.value
                                                });
                                                setFieldsValue({
                                                    page_id: state.value.id
                                                });
                                            }}
                                        />
                                    </div>
                                )}
                            </Form.Item>
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
export default Payment;
