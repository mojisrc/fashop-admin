import React, { Component, Fragment } from "react";
import { Card, Button, Table, Divider, Modal } from "antd";
import PageList from "@/components/pageList";
import { connect } from "umi";
import moment from "moment";
import SupplierAdd from "./components/add";
import SupplierEdit from "./components/edit";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import Image from "@/components/image";

@connect(({ supplier, loading }) => ({
    supplierList: supplier.list.result,
    supplierListLoading: loading.effects["supplier/list"]
}))
class SupplierList extends Component {
    static defaultProps = {
        supplierListLoading: true,
        supplierList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/goods/supplier/list",
        rows: 10,
        param: {
            keywords: null
        },
        refresh: (e) => {
            this.initList(e);
        }
    });

    componentDidMount() {
        this.initList();
    }

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "supplier/list",
            payload: this.search.filter()
        });
    };

    render() {
        let { keywords } = this.search.getParam();
        const { supplierList, supplierListLoading } = this.props;
        const columns = [
            {
                title: "ID",
                dataIndex: "id",
            },
            {
                title: "标志",
                dataIndex: "img",
                key: "avatar",
                render: (e) => (
                    <Image
                        type='avatar'
                        src={e}
                        style={{ width: 20, height: 20 }}
                    />
                )
            }, {
                title: "供应商名称",
                dataIndex: "title",
                key: "title"
            },
            {
                title: "状态",
                dataIndex: "state",
                key: "state",
                render: e => e === 1 ? "开启" : "关闭"
            }, {
                title: "创建时间",
                dataIndex: "create_time",
                render: e => moment(e * 1000).format("YYYY-MM-DD hh:mm"),
                width: 200
            }, {
                title: "操作",
                dataIndex: "operating",
                key: "operating",
                render: (value, record) => <Fragment>
                    <a
                        onClick={() => {
                            this.supplierEdit.show({
                                id: record.id
                            });
                        }}
                    >
                        编辑
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
                                        type: "supplier/del",
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
                </Fragment>
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'supplier/list'}>
                <Card bordered={false}>
                    <SupplierAdd
                        wrappedComponentRef={(form) => this.supplierAdd = form}
                        onAdd={() => {
                            this.supplierAdd.close();
                            this.initList();
                        }}
                    />
                    <SupplierEdit
                        wrappedComponentRef={(form) => this.supplierEdit = form}
                        onEdit={() => {
                            this.supplierEdit.close();
                            this.initList();
                        }}
                    />
                    <PageList.Search
                        loading={supplierListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                input: {
                                    field: "keywords",
                                    placeholder: "请输入关键词",
                                    initialValue: keywords
                                }
                            }
                        ]} />

                    <div className={"listTableTop"}>
                        <Button
                            type='primary'
                            onClick={() => {
                                this.supplierAdd.show();
                            }}
                        >
                            添加供应商
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={supplierList.list}
                        loading={supplierListLoading}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: supplierList.total_number
                        }}
                        onChange={({ current }) => {
                            this.search.setPage(current).push();
                        }}

                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default SupplierList;
