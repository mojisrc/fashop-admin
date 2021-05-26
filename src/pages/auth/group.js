import React, { Component } from "react";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Table, Button, Card, Modal, Space, Divider } from "antd";
import PageList from "@/components/pageList";
import GroupAdd from "@/pages/auth/components/group/add";
import GroupEdit from "@/pages/auth/components/group/edit";
import GroupAddMember from "@/pages/auth/components/group/addMember";
import GroupAddPolicy from "@/pages/auth/components/group/addPolicy";
import PolicyAdd from "@/pages/auth/components/policy/add";

@connect(({ auth, loading }) => ({
    groupList: auth.groupList.result,
    groupListLoading: loading.effects["auth/groupList"]
}))
class List extends Component {

    static defaultProps = {
        groupListLoading: false,
        groupList: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            addVisible: false,
            editVisible: false,
            editGroupId: 0
        };
    }

    componentDidMount() {
        this.initList();
    }

    search = new PageList({
        router: "/auth/group",
        param: {
            keywords: null
        },
        refresh: (e) => {
            this.initList(e);
        }
    });


    initList = () => {
        const { dispatch } = this.props;
        let payload = this.search.filter();
        dispatch({
            type: "auth/groupList",
            payload
        });
    };

    render() {
        const { groupList, groupListLoading } = this.props;

        const columns = [
            {
                title: "用户组名称",
                dataIndex: "name",
                key: "name"
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <>
                    <a
                      onClick={() => {
                          this.setState({ editVisible: true }, () => {
                              this.groupEdit.show({ groupId: record.id });
                          });
                      }}
                    >
                        修改
                    </a>
                    <Divider type="vertical" />

                    <a
                      onClick={() => {
                          this.groupAddMember.show({ id: record.id });

                      }}
                    >
                        添加组成员
                    </a>
                    <Divider type="vertical" />

                    <a
                      onClick={() => {
                          this.groupAddPolicy.show({ id: record.id });
                      }}
                    >
                        添加权限
                    </a>

                    <Divider type="vertical" />

                    <a
                      onClick={() => {
                          Modal.confirm({
                              title: "确认删除？",
                              okText: "确认",
                              okType: "danger",
                              cancelText: "取消",
                              onOk: async () => {
                                  const { dispatch } = this.props;
                                  dispatch({
                                      type: "auth/groupDel",
                                      payload: {
                                          id: record.id
                                      },
                                      callback: () => {
                                          this.initList();
                                      }
                                  });
                              }
                          });
                      }}
                    >
                        删除
                    </a>
                </>
            }
        ];
        return (
          <PageHeaderWrapper hiddenBreadcrumb={true} policy={"auth/groupList"}>
              <Card
                bordered={false}
              >
                  <Space style={{ marginBottom: 15}}>
                      <Button
                        type='primary'
                        onClick={() => {
                            this.groupAdd.show();
                        }}
                      >
                          新建用户组
                      </Button>
                  </Space>
                  <Table
                    loading={groupListLoading}
                    dataSource={groupList.list ? groupList.list : []}
                    columns={columns}
                    pagination={{
                        showSizeChanger: false,
                        showTotal: (total, range) => `共 ${total} 条`,
                        current: this.search.page,
                        pageSize: this.search.rows,
                        total: groupList.total_number
                    }}
                    onChange={({ current }) => {
                        this.search.setPage(current).push();
                    }}
                    rowKey={record => record.id}
                  />
              </Card>
              <PolicyAdd />
              <GroupAddMember
                ref={(e) => {
                    this.groupAddMember = e;
                }}
              />
              <GroupAddPolicy
                ref={(e) => {
                    this.groupAddPolicy = e;
                }}
              />
              <GroupAdd
                wrappedComponentRef={(form) => this.groupAdd = form}
                onAddSuccess={() => {
                    this.groupAdd.close();
                    this.initList();
                }}
              />
              <GroupEdit
                wrappedComponentRef={(form) => this.groupEdit = form}
                onEditSuccess={() => {
                    this.groupEdit.close();
                    this.initList();
                }}
              />
          </PageHeaderWrapper>
        );
    }
}

export default List;
