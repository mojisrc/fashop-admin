import React, { Component } from "react";
import {Button, Input,Select, TreeSelect,Form, } from "antd";
import { View } from "@/components/flexView";
import { connect } from "dva";

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

const tabsList = [
    {
        id: null,
        title: '全部商品',
    }, {
        id:1,
        title: '出售中',
    }, {
        id:2,
        title: '已售完',
    }, {
        id:3,
        title: '已下架',
    }
]

const order_typeArray = [
    {
        id: 1,
        title: '商品价格低到高',
    },{
        id: 2,
        title: '商品价格高到低',
    },{
        id: '3',
        title: '销量多到少',
    },{
        id: '4',
        title: '销量少到多',
    },{
        id: '5',
        title: '库存多到少',
    },{
        id: '6',
        title: '库存少到多',
    },{
        id: '7',
        title: '创建时间早到晚',
    },{
        id: '8',
        title: '创建时间晚到早',
    },{
        id: '9',
        title: '排序高到低',
    },{
        id: '10',
        title: '排序低到高',
    }
]



const categoryTreeData = (list)=>{
    return list.map((e)=>{
        return {
            label: e.name,
            value: `${e.id}`,
            key: `${e.id}`,
            children: categoryTreeData(e.children||[])
        }
    })
}


type Props = {
    form: formType,
    dispatch: dispatchType,
    listData: {
        page: number,
        rows: number,
        total_number: number,
    },
    loading: boolean,
    list: Array<{name:string,id:number,children:any}>,
}



@connect(({view:{
    goods:{
        loading,
        listData,
    },
    goodsCategory:{
        list,
    },
}})=>({
    loading,
    listData,
    list,
}))
@Form.create()
export default class GoodsListHeader extends Component<Props>{
    static defaultProps = {
        form: formdDfaultProps,
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const keys = Object.keys(values)
                keys.map((e)=>{
                    if(!values[e]){
                        delete values[e]
                    }
                })
                const {
                    dispatch,
                    listData,
                } = this.props
                const {
                    page,
                    rows,
                } = listData
                dispatch(getGoodsList({
                    params: {
                        ...{page,rows},
                        ...values,
                    }
                }))
            }
        });
    }
    render() {
        const {
            form,
            list,
            loading,
            dispatch,
        } = this.props
        const {
            getFieldDecorator,
            resetFields
        } = form
        const treeData = categoryTreeData(list)
        return (
            <Form
                layout="inline"
                style={{
                    paddingBottom:'24px',
                    marginBottom:'24px',
                    borderBottom:'1px dashed #ededed'
                }}
                onSubmit={this.handleSubmit}
            >
                <FormItem label="商品名称">
                    {getFieldDecorator("title", {

                    })(
                        <Search
                            placeholder='请输入商品名称'
                        />
                    )}
                </FormItem>
                <FormItem
                    label="商品状态"
                >
                    {getFieldDecorator("sale_state", {
                        initialValue: null,
                    })(
                        <Select
                            placeholder="请选择"
                            style={{width:200}}
                        >
                            {
                                tabsList.map((e,i)=>(
                                    <Option value={e.id} key={i}>{e.title}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="商品分类"
                >
                    {getFieldDecorator("category_ids", {

                    })(
                        <TreeSelect
                            style={{ width: 200 }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={treeData}
                            placeholder="请选择"
                            treeDefaultExpandAll
                            allowClear={true}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="排序"
                >
                    {getFieldDecorator("order_type", {

                    })(
                        <Select
                            placeholder="请选择"
                            style={{width:200}}
                        >
                            {
                                order_typeArray.map((e,i)=>(
                                    <Option value={e.id} key={i}>{e.title}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        style={{marginRight:15}}
                        htmlType="submit"
                        loading={loading}
                    >
                        筛选
                    </Button>
                    <Button
                        onClick={() => {
                            resetFields()
                        }}
                    >
                        清空筛选
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
