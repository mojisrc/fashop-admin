import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, Tabs, Button, Table, Divider, Select, Modal, Icon, InputNumber } from "antd";
import styles from "./index.css";
import router from "umi/router";
import Query from "@/utils/query";
import PageList from "@/components/pageList";
import Image from "@/components/image";
import moment from "moment";
import Arr from "@/utils/array";
import Antd from "@/utils/antd";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option

class Goods extends Component {
    render() {
        const groupInfo = this.props.groupInfo || {};
        const { form, formItemLayout, getGoodsSku } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const is_invalid = groupInfo && groupInfo.is_show===0 // 已失效
        const is_over = groupInfo && moment().isAfter(moment(groupInfo.end_time, 'X')) // 已结束
        const is_ing = groupInfo && moment().isBetween(moment(groupInfo.start_time, 'X'), moment(groupInfo.end_time, 'X')) // 进行中
        const disabled = is_ing || is_invalid || is_over;
        // 已失效、已结束的活动 不能重新选择商品 不能编辑拼团价 团长价（查看）
        // 进行中 的活动 不能重新选择商品 不能编辑拼团价 团长价（编辑）
        return (
            <View>
                <h3>活动商品</h3>
                <FormItem
                    {...formItemLayout}
                    label="选择商品"
                >
                    {getFieldDecorator('goods_info', {
                        rules: [{ required: true, message: "请选择商品!" }],
                        initialValue: groupInfo.goods_info ? groupInfo.goods_info : null
                    })(
                        <AddGoods getGoodsSku={getGoodsSku} disabled={disabled}/>
                    )}
                </FormItem>
                {
                    getFieldValue('goods_info') ?
                        <FormItem
                            {...formItemLayout}
                            label="优惠设置"
                        >
                            {getFieldDecorator('group_goods', {
                                initialValue: groupInfo.group_goods ? groupInfo.group_goods : []
                            })(
                                <GoodsSkuList disabled={disabled} />
                            )}
                        </FormItem> 
                        : null
                }
            </View>
        );
    }
}
export default Goods

class AddGoods extends Component {
    state = {
        visible: false
    }
    hideModal = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        const { visible } = this.state
        const { onChange, value, getGoodsSku, disabled } = this.props;
        return <View>
            <View
                className={styles.add}
                onClick={() => {
                    if (!disabled){
                        this.setState({
                            visible: true
                        })
                    }
                }}
            >
                {
                    value ? 
                    <View className={styles.imgWarp}>
                        <Image
                            type='goods'
                            src={value.img}
                            style={{ width: 72, height: 72 }}
                        />
                        {
                            disabled ? null :
                            <View className={styles.zhezhao}>
                                <span>替换</span>
                            </View>
                        }
                    </View> :
                    <Icon type="plus" style={{ color: "#b9b9b9" }}/>
                }
            </View>
            <Modal
                title="选择商品"
                visible={visible}
                onCancel={this.hideModal}
                width={960}
                footer={null}
            >
                <SelectableGoods
                    onOk={(goods_info) => {
                        onChange(goods_info)
                        getGoodsSku()
                        this.hideModal()
                    }}
                />
            </Modal>
        </View>
    }
}

