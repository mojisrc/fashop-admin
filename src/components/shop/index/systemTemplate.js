import React, { Component } from "react";

import { connect } from "dva";
import * as actions from "@/actions/shop/decorate";
import { View } from "react-web-dom";
import { Row, Col, Button } from 'antd';
import styles from './index.css'

@connect(
    ({ view: { shop: { shopPageSystemList, shopPageListLoading } } }) => ({
        shopPageSystemList,
        shopPageListLoading,
    }),
    dispatch => bindActionCreators(actions, dispatch),
)

export default class SystemTemplate extends Component {
    componentDidMount() {
        this.props.getShopPageList({
            params: {
                page: 1,
                rows: 10,
                is_system: 1,
            }
        })
    }

    state = {
        availableList: [
            {
                id: 10001,
                link: 'http://www.domain.cn/mobile',
                img: require('@/assets/images/shop/dianzi.jpg'),
                title: 'FaShop电子',
            }, {
                id: 10002,
                link: 'http://www.domain.cn/mobile',
                img: require('@/assets/images/shop/shengxian.jpg'),
                title: 'FaShop生鲜',
            }, {
                id: 10003,
                link: 'http://www.domain.cn/mobile',
                img: require('@/assets/images/shop/meizhuang.jpg'),
                title: 'FaShop美妆',
            }, {
                id: 10004,
                link: 'http://www.domain.cn/mobile',
                img: require('@/assets/images/shop/fuzhuang.jpg'),
                title: 'FaShop服装',
            }, {
                id: 10005,
                link: 'http://www.domain.cn/mobile',
                img: require('@/assets/images/shop/jiaju.jpg'),
                title: 'FaShop家具',
            }, {
                id: 10006,
                link: 'http://www.domain.cn/mobile',
                img: require('@/assets/images/shop/qiche.jpg'),
                title: 'FaShop汽车',
            }, {
                id: 10007,
                link: 'http://www.domain.cn/mobile',
                img: require('@/assets/images/shop/muying.jpg'),
                title: 'FaShop母婴',
            }
        ],
    }

    render() {
        const { availableList } = this.state
        return (
            <Row gutter={16} style={{ marginTop: 20 }}>
                {
                    availableList.map((availableListItem, index) =>
                        <Col xl={6} lg={8} key={index}>
                            <View className={styles.availableListItemWarp}>
                                <View className={styles.imgWarp}>
                                    <img
                                        src={availableListItem.img}
                                        alt=''
                                    />
                                    <View
                                        className={styles.hoverShow}
                                    >
                                        <Button
                                            type='primary'
                                            onClick={() => {
                                                // router.push(`/shop/shopModuleEdit?id=${availableListItem.id}`)
                                            }}
                                        >
                                            克隆并编辑
                                        </Button>
                                    </View>
                                </View>
                                <p>
                                    {availableListItem.title}
                                </p>
                            </View>
                        </Col>
                    )
                }
                {/* {
                    list&&list.map((availableListItem,index) =>
                        <Col xl={6} lg={8} key={index}>
                            <View className={styles.availableListItemWarp}>
                                <View className={styles.imgWarp}>
                                    <DiyPhone {...this.props}/>
                                    <View className={styles.hoverShow}>
                                        <Button
                                            type='primary'
                                            onClick={()=>{
                                                // router.push(`/shop/shopModuleEdit?id=${availableListItem.id}`)
                                            }}
                                        >
                                            克隆并编辑
                                        </Button>
                                    </View>
                                </View>
                                <p>
                                    {availableListItem.name}
                                </p>
                            </View>
                        </Col>
                    )
                } */}
            </Row>
        )
    }
}
