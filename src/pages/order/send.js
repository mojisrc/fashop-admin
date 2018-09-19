// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Input } from 'antd';
import SendAddress from "../../components/order/orderSend/sendAddress";
import DeliveryWay from "../../components/order/orderSend/deliveryWay";
import Page from "../../components/public/page";
import { formType } from "../../utils/flow";
import { Fetch, publicFunction } from "../../utils";
import { message } from "antd/lib/index";
import { dispatchProps } from "../../utils/defaultProps";
import { orderSetSend } from "../../actions/order";
import { OrderApi } from "../../config/api/order";
import { ExpressApi } from "../../config/api/express";
import { ShipperApi } from "../../config/api/shipper";

const { TextArea } = Input;

type Props = {
    orderInfo: {
        info: {
            sn: string,
            create_time: number,
            extend_order_goods: Array<{}>,
            extend_order_extend: {
                reciver_name: string,
                reciver_info: {
                    address: string,
                    name: string,
                    phone: string
                },
                remark: string,
                deliver_name: string,
                deliver_phone: string,
                deliver_address: string,
                need_express: number
            },
        }
    },
    form: formType,
    history: { goBack: Function },
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string },

}
type State = {
    shipperList: Array<{
        id: number,
        name: string,
        combine_detail: string,
        address: string,
        contact_number: string,
        is_default: number
    }>,
    expressList: Array<{
        id: number,
        company_name: string,
        is_commonly_use: number
    }>,
    info: {
        sn: string,
        create_time: number,
        extend_order_goods: Array<{}>,
        extend_order_extend: {
            reciver_name: string,
            reciver_info: {
                address: string,
                name: string,
                phone: string
            },
            message: string,
            deliver_name: string,
            deliver_phone: string,
            deliver_address: string,
            need_express: number
        },
    },
    deliver_name: string,
    deliver_phone: string,
    deliver_address: string,
    express_id: number,
    tracking_no: string,
    remark: string,
    need_express: number
}
const { parseQuery } = publicFunction

const FormItem = Form.Item;
@Form.create()
@connect()
export default class Send extends Component<Props, State> {
    state = {
        express_id: 0,
        tracking_no: '',
        deliver_name: '',
        deliver_phone: '',
        deliver_address: '',
        need_express: 1,
        remark: '',
        shipperList: [],
        expressList: [],
        info: {
            sn: '',
            create_time: 0,
            extend_order_goods: [],
            extend_order_extend: {
                reciver_name: '',
                reciver_info: {
                    address: '',
                    name: '',
                    phone: ''
                },
                message: '',
                deliver_name: '',
                deliver_phone: '',
                deliver_address: '',
                need_express: 1
            },
        },
    }
    static defaultProps = {
        dispatch: dispatchProps,
    }
    handleSubmit = (e: { preventDefault: Function }) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props
                const { id } = parseQuery(this.props.location.search)
                const { deliver_name, deliver_phone, deliver_address } = this.state
                let params = {
                    id,
                    deliver_name,
                    deliver_phone,
                    deliver_address,
                    is_commonly_use: values.is_commonly_use ? 1 : 0,
                    remark: values.remark,
                    need_express: values.need_express,
                }
                if (values.need_express === 1) {
                    params = Object.assign({}, params, {
                        express_id: values.express_id,
                        tracking_no: values.tracking_no
                    })
                }
                dispatch(orderSetSend({ params }))
            }
        });
    }

    async componentDidMount() {
        const { location } = this.props
        const { id } = parseQuery(location.search)

        const orderInfo = await Fetch.fetch({
            api: OrderApi.info,
            params: { id }
        })

        if (orderInfo.code === 0) {
            const { deliver_name, deliver_phone, deliver_address, express_id, tracking_no, remark, need_express } = orderInfo.result.info.extend_order_extend
            this.setState({
                info: orderInfo.result.info,
                deliver_name,
                deliver_phone,
                deliver_address,
                express_id,
                tracking_no,
                remark,
                need_express
            })
        } else {
            message.warning(orderInfo.msg)
        }

        const shipperResult = await Fetch.fetch({
            api: ShipperApi.list,
            params: {
                page: 1,
                rows: 1000,
            }
        })
        if (shipperResult.code === 0) {
            this.setState({ shipperList: shipperResult.result.list })
        } else {
            message.warning(shipperResult.msg)
        }

        const expressResult = await Fetch.fetch({
            api: ExpressApi.list,
            params: {
                page: 1,
                rows: 1000,
            }
        })
        if (expressResult.code === 0) {
            this.setState({ expressList: expressResult.result.list })
        } else {
            message.warning(expressResult.msg)
        }
    }

    render() {
        const { shipperList, expressList, deliver_name, deliver_phone, deliver_address, tracking_no, express_id, remark, need_express } = this.state
        const { getFieldDecorator } = this.props.form;
        if (!need_express) {
            getFieldDecorator("tracking_no", { initialValue: tracking_no });
        }
        return (
            <Page>
                <Form onSubmit={this.handleSubmit}>
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
                            })
                        }}
                    />
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
                            })
                        }}
                    />
                    <FormItem
                        label="输入备注"
                        colon={false}
                    >
                        {getFieldDecorator('remark', {
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
                                this.props.history.goBack()
                            }}
                        >
                            返回
                        </Button>
                    </FormItem>
                </Form>
            </Page>
        )
    }
}
