import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button, Input } from "antd";
import { connect } from "umi";
import Image from "@/components/image";

const Search = Input.Search;

@connect(({ brand, loading }) => ({
    brandList: brand.list.result,
    brandListLoading: loading.effects["brand/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectBrand extends Component {
    static defaultProps = {
        brandListLoading: true,
        brandList: {
            list: [],
            total_number: 0
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rows: 10,
            keywords: null,
            value: props.value ? props.value : null,
            visible: false
        };
    }

    componentDidMount() {
        const { brandList, brandListLoading } = this.props;
        if (brandList.list.length === 0 && brandListLoading === false) {
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
        const { brandList, brandListLoading } = this.props;
        const { visible } = this.state;
        if (brandList) {
            const columns = [
                {
                    title: "ID",
                    dataIndex: "id"
                }, {
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
                }, {
                    title: "名称",
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
                }
            ];
            return (
                <Modal
                    title="选择品牌"
                    visible={visible}
                    onCancel={() => {
                        this.close();
                    }}
                    style={{ top: 20 }}
                    width={756}
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
                            loading={brandListLoading}
                            dataSource={brandList.list}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                showSizeChanger: false,
                                showTotal: (total, range) => `共 ${total} 条`,
                                pageSize: this.state.rows,
                                total: brandList.total_number,
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
        this.setState({ value: null, brand: 1, rows: 10 });
    }
}
