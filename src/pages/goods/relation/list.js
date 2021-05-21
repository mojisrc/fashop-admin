import React, { Component, Fragment } from "react";
import { Card, Button, Table, Divider, Modal } from "antd";
import PageList from "@/components/pageList";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import moment from "moment/moment";
import { history as router } from "umi";
@connect(({ goodsRelation, loading }) => ({
    goodsRelationList: goodsRelation.list.result,
    goodsRelationListLoading: loading.effects["goodsRelation/list"]
}))
class goodsRelationList extends Component {
    static defaultProps = {
        goodsRelationListLoading: true,
        goodsRelationList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/goods/relation/list",
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
            type: "goodsRelation/list",
            payload: this.search.filter()
        });
    };

    render() {
        let { keywords } = this.search.getParam();
        const { goodsRelationList, goodsRelationListLoading } = this.props;
        const columns = [
            {
                title: "模板ID",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "模板名称",
                dataIndex: "title",
                key: "title"
            },
            {
                title: "关联商品个数",
                dataIndex: "goods_num",
                key: "goods_num",
            }, {
                title: "创建时间",
                dataIndex: "create_time",
                render: text => moment(text, "X").format("YYYY-MM-DD HH:mm:ss")
            }, {
                title: "操作",
                dataIndex: "operating",
                key: "operating",
                render: (value, record) => <Fragment>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/goods/relation/edit`,
                                search: `?id=${record.id}`
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
                                        type: "goodsRelation/del",
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
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'goodsRelation/list'}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={goodsRelationListLoading}
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
                                router.push("/goods/relation/add");
                            }}
                        >
                            添加关联模板
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={goodsRelationList.list}
                        loading={goodsRelationListLoading}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: goodsRelationList.total_number
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

export default goodsRelationList;
