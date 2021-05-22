import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { connect } from "umi";
import { Card, Button, Table, Switch, Modal } from "antd";
import PageList from "@/components/pageList";
import Arr from "@/utils/array";
import Image from "@/components/image";
import GoodsApi from "@/services/goods";
import styles from "@/pages/goods/components/list/table/index.css";
import { View } from "@/components/flexView";
import moment from "moment";
import { history as router } from "umi";
import Antd from "@/utils/antd";
@connect(({ goods, goodsCategory, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsCategory: goodsCategory.list.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))

export default class GoodsList extends Component {
    static defaultProps = {
        goodsList: {
            total_number: 0,
            list: []
        },
        goodsListLoading: true,
        goodsCategory: {
            list: []
        },
        goodsCategoryLoading: true
    };
    search = new PageList({
        router: "/goods/list",
        rows: 10,
        param: {
            title: null,
            sale_state: null,
            category_ids: [],
            sort_type: null
        },
        refresh: (e) => {
            this.initList(e);
        }
    });

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "goods/list",
            payload: this.search.filter()
        });
        dispatch({
            type: "goodsCategory/list"
        });
    };

    componentDidMount() {
        this.initList();
    }

    render() {
        const { goodsList, goodsListLoading, goodsCategory } = this.props;
        const { title, category_ids, sort_type, sale_state } = this.search.getParam();
        const tree = Arr.toTree(goodsCategory.list);
        const treeData = Antd.treeData(tree);

        // TreeSelect 只接受string
        let _category_ids = category_ids && category_ids.length ? [...category_ids] : [];
        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                width: 50
            },
            {
                title: "商品图",
                dataIndex: "img",
                width: 80,
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
                width: 230
            }, {
                title: "价格（元）",
                dataIndex: "price",
                width: 120
            }, {
                title: "销量",
                dataIndex: "sale_num",
                width: 80
            }, {
                title: "库存",
                dataIndex: "stock",
                width: 80
            }, {
                title: "分类",
                dataIndex: "category_ids",
                render: (e) => {
                    const textArray = e ? e.map((a) => {
                        const index = goodsCategory.list.findIndex((c) => c.id === Number(a));
                        if (index !== -1) {
                            return goodsCategory.list[index].name;
                        } else {
                            return null;
                        }
                    }) : [];
                    const newArray = textArray.filter((e) => e);
                    return newArray.join("，");
                },
                width: 200

            }, {
                title: "开售时间",
                dataIndex: "sale_time",
                render: e => moment(e * 1000).format("YYYY-MM-DD hh:mm"),
                width: 200
            }, {
                title: "上架状态",
                dataIndex: "is_on_sale",
                render: (text, record) => <Switch
                    defaultChecked={!!text}
                    onChange={async (checked) => {
                        if (checked) {
                            const response = await GoodsApi.onSale({ ids: [record.id] });
                            if (response.code === 0) {
                                this.initList();
                            }
                        } else {
                            const response = await GoodsApi.offSale({ ids: [record.id] });
                            if (response.code === 0) {
                                this.initList();
                            }
                        }
                    }}
                />
            }, {
                title: "操作",
                key: "operation",
                className: styles.column,
                width: 100,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/goods/list/edit`,
                                search: `?id=${record.id}`,
                                state: {
                                    record
                                }
                            });
                        }}
                    >
                        编辑
                    </a>
                    <a
                        onClick={async () => {
                            Modal.confirm({
                                title: "确认删除？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk: async () => {
                                    const response = await GoodsApi.del({ ids: [record.id] });
                                    if (response.code === 0) {
                                        this.initList();
                                    }
                                }
                            });

                        }}
                    >删除</a>
                </View>
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'goods/list'}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={goodsListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
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
                            {
                                label: "商品状态",
                                select: {
                                    field: "sale_state",
                                    style: { width: 100 },
                                    placeholder: "全部类型",
                                    data: [
                                        { value: "1", name: "出售中" },
                                        { value: "2", name: "已售完" },
                                        { value: "3", name: "已下架" }
                                    ],
                                    initialValue: sale_state
                                }
                            },
                            {
                                label: "排序",
                                select: {
                                    field: "sort_type",
                                    style: { width: 200 },
                                    placeholder: "默认排序",
                                    data: [
                                        { value: "1", name: "商品价格低到高" },
                                        { value: "2", name: "商品价格高到低" },
                                        { value: "3", name: "销量多到少" },
                                        { value: "4", name: "销量少到多" },
                                        { value: "5", name: "库存多到少" },
                                        { value: "6", name: "库存少到多" },
                                        { value: "7", name: "创建时间早到晚" },
                                        { value: "8", name: "创建时间晚到早" },
                                        { value: "9", name: "排序高到低" },
                                        { value: "10", name: "排序低到高" }
                                    ],
                                    initialValue: sort_type
                                }
                            }
                        ]} />
                    <View>
                        <div className="listTableTop">
                            <Button
                                type='primary'
                                onClick={() => {
                                    router.push("/goods/list/add");
                                }}
                            >
                                添加商品
                            </Button>
                        </div>
                        <Table
                            loading={goodsListLoading}
                            defaultExpandAllRows
                            dataSource={goodsList.list}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                showSizeChanger: false,
                                showTotal: (total, range) => `共 ${total} 条`,
                                current: this.search.page,
                                pageSize: this.search.rows,
                                total: goodsList.total_number
                            }}
                            onChange={({ current }) => {
                                this.search.setPage(current).push();
                            }}
                        />
                    </View>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
