import React, { Component } from "react";
import { connect } from "dva";
import { Row, Col, Button, message, Spin } from "antd";
import PageTool from "@/components/shop/diy/tool/index";
import PageView from "@/components/shop/diy/view/index";
import PageControl from "@/components/shop/diy/controller/index";
import BaseInfo from "@/components/shop/diy/baseinfo/index";
import GoodsApi from "@/services/goods";
import GroupApi from "@/services/group";
import { query } from "@/utils/fa";
import { getPageQuery } from "@/utils";
import styles from "./edit.css";
import Scrollbar from "react-scrollbars-custom";

@connect(({ goods, page, group, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    pageEditLoading: loading.effects["page/edit"],
    pageInfo: page.info.result,
    pageInfoLoading: loading.effects["page/info"],
    groupGoodsList: group.pageGoods.result,
    groupGoodsListLoading: loading.effects["group/pageGoods"]
}))

export default class Edit extends Component {
    static defaultProps = {
        goodsList: { total_number: 0, list: [] },
        goodsListLoading: true,
        pageInfo: { info: {} },
        pageInfoLoading: true,
        pageEditLoading: false,
        groupGoodsList: { total_number: 0, list: [] },
        groupGoodsListLoading: true,
    };
    state = {
        id: 0,
        name: "",
        description: "",
        background_color: "#FFFFFF",
        body: [],
        options: {
            type: "",
            index: 0
        },
        baseInfoVisible: true
    };

    async componentDidMount() {
        const { dispatch } = this.props;
        const { id } = getPageQuery();
        dispatch({
            type: "page/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    const { info } = response.result;
                    this.setState({
                        id: info.id,
                        name: info.name,
                        description: info.description,
                        background_color: info.background_color,
                        body: info.body
                    });
                }
            }
        })
        dispatch({
            type: "goods/list",
            payload: {
                page: 1,
                rows: 6,
                order_type: 8
            }
        })
        dispatch({
            type: "group/pageGoods",
            payload: {
                page: 1,
                rows: 3
            }
        })
    }

    goodsListRefreshGoods = async (values) => {
        let order_type = 8;
        switch (values.options.goods_sort) {
            case 1:
                order_type = 8;
                break;
            case 2:
                order_type = 3;
                break;
            case 3:
                order_type = 9;
                break;
        }

        const goodsListResult = await GoodsApi.list({
            page: 1,
            rows: values.options.goods_display_num,
            order_type
        });

        if (goodsListResult.code === 0) {
            return goodsListResult.result.list;
        } else {
            message.warning(goodsListResult.msg);
            return [];
        }
    };
    goodsGroupRefreshGoods = async (values) => {
        // let order_type = 8;
        // switch (values.options.goods_sort) {
        //     case 1:
        //         order_type = 8;
        //         break;
        //     case 2:
        //         order_type = 3;
        //         break;
        //     case 3:
        //         order_type = 9;
        //         break;
        // }
        const goodsListResult = await GroupApi.pageGoods({
            page: 1,
            rows: values.options.goods_display_num,
            // order_type
        });
        if (goodsListResult.code === 0) {
            return goodsListResult.result.list;
        } else {
            message.warning(goodsListResult.msg);
            return [];
        }
    };
    onToolItemClick = (item) => {
        const { goodsList, groupGoodsList } = this.props;
        let { body } = this.state;
        if (item.type === "goods_list") {
            let _goods = [];
            goodsList.list.map((sub, subindex) => (
                subindex < 6 && _goods.push({
                    ...sub,
                    market_price: sub.market_price ? sub.market_price : "",
                    desc: sub.desc ? sub.desc : ""
                })
            ));
            item.data = _goods;
        }
        if (item.type === "goods_group") {
            let _goods = [];
            groupGoodsList.list.map((sub) => (
                subindex < 3 && _goods.push(sub)
            ));
            item.data = _goods;
        }
        this.setState({
            baseInfoVisible: false,
            options: {
                type: item.type,
                index: body.length
            },
            body: [...body, { ...item }]
        });
    };

    onViewItemClick = () => {
        this.setState({
            baseInfoVisible: false
        });
    };

    phoneHeaderClick = () => {
        this.setState({
            baseInfoVisible: true
        });
    };

    setPage = (info) => {
        this.setState({
            options: info.options,
            body: info.body
        });
        if (Array.isArray(info.body) && info.body.length === 0) {
            this.phoneHeaderClick();
        }
    };
    
    getControlValues = (value) => {
        let { options, body } = this.state;
        let { index } = options;
        body[index].options = value.options;
        body[index].data = value.data;
        this.setState({ options, body });
    };

    render() {
        const { pageEditLoading, pageInfoLoading } = this.props;
        let { id, options, body, baseInfoVisible, name, description, background_color } = this.state;
        return (
            <Spin size="large" className="globalSpin" spinning={pageInfoLoading}>
                <Row type="flex" justify="space-between" style={{ minHeight: "100vh", overflow: "hidden" }}>
                    <Col span={4} className={styles.container}>
                        <Scrollbar style={{ width: "100%", height: "100%", minHeight: 300 }}>
                            <PageTool
                                onToolItemClick={this.onToolItemClick}
                            />
                        </Scrollbar>
                    </Col>
                    <Col span={12}>
                        <PageView
                            options={options}
                            body={body}
                            backgroundColor={background_color}
                            onViewItemClick={this.onViewItemClick}
                            onHeaderClick={this.phoneHeaderClick}
                            setPage={this.setPage}
                        >
                            <Button
                                loading={pageEditLoading}
                                disabled={pageInfoLoading}
                                type='primary'
                                onClick={() => {
                                    this.props.dispatch({
                                        type: "page/edit",
                                        payload: {
                                            id,
                                            name,
                                            description,
                                            background_color,
                                            body,
                                            module: "mobile"
                                        },
                                        callback: (response) => {
                                            if (response.code === 0) {
                                                message.success("已保存");
                                            } else {
                                                message.error(response.msg);
                                            }
                                        }
                                    });
                                }}
                            >
                                保存
                            </Button>
                        </PageView>
                    </Col>
                    <Col span={8} className={styles.container}>
                        <Scrollbar style={{ width: "100%", height: "100%", minHeight: 300 }}>
                            {
                                baseInfoVisible === false
                                    ?
                                    <PageControl
                                        options={options}
                                        body={body}
                                        setPage={this.setPage}
                                        getValues={this.getControlValues}
                                        goodsListRefreshGoods={this.goodsListRefreshGoods}
                                        goodsGroupRefreshGoods={this.goodsGroupRefreshGoods}
                                    />
                                    :
                                    <BaseInfo
                                        name={name}
                                        backgroundColor={background_color}
                                        description={description}
                                        getValues={(value) => {
                                            this.setState({
                                                name: value.name,
                                                background_color: value.backgroundColor,
                                                description: value.description
                                            });
                                        }}
                                    />
                            }
                        </Scrollbar>
                    </Col>
                </Row>
            </Spin>
        );
    }
}
