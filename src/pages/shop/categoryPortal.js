import React, { Component } from "react";
import { Row, Col, Button, Card ,message} from "antd";
import { View } from "@/components/flexView";
import styles from "@/styles/shop/shopSort.css";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "umi";

@connect(({ shop, loading }) => ({
}))
export default class Category extends Component {
    static defaultProps = {
        shopInfo: {
            info: {}
        },
        shopInfoLoading: true,
        setGoodsCategoryStyleLoading:false
    };

    componentDidMount() {
        const { dispatch } = this.props;
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



const dataSource = [
    {
        title: "推荐分类",
        children: [
            {
                type: "banner",
                options: {},
                data: [
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34201/12/1973/139935/5cb6a6cfEcf0c8584/03e3f85e9f0ba35f.jpg!cr_1125x549_0_72!q70.jpg.dpg",
                        },
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/33406/9/4525/52329/5cb7f239E26d8cb5c/8cef5d545f3f795f.jpg!cr_1125x549_0_72!q70.jpg.dpg",
                        },
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    }
                ]
            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    }



                ]


            },
            {
                type: "banner",
                options: {},
                data: [
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34201/12/1973/139935/5cb6a6cfEcf0c8584/03e3f85e9f0ba35f.jpg!cr_1125x549_0_72!q70.jpg.dpg",
                        },
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/33406/9/4525/52329/5cb7f239E26d8cb5c/8cef5d545f3f795f.jpg!cr_1125x549_0_72!q70.jpg.dpg",
                        },
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    }
                ]
            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    }



                ]


            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    }



                ]


            }
        ]
    },
    {
        title: "推荐品牌",
        children: [
            {
                type: "banner",
                options: {},
                data: [
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/31928/10/13009/95518/5cb8a39dE66cbdc85/179e94fbe6c49c97.jpg!cr_1125x549_0_72!q70.jpg.dpg",
                        },
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/23112/33/6431/99212/5c540d7fEf8000223/fddb6b047c02ba3d.jpg!cr_1125x549_0_72!q70.jpg.dpg",
                        },
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    }
                ]
            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    }



                ]


            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    },
                    {
                        img: {
                            url:"http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: 'goods/detail',
                            param: {}
                        }
                    }



                ]


            }
        ]
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    },
    {
        title: "推荐分类",
        children: []
    }
]

