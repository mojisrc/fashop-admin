import React, { Component } from "react";
import { Drawer, Input, Button, message,Table,Row, Col } from "antd";
import { connect } from "dva";
import fa from "@/utils/fa";
const Search = Input.Search;

@connect(({ loading }) => ({
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
        visible: false
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

    show() {
        this.setState({
            visible: true
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => <a href="javascript:;">添加</a>
        }];
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
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
                              height:32,
                            display:'flex',
                            alignItems:'center',
                        }}>组内成员</div>}
                        bordered={true}
                        columns={columns} dataSource={data}
                      />
                  </Col>
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
                              onSearch={value => console.log(value)}
                            />
                        </div>}
                        bordered={true}
                        columns={columns}
                        dataSource={data}

                      />
                  </Col>
              </Row>
          </Drawer>
        );
    }
}
