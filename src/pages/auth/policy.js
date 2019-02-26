import React, { Component, Fragment } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Table, Button, Card, Modal,Alert } from "antd";
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
                title: "策略名称",
                dataIndex: "name",
                key: "name"
            }, {
                title: "策略类型",
                dataIndex: "is_system",
                key: "is_system",
                render: (is_system) => {
                    return is_system ? "系统策略" : "自定义策略";
                }
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <View className={styles.operation}>
                    <Fragment>
                        {record.is_system === 0 ? <a
                          onClick={() => {
                              this.setState({ editVisible: true }, () => {
                                  this.policyEdit.getWrappedInstance().show({ id: record.id });
                              });
                          }}
                        >
                            修改
                        </a> : null}
                        {record.is_system === 0 ? <a
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
                        </a> : null}
                    </Fragment>
                </View>
            }
        ];
        return (
          <PageHeaderWrapper hiddenBreadcrumb={true}>
              <Card
                bordered={false}
              >
                  <Alert
                    message="权限策略"
                    description={<div>
                        <strong>支持两种类型的授权策略：系统策略 和 自定义策略。<br /></strong>
                        <span>- 系统策略，统一由系统开发者创建，后台用户只能使用而不能修改，系统策略的版本更新由开发人员维护。<br /></span>
                        <span>- 自定义策略，用户可以自主创建、更新和删除，自定义策略的版本更新由后台用户维护。<br /></span>
                    </div>}
                    type="warning"
                    style={{marginBottom:14}}
                  />
                  <View className={styles.batchView}>
                      <Button
                        type='primary'
                        onClick={() => {
                            this.policyAdd.getWrappedInstance().show();
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
