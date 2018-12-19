import React, { Component } from "react";
import { connect } from "dva";
import { Row, Col, Button, message, Spin } from "antd";
import PageTool from "@/components/shop/diy/tool/index";
import PageView from "@/components/shop/diy/view/index";
import PageControl from "@/components/shop/diy/controller/index";
import BaseInfo from "@/components/shop/diy/baseinfo/index";
import GoodsApi from "@/services/goods";
import { query } from "@/utils/fa";
import styles from "./edit.css";
import Scrollbar from "react-scrollbars-custom";
import router from 'umi/router';
@connect(({ goods, page, loading }) => ({
    goodList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    pageAddLoading: loading.effects["page/add"]
}))
export default class Add extends Component {
    static defaultProps = {
        goodList: { total_number: 0, list: [] },
        goodsListLoading: true
    };
    state = {
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
        dispatch({
            type: "goods/list",
            payload: {
                page: 1,
                rows: 6,
                order_type: 8
            }
        });
    }

// : {
//     options: {
//         goods_sort: number,
//         goods_display_num: number,
//         goods_display_field: Array<string>,
//         layout_style: number,
//     }
// }

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
    onToolItemClick = (item) => {
        const { goodsList } = this.props;
        let { body } = this.state;
        // delete _item.icon
        if (item.type === "goods_list") {
            let _goods = [];
            Array.isArray(goodsList) && goodsList.list.map((sub, subindex) => (
                subindex < 6 && _goods.push({
                    id: sub.id,
                    img: sub.img,
                    title: sub.title,
                    price: sub.price,
                    market_price: sub.market_price ? sub.market_price : "",
                    desc: sub.desc ? sub.desc : ""
                })
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
// : { options: optionsType, body: PageBodyType }
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
        const { goodsListLoading, pageAddLoading } = this.props;
        let { options, body, baseInfoVisible, name, description, background_color } = this.state;
        return (
            <Spin size="large" className="globalSpin" spinning={goodsListLoading}>
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
                                loading={pageAddLoading}
                                type='primary'
                                onClick={() => {
                                    this.props.dispatch({
                                        type: "page/add",
                                        payload: {
                                            name,
                                            description,
                                            background_color,
                                            body,
                                            module: "mobile"
                                        },
                                        callback: (response) => {
                                            if(response.code === 0 ){
                                                message.success("添加成功");
                                                router.goBack();
                                            }else{
                                                message.error(response.msg);
                                            }
                                        }
                                    });
                                }}
                            >
                                创建
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
