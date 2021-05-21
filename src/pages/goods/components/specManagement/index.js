import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button, message } from "antd";
import { connect } from "umi";

@connect(({ goodsSpec, loading }) => ({
    specList: goodsSpec.list.result.list,
    specListLoading: loading.effects["goodsSpec/list"]
}), null, null, {
    forwardRef: true
})
export default class SpecManagement extends Component {
    static defaultProps = {
        specListLoading: true,
        specList: {
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
        const { specList, specListLoading } = this.props;
        if (specList.length === 0 && specListLoading === false) {
            this.initList();
        }
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsSpec/list",
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
        const { specList, specListLoading } = this.props;
        const { visible } = this.state;
        if (specList) {
            const columns = [{
                title: "规格ID",
                dataIndex: "id"
            }, {
                title: "名称",
                dataIndex: "name"
            }, {
                title: "操作",
                render: (text, record) => <a onClick={() => {
                    Modal.confirm({
                        title: "确认删除？",
                        okText: "确认",
                        okType: "danger",
                        cancelText: "取消",
                        onOk: async () => {
                            const { dispatch } = this.props;
                            dispatch({
                                type: "goodsSpec/del",
                                payload: {
                                    id: record.id
                                },
                                callback: (e) => {
                                    if(e.code===0){
                                        this.close()
                                        this.initList();
                                    }else{
                                        message.error(e.msg)
                                    }
                                }
                            });
                        }
                    });
                }}>删除</a>
            }];
            return (
                <Modal
                    title="选择规格"
                    visible={visible}
                    onCancel={() => {
                        this.close();
                    }}
                    width={500}
                    footer={null}
                >
                    <View>
                        <Table
                            loading={specListLoading}
                            dataSource={specList}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={false}
                        />
                    </View>
                </Modal>
            );
        } else {
            return null;
        }
    }
}
