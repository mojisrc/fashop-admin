import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, Tabs, Button, Table, Divider, Select, Modal } from "antd";
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
    state = {
        selectableCache: [],
        selectedCache: [],
    }
    render() {
        const groupInfo = this.props.groupInfo || {};
        const { selectableCache, selectedCache } = this.state;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        getFieldDecorator("group_goods", {
            initialValue: groupInfo.group_goods ? groupInfo.group_goods : []
        });
        const tabList = [
            {
                title: "选择商品",
                render: ()=> <SelectableGoods 
                    form={form}
                    groupInfo={groupInfo}
                    selectableCache={selectableCache}
                    selectedCache={selectedCache}
                    changeCache={({name, value})=>{
                        this.setState({
                            [name]: value
                        })
                    }}
                />
            }, {
                title: "已参与商品",
                render: ()=> <SelectedGoods 
                    form={form}
                    groupInfo={groupInfo}
                    selectableCache={selectableCache}
                    selectedCache={selectedCache}
                    changeCache={({name, value})=>{
                        this.setState({
                            [name]: value
                        })
                    }}
                />
            }
        ]
        return (
            <View>
                <h3>编辑商品</h3>
                <Tabs 
                    onChange={()=>{}} 
                    type="card"
                    tabBarStyle={{
                        marginBottom: 0
                    }}
                    style={{
                        marginLeft: 20
                    }}
                >
                    {
                        tabList.map((item,index)=>(
                            <TabPane tab={item.title} key={index}>
                                {
                                    item.render()
                                }
                            </TabPane>
                        ))
                    }
                </Tabs>
            </View>
        );
    }
}
export default Goods

@connect(({ group, loading }) => ({
    selectableGoods: group.selectableGoods.result,
    selectableGoodsLoading: loading.effects["group/selectableGoods"]
}))
class SelectableGoods extends Component{
    static defaultProps = {
        selectableGoodsLoading: true,
        selectableGoods: {
            list: [],
            total_number: 0
        }
    };
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    }
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
        const { dispatch, groupInfo } = this.props;
        dispatch({
            type: "group/selectableGoods",
            payload: {
                ...this.search.filter(),
                group_id: groupInfo.id
            }
        });
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){
        const { selectedRowKeys } = this.state;
        const { selectableGoods, selectableGoodsLoading, selectableCache, selectedCache, groupInfo, form, changeCache } = this.props;
        const { keywords, state } = this.search.getParam();
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const selectedCacheIds = selectedCache.map(item => item.id)
        const currentList = selectableGoods && selectableGoods.list ? selectableGoods.list.filter((item,index)=>{
            return (selectedCacheIds.indexOf(item.id) === -1) 
            // || (selectableCache.indexOf(item.id) > -1)
        }) : []
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
                render: text=> <span>{text ? text.length : 0}</span>
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <Button
                    onClick={()=>{
                        // 如果是缓存数据 直接从 state 里去掉
                        changeCache({
                            name: 'selectedCache',
                            value: [
                                ...selectedCache,
                                record,
                            ]
                        })
                        changeCache({
                            name: 'selectableCache',
                            value: selectableCache.filter(item=>item.id!==record.id)
                        })
                        form.setFieldsValue({
                            group_goods: [
                                ...form.getFieldValue('group_goods'),
                                {
                                    goods_id: record.id,
                                    // goods_sku_id,
                                    // group_price,
                                    // captain_price,
                                }
                            ]
                        })
                    }}
                >
                    参与活动
                </Button>
            }
        ]
        return(
            <View className={styles.tableWarp}>
                <PageList.Search
                    loading={selectableGoodsLoading}
                    onSubmit={this.search.submit}
                    defaultValue={this.search.defaultParam}
                    onReset={this.search.reset}
                    style={{ margin: "20px" }}
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
                    rowSelection={rowSelection} 
                    columns={columns} 
                    rowKey={record => record.id}
                    dataSource={currentList} 
                    // dataSource={selectableGoods.list} 
                    footer={() => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <span>
                                {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
                            </span>
                            <Button
                                type="primary"
                                size="small"
                                style={{ marginLeft: 8 }}
                                disabled={!selectedRowKeys.length}
                                onClick={()=>{
                                    // onChange(selectedRowKeys.map(item=>{return {goods_id: item}}))
                                }}
                            >
                                批量参加
                            </Button>
                        </View>
                    )}
                />
            </View>
        )
    }
}

