//@flow
import React, { Component } from "react";
import { View } from "react-web-dom";
import { Modal, Table, Button } from "antd";
import { connect } from "react-redux";
import { getShopPageList } from "../../../actions/shop/decorate";
import moment from "moment";

type PageRowType = {
    id: number,
    name: string,
    description: string,
    is_system: number,
    is_portal: number,
    type: string,
    create_time: number,
    update_time: number
}
type Props = {
    visible: boolean,
    close: Function,
    getState: Function,
    dispatch?: Function,
    shopPageListLoading?: boolean,
    shopPageList?: {
        page: number,
        rows: number,
        total_number: number,
        list: Array<PageRowType>,
    },
    value?: PageRowType | null
}
type State = {
    value: PageRowType | null
}
@connect(
    ({ view: { shop: { shopPageList, shopPageListLoading } } }) => ({
        shopPageList,
        shopPageListLoading,
    })
)
export default class SelectPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value ? props.value : null
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        if (dispatch) {
            dispatch(getShopPageList({ params: { page: 1, rows: 5 } }))
        }
    }

    render() {
        const { visible, shopPageList, shopPageListLoading, dispatch } = this.props
        if (shopPageList) {
            const { page, rows, list, total_number } = shopPageList

            const columns = [{
                title: "页面ID",
                dataIndex: "id",
            }, {
                title: "页面名称",
                dataIndex: "name",
            }, {
                title: "最后编辑",
                dataIndex: "update_time",
                render: text => text ? moment(text, 'X').format('YYYY-MM-DD HH:mm') : '-'
            }, {
                title: "",
                dataIndex: "is_portal",
                render: (text, record) => <Button onClick={() => {
                    this.setState({
                        value: record
                    }, () => {
                        this.props.getState(this.state)
                    })
                }}>选择</Button>
            }]
            return (
                <Modal
                    title="选择自定义页面"
                    visible={visible}
                    onCancel={()=>{
                        this.props.close()
                    }}
                    style={{ top: 20 }}
                    width={756}
                    footer={null}
                >
                    <View>
                        <Table
                            loading={shopPageListLoading}
                            dataSource={list}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                showSizeChanger: false,
                                showQuickJumper: false,
                                pageSize: rows,
                                total: total_number,
                                current: page,
                            }}
                            onChange={({ current, pageSize }) => {
                                if (dispatch) {
                                    dispatch(getShopPageList({ params: { page: current, rows: pageSize } }))
                                }
                            }}
                        />
                    </View>
                </Modal>
            )
        }
    }

    init() {
        this.setState({ value: null })
    }
}
