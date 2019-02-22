import React, { Component } from "react";
import { Drawer, Input, message,Table,Row, Col } from "antd";
import { connect } from "dva";
const Search = Input.Search;

@connect(({ auth, loading }) => ({
    groupMemberList:auth.groupMemberList,
    groupMemberListLoading:loading.effects["auth/groupMemberList"],
    userList:auth.userList,
    userListLoading:loading.effects["auth/userList"],
    groupAddLoading: loading.effects["auth/groupAdd"]
}), null, null, {
    withRef: true
})
export default class AuthGroupAddMember extends Component {
    static defaultProps = {
        groupAddLoading: false,
        onAddSuccess: () => {

        }
    };
    state = {
        id:0,
        visible: false,
        keywords:'',
        search:{
            page:1,
            rows:10
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    name: values.name,
                    status: values.status ? 1 : 0
                };
                dispatch({
                    type: "auth/groupAdd",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            this.props.form.resetFields();
                            message.success("添加成功");
                            this.props.onAddSuccess();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }
        });
    };

    show({id}) {
        this.setState({
            id,
            visible: true
        });
    }
    search({page}){
        const { dispatch } = this.props;
        dispatch({
            type:'auth/userList',
            payload: {
                page,
                rows:10,
                keywords:this.state.keywords
            }
        })
    }
    getGroupMemberList({page}){
        const { dispatch } = this.props;
        dispatch({
            type:'auth/groupMemberList',
            payload: {
                page,
                rows:10,
                group_id:this.state.id
            }
        })

    }
    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const {groupMemberList} = this.props
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => <a href="javascript:;">添加</a>
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
                        size={'middle'}
                        title={() => <div style={{
                            height:32
                        }}>
                            <Search
                              placeholder="搜索组外成员"
                              enterButton="搜索"
                              size={'middle'}
                              onSearch={(value)=>{
                                  this.setState({
                                      keywords:value
                                  },()=>{
                                      this.search({page:1})
                                  })
                              }}
                            />
                        </div>}
                        bordered={true}
                        columns={columns}
                        dataSource={groupMemberList.list}
                        pagination={{
                            showSizeChanger: false,
                            showQuickJumper: false,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: groupMemberList.total_number
                        }}
                      />
                  </Col>
                  <Col span={12}>
                      <Table
                        size={'middle'}
                        title={() => <div style={{
                            height:32,
                            display:'flex',
                            alignItems:'center',
                        }}>组内成员</div>}
                        bordered={true}
                        columns={columns}
                        dataSource={groupMemberList.list}
                        pagination={{
                            showSizeChanger: false,
                            showQuickJumper: false,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: groupMemberList.total_number
                        }}

                      />
                  </Col>
              </Row>
          </Drawer>
        );
    }
}
