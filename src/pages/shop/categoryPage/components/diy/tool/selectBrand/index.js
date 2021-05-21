import React, { Component } from "react";
import { Modal, Input, Button, Table } from "antd";
import { list } from "@/models/brand";
import { connect } from "umi";
import Arr from "@/utils/array";
import Image from "@/components/image/index";


@connect(({ brand, loading }) => ({
    brandList: brand.list.result,
    brandListLoading: loading.effects["brand/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectCoupon extends Component {
    static defaultProps = {
        brandList: { total_number: 0, list: [] },
        brandListLoading: true,
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
        const { brandList } = this.props;
        if (brandList.list.length === 0) {
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
            type: "brand/list",
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
        const { onOk, multiSelect, brandList, brandListLoading } = this.props;
        if (brandList) {
            const {  checkedData, visible, selectedRowKeys, disabledIds } = this.state;
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
                    title: "LOGO",
                    dataIndex: "logo",
                    width: 50,
                    render: (e) => (
                        <Image
                            type='goods'
                            src={e}
                            style={{ width: 50, height: 50 }}
                        />
                    )
                },
                {
                    title: "品牌名称",
                    dataIndex: "title"
                }
            ];
            return (
                <Modal
                    title="选择品牌"
                    cancelText='取消'
                    okText='确定'
                    visible={visible}
                    width={556}
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
                    <Table
                        loading={brandListLoading}
                        dataSource={brandList.list}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.state.page,
                            pageSize: this.state.rows,
                            total: brandList.total_number
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