@connect(({ goods, goodsCategory, group, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsCategory: goodsCategory.list.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"],
    selectableGoods: group.selectableGoods.result,
    selectableGoodsLoading: loading.effects["group/selectableGoods"]
}))
class SelectableGoods extends Component {
    static defaultProps = {
        goodsList: {
            list: [],
            total_number: 0
        },
        goodsListLoading: true,
        goodsCategory:{
            list:[]
        },
        goodsCategoryLoading: true,
        selectableGoodsLoading: true,
        selectableGoods: {
            list: [],
        }
    };
    state = {
        page: 1,
        rows: 10,
        title: null,
        category_ids: [],
    }
    componentDidMount() {
        this.initList();
    }
    initList() {
        const { dispatch } = this.props;
        const { page, rows, title, category_ids } = this.state;
        dispatch({
            type: "goods/list",
            payload: {
                page,
                rows,
                title,
                category_ids,
            }
        });
        dispatch({
            type: "goodsCategory/list",
        });
        dispatch({
            type: "group/selectableGoods",
        });
    }
    render() {
        const { goodsList, goodsListLoading, goodsCategory, selectableGoods, selectableGoodsLoading, onOk } = this.props;
        const { page, rows, title, category_ids } = this.state;
        const tree = Arr.toTree(goodsCategory.list);
        const treeData = Antd.treeData(tree);
        // TreeSelect 只接受string
        let _category_ids = category_ids && category_ids.length ? [...category_ids] : [];
        // 解决 selectable 请求中的时候列表渲染 bug
        if (selectableGoodsLoading){
            return null
        }
        const selectableGoodsIds = selectableGoods.list.map(item => item.id)
        const currentList = goodsList.list.map(item => {
            if (selectableGoodsIds.indexOf(item.id) === -1) {
                item.selectable = true
            }
            return item
        })
        const columns = [
            {
                title: "商品图",
                dataIndex: "img",
                render: (e) => (
                    <Image
                        type='goods'
                        src={e}
                        style={{ width: 50, height: 50 }}
                    />
                )
            }, {
                title: "商品标题",
                dataIndex: "title",
            }, {
                title: "价格（元）",
                dataIndex: "price",
            }, {
                title: "库存",
                dataIndex: "stock"
            }, {
                title: "SKU数量",
                dataIndex: "sku_list",
                render: text => <span>{text ? text.length : 0}</span>
            }, {
                title: "操作",
                key: "operation",
                render: (record) => record.selectable ? <Button
                    onClick={() => onOk(record)}
                >
                    选取
                </Button> : <span>不可选</span>
            }
        ]
        return (
            <View>
                <PageList.Search
                    loading={goodsListLoading || selectableGoodsLoading}
                    defaultValue={{
                        page: 1,
                        rows: 10,
                        title: null,
                        category_ids: [],
                    }}
                    onSubmit={(values)=>{
                        this.setState(values, 
                        () => {
                            this.initList();
                        })
                    }}
                    onReset={(values)=>{
                        this.setState(values, 
                        () => {
                            this.initList();
                        })
                    }}
                    style={{ margin: "10px 20px" }}
                    items={[
                        {
                            label: "商品名称",
                            input: {
                                field: "title",
                                placeholder: "请输入关键词",
                                initialValue: title
                            }
                        },
                        {
                            label: "商品分类",
                            treeSelect: {
                                field: "category_ids",
                                style: { width: 300 },
                                dropdownStyle: { maxHeight: 400, overflow: "auto" },
                                treeDefaultExpandAll: true,
                                allowClear: true,
                                multiple: true,
                                placeholder: "请选择",
                                treeData: treeData,
                                initialValue: _category_ids
                            }
                        },
                    ]}
                />
                <Table
                    loading={goodsListLoading || selectableGoodsLoading}
                    dataSource={selectableGoodsLoading ? [] : currentList}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: page,
                        pageSize: rows,
                        total: goodsList.total_number
                    }}
                    onChange={({ current, pageSize }) => {
                        this.setState({
                            page: current,
                            rows: pageSize
                        }, () => {
                            this.initList();
                        })
                    }}
                />
            </View>
        )
    }
}


class GoodsSkuList extends Component {
    render() {
        const { value, onChange, disabled } = this.props;
        const columns = [
            {
                title: "SKU",
                dataIndex: "title",
            }, {
                title: "价格（元）",
                dataIndex: "price",
            }, {
                title: "库存",
                dataIndex: "stock"
            }, {
                title: "拼团价（填写原价为不参与拼团）",
                dataIndex: "group_price",
                render: (text, record) => <FormItem
                    validateStatus={(!record.group_price) || (record.group_price && (Number(record.group_price) > Number(record.price))) ? "error" : null}
                    help={!record.group_price ? "请输入正确的拼团价" : (record.group_price && (Number(record.group_price) > Number(record.price))) ? "拼团价不能高于原价" : ""}
                    style={{marginBottom: 0}}
                >
                    <InputNumber
                        addonBefore="拼团价"
                        type="number"
                        step={0.01}
                        min={0.01}
                        max={Number(record.price)}
                        style={{ width: 130, marginRight: 10 }}
                        value={text}
                        disabled={disabled}
                        onChange={(e) => {
                            record.group_price = e
                            onChange(value)
                        }}
                    />
                    <span>元</span>
                </FormItem>
            }, {
                title: "团长优惠（不填写为无优惠）",
                dataIndex: "captain_price",
                render: (text, record) => <FormItem
                    validateStatus={(!record.captain_price) || (record.captain_price && record.group_price && (Number(record.captain_price) > Number(record.group_price))) ? "error" : null}
                    help={!record.captain_price ? "请输入正确的团长价" : (record.captain_price && record.group_price && (Number(record.captain_price) > Number(record.group_price))) ? "团长价不能高于拼团价" : ""}
                    style={{marginBottom: 0}}
                >
                    <InputNumber
                        addonBefore="团长价"
                        type="number"
                        step={0.01}
                        min={0}
                        style={{ width: 130, marginRight: 10 }}
                        value={text}
                        disabled={disabled}
                        onChange={(e) => {
                            record.captain_price = e
                            onChange(value)
                        }}
                    />
                    <span>元</span>
                </FormItem>
            }
        ]
        return (
            <Table
                columns={columns}
                loading={!value.length}
                dataSource={value}
                pagination={null}
            />
        )
    }
}
