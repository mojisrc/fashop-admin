import React, { Component, Fragment } from "react";
import { Card, Button, Table, Divider, Modal} from "antd";
import PageList from "@/components/pageList";
import { connect } from "umi";
import dayjs from "dayjs";
import BrandAdd from "./components/add";
import BrandEdit from "./components/edit";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import Image from "@/components/image";

@connect(({ brand, loading }) => ({
    brandList: brand.list.result,
    brandListLoading: loading.effects["brand/list"]
}))
class BrandList extends Component {
    static defaultProps = {
        brandListLoading: true,
        brandList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/goods/brand/list",
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
            type: "brand/list",
            payload: this.search.filter()
        });
    };

    render() {
        let { keywords } = this.search.getParam();
        const { brandList, brandListLoading } = this.props;
        const columns = [
            {
                title: "品牌封面",
                dataIndex: "logo",
                width: 100,
                render: (e) => (
                    <Image
                        type='goods'
                        src={e}
                        style={{ width: 50, height: 50 }}
                    />
                )
            },
            {
                title: "品牌名称",
                dataIndex: "title",
                key: "title",
                width: 150,
            }, {
                title: "描述",
                dataIndex: "desc",
                key: "desc",
                width:500
            }, {
                title: "创建时间",
                dataIndex: "create_time",
                render: e => dayjs(e * 1000).format("YYYY-MM-DD hh:mm"),
                width: 200
            }, {
                title: "操作",
                dataIndex: "operating",
                key: "operating",
                render: (value, record) => <Fragment>
                    <a
                        onClick={() => {
                            this.brandEdit.show({
                                id:record.id
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
                                        type: "brand/del",
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
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'brand/list'}>
                <Card bordered={false}>
                    <BrandAdd
                        wrappedComponentRef={(form) => this.brandAdd = form}
                        onAdd={() => {
                            this.brandAdd.close();
                            this.initList();
                        }}
                    />
                    <BrandEdit
                        wrappedComponentRef={(form) => this.brandEdit = form}
                        onEdit={() => {
                            this.brandEdit.close();
                            this.initList();
                        }}
                    />
                    <PageList.Search
                        loading={brandListLoading}
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
                        ]}
                    />

                    <div className={"listTableTop"}>
                        <Button
                            type='primary'
                            onClick={() => {
                                this.brandAdd.show();
                            }}
                        >
                            添加品牌
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={brandList.list}
                        loading={brandListLoading}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: brandList.total_number
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
export default BrandList;
