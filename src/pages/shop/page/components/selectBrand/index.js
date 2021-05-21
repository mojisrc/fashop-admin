import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button, Input } from "antd";
import { connect } from "umi";
import Image from "@/components/image";

const Search = Input.Search;

@connect(({ brand, loading }) => ({
    brand: brand.list.result,
    brandLoading: loading.effects["brand/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectBrand extends Component {
    static defaultProps = {
        getState: () => {

        },
        multi: false,
        onCheck: () => {
        },
        checkedKeys: [],
        brandLoading: true,
        brand: {
            list: [],
            total_number: 0
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rows: 20,
            keywords: null,
            value: props.value ? props.value : null,
            visible: false
        };
    }

    componentDidMount() {
        const { brand, brandLoading } = this.props;
        if (brand.list.length === 0 && brandLoading === false) {
            this.initList();
        }
    }

    initList() {
        const { dispatch } = this.props;
        const { page, rows, keywords } = this.state;
        dispatch({
            type: "brand/list",
            payload: {
                page,
                rows,
                keywords
            }
        });
    }

    show() {
        this.setState({
            visible: true
        }, () => {
            this.initList();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { brand, brandLoading, multi, checkedKeys, onCheck } = this.props;
        const { visible } = this.state;
        const rowSelection = {
            selectedRowKeys: checkedKeys,
            // 用户手动选择/取消选择某行的回调
            onSelect: (record, selected) => {
                let _checkedKeys = [...checkedKeys];
                const index = _checkedKeys.findIndex((e) => `${e}` === `${record.id}`);
                // 增加
                if (selected) {
                    if (index === -1) {
                        _checkedKeys.push(`${record.id}`);
                    }
                } else {
                    // 删除
                    if (index !== -1) {
                        _checkedKeys.splice(index, 1);
                    }
                }
                onCheck(_checkedKeys);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                let _checkedKeys = [...checkedKeys];
                changeRows.map((record) => {
                    const index = _checkedKeys.findIndex((e) => `${e}` === `${record.id}`);
                    // 增加
                    if (selected) {
                        if (index === -1) {
                            _checkedKeys.push(`${record.id}`);
                        }
                    } else {
                        // 删除
                        if (index !== -1) {
                            _checkedKeys.splice(index, 1);
                        }
                    }
                });
                onCheck(_checkedKeys);
            }
        };


        if (brand) {
            let columns = [
                {
                    title: "Logo",
                    dataIndex: "logo",
                    width: 30,
                    render: (e) => (
                        <Image
                            type='goods'
                            src={e}
                            style={{ width: 30, height: 30 }}
                        />
                    )
                },
                {
                    title: "品牌名称",
                    dataIndex: "title",
                    key: "title"
                }];
            !multi && columns.push({
                title: "",
                dataIndex: "op",
                render: (text, record) => <Button onClick={() => {
                    this.setState({
                        value: record
                    }, () => {
                        this.props.getState(this.state);
                    });
                }}>选择</Button>
            });
            return (
                <Modal
                    title="选择品牌"
                    visible={visible}
                    onCancel={() => {
                        this.close();
                    }}
                    style={{ top: 20 }}
                    width={600}
                    footer={null}
                >
                    <View>
                        <Search
                            placeholder="请输入商品名称"
                            onSearch={(value) => {
                                this.setState({
                                    page: 1,
                                    keywords: value
                                }, () => {
                                    this.initList();
                                });
                            }}
                            style={{ width: 200, marginBottom: 10 }}
                        />
                        <Table
                            scroll={{ y: 500 }}
                            rowSelection={multi ? rowSelection : null}
                            loading={brandLoading}
                            dataSource={brand.list}
                            columns={columns}
                            rowKey={record => `${record.id}`}
                            pagination={{
                                showSizeChanger: false,
                                showTotal: (total, range) => `共 ${total} 条`,
                                pageSize: this.state.rows,
                                total: brand.total_number,
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
        this.setState({ value: null, page: 1, rows: 10 });
    }
}
