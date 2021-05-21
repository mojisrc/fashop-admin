import React, { Component,Fragment } from "react";
import { Modal, Button, Table,Divider } from "antd";
import { connect } from "umi";
import UploadVideo from "../uploadVideo";
import moment from "moment/moment";

@connect(({ goodsMedia, loading }) => ({
    goodsMediaList: goodsMedia.list.result,
    goodsMediaListLoading: loading.effects["goodsMedia/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectVideo extends Component {
    static defaultProps = {
        goodsMediaList: { total_number: 0, list: [] },
        goodsMediaListLoading: true,
        multiSelect: false,
        getState: () => {
        }
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
        const { goodsMediaList } = this.props;
        if (goodsMediaList.list.length === 0) {
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
            type: "goodsMedia/list",
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
        const { onOk, goodsMediaList, goodsMediaListLoading } = this.props;
        if (goodsMediaList) {
            const { checkedData, visible } = this.state;
            const columns = [

                {
                    title: "视频",
                    dataIndex: "url",
                    render:(text,record)=>{
                        return <video src={record.url} load="none" controls="controls" style={{ height: 150 }}/>
                    }
                },
                 {
                    title: "创建时间",
                    dataIndex: "create_time",
                    key: "create_time",
                    render: text => moment(text, "X").format("YYYY-MM-DD HH:mm:ss")
                }, {
                    title: "操作",
                    dataIndex: "is_portal",
                    render: (text, record) => <Fragment><Button onClick={() => {
                        this.setState({
                            value: record
                        }, () => {
                            this.props.getState(this.state);
                        });
                    }}>选择</Button>
                        <Divider type="vertical" />
                        <a onClick={()=>{
                            Modal.confirm({
                                title: "确认删除？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk: async () => {
                                    const { dispatch } = this.props;
                                    dispatch({
                                        type: "goodsMedia/del",
                                        payload: {
                                            id: record.id
                                        },
                                        callback: () => {
                                            this.initList();
                                        }
                                    });
                                }
                            });
                        }}>
                            删除
                        </a>
                    </Fragment>
                }
            ];
            return (
                <Modal
                    title="选择视频"
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
                    footer={null}
                >
                    <div className="listTableTop">
                        <UploadVideo
                            onChange={() => {
                                this.initList();
                            }}
                        />
                    </div>
                    <Table
                        loading={goodsMediaListLoading}
                        dataSource={goodsMediaList.list}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.state.page,
                            pageSize: this.state.rows,
                            total: goodsMediaList.total_number
                        }}
                        onChange={({ current }) => {
                            this.setState({
                                page: current
                            }, () => {
                                this.initList();
                            });
                        }}
                    />
                </Modal>
            );
        } else {
            return null;
        }
    }
}
