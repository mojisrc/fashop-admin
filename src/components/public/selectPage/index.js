import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button } from "antd";
import { connect } from "dva";
import moment from "moment";
//
// type PageRowType = {
//     id: number,
//     name: string,
//     description: string,
//     is_system: number,
//     is_portal: number,
//     type: string,
//     create_time: number,
//     update_time: number
// }
// type Props = {
//     visible: boolean,
//     close: Function,
//     getState: Function,
//     dispatch?: Function,
//     pageListLoading?: boolean,
//     pageList?: {
//         page: number,
//         rows: number,
//         total_number: number,
//         list: Array<PageRowType>,
//     },
//     value?: PageRowType | null
// }
// type State = {
//     value: PageRowType | null
// }
@connect(({ page, loading }) => ({
    pageList: page.list.result,
    pageListLoading: loading.effects["page/list"]
}))
export default class SelectPage extends Component {
    static defaultProps = {
        pageListLoading: true,
        pageList: {
            list: [],
            total_number: 0
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1, rows: 10,
            value: props.value ? props.value : null
        };
    }

    componentDidMount() {
        const { pageList, pageListLoading } = this.props;
        if (pageList.list.length === 0 && pageListLoading === false) {
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

    render() {
        const { visible, pageList, pageListLoading } = this.props;
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
                    title="选择自定义页面"
                    visible={visible}
                    onCancel={() => {
                        this.props.close();
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
                                showQuickJumper: false,
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
