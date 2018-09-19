//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Select, Input, Icon, Button, Upload, message } from 'antd';
import { View } from "react-web-dom";
import styles from './index.css'
import UploadImage from "../../../components/uploadImage";
import {
    handleSubmitType,
    formType,
    dispatchType,
    historyType,
} from "../../../utils/flow";
import {
    getGoodsCategoryList,
    editCategory,
} from "../../../actions/goods/category";
import {
    Fetch,
    publicFunction,
} from "../../../utils";

const {
    parseQuery
} = publicFunction
const FormItem = Form.Item;
const Option = Select.Option;

type Props = {
    list: Array<{ id: number, name: string }>,
    form: formType,
    dispatch: dispatchType,
    location: {
        state?: {
            categoryData?: { name: string, pid: number, icon: string }
        },
        search: string,
    },
    history: historyType,
}
type State = {
    categoryData?: { name: string, pid: number, icon: string } | null
}

@connect(({
              view: {
                  goodsCategory: {
                      list,
                  }
              }
          }) => ({
    list,
}))
@Form.create()
export default class CategoryEdit extends Component <Props, State> {
    state = {
        categoryData: this.props.location.state ? this.props.location.state.categoryData : null
    }

    async componentDidMount() {
        const {
            dispatch,
            list,
            location: {
                state,
                search,
            },
        } = this.props
        if (!list.length) {
            dispatch(getGoodsCategoryList())
        }
        const {
            id
        } = parseQuery(search)
        if (!id) {
            return message.error('缺少必要参数，history异常')
        }
        if (!state || !state.categoryData) {
            const e = await Fetch.fetch({
                api: 'GOODSCATEGORYINFO',
                params: {
                    id
                }
            })
            this.setState({
                categoryData: e.result.info
            })
        }
    }

    handleSubmit = (e: handleSubmitType) => {
        const {
            id
        } = parseQuery(this.props.location.search)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {
                    dispatch
                } = this.props
                dispatch(editCategory({
                    params: {
                        ...values,
                        ...{ id }
                    },
                }))
            }
        })
    }

    render() {
        const {
            form,
            list,
        } = this.props
        const {
            categoryData
        } = this.state
        const {
            name,
            pid,
            icon,
        } = categoryData || {}
        const { getFieldDecorator } = form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit} style={{ maxWidth: '600px' }}>
                <FormItem
                    label="分类名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('name', {
                        initialValue: name,
                        rules: [{
                            required: true,
                            message: '请输入分类名称!'
                        }],
                    })(
                        <Input
                            placeholder='请输入分类名称'
                            style={{ width: '100%' }}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="上级分类"
                    extra='如不选择，则默认为一级分类'
                    {...formItemLayout}
                >
                    {getFieldDecorator('pid', {
                        initialValue: pid === 0 ? undefined : pid,
                    })(
                        <Select
                            placeholder="请输入分类名称"
                            style={{ width: '100%' }}
                            disabled={pid === 0}
                        >
                            {
                                list.map((e, i) => (
                                    <Option value={e.id} key={i}>{e.name}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    extra="分类展示图，建议尺寸：140*140 像素"
                    label="上传分类图"
                >
                    {getFieldDecorator('icon', {
                        initialValue: icon,
                        rules: [{
                            required: true,
                            message: '请上传分类图!',
                        }],
                        valuePropName: 'url',
                    })(
                        <UploadImage />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            marginRight: 10
                        }}
                        onClick={() => {

                        }}
                    >
                        保存
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
        )
    }
}
