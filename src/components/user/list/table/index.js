import React, { Component } from "react";
import { Table } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "dva";
import Query from "@/utils/query";
import { getUserList } from "@/actions/user";
import moment from "moment/moment";
import Image from "@/components/image/index";
import router from "umi/router";

//
// type Props = {
//     history: historyType,
//     dispatch: dispatchType,
//     userListLoading: boolean,
//     getUserList: Function,
//     userList: {
//         page: number,
//         rows: number,
//         total_number: number,
//         list: Array<{}>
//     }
// }
// type State = {
//     selectedRowKeys,
//     customerVisible: boolean,
//     currentUser: {},
// }
@connect(({ user, loading }) => ({
    userList: user.list.result,
    userListLoading: loading.effects["user/list"]
}))
export default class UserListTable extends Component {
    state = {
        selectedRowKeys: [],
        customerVisible: false,
        currentUser: {},
        get: {}
    };
    static defaultProps = {
        userListLoading: false,
        userList: []
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };


    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch } = this.props;
        const get = Query.make();
        dispatch({
            type: "user/list",
            payload: {
                page: get.page,
                rows: get.rows
            },
            callback: () => {
                this.setState({
                    get
                });
            }
        });
    }

    render() {
        // const { selectedRowKeys } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange
        // };
        const { userList, userListLoading } = this.props;
        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "头像",
                dataIndex: "avatar",
                key: "avatar",
                render: (e) => (
                    <Image
                        type='avatar'
                        src={e}
                        style={{ width: 20, height: 20 }}
                    />
                )
            }, {
                title: "昵称",
                dataIndex: "nickname",
                key: "nickname"
            }, {
                title: "手机号",
                dataIndex: "phone",
                key: "phone"
            }, {
                title: "购买次数",
                dataIndex: "buy_times",
                key: "buy_times"
            }, {
                title: "累计消费（元）",
                dataIndex: "cost_total",
                key: "cost_total"
            }, {
                title: "客单价（元）",
                dataIndex: "cost_average",
                key: "cost_average",
                className: styles.column
            }, {
                title: "最后消费",
                dataIndex: "last_cost_time",
                key: "last_cost_time",
                render: (text) => {
                    return text > 0 ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-";
                }
            }, {
                title: "注册时间",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return text > 0 ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-";
                }
            }, {
                title: "操作",
                key: "operation",
                className: styles.column,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/user/list/detail`,
                                search: `?id=${record.id}`
                            });
                        }}
                    >
                        详情
                    </a>
                </View>
            }
        ];
        return (
            <View>
                {/*<View className={styles.batchView}>*/}
                {/*<Button*/}
                {/*type='primary'*/}
                {/*onClick={() => {*/}
                {/*this.setState({*/}
                {/*customerVisible: true*/}
                {/*})*/}
                {/*}}*/}
                {/*>*/}
                {/*新增客户*/}
                {/*</Button>*/}
                {/*<ListModal*/}
                {/*type='add'*/}
                {/*customerVisible={customerVisible}*/}
                {/*customerCancel={() => {*/}
                {/*this.setState({*/}
                {/*customerVisible: false*/}
                {/*})*/}
                {/*}}*/}
                {/*initialValue={{}}*/}
                {/*/>*/}
                {/*<Button*/}
                {/*type="danger"*/}
                {/*>*/}
                {/*批量删除*/}
                {/*</Button>*/}
                {/*</View>*/}
                <Table
                    defaultExpandAllRows
                    loading={userListLoading}
                    size="middle"
                    dataSource={userList.list ? userList.list : []}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        pageSize: userList.rows,
                        total: userList.total_number,
                        current: userList.page
                    }}
                    onChange={({ current, pageSize }) => {
                        router.push(Query.page(current, pageSize));
                    }}
                    // rowSelection={rowSelection}
                />
            </View>
        );
    }
}