@connect(({ group, loading }) => ({
    selectedGoods: group.selectedGoods.result,
    selectedGoodsLoading: loading.effects["group/selectedGoods"]
}))
class SelectedGoods extends Component {
    static defaultProps = {
        selectedGoodsLoading: true,
        selectedGoods: {
            list: [],
            total_number: 0
        }
    };
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        get: { page: 1, rows: 10 },
        visible: false,
        goods_id: null
    }
    componentDidMount() {
        this.initList();
    }
    initList = () => {
        const { dispatch, groupInfo } = this.props;
        const get = Query.make();
        dispatch({
            type: "group/selectedGoods",
            payload: {
                page: get.page,
                rows: get.rows,
                group_id: groupInfo.id
            },
            callback: () => {
                this.setState({
                    get
                });
            }
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    hideModal=()=>{
        this.setState({
            visible: false
        })
    }
    render() {
        const { selectedRowKeys, visible } = this.state;
        const { selectedGoods, selectedGoodsLoading, selectableCache, selectedCache, groupInfo, form, changeCache } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const selectableCacheIds = selectableCache.map(item => item.id)
        const currentList = selectedGoods && selectedGoods.list ? selectedGoods.list.filter((item, index) => {
            return selectableCacheIds.indexOf(item.id) === -1;
        }) : []
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
                render: (record) => <div>
                    <a 
                        onClick={()=>{
                            this.setState({ visible: true, goods_id: record.id })
                        }}
                    >
                        设置折扣
                    </a>
                    <Divider type="vertical" />
                    <a
                        onClick={() => {
                            // 如果是缓存数据 直接从 state 里去掉
                            changeCache({
                                name: 'selectableCache',
                                value: [
                                    ...selectableCache,
                                    record,
                                ]
                            })
                            changeCache({
                                name: 'selectedCache',
                                value: selectedCache.filter(item => item.id !== record.id)
                            })
                            form.setFieldsValue({
                                group_goods: form.getFieldValue('group_goods').filter(item=>item.goods_id!==record.id)
                            })
                        }}
                    >
                        取消参加
                    </a>
                </div>
            }
        ]
        return (
            <View className={styles.tableWarp}>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    loading={selectedGoodsLoading}
                    dataSource={[
                        ...selectedCache,
                        ...currentList,
                    ]}
                    // dataSource={selectedGoods.list ? selectedGoods.list : []}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.state.get.page,
                        pageSize: this.state.get.rows,
                        total: selectedGoods.total_number
                    }}
                    onChange={({ current, pageSize }) => {
                        router.push(Query.page(current, pageSize));
                        this.initList();
                    }}
                    footer={() => (
                        <View style={{flexDirection: 'row',alignItems: 'center',}}>
                            <span>
                                {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
                            </span>
                            <Button
                                type="primary"
                                size="small"
                                style={{ marginLeft: 8 }}
                                disabled={!selectedRowKeys.length}
                            >
                                全部取消参加
                            </Button>
                        </View>
                    )}
                />
                <Modal
                    title="设置拼团"
                    visible={visible}
                    onOk={()=>{

                    }}
                    onCancel={this.hideModal}
                    width={960}
                    okText="确认"
                    cancelText="取消"
                >
                    <GoodsSkuList
                        goods_id={this.state.goods_id}
                        group_id={groupInfo.id}
                    />
                </Modal>
            </View>
        )
    }
}

@connect(({ group, loading }) => ({
    goodsSkuList: group.goodsSkuList.result,
    goodsSkuListLoading: loading.effects["group/goodsSkuList"]
}))
class GoodsSkuList extends Component{
    static defaultProps = {
        goodsSkuListLoading: true,
        goodsSkuList: {
            list: [],
            total_number: 0
        }
    };
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        get: { page: 1, rows: 10 },
        visible: false
    }
    componentDidMount() {
        this.initList();
    }
    initList = () => {
        const { dispatch, goods_id, group_id } = this.props;
        const get = Query.make();
        dispatch({
            type: "group/goodsSkuList",
            payload: {
                page: get.page,
                rows: get.rows,
                goods_id,
                group_id
            },
            callback: () => {
                this.setState({
                    get
                });
            }
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){
        const { selectedRowKeys, visible } = this.state;
        const { goodsSkuList, goodsSkuListLoading } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
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
                title: "折扣",
                dataIndex: "discount"
            }, {
                title: "状态",
                dataIndex: "state"
            }
        ]
        return(
            <Table
                rowSelection={rowSelection}
                columns={columns}
                loading={goodsSkuListLoading}
                dataSource={goodsSkuList.list ? goodsSkuList.list : []}
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
