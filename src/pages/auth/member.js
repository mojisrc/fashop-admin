import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Table, Button } from "antd";
import { View } from "@/components/flexView";
import moment from "moment/moment";
import styles from "./list.css";
import PageList from "@/components/pageList";
import MemberAdd from "@/components/auth/member/add";
import MemberEdit from "@/components/auth/member/edit";

@connect(({ member, loading }) => ({
    memberList: member.list.result,
    memberListLoading: loading.effects["member/list"]
}))
class AuthMemberList extends Component {

    static defaultProps = {
        memberListLoading: false,
        memberList: {}
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initList();
    }

    search = new PageList({
        router: "/member/list",
        refresh: (e) => {
            this.initList(e);
        }
    });


    initList = () => {
        const { dispatch } = this.props;
        let payload = this.search.filter();
        dispatch({
            type: "member/list",
            payload
        });
    };

    render() {
        const { memberList, memberListLoading } = this.props;

        const columns = [
            {
                width: 300,
                title: "账号",
                dataIndex: "username",
                key: "username",
                render: (text, record) => `${text}（${record.name}）`,
            }, {
                width: 80,
                title: "状态",
                dataIndex: "status",
                key: "status",
                render: (value) => Number(value) === 1 ? "正常" : "禁止"
            }, {
                title: "创建时间",
                dataIndex: "create_time",
                key: "create_time",
                render: text => moment(text, "X").format("YYYY-MM-DD HH:mm:ss")
            },
            {
                title: "操作",
                key: "operation",
                render: (record) =>
                  <a
                    onClick={() => {
                        this.memberEdit.getWrappedInstance().show({
                            memberId: record.id
                        });
                    }}
                  >
                      修改
                  </a>
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
                            this.memberAdd.getWrappedInstance().show();
                        }}
                      >
                          新建用户组
                      </Button>
                  </View>
                  <Table
                    loading={memberListLoading}
                    dataSource={memberList.list ? memberList.list : []}
                    columns={columns}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.search.page,
                        pageSize: this.search.rows,
                        total: memberList.total_number
                    }}
                    onChange={({ current }) => {
                        this.search.setPage(current).push();
                    }}
                    rowKey={record => record.id}
                  />
              </Card>
              <MemberAdd
                wrappedComponentRef={(form) => this.memberAdd = form}
                onAddSuccess={() => {
                    this.memberAdd.getWrappedInstance().close();
                    this.initList();
                }}
              />
              <MemberEdit
                wrappedComponentRef={(form) => this.memberEdit = form}
                onEditSuccess={() => {
                    this.memberEdit.getWrappedInstance().close();
                    this.initList();
                }}
              />
          </PageHeaderWrapper>
        );
    }


}

export default AuthMemberList;
