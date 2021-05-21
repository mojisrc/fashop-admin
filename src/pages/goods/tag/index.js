import React, { Component, Fragment } from "react";
import { Card, Button, Table, Divider, Modal} from "antd";
import PageList from "@/components/pageList";
import { connect } from "umi";
import GoodsTagAdd from "./components/add";
import GoodsTagEdit from "./components/edit";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

@connect(({ goodsTag, loading }) => ({
    goodsTagList: goodsTag.list.result,
    goodsTagListLoading: loading.effects["goodsTag/list"]
}))
class GoodsTagList extends Component {
    static defaultProps = {
        goodsTagListLoading: true,
        goodsTagList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/goods/tag",
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
            type: "goodsTag/list",
            payload: this.search.filter()
        });
    };

    render() {
        const { goodsTagList, goodsTagListLoading } = this.props;
        const columns = [
            {
                title: "标签名称",
                dataIndex: "title",
                key: "title",
            },
            {
                title: "参考",
                key: "demo",
                render:(record)=>{
                    return <span
                        style={{
                            height: 16,
                            color:record.font_color,
                            borderRadius:3,
                            borderWidth:1,
                            borderColor:record.border_color,
                            borderStyle:'solid',
                            backgroundColor:record.background_color,
                            padding:2,
                            fontSize:12
                        }}
                    >{record.title}</span>
                }
            },
            {
                title: "操作",
                dataIndex: "operating",
                key: "operating",
                render: (value, record) => <Fragment>
                    <a
                        onClick={() => {
                            this.goodsTagEdit.show({
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
                                        type: "goodsTag/del",
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
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'goodstag/list'}>
                <Card bordered={false}>
                    <GoodsTagAdd
                        wrappedComponentRef={(form) => this.goodsTagAdd = form}
                        onAdd={() => {
                            this.goodsTagAdd.close();
                            this.initList();
                        }}
                    />
                    <GoodsTagEdit
                        wrappedComponentRef={(form) => this.goodsTagEdit = form}
                        onEdit={() => {
                            this.goodsTagEdit.close();
                            this.initList();
                        }}
                    />
                    <div className={"listTableTop"}>
                        <Button
                            type='primary'
                            onClick={() => {
                                this.goodsTagAdd.show();
                            }}
                        >
                            添加标签
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={goodsTagList.list}
                        loading={goodsTagListLoading}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: goodsTagList.total_number
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
export default GoodsTagList;
