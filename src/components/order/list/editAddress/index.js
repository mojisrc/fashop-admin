import React, { Component } from "react";
import { Form, Input, Cascader, message, Spin, Modal } from "antd";
import order from "@/services/order";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};
@Form.create()
export default class EditAddress extends Component {
    static defaultProps = {
        visible: false,
        onCancel: function() {
        },
        onOk: function() {
        }
    };
    state = {
        truename: null,
        mobile_phone: null,
        address: null,
        areaList: [],
        province_id: null,
        city_id: null,
        area_id: null,
        spinning: true
    };

    async componentWillReceiveProps(nextProps) {
        if (nextProps.orderId !== this.props.orderId) {
            await this.initOrderInfo();
        }
    }

    async componentDidMount() {
        this.setState({
            areaList: await cascader()
        });
        await this.initOrderInfo();
    }

    async initOrderInfo() {
        const { orderId } = this.props;
        this.setState({
            spinning: true
        });
        const response = await order.info({ id: orderId });
        const { reciver_name, receiver_phone, reciver_area_id, reciver_info, reciver_province_id, reciver_city_id } = response.result.info.extend_order_extend;
        if (response.code === 0) {
            this.setState({
                truename: reciver_name,
                mobile_phone: receiver_phone,
                address: reciver_info.address,
                province_id: reciver_province_id,
                city_id: reciver_city_id,
                area_id: reciver_area_id,
                spinning: false
            });
        } else {
            message.warning("订单详情获取失败");
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { areaList, province_id, city_id, area_id, truename, mobile_phone, address, spinning } = this.state;
        const { onCancel, onOk, visible } = this.props;
        return (
            <Modal
                visible={visible}
                onOk={async () => {
                    if (typeof onOk === "function") {
                        const result = await this.onSubmit();
                        if (result === true) {
                            onCancel();
                        }
                    }
                }}
                onCancel={() => {
                    if (typeof onCancel === "function") {

                        this.props.onCancel();
                    }
                }}
                title="修改收货地址"
            >
                <Spin tip="加载中..." spinning={spinning}>
                    <FormItem {...formItemLayout} label="联系人">
                        {getFieldDecorator("truename", {
                            initialValue: truename,
                            rules: [{
                                required: true,
                                message: "请输入联系人姓名"
                            }]
                        })(
                            <Input placeholder="请输入联系人姓名" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="联系方式">
                        {getFieldDecorator("mobile_phone", {
                            initialValue: mobile_phone,
                            rules: [{
                                required: true,
                                message: "请输入联系方式"
                            }]
                        })(
                            <Input placeholder="请输入联系方式" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="所在地区">
                        {getFieldDecorator("areas", {
                            initialValue: [province_id, city_id, area_id],
                            rules: [{
                                type: "array",
                                required: true,
                                message: "请选择所在地区"
                            }]
                        })(
                            <Cascader options={areaList} placeholder='请选择所在地区' style={{ width: "100%" }} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="详细地址">
                        {getFieldDecorator("address", {
                            initialValue: address,
                            rules: [{
                                required: true,
                                message: "请输入详细地址"
                            }]
                        })(
                            <Input placeholder="请输入详细地址" />
                        )}
                    </FormItem>
                </Spin>
            </Modal>
        );
    }

    async onSubmit() {
        return await true;
    }
}
