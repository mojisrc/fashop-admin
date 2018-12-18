import React, { Component } from "react";
import { connect } from "dva";
import { Input, Button, Table, Switch, message,Popconfirm } from "antd";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { View } from "@/components/flexView";
import styles from "./index.css";
import Query from "@/utils/query";
import PageApi from "@/services/page";
import router from "umi/router";
const InputGroup = Input.Group;

@connect(({ page, loading }) => ({
    pageList: page.list.result,
    pageListLoading: loading.effects["page/list"]
}))
export default class MyTemplate extends Component {
    static defaultProps = {
        pageListLoading: true,
        pageList: {
            list:[],
            total_number:0
        }
    };
    state = {
        get: { page: 1, rows: 10 }
    };

    componentDidMount() {
        this.initList();
    }


    initList() {
        const { dispatch } = this.props;
        const get = Query.make();
        dispatch({
            type: "page/list",
            payload: {
                page: get.page,
                rows: get.rows
            },
            callback: () => {
                this.setState({
                    get
                });
            }
        });

    }

    render() {
        const { pageList, pageListLoading, dispatch } = this.props;
        const { list } = pageList;
        const columns = [{
            title: "页面ID",
            dataIndex: "id"
        }, {
            title: "页面名称",
            dataIndex: "name"
        }, {
            title: "创建时间",
            dataIndex: "create_time",
            render: text => moment(text, "X").format("YYYY-MM-DD HH:mm:ss")
        }, {
            title: "最后编辑",
            dataIndex: "update_time",
            render: text => text ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-"
        }, {
            title: "设为主页",
            dataIndex: "is_portal",
            render: (text, record) => <Switch
                checked={!!text}
                onChange={(checked) => {
                    if (checked) {
                        dispatch({
                            type: "page/setPortal",
                            payload: {
                                id: record.id
                            },
                            callback: () => {
                                this.initList();
                            }
                        });
                    }
                }}
            />
        }, {
            title: "操作",
            key: "operation",
            render: (record) => <View className={styles.operation}>
                <a
                    onClick={() => {
                        router.push(`/shop/page/edit?id=${record.id}`);
                    }}
                >
                    编辑
                </a>
                <Popconfirm
                    title="你确定要克隆此页面吗？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={async () => {
                        const response = await PageApi.add({
                            name: `${record.name}副本`,
                            description: record.description,
                            background_color: record.background_color,
                            body: record.body,
                            module: record.module,
                            clone_from_id: record.id
                        });
                        if (response.code === 0) {
                            this.initList();
                        }
                    }}
                >
                    <a>克隆</a>
                </Popconfirm>
                {/*<Popover*/}
                {/*trigger="click"*/}
                {/*placement="left"*/}
                {/*content={(*/}
                {/*<View>*/}
                {/*{*/}
                {/*this.popoverView(record)*/}
                {/*}*/}
                {/*</View>*/}
                {/*)}*/}
                {/*>*/}
                {/*<a>链接</a>*/}
                {/*</Popover>*/}
            </View>
        }
        ];
        return (
            <View>
                <View className={styles.myTemplateTop}>
                    {/*<Search*/}
                    {/*placeholder="输入页面名称"*/}
                    {/*onSearch={value => console.log(value)}*/}
                    {/*style={{ width: 200 }}*/}
                    {/*/>*/}
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push("/shop/page/add");
                        }}
                    >
                        新增页面
                    </Button>
                </View>
                <Table
                    loading={pageListLoading}
                    dataSource={list}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.state.get.page,
                        pageSize: this.state.get.rows,
                        total: pageList.total_number
                    }}
                    onChange={({ current, pageSize }) => {
                        router.push(Query.page(current, pageSize));
                        this.initList();
                    }}
                />
            </View>
        );
    }

    popoverView(record) {
        return (
            <View>
                {
                    record.is_portal ? <View className={styles.portalView}>
                        <p>主页地址：</p>
                        <InputGroup compact>
                            <Input
                                disabled
                                style={{ width: 276 }}
                                value="http://www.fashop.cn/wap"
                            />
                            <CopyToClipboard
                                text="http://www.fashop.cn/wap"
                                onCopy={() => message.success("复制成功！", 1)}
                            >
                                <Button>复制</Button>
                            </CopyToClipboard>
                        </InputGroup>
                        <p>模板地址：</p>
                    </View> : null
                }
                <InputGroup compact>
                    <Input
                        disabled
                        style={{ width: 276 }}
                        value="http://www.fashop.cn/page/1002dassd"
                    />
                    <CopyToClipboard
                        text="http://www.fashop.cn/page/1002dassd"
                        onCopy={() => message.success("复制成功！", 1)}
                    >
                        <Button>复制</Button>
                    </CopyToClipboard>
                </InputGroup>
            </View>
        );
    }
}
