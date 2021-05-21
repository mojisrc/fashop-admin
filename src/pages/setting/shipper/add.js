import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Input, Button,  Cascader, Card, message } from "antd";
import { connect } from "umi";
import Arr from "@/utils/array";
import Antd from "@/utils/antd";
import { history as router } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const FormItem = Form.Item;

@Form.create()
@connect(({ area, loading }) => ({
    areaList: area.list.result.list,
    areaListLoading: loading.effects["area/list"],
    shipperAddLoading: loading.effects["shipper/add"]
}))
class ShipperAdd extends Component {
    static defaultProps = {
        areaList: [],
        areaListLoading: true,
        shipperAddLoading: false
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "area/list"
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    name: values.name,
                    contact_number: values.contact_number,
                    area_id: values.areas[2],
                    address: values.address
                };
                dispatch({
                    type: "shipper/add",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("添加成功");
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
        const { areaList, shipperAddLoading } = this.props;
        const tree = Arr.toTree(areaList);
        const cascaderData = Antd.cascaderData(tree);
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"shipper/add"}>
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 4 }}
                            label='联系人'
                        >
                            {getFieldDecorator("name", {
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
                                loading={shipperAddLoading}
                            >
                                添加
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default ShipperAdd;
