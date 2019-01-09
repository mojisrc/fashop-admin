import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Input, Card } from "antd";
import SendAddress from "@/components/order/send/sendAddress";
import DeliveryWay from "@/components/order/send/deliveryWay";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { message, Spin } from "antd/lib/index";
import router from "umi/router";

const { TextArea } = Input;

const FormItem = Form.Item;
@Form.create()
@connect(({ order, shipper, express, loading }) => ({
    orderInfo: order.info.result,
    shipperList: shipper.list.result.list,
    expressList: express.list.result.list,
    orderInfoLoading: loading.effects["order/info"],
    shipperListLoading: loading.effects["express/list"],
    expressListLoading: loading.effects["express/list"],
    orderSetSendLoading: loading.effects["order/setSend"]
}))
// todo 需要简化，想去掉state 和 传给子组件的过程
export default class Send extends Component {
    static defaultProps = {
        orderInfoLoading: true,
        shipperListLoading: true,
        expressListLoading: true,
        shipperList: [],
        expressList: [],
        orderInfo: {
            info: {
                sn: "",
                create_time: 0,
                extend_order_goods: [],
                extend_order_extend: {
                    reciver_name: "",
                    reciver_info: {
                        address: "",
                        name: "",
                        phone: ""
                    },
                    message: "",
                    deliver_name: "",
                    deliver_phone: "",
                    deliver_address: "",
                    need_express: 1
                }
            }
        }

    };
    state = {
        express_id: 0,
        tracking_no: "",
        deliver_name: "",
        deliver_phone: "",
        deliver_address: "",
        need_express: 1,
        remark: "",
        shipperList: [],
        expressList: [],
        info: {
            sn: "",
            create_time: 0,
            extend_order_goods: [],
            extend_order_extend: {
                reciver_name: "",
                reciver_info: {
                    address: "",
                    name: "",
                    phone: ""
                },
                message: "",
                deliver_name: "",
                deliver_phone: "",
                deliver_address: "",
                need_express: 1
            }
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch, location: { query: { id } } } = this.props;
                const { deliver_name, deliver_phone, deliver_address } = this.state;
                let params = {
                    id,
                    deliver_name,
                    deliver_phone,
                    deliver_address,
                    is_commonly_use: values.is_commonly_use ? 1 : 0,
                    remark: values.remark,
                    need_express: values.need_express
                };
                if (values.need_express === 1) {
                    params = Object.assign({}, params, {
                        express_id: values.express_id,
                        tracking_no: values.tracking_no
                    });
                }
                dispatch({
                    type: "order/setSend",
                    payload: params,
                    callback: (response ) => {
                        if(response.code === 0 ){
                            message.success("操作成功");
                            router.goBack();
                        }else{
                            message.error(response.msg);
                        }
                    }
                });
            }
        });
    };

    componentDidMount() {
        const { dispatch, location: { query: { id } } } = this.props;
        dispatch({
            type: "order/info",
            payload: {
                id
            },
            callback: (response) => {
                if (response.code === 0) {
                    const { deliver_name, deliver_phone, deliver_address, express_id, tracking_no, remark, need_express } = response.result.info.extend_order_extend;
                    this.setState({
                        info: response.result.info,
                        deliver_name,
                        deliver_phone,
                        deliver_address,
                        express_id,
                        tracking_no,
                        remark,
                        need_express
                    }, () => {
                        dispatch({
                            type: "shipper/list",
                            payload: {
                                page: 1,
                                rows: 1000
                            }
                        });
                        dispatch({
                            type: "express/list",
                            payload: {
                                page: 1,
                                rows: 1000
                            }
                        });
                    });
                } else {
                    message.warning(response.msg);
                    router.goBack();
                }
            }
        });
    }

    render() {
        const { deliver_name, deliver_phone, deliver_address, tracking_no, express_id, remark, need_express } = this.state;
        const { shipperList, expressList, orderInfoLoading, shipperListLoading, expressListLoading, orderSetSendLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        if (!need_express) {
            getFieldDecorator("tracking_no", { initialValue: tracking_no });
        }
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Spin size="large" spinning={orderInfoLoading}>
                    <Card bordered={false}>
                        <Form onSubmit={this.handleSubmit}>
                            <Spin size="large" spinning={shipperListLoading}>
                                <SendAddress
                                    form={this.props.form}
                                    shipperList={shipperList}
                                    deliver_name={deliver_name}
                                    deliver_phone={deliver_phone}
                                    deliver_address={deliver_address}
                                    onShipperChange={({ deliver_name, deliver_phone, deliver_address }) => {
                                        this.setState({
                                            deliver_name,
                                            deliver_phone,
                                            deliver_address
                                        });
                                    }}
                                />
                            </Spin>
                            <Spin size="large" spinning={expressListLoading}>
                                <DeliveryWay
                                    form={this.props.form}
                                    express_id={express_id}
                                    expressList={expressList}
                                    need_express={need_express}
                                    tracking_no={tracking_no}
                                    onExpressChange={({ express_id, tracking_no, need_express }) => {
                                        this.setState({
                                            express_id,
                                            tracking_no,
                                            need_express
                                        });
                                    }}
                                />
                            </Spin>
                            <FormItem
                                label="输入备注"
                                colon={false}
                            >
                                {getFieldDecorator("remark", {
                                    initialValue: remark
                                })(
                                    <TextArea
                                        placeholder="请输入备注"
                                        type='textarea'
                                        autosize={{ minRows: 2, maxRows: 6 }}
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    loading={orderSetSendLoading}
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        marginRight: 10
                                    }}
                                >
                                    确定
                                </Button>
                                <Button
                                    onClick={() => {
                                        router.goBack();
                                    }}
                                >
                                    返回
                                </Button>
                            </FormItem>
                        </Form>
                    </Card>
                </Spin>
            </PageHeaderWrapper>
        );
    }
}
