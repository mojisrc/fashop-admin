import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button } from "antd";
import { connect } from "umi";
import moment from "dayjs";

@connect(({ goodsRelation, loading }) => ({
    relationList: goodsRelation.pageGoodsRelationList.result,
    relationListLoading: loading.effects["goodsRelation/pageGoodsRelationList"]
}), null, null, {
    forwardRef: true
})
export default class SelectGoodsRelation extends Component {
    static defaultProps = {
        getState:()=>{

        },
        relationListLoading: true,
        relationList: {
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
        const { relationList, relationListLoading } = this.props;
        if (relationList.list.length === 0 && relationListLoading === false) {
            this.initList();
        }
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsRelation/pageGoodsRelationList",
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
        const { relationList, relationListLoading } = this.props;
        const { visible } = this.state;
        if (relationList) {
            const columns = [
                {
                    title: "模板ID",
                    dataIndex: "id",
                    key: "id"
                },
                {
                    title: "模板名称",
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: "关联商品个数",
                    dataIndex: "goods_num",
                    key: "goods_num",
                }, {
                    title: "创建时间",
                    dataIndex: "create_time",
                    render: text => moment(text, "X").format("YYYY-MM-DD HH:mm:ss")
                }, {
                title: "",
                dataIndex: "is_portal",
                render: (text, record) => <Button onClick={() => {
                    this.setState({
                        value: record,
                    }, () => {
                        this.props.getState(this.state);
                    });
                }}>选择</Button>
            }];
            return (
                <Modal
                    title="选择商品关联模板"
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
                            loading={relationListLoading}
                            dataSource={relationList.list}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                showSizeChanger: false,
                                showTotal: (total, range) => `共 ${total} 条`,
                                pageSize: this.state.rows,
                                total: relationList.total_number,
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
