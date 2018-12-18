import React, { Component } from "react";
import { View } from "@/components/flexView";
import { connect } from "dva";
import { Row, Col, Button, Affix, message, Spin, Card } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import PageTool from "@/components/shop/diy/tool/index";
import PageView from "@/components/shop/diy/view/index";
import PageControl from "@/components/shop/diy/controller/index";
import BaseInfo from "@/components/shop/diy/baseinfo/index";
import styles from "@/styles/shop/shopPageEdit.css";
import GoodsApi from "@/services/goods";
import PageApi from "@/services/page";
import { query } from "@/utils/fa";
import { getPageQuery } from "@/utils/utils";

@connect(({ goods, page, loading }) => ({
    goodList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    pageInfo: page.info.result,
    pageInfoLoading: loading.effects["page/info"]
}))

export default class Edit extends Component {
    static defaultProps = {
        goodList: { total_number: 0, list: [] },
        goodsListLoading: true,
        pageInfo: { info: {} },
        pageInfoLoading: true
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
        const e = await PageApi.info({ id });
        if (e.code === 0) {
            const { info } = e.result;
            this.setState({
                id: info.id,
                name: info.name,
                description: info.description,
                background_color: info.background_color,
                body: info.body
            });
        }
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
        console.log(body);
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
        const {  history, goodsListLoading } = this.props;
        let { id, options, body, baseInfoVisible, name, description, background_color } = this.state;
        return (
            <Spin size="large" className="globalSpin" spinning={goodsListLoading}>
                <PageHeaderWrapper hiddenBreadcrumb={true}>
                    <Card bordered={false}>
                        <View className={styles.shopPageEditMain}>
                            <View className={styles.shopPageEditToolMain}>
                                <Affix offsetTop={15} style={{ zIndex: 1 }}>
                                    <PageTool
                                        onToolItemClick={this.onToolItemClick}
                                    />
                                </Affix>
                            </View>
                            <View className={styles.shopPageEditViewMain}>
                                <PageView
                                    options={options}
                                    body={body}
                                    backgroundColor={background_color}
                                    onViewItemClick={this.onViewItemClick}
                                    onHeaderClick={this.phoneHeaderClick}
                                    setPage={this.setPage}
                                />
                            </View>
                            <View className={styles.shopPageEditControllerMain}>
                                <Affix offsetTop={15} style={{ zIndex: 1 }}>
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
                                </Affix>
                            </View>
                        </View>
                        <Row className={styles.shopPageEditFooter}>
                            <Col span={10} />
                            <Col span={2}>
                                <Button
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
                                            callback: () => {
                                                message.success("已保存");
                                            }
                                        });
                                    }}
                                >
                                    保存
                                </Button>
                            </Col>
                            <Col span={2}>
                                <Button
                                    onClick={() => {
                                        history.goBack();
                                    }}
                                >
                                    返回
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </PageHeaderWrapper>
            </Spin>
        );
    }
}
