import React, { Component } from "react";
import { Drawer, Input, message, Table, Row, Col } from "antd";
import { connect } from "dva";

const Search = Input.Search;

@connect(({ auth, loading }) => ({
    groupPolicyList: auth.groupPolicyList.result,
    groupPolicyListLoading: loading.effects["auth/groupPolicyList"],
    policyList: auth.policyList.result,
    policyListLoading: loading.effects["auth/policyList"],
    groupAddLoading: loading.effects["auth/groupAdd"]
}), null, null, {
    withRef: true
})
export default class AuthGroupAddPolicy extends Component {
    static defaultProps = {
        groupAddLoading: false,
        onAddSuccess: () => {

        }
    };
    state = {
        id: 0,
        visible: false,
        keywords: "",

        groupPolicyListPage:1,
        groupPolicyListRows:10,

        policyListPage: 1,
        policyListRows: 10,

    };


    show({ id }) {
        this.setState({
            id,
            visible: true
        }, () => {
            this.policySearch();
            this.getGroupPolicyList();
        });

    }

    policySearch() {
        const { dispatch } = this.props;
        let payload = {
            page:this.state.policyListPage,
            rows: this.state.policyListRows,
            exclude_group_id: this.state.id
        };
        if (this.state.keywords) {
            payload["keywords"] = this.state.keywords;
        }
        dispatch({
            type: "auth/policyList",
            payload,
            // 解决最后一页无数据时返回上一页，为什么不计算而是请求？因为不确定后台同时有几人操作
            callback:(e)=>{
                if(this.state.policyListPage > 1 && e.code===0 && !e.result.list){
                    this.setState({
                        policyListPage:this.state.policyListPage-1
                    },()=>{
                        this.policySearch()
                    })
                }
            }
        });
    }

    getGroupPolicyList() {
        const { dispatch } = this.props;
        dispatch({
            type: "auth/groupPolicyList",
            payload: {
                page:this.state.groupPolicyListPage,
                rows: this.state.groupPolicyListRows,
                group_id: this.state.id
            },
            // 解决最后一页无数据时返回上一页，为什么不计算而是请求？因为不确定后台同时有几人操作
            callback:(e)=>{
                if(this.state.groupPolicyListPage > 1 && e.code===0 && !e.result.list){
                    this.setState({
                        groupPolicyListPage:this.state.groupPolicyListPage-1
                    },()=>{
                        this.getGroupPolicyList()
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
        const { groupPolicyList, policyList } = this.props;

        const columns = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            render: (text, record) => `${record.name}`
        }, {
            title: "操作",
            key: "action",
            render: (text, record) => <a href="javascript:;" onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                    type: "auth/groupPolicyAdd",
                    payload: {
                        group_id: this.state.id,
                        policy_id: record.id
                    }, callback: (e) => {
                        if (e.code === 0) {
                            this.getGroupPolicyList();
                            this.policySearch();
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
            render: (text, record) => `${record.name}`
        }, {
            title: "操作",
            key: "action",
            render: (text, record) => <a href="javascript:;" onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                    type: "auth/groupPolicyDel",
                    payload: {
                        group_id: this.state.id,
                        policy_id: record.id
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            this.getGroupPolicyList();
                            this.policySearch();
                        } else {
                            message.error(e.msg);
                        }
                    }
                });
            }}>移除</a>
        }];

        return (
          <Drawer
            title="添加组权限"
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
                              placeholder="搜索该组未被授权的剩余权限"
                              enterButton="搜索"
                              onSearch={(value) => {
                                  this.setState({
                                      keywords: value,
                                      policyListPage:1
                                  }, () => {
                                      this.policySearch();
                                  });
                              }}
                            />
                        </div>}
                        bordered={true}
                        columns={columns}
                        dataSource={policyList.list}
                        pagination={{
                            showSizeChanger: false,
                            showQuickJumper: false,
                            current: this.state.policyListPage,
                            pageSize: this.state.policyListRows,
                            total: policyList.total_number
                        }}
                        onChange={({ current }) => {
                            this.setState({policyListPage:current},()=>{
                                this.getGroupPolicyList()
                                this.policySearch()
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
                        }}>已被授权的权限策略</strong>}
                        bordered={true}
                        columns={memberColumns}
                        dataSource={groupPolicyList.list}
                        pagination={{
                            showSizeChanger: false,
                            showQuickJumper: false,
                            current: this.state.groupPolicyListPage,
                            pageSize: this.state.groupPolicyListRows,
                            total: groupPolicyList.total_number
                        }}
                        onChange={({ current }) => {
                            this.setState({groupPolicyListPage:current},()=>{
                                this.getGroupPolicyList()
                                this.policySearch()
                            })
                        }}
                      />
                  </Col>
              </Row>
          </Drawer>
        );
    }
}
