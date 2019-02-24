import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Table, Button, Card, Drawer, Modal } from "antd";
import { View } from "@/components/flexView";
import styles from "./list.css";
import PageList from "@/components/pageList";
import GroupAdd from "@/components/auth/group/add";
import GroupEdit from "@/components/auth/group/edit";
import GroupAddMember from "@/components/auth/group/addMember";
import GroupAddPolicy from "@/components/auth/group/addPolicy";
import PolicyAdd from "@/components/auth/policy/add";

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
        let { keywords } = this.search.getParam();
        const { groupList, groupListLoading } = this.props;

        const columns = [
            {
                title: "用户组名称",
                dataIndex: "name",
                key: "name"
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <View className={styles.operation}>
                    <a
                      onClick={() => {
                          this.setState({ editVisible: true }, () => {
                              this.groupEdit.getWrappedInstance().show({ groupId: record.id });
                          });
                      }}
                    >
                        修改
                    </a>
                    <a
                      onClick={() => {
                          this.groupAddMember.getWrappedInstance().show({id:record.id});

                      }}
                    >
                        添加组成员
                    </a>
                    <a
                      onClick={() => {
                          this.groupAddPolicy.getWrappedInstance().show({id:record.id});
                      }}
                    >
                        添加权限
                    </a>
                    {
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
                    }
                </View>
            }
        ];
        return (
          <PageHeaderWrapper hiddenBreadcrumb={true}>
              <Card
                bordered={false}
              >
                  <View className={styles.batchView}>
                      <Button
                        type='primary'
                        onClick={() => {
                            this.groupAdd.getWrappedInstance().show()
                        }}
                      >
                          新建用户组
                      </Button>
                  </View>
                  <Table
                    loading={groupListLoading}
                    dataSource={groupList.list ? groupList.list : []}
                    columns={columns}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
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
              <PolicyAdd/>
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
                    this.groupAdd.getWrappedInstance().close();
                    this.initList();
                }}
              />
              <GroupEdit
                wrappedComponentRef={(form) => this.groupEdit = form}
                onEditSuccess={() => {
                    this.groupEdit.getWrappedInstance().close();
                    this.initList();
                }}
              />
          </PageHeaderWrapper>
        );
    }
}

export default List;
