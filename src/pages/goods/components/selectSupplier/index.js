import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button } from "antd";
import { connect } from "umi";

@connect(({ supplier, loading }) => ({
    supplierList: supplier.list.result,
    supplierListLoading: loading.effects["supplier/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectSupplier extends Component {
    static defaultProps = {
        supplierListLoading: true,
        supplierList: {
            list: [],
            total_number: 0
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rows: 10,
            value: props.value ? props.value : null,
            visible: false
        };
    }

    componentDidMount() {
        const { supplierList, supplierListLoading } = this.props;
        if (supplierList.list.length === 0 && supplierListLoading === false) {
            this.initList();
        }
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "supplier/list",
            payload: {
                page: this.state.page,
                rows: this.state.rows
            }
        });
    }

    show() {
        this.setState({
            visible: true
        },()=>{
            this.initList()
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { supplierList, supplierListLoading } = this.props;
        const { visible } = this.state;
        if (supplierList) {
            const columns = [{
                title: "供应商ID",
                dataIndex: "id"
            }, {
                title: "供应商名称",
                dataIndex: "title"
            }, {
                title: "操作",
                dataIndex: "is_portal",
                render: (text, record) => <Button onClick={() => {
                    this.setState({
                        value: record
                    }, () => {
                        this.props.getState(this.state);
                    });
                }}>选择</Button>
            }];
            return (
                <Modal
                    title="选择供应商"
                    visible={visible}
                    onCancel={() => {
                        this.close();
                    }}
                    style={{ top: 20 }}
                    width={756}
                    footer={null}
                >
                    <View>
                        <Table
                            loading={supplierListLoading}
                            dataSource={supplierList.list}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                showSizeChanger: false,
                                showTotal: (total, range) => `共 ${total} 条`,
                                pageSize: this.state.rows,
                                total: supplierList.total_number,
                                current: this.state.page
                            }}
                            onChange={({ current, pageSize }) => {
                                this.setState({
                                    page: current, rows: pageSize
                                }, () => {
                                    this.initList();
                                });
                            }}
                        />
                    </View>
                </Modal>
            );
        } else {
            return null;
        }
    }

    init() {
        this.setState({ value: null, supplier: 1, rows: 10 });
    }
}
