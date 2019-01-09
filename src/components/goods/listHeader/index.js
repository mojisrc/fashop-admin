//@flow
import React, { Component } from "react";
import { Button, Input, Select, TreeSelect, Form } from "antd";
import { formType, handleSubmitType } from "../../../utils/flow";
import { formdDfaultProps } from "../../../utils/defaultProps";
import { connect } from "react-redux";
import { dispatchType } from "../../../utils/flow";
import Query from "../../../utils/query";
import { getQueryPath } from "../../../utils";

const Option = Select.Option;
const FormItem = Form.Item;
const tabsList = [
    {
        id: 'all',
        title: '全部',
    }, {
        id: '1',
        title: '出售中',
    }, {
        id: '2',
        title: '已售完',
    }, {
        id: '3',
        title: '已下架',
    }
]
const order_typeArray = [
    {
        id: 'all',
        title: '默认',
    },
    {
        id: '1',
        title: '商品价格低到高',
    }, {
        id: '2',
        title: '商品价格高到低',
    }, {
        id: '3',
        title: '销量多到少',
    }, {
        id: '4',
        title: '销量少到多',
    }, {
        id: '5',
        title: '库存多到少',
    }, {
        id: '6',
        title: '库存少到多',
    }, {
        id: '7',
        title: '创建时间早到晚',
    }, {
        id: '8',
        title: '创建时间晚到早',
    }, {
        id: '9',
        title: '排序高到低',
    }, {
        id: '10',
        title: '排序低到高',
    }
]
const hot_saleArray = [
    {
        id: 'all',
        title: '全部',
    },{
        id: '1',
        title: "总店推荐"
    }, {
        id: '0',
        title: "普通商品"
    }
]
const categoryTreeData = (categoryList) => {
    return categoryList.map((e) => {
        return {
            title: e.name,
            value: `${e.id}`,
            key: `${e.id}`,
            children: categoryTreeData(e.children || [])
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
    categoryList: Array<{ name: string, id: number, children: any }>,
    history: { goBack: Function, push: Function },

}


@connect(({
              view: {
                  goods: {
                      loading,
                      listData,
                      categoryList
                  }
              }
          }) => ({
    loading,
    listData,
    categoryList,
}))
@Form.create()
export default class GoodsListHeader extends Component<Props, {
    queryParams: {
        sale_state: string,
        is_hot_sale: string,
        title: string | null,
        category_ids: Array<number>,
        order_type: string
    }
}> {
    static defaultProps = {
        form: formdDfaultProps,
    }
    state = {
        queryParams: {
            sale_state: 'all',
            is_hot_sale: 'all',
            title: null,
            category_ids: [],
            order_type: 'all'
        }
    }

    componentDidMount() {
        const params = Query.getQuery()
        // console.log(params['category_ids'])
        this.setState({
            queryParams: {
                sale_state: params['sale_state'] !== undefined ? params['sale_state'] : 'all',
                is_hot_sale: params['is_hot_sale'] !== undefined ? params['is_hot_sale'] : 'all',
                title: params['title'] !== undefined ? params['title'] : null,
                category_ids: params['category_ids'] !== undefined ? params['category_ids'] : [],
                order_type: params['order_type'] !== undefined ? params['order_type'] : 'all',
            }
        })
    }

    handleSubmit = (e: handleSubmitType) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values)
            const path = getQueryPath('/goods/list', {
                page: 1,
                rows: 10,
                sale_state: values.sale_state,
                is_hot_sale: values.is_hot_sale,
                title: values.title,
                category_ids: values.category_ids,
                order_type: values.order_type,
            })
            this.props.history.push(path)

        });
    }

    render() {
        const {
            form,
            categoryList,
            loading,
        } = this.props
        const {getFieldDecorator} = form
        const { sale_state, is_hot_sale, title, category_ids, order_type } = this.state.queryParams
        const treeData = categoryTreeData(categoryList)
        // TreeSelect 只接受string
        let _category_ids = category_ids && category_ids.length ? [...category_ids] : []
        return (
            <Form
                layout="inline"
                style={{
                    paddingBottom: '24px',
                    marginBottom: '24px',
                    borderBottom: '1px dashed #ededed'
                }}
                onSubmit={this.handleSubmit}
            >
                <FormItem label="商品名称">
                    {getFieldDecorator("title", { initialValue: title })(
                        <Input
                            placeholder='请输入商品名称'
                        />
                    )}
                </FormItem>
                <FormItem
                    label="商品状态"
                >
                    {getFieldDecorator("sale_state", {
                        initialValue: sale_state,
                    })(
                        <Select
                            placeholder="请选择"
                            style={{ width: 200 }}
                        >
                            {
                                tabsList.map((e, i) => (
                                    <Option value={e.id} key={i}>{e.title}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="商品分类"
                >
                    {getFieldDecorator("category_ids", { initialValue: _category_ids })(
                        <TreeSelect
                            style={{ width: 200 }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={treeData}
                            placeholder="请选择"
                            treeDefaultExpandAll
                            allowClear={true}
                            multiple
                        />
                    )}
                </FormItem>
                <FormItem
                    label="排序"
                >
                    {getFieldDecorator("order_type", { initialValue: order_type })(
                        <Select
                            placeholder="请选择"
                            style={{ width: 200 }}
                        >
                            {
                                order_typeArray.map((e, i) => (
                                    <Option value={e.id} key={i}>{e.title}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="总店推荐"
                >
                    {getFieldDecorator("is_hot_sale", {
                        initialValue: is_hot_sale,
                    })(
                        <Select
                            placeholder="请选择"
                            style={{ width: 200 }}
                        >
                            {
                                hot_saleArray.map((e, i) => (
                                    <Option value={e.id} key={i}>{e.title}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    style={{
                        textAlign: 'center',
                        margin: 'auto',
                        width: '100%',
                        marginTop: '10px'
                    }}>
                    <Button
                        type="primary"
                        style={{ marginRight: 15 }}
                        htmlType="submit"
                        loading={loading}
                    >
                        筛选
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.history.push('/goods/list')
                        }}
                    >
                        清空筛选
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
