import React, { Component } from "react";
import { Drawer, Input, message, Table, Row, Col } from "antd";
import { connect } from "umi";

const Search = Input.Search;

@connect(({ auth, loading }) => ({
    groupMemberList: auth.groupMemberList.result,
    groupMemberListLoading: loading.effects["auth/groupMemberList"],
    userList: auth.userList.result,
    userListLoading: loading.effects["auth/userList"],
    groupAddLoading: loading.effects["auth/groupAdd"]
}), null, null, {
    forwardRef: true
})
export default class AuthGroupAddMember extends Component {
    static defaultProps = {
        groupAddLoading: false,
        onAddSuccess: () => {

        }
    };
    state = {
        id: 0,
        visible: false,
        keywords: "",

        groupMemberListPage:1,
        groupMemberListRows:10,
        userListPage: 1,
        userListRows: 10,

    };

    show({ id }) {
        this.setState({
            id,
            visible: true
        }, () => {
            this.userSearch();
            this.getGroupMemberList();
        });

    }

    userSearch() {
        const { dispatch } = this.props;
        let payload = {
            page:this.state.userListPage,
            rows: this.state.userListRows,
            exclude_group_id: this.state.id
        };
        if (this.state.keywords) {
            payload["keywords"] = this.state.keywords;
        }
        dispatch({
            type: "auth/userList",
            payload,
            // 解决最后一页无数据时返回上一页，为什么不计算而是请求？因为不确定后台同时有几人操作
            callback:(e)=>{
                if(this.state.userListPage > 1 && e.code===0 && !e.result.list){
                    this.setState({
                        userListPage:this.state.userListPage-1
                    },()=>{
                        this.userSearch()
                    })
                }
            }
        });
    }

    getGroupMemberList() {
        const { dispatch } = this.props;
        dispatch({
            type: "auth/groupMemberList",
            payload: {
                page:this.state.groupMemberListPage,
                rows: this.state.groupMemberListRows,
                group_id: this.state.id
            },
            // 解决最后一页无数据时返回上一页，为什么不计算而是请求？因为不确定后台同时有几人操作
            callback:(e)=>{
                if(this.state.groupMemberListPage > 1 && e.code===0 && !e.result.list){
                    this.setState({
                        groupMemberListPage:this.state.groupMemberListPage-1
                    },()=>{
                        this.getGroupMemberList()
                    })
                }
            }
        });

    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { groupMemberList, userList } = this.props;

        const columns = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            render: (text, record) => `${record.username}（${text}）`
        }, {
            title: "操作",
            key: "action",
            render: (text, record) => <a  onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                    type: "auth/groupMemberAdd",
                    payload: {
                        group_id: this.state.id,
                        user_id: record.id
                    }, callback: (e) => {
                        if (e.code === 0) {
                            this.getGroupMemberList();
                            this.userSearch();
                        } else {
                            message.error(e.msg);
                        }
                    }
                });
            }}>添加</a>
        }];

        const memberColumns = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            render: (text, record) => `${record.username}（${text}）`
        }, {
            title: "操作",
            key: "action",
            render: (text, record) => <a  onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                    type: "auth/groupMemberDel",
                    payload: {
                        group_id: this.state.id,
                        user_id: record.id
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            this.getGroupMemberList();
                            this.userSearch();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }}>移除</a>
        }];

        return (
          <Drawer
            title="添加组成员"
            width={820}
            closable={false}
            onClose={() => {
                this.setState({
                    visible: false
                });
            }}
            visible={this.state.visible}
          >
              <Row gutter={8}>
                  <Col span={12}>
                      <Table
                        rowKey={record => record.id}
                        size={"middle"}
                        title={() => <div style={{
                            height: 32
                        }}>
                            <Search
                              placeholder="搜索组外成员"
                              enterButton="搜索"
                              onSearch={(value) => {
                                  this.setState({
                                      keywords: value,
                                      userListPage:1
                                  }, () => {
                                      this.userSearch();
                                  });
                              }}
                            />
                        </div>}
                        bordered={true}
                        columns={columns}
                        dataSource={userList.list}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.state.userListPage,
                            pageSize: this.state.userListRows,
                            total: userList.total_number
                        }}
                        onChange={({ current }) => {
                            this.setState({userListPage:current},()=>{
                                this.getGroupMemberList()
                                this.userSearch()
                            })
                        }}
                      />
                  </Col>
                  <Col span={12}>
                      <Table
                        rowKey={record => record.id}
                        size={"middle"}
                        title={() => <strong style={{
                            height: 32,
                            display: "flex",
                            alignItems: "center"
                        }}>已添加的成员</strong>}
                        bordered={true}
                        columns={memberColumns}
                        dataSource={groupMemberList.list}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.state.groupMemberListPage,
                            pageSize: this.state.groupMemberListRows,
                            total: groupMemberList.total_number
                        }}
                        onChange={({ current }) => {
                            this.setState({groupMemberListPage:current},()=>{
                                this.getGroupMemberList()
                                this.userSearch()
                            })
                        }}
                      />
                  </Col>
              </Row>
          </Drawer>
        );
    }
}
