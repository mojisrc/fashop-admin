import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Table, Button, Card,  Modal } from "antd";
import { View } from "@/components/flexView";
import styles from "./list.css";
import PageList from "@/components/pageList";
import PolicyEdit from "@/components/auth/policy/edit";
import PolicyAdd from "@/components/auth/policy/add";

@connect(({ auth, loading }) => ({
    policyList: auth.policyList.result,
    policyListLoading: loading.effects["auth/policyList"]
}))
class List extends Component {

    static defaultProps = {
        policyListLoading: false,
        policyList: {}
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
        router: "/auth/policy",
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
            type: "auth/policyList",
            payload
        });
    };

    render() {
        const { policyList, policyListLoading } = this.props;

        const columns = [
            {
                title: "用户组名称",
                dataIndex: "name",
                key: "name"
            }, {
                title: "开启状态",
                dataIndex: "status",
                key: "status",
                render: (status) => {
                    return status ? "正常" : "禁止使用";
                }
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <View className={styles.operation}>
                    <a
                      onClick={() => {
                          this.setState({ editVisible: true }, () => {
                              this.policyEdit.getWrappedInstance().show({ id: record.id });
                          });
                      }}
                    >
                        修改
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
                                          type: "auth/policyDel",
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
                            this.policyAdd.getWrappedInstance().show()
                        }}
                      >
                          新建策略
                      </Button>
                  </View>
                  <Table
                    loading={policyListLoading}
                    dataSource={policyList.list ? policyList.list : []}
                    columns={columns}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.search.page,
                        pageSize: this.search.rows,
                        total: policyList.total_number
                    }}
                    onChange={({ current }) => {
                        this.search.setPage(current).push();
                    }}
                    rowKey={record => record.id}
                  />
              </Card>

              <PolicyAdd
                wrappedComponentRef={(form) => this.policyAdd = form}
                onAddSuccess={() => {
                    this.policyAdd.getWrappedInstance().close();
                    this.initList();
                }}
              />
              <PolicyEdit
                wrappedComponentRef={(form) => this.policyEdit = form}
                onEditSuccess={() => {
                    this.policyEdit.getWrappedInstance().close();
                    this.initList();
                }}
              />
          </PageHeaderWrapper>
        );
    }
}

export default List;
