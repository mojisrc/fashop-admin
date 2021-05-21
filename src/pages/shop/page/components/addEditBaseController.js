import React, { Component } from "react";
import { Row, Col, Button, message, Spin } from "antd";
import PageTool from "@/pages/shop/page/components/diy/tool/index";
import PageView from "@/pages/shop/page/components/diy/view/index";
import PageControl from "@/pages/shop/page/components/diy/controller/index";
import BaseInfo from "@/pages/shop/page/components/diy/baseinfo/index";
import GoodsApi from "@/services/goods";
import Scrollbar from "react-scrollbars-custom";
import styles from "./addEdit.css";

export default class AddEditBaseController extends Component {
    static defaultProps = {
        goodList: { total_number: 0, list: [] },
        goodsListLoading: true,
        groupGoodsList: { total_number: 0, list: [] },
        groupGoodsListLoading: true,
        showViewSaveBtn: true,
        showBaseInfo: true,
        onChange: () => {
        }
    };


    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            background_color: "#FFFFFF",
            share_title:"",
            share_img:"",
            // for goods detail editor form
            body: typeof props["body"] !== "undefined" && Array.isArray(props.body) ? props.body : [],
            options: {
                type: "",
                index: 0
            },
            baseInfoVisible: true
        };
        if (typeof props["body"] !== "undefined") {
            this.props.onChange({ options: this.state.options, body: this.state.body });
        }
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
        const { goods_display_num, category_ids, brand_ids } = values.options;
        const goodsListResult = await GoodsApi.list({
            page: 1,
            rows: goods_display_num,
            order_type,
            category_ids,
            brand_ids
        });

        if (goodsListResult.code === 0) {
            return goodsListResult.result.list;
        } else {
            message.warning(goodsListResult.msg);
            return [];
        }
    };
    pointsGoodsListRefresh = async (values) => {
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

        const goodsListResult = await PointsGoodsApi.pageGoods({
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
    goodsGuessLikeRefresh = async (values) => {
        let order_type = 1;
        switch (values.options.goods_sort) {
            case 1:
                order_type = 8;
                break;
        }
        const goodsListResult = await GoodsApi.likeGoods({
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

    couponListRefresh = async (values) => {
        let params = {
            page: 1,
            rows: values.options.display_num
        };
        const listResult = await CouponApi.pageCoupons(params);
        if (listResult.code === 0) {
            return listResult.result.list;
        } else {
            message.warning(listResult.msg);
            return [];
        }
    };

    onToolItemClick = async (item) => {
        const { goodsList } = this.props;
        let { body } = this.state;
        // 商品列表
        if (item.type === "goods_list" && typeof goodsList["list"] !== "undefined" && Array.isArray(goodsList.list) && goodsList.list.length > 0) {
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
        // 猜你喜欢
        if (item.type === "goods_guess_like") {
            const goodsListResult = await GoodsApi.likeGoods({ page: 1, rows: 4 });
            let goodsList = [];
            if (goodsListResult.code === 0) {
                goodsList = goodsListResult.result.list;
            }
            item.data = goodsList;
        }
        this.setState({
            baseInfoVisible: false,
            options: {
                type: item.type,
                index: body.length
            },
            body: [...body, { ...item }]
        }, () => {
            this.props.onChange({ options: this.state.options, body: this.state.body });
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
        }, () => {
            this.props.onChange({ options: this.state.options, body: this.state.body });
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
        this.setState({ options, body }, () => {
            this.props.onChange({ options: this.state.options, body: this.state.body });
        });
    };

    onSave() {

    }

    render() {
        const { goodsListLoading, pageLoading, pageSaveLoading, showViewSaveBtn, showBaseInfo } = this.props;
        let { options, body, baseInfoVisible, name, description, background_color,share_title,share_img } = this.state;
        return (
            <Spin size="large" className="globalSpin" spinning={goodsListLoading}>
                <Row type="flex" justify="space-between" style={{ minHeight: "100vh", overflow: "hidden" }}>
                    <Col span={4} className={styles.container}>
                        <Scrollbar style={{ width: "100%", height: "100%", minHeight: 300 }}>
                            <PageTool
                                toolListData={this.toolListData}
                                onToolItemClick={this.onToolItemClick}
                            />
                        </Scrollbar>
                    </Col>
                    <Col span={12}>
                        <PageView
                            toolListData={this.toolListData}
                            showViewSaveBtn={showViewSaveBtn}
                            options={options}
                            body={body}
                            backgroundColor={background_color}
                            onViewItemClick={this.onViewItemClick}
                            onHeaderClick={this.phoneHeaderClick}
                            setPage={this.setPage}
                        >
                            {showViewSaveBtn && <Button
                                loading={pageLoading || pageSaveLoading}
                                type='primary'
                                onClick={() => {
                                    this.onSave();
                                }}
                            >
                                保存
                            </Button>}
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
                                        pointsGoodsListRefresh={this.pointsGoodsListRefresh}
                                        couponListRefresh={this.couponListRefresh}
                                        goodsGuessLikeRefresh={this.goodsGuessLikeRefresh}
                                    />
                                    :
                                    (showBaseInfo ? <BaseInfo
                                        name={name}
                                        backgroundColor={background_color}
                                        description={description}
                                        shareTitle={share_title}
                                        shareImg={share_img}
                                        getValues={(value) => {
                                            this.setState({
                                                name: value.name,
                                                background_color: value.backgroundColor,
                                                description: value.description,
                                                share_title: value.shareTitle,
                                                share_img: value.shareImg,
                                            });
                                        }}
                                    /> : <div />)
                            }
                        </Scrollbar>
                    </Col>
                </Row>
            </Spin>
        );
    }
}
