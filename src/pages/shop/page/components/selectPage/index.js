import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button } from "antd";
import { connect } from "umi";
import moment from "dayjs";

@connect(({ page, loading }) => ({
    pageList: page.list.result,
    pageListLoading: loading.effects["page/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectPage extends Component {
    static defaultProps = {
        getState:()=>{

        },
        pageListLoading: true,
        pageList: {
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
        const { pageList, pageListLoading } = this.props;
        if (Array.isArray(pageList.list) && pageList.list.length === 0 && pageListLoading === false) {
            this.initList();
        }
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "page/list",
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
        const { pageList, pageListLoading } = this.props;
        const { visible } = this.state;
        if (pageList) {
            const columns = [{
                title: "页面ID",
                dataIndex: "id"
            }, {
                title: "页面名称",
                dataIndex: "name"
            }, {
                title: "最后编辑",
                dataIndex: "update_time",
                render: text => text ? moment(text, "X").format("YYYY-MM-DD HH:mm") : "-"
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
                    title="选择自定义专题页面"
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
                            loading={pageListLoading}
                            dataSource={pageList.list}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                showSizeChanger: false,
                                showTotal: (total, range) => `共 ${total} 条`,
                                pageSize: this.state.rows,
                                total: pageList.total_number,
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
