import React, { Component, Fragment } from "react";
import { connect } from "umi";
import { Table, Card,Modal } from "antd";
import PageList from "@/components/pageList/index";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import PageExtra from "@/utils/pageExtra";
import SelectPage from "./components/selectPage";
const { confirm } = Modal;
@connect(({ page, loading }) => ({
    pageList: page.extraList.result,
    pageListLoading: loading.effects["page/extraList"]
}))
export default class MyTemplate extends Component {
    static defaultProps = {
        pageListLoading: true,
        pageList: {
            list: [],
            total_number: 0
        }
    };
    state = {
        sign: null
    };

    componentDidMount() {
        this.initList();
    }

    search = new PageList({
        router: "/shop/page/extra",
        rows: 10,
        param: {},
        refresh: (e) => {
            this.initList(e);
        }
    });

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "page/extraList",
            payload: this.search.filter()
        });
    }
    showConfirm(sign) {
        const { dispatch } = this.props;
        var that = this;
        confirm({
            title: '提示',
            content: '你确认要清空已选专题页吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                dispatch({
                    type: "page/clearExtra",
                    payload: {
                        "sign" : sign,
                        "page_id" : 0
                    }
                });
                that.initList();
            },
            onCancel() {

            },
        });
    }

    render() {
        const { pageList, pageListLoading, dispatch } = this.props;
        const { sign } = this.state;
        const { list } = pageList;
        const columns = [{
            title: "出现位置",
            dataIndex: "sign",
            render: text => PageExtra.signString(text)
        }, {
            title: "已选专题页",
            dataIndex: "page",
            render: (e) => {
                if (e && typeof e["id"] !== "undefined" && e.id > 0) {
                    return e.name;
                } else {
                    return "-";
                }
            }
        },
            {
                title: "操作",
                key: "operation",
                render: (record) => <Fragment>
                    <a
                        onClick={() => {
                            this.setState({
                                sign: record.sign
                            }, () => {
                                this.selectPage.show({
                                    sign: record.sign
                                });
                            });
                        }}
                    >
                        设置页面
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                        onClick={() => {
                            this.showConfirm(record.sign);
                        }}
                    >
                        清除
                    </a>
                </Fragment>
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"page/extraList"}>
                <Card bordered={false}>
                    <Table
                        loading={pageListLoading}
                        dataSource={list}
                        columns={columns}
                        rowKey={record => record.sign}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: pageList.total_number
                        }}
                        onChange={({ current }) => {
                            this.search.setPage(current).push();
                        }}
                    />
                </Card>
                <SelectPage
                    ref={(e) => this.selectPage = e}
                    getState={(state) => {
                        this.selectPage.close();
                        sign && dispatch({
                            type: "page/extraSet",
                            payload: {
                                sign,
                                page_id: state.value.id
                            },
                            callback: () => {
                                this.search.refresh();
                            }
                        });
                    }}
                />
            </PageHeaderWrapper>
        );
    }
}
