import React, { Component } from "react";
import { Modal, Input, Button, Table } from "antd";
import { list } from "@/models/goods";
import { connect } from "umi";
import Image from "@/components/image";
import Arr from "@/utils/array";

const Search = Input.Search;

@connect(({ goodsRelation, loading }) => ({
    goodsList: goodsRelation.goodsList.result,
    goodsListLoading: loading.effects["goodsRelation/goodsList"]
}), null, null, {
    forwardRef: true
})
export default class SelectCouponGoods extends Component {
    static defaultProps = {
        goodsList: { total_number: 0, list: [] },
        goodsListLoading: true,
        multiSelect: false
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rows: 10,
            multiSelect: props.multiSelect ? props.multiSelect : false,
            checkedData: [],
            visible: false,
            selectedRowKeys: [],
            disabledIds: []
        };
    }

    componentDidMount() {
        const { goodsList } = this.props;
        if (goodsList.list.length === 0) {
            this.initList();
        }
    }

    setDisabledIds(disabledIds) {
        this.setState({
            disabledIds
        });
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsRelation/goodsList",
            payload: {
                page: this.state.page,
                rows: this.state.rows
            }
        });
    }

    show() {
        this.setState({
            visible: true
        });
        this.initList();
    }

    close() {
        this.setState({
            visible: false
        });
    }


    render() {
        const { onOk, multiSelect, goodsList, goodsListLoading, dispatch } = this.props;
        if (goodsList) {
            const { rows, checkedData, visible, selectedRowKeys, disabledIds } = this.state;
            const rowSelection = {
                selectedRowKeys,
                // 选中项发生变化时的回调
                onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({ selectedRowKeys });
                },
                // 用户手动选择/取消选择某行的回调
                onSelect: (record, selected) => {
                    const { checkedData } = this.state;
                    let _checkedData = [...checkedData];
                    const index = checkedData.findIndex((e) => e.id === record.id);
                    // 增加
                    if (selected) {
                        if (index === -1) {
                            _checkedData.push(record);
                        }
                    } else {
                        // 删除
                        if (index !== -1) {
                            _checkedData.splice(index, 1);
                        }
                    }
                    this.setState({
                        checkedData: _checkedData
                    }, () => {
                        !multiSelect ? onOk(this.state) : null;
                    });
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    const { checkedData } = this.state;
                    let _checkedData = [...checkedData];
                    changeRows.map((record) => {
                        const index = checkedData.findIndex((e) => e.id === record.id);
                        // 增加
                        if (selected) {
                            if (index === -1) {
                                _checkedData.push(record);
                            }
                        } else {
                            // 删除
                            if (index !== -1) {
                                _checkedData.splice(index, 1);
                            }
                        }
                    });
                    this.setState({
                        checkedData: _checkedData
                    }, () => {
                        !multiSelect ? onOk(this.state) : null;
                    });
                },
                // 已经选择的不要再选
                getCheckboxProps: record => ({
                    disabled: Arr.inArray(record.id, disabledIds) // Column configuration not to be checked
                })
            };


            const columns = [
                {
                    title: "ID",
                    dataIndex: "id",
                    width: 50
                },
                {
                    title: "商品图",
                    dataIndex: "img",
                    width: 50,
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
                    dataIndex: "base_sale_num",
                    width: 80
                }, {
                    title: "库存",
                    dataIndex: "stock",
                    width: 80
                }
            ];
            return (
                <Modal
                    title="添加商品"
                    cancelText='取消'
                    okText='确定'
                    visible={visible}
                    width={756}
                    onCancel={() => {
                        this.close();
                    }}
                    onOk={() => {
                        onOk(checkedData);
                        this.setState({ checkedData: [], selectedRowKeys: [] });
                        this.close();
                    }}
                    footer={multiSelect ? <div>
                        <Button
                            disabled={checkedData.length === 0}
                            type="primary"
                            onClick={() => {
                                onOk(this.state);
                                this.setState({ checkedData: [], selectedRowKeys: [] });
                                this.close();
                            }}>确认</Button>
                    </div> : null}
                >
                    <Search
                        placeholder="请输入商品名称"
                        onSearch={(value) => {
                            dispatch({
                                type: "goods/list",
                                payload: {
                                    page: 1,
                                    rows,
                                    title: value
                                }
                            });
                        }}
                        style={{ width: 200 }}
                    />
                    <Table
                        loading={goodsListLoading}
                        dataSource={goodsList.list}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.state.page,
                            pageSize: this.state.rows,
                            total: goodsList.total_number
                        }}
                        onChange={({ current }) => {
                            this.setState({
                                page: current
                            }, () => {
                                this.initList();
                            });
                        }}
                        rowSelection={rowSelection}
                    />
                </Modal>
            );
        } else {
            return null;
        }
    }
}
