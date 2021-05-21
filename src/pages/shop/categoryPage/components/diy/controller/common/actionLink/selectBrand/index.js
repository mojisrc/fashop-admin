import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button } from "antd";
import { connect } from "umi";
import Image from "@/components/image/index";

@connect(({ brand, loading }) => ({
    brandList: brand.list.result,
    brandListLoading: loading.effects["brand/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectPage extends Component {
    static defaultProps = {
        getState: () => {

        },
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
            const columns = [{
                title: "品牌",
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
                title: "品牌名称",
                dataIndex: "title"
            }, {
                title: "",
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
                    title="选择品牌"
                    visible={visible}
                    onCancel={() => {
                        this.close();
                    }}
                    style={{ top: 20 }}
                    width={500}
                    footer={null}
                >
                    <View>
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
        this.setState({ value: null, page: 1, rows: 10 });
    }
}
