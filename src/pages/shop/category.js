import React, { Component } from "react";
import { Row, Col, Button, Card ,message} from "antd";
import { View } from "@/components/flexView";
import styles from "@/styles/shop/shopSort.css";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "dva";

@connect(({ shop, loading }) => ({
    shopInfo: shop.info.result,
    shopInfoLoading: loading.effects["shop/info"],
    setGoodsCategoryStyleLoading: loading.effects["shop/setGoodsCategoryStyle"],
}))
export default class Category extends Component {
    static defaultProps = {
        shopInfo: {
            info: {}
        },
        shopInfoLoading: true,
        setGoodsCategoryStyleLoading:false
    };
    state = {
        availableList: [
            {
                link: "http://www.domain.cn/mobile",
                img: require("@/assets/images/shop/fen_chaoshi.jpg"),
                title: "超市1"
            }, {
                link: "http://www.domain.cn/mobile",
                img: require("@/assets/images/shop/fen_dianzi.jpg"),
                title: "电子1"
            }, {
                link: "http://www.domain.cn/mobile",
                img: require("@/assets/images/shop/fen_meizhuang.jpg"),
                title: "美妆1"
            }
        ]
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "shop/info"
        });
    }

    render() {
        const { availableList } = this.state;
        const { shopInfo, setGoodsCategoryStyleLoading } = this.props;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <View>
                                <Row gutter={16}>
                                    {
                                        availableList.map((availableListItem, index) =>
                                            <Col xl={8} lg={8} key={index}>
                                                <View className={styles.availableListItemWarp}>
                                                    <View
                                                        className={styles.imgWarp}
                                                        style={
                                                            shopInfo.info && shopInfo.info.goods_category_style === index ? {
                                                                borderColor: "#188fff"
                                                            } : {}
                                                        }
                                                    >
                                                        <img
                                                            src={availableListItem.img}
                                                            alt=''
                                                        />
                                                        <View
                                                            className={
                                                                shopInfo.info && shopInfo.info.goods_category_style !== index ?
                                                                    styles.hoverShow : styles.hoverHide
                                                            }
                                                        >
                                                            <Button
                                                                type='primary'
                                                                loading={setGoodsCategoryStyleLoading}
                                                                onClick={() => {
                                                                    const {dispatch} = this.props
                                                                    dispatch({
                                                                        type:'shop/setGoodsCategoryStyle',
                                                                        payload: {
                                                                            goods_category_style: index
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
                                                                启用
                                                            </Button>
                                                        </View>
                                                    </View>
                                                    <p
                                                        style={
                                                            shopInfo.info && shopInfo.info.goods_category_style === index ? {
                                                                color: "#188fff"
                                                            } : {}
                                                        }
                                                    >
                                                        {shopInfo.info && shopInfo.info.goods_category_style === index ? "当前使用：" : ""}{availableListItem.title}
                                                    </p>
                                                </View>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </View>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
