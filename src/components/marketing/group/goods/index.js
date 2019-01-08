import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, Tabs, Button, Table, Divider, Select, Modal, Icon } from "antd";
import styles from "./index.css";
import router from "umi/router";
import Query from "@/utils/query";
import PageList from "@/components/pageList";
import Image from "@/components/image";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option

@connect()
class Goods extends Component {
    render() {
        const groupInfo = this.props.groupInfo || {};
        const { form, formItemLayout } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
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
                        <AddGoods />
                    )}
                </FormItem>
                {
                    getFieldValue('goods_info') ?
                        <FormItem
                            {...formItemLayout}
                            label="优惠设置"
                        >
                            {getFieldDecorator('sepc_list', {
                                rules: [{ required: true, message: "请输入拼团价格!" }],
                                initialValue: groupInfo.sepc_list ? groupInfo.sepc_list : []
                            })(
                                <GoodsSkuList />
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
        const { onChange, value } = this.props
        return <View>
            <View
                className={styles.add}
                onClick={() => {
                    this.setState({
                        visible: true
                    })
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
                        <View className={styles.zhezhao}>
                            <span>替换</span>
                        </View>
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
                        this.hideModal()
                    }}
                />
            </Modal>
        </View>
    }
}

@connect(({ group, loading }) => ({
    selectableGoods: group.selectableGoods.result,
    selectableGoodsLoading: loading.effects["group/selectableGoods"]
}))
class SelectableGoods extends Component {
    static defaultProps = {
        selectableGoodsLoading: true,
        selectableGoods: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/marketing/group/add",
        rows: 10,
        refresh: (e) => {
            this.initList(e);
        }
    });
    componentDidMount() {
        this.initList();
    }
    initList = () => {
        const { dispatch, group_id } = this.props;
        dispatch({
            type: "group/selectableGoods",
            payload: {
                ...this.search.filter(),
                group_id: 3
            }
        });
    };
    render() {
        const { selectableGoods, selectableGoodsLoading, onOk } = this.props;
        const { keywords, state } = this.search.getParam();
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
                render: (record) => record.id ? <Button
                    onClick={() => onOk(record)}
                >
                    选取
                </Button> : <span>不可选</span>
            }
        ]
        return (
            <View className={styles.tableWarp}>
                <PageList.Search
                    loading={selectableGoodsLoading}
                    onSubmit={this.search.submit}
                    defaultValue={this.search.defaultParam}
                    onReset={this.search.reset}
                    style={{ margin: "10px 20px" }}
                    items={[
                        {
                            label: "商品名称",
                            input: {
                                field: "keywords",
                                placeholder: "请输入商品名称",
                                initialValue: keywords
                            }
                        }, {
                            label: "商品分类",
                            select: {
                                field: "state",
                                style: { width: 130 },
                                placeholder: "全部",
                                data: [
                                    { name: "未开始", value: "0" },
                                    { name: "进行中", value: "10" },
                                    { name: "已结束", value: "20" },
                                ],
                                initialValue: state
                            }
                        }
                    ]}
                />
                <Table
                    loading={selectableGoodsLoading}
                    columns={columns}
                    dataSource={selectableGoods.list}
                />
            </View>
        )
    }
}

@connect(({ group, loading }) => ({
    goodsSkuList: group.goodsSkuList.result,
    goodsSkuListLoading: loading.effects["group/goodsSkuList"]
}))
class GoodsSkuList extends Component {
    static defaultProps = {
        goodsSkuListLoading: true,
        goodsSkuList: {
            list: [],
            total_number: 0
        }
    };
    state = {
        get: { page: 1, rows: 10 },
        visible: false
    }
    componentDidMount() {
        this.initList();
    }
    initList = () => {
        const { dispatch } = this.props;
        const get = Query.make();
        dispatch({
            type: "group/goodsSkuList",
            payload: {
                page: get.page,
                rows: get.rows
            },
            callback: () => {
                this.setState({
                    get
                });
            }
        });
    };
    render() {
        const { visible } = this.state;
        const { goodsSkuList, goodsSkuListLoading } = this.props;
        const columns = [
            {
                title: "SKU",
                dataIndex: "sku",
            }, {
                title: "价格（元）",
                dataIndex: "price",
            }, {
                title: "库存",
                dataIndex: "storage"
            }, {
                title: "拼团价",
                dataIndex: "group_price",
                render:()=> <View className={styles.rowCenter}>
                    <Input 
                        addonBefore="拼团价" 
                        step={0.01} 
                        style={{width: 130, marginRight: 10}}
                        onChange={(e)=>console.log(e)}
                    />
                    <span>元</span>
                </View>
            }, {
                title: "团长优惠（不填写为无优惠）",
                dataIndex: "captain_price",
                render:()=> <View className={styles.rowCenter}>
                    <Input 
                        addonBefore="团长价" 
                        step={0.01} 
                        style={{width: 130, marginRight: 10}}
                        onChange={(e)=>console.log(e)}
                    />
                    <span>元</span>
                </View>
            }, {
                title: "状态",
                dataIndex: "state",
            }
        ]
        return (
            <Table
                columns={columns}
                loading={goodsSkuListLoading}
                dataSource={[{}]}
                // dataSource={goodsSkuList.list ? goodsSkuList.list : []}
                pagination={{
                    showSizeChanger: false,
                    showQuickJumper: false,
                    current: this.state.get.page,
                    pageSize: this.state.get.rows,
                    total: goodsSkuList.total_number
                }}
                onChange={({ current, pageSize }) => {
                    router.push(Query.page(current, pageSize));
                    this.initList();
                }}
            />
        )
    }
}

