// @flow
import React, { Component } from "react";
import { Input, Button, Form, Cascader } from 'antd';
import Page from '../../components/public/page'
import { getCascaderAreaList } from "../../actions/area";
import { connect } from "react-redux";
import { dispatchType, formType, handleSubmitType } from "../../utils/flow";
import { publicFunction } from "../../utils";
import { getShipperInfo, editShipper } from "../../actions/deliver/shipper";

const {
    parseQuery
} = publicFunction

const FormItem = Form.Item;
type Props = {
    form: formType,
    dispatch: dispatchType,
    editShipper: Function,
    location: {
        state?: {
        },
        search: string,
    }
}
type State = {
    areaList: Array<{
        value: number,
        label: string,
        children: Array<{
            value: number,
            label: string,
            children: Array<{
                value: number,
                label: string
            }>
        }>
    }>,
    info: {
        id: number,
        name: string,
        province_id: number,
        city_id: number,
        area_id: number,
        address: string,
        contact_number: string
    }
}
@Form.create()
@connect()
export default class ShipperEdit extends Component<Props, State> {
    state = {
        areaList: [],
        info: {
            id: 0,
            name: '',
            province_id: 0,
            city_id: 0,
            area_id: 0,
            address: '',
            contact_number: ''
        }
    }

    async componentDidMount() {
        const { location } = this.props
        const { id } = parseQuery(location.search)
        const e = await getShipperInfo({ params: { id } })
        if (e.code === 0) {
            const { info } = e.result
            this.setState({ info })
        }
        this.setState({
            areaList: await getCascaderAreaList()
        })
    }

    handleSubmit = (e: handleSubmitType) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props
                const { id } = parseQuery(this.props.location.search)
                let params = {
                    id,
                    name: values.name,
                    contact_number: values.contact_number,
                    area_id: values.areas[2],
                    address: values.address
                }
                dispatch(editShipper({ params }))
            }
        });
    }

    render() {
        const { areaList, info } = this.state
        const { name, contact_number, province_id, city_id, area_id, address } = info
        const { getFieldDecorator } = this.props.form
        return (
            <Page>
                <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 4 }}
                        label='联系人'
                    >
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{ required: true, message: '请输入联系人' }],
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
                        {getFieldDecorator('contact_number', {
                            initialValue: contact_number,
                            rules: [{ required: true, message: '请输入联系方式' }],
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
                        {getFieldDecorator('areas', {
                            initialValue: [province_id, city_id, area_id],
                            rules: [{
                                type: 'array',
                                required: true,
                                message: '请选择所在地区'
                            }],
                        })(
                            <Cascader options={areaList} placeholder='请选择所在地区' />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label='详细地址'
                    >
                        {getFieldDecorator('address', {
                            initialValue: address,
                            rules: [{ required: true, message: '请输入详细地址' }],
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
                        >
                            保存
                        </Button>
                    </FormItem>
                </Form>
            </Page>
        )
    }
}
