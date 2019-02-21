import React, { Component } from "react";
import { Input, Button, Form, Cascader, Card, message, Spin } from "antd";
import { connect } from "dva";
import Arr from "@/utils/array";
import Antd from "@/utils/antd";
import router from "umi/router";

const FormItem = Form.Item;

@Form.create()
@connect(({ area, loading }) => ({
    areaList: area.list.result.list,
    areaListLoading: loading.effects["area/list"],
    shipperInfoLoading: loading.effects["shipper/info"],
    shipperEditLoading: loading.effects["shipper/edit"]
}))
class ShipperEdit extends Component {
    static defaultProps = {
        areaList: [],
        areaListLoading: true,
        shipperEditLoading: false,
        shipperInfoLoading: true
    };
    state = {
        info: {
            id: 0,
            name: "",
            province_id: 0,
            city_id: 0,
            area_id: 0,
            address: "",
            contact_number: ""
        }
    };

    componentDidMount() {
        const { location: { query: { id } }, dispatch } = this.props;
        dispatch({
            type: "shipper/info",
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
                    name: values.name,
                    contact_number: values.contact_number,
                    area_id: values.areas[2],
                    address: values.address
                };
                dispatch({
                    type: "shipper/edit",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("修改成功");
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
        const { areaList, shipperEditLoading, areaListLoading } = this.props;
        const tree = Arr.toTree(areaList);
        const cascaderData = Antd.cascaderData(tree);
        const { info } = this.state;
        const { name, contact_number, province_id, city_id, area_id, address } = info;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card bordered={false}>
                <Spin size="large" spinning={areaListLoading}>
                    <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 4 }}
                            label='联系人'
                        >
                            {getFieldDecorator("name", {
                                initialValue: name,
                                rules: [{ required: true, message: "请输入联系人" }]
                            })(
                                <Input
                                    placeholder="请输入联系人"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 6 }}
                            label='联系方式'
                        >
                            {getFieldDecorator("contact_number", {
                                initialValue: contact_number,
                                rules: [{ required: true, message: "请输入联系方式" }]
                            })(
                                <Input
                                    placeholder="请输入联系方式"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 6 }}
                            label="所在地区"
                        >
                            {getFieldDecorator("areas", {
                                initialValue: [`${province_id}`, `${city_id}`, `${area_id}`],
                                rules: [{
                                    type: "array",
                                    required: true,
                                    message: "请选择所在地区"
                                }]
                            })(
                                <Cascader options={cascaderData} placeholder='请选择所在地区' />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label='详细地址'
                        >
                            {getFieldDecorator("address", {
                                initialValue: address,
                                rules: [{ required: true, message: "请输入详细地址" }]
                            })(
                                <Input
                                    placeholder="请输入详细地址"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ sm: { offset: 3 } }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={shipperEditLoading}
                            >
                                保存
                            </Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Card>
        );
    }
}

export default ShipperEdit;
