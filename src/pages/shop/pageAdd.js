import React, { Component } from "react";
import { View } from "react-web-dom";
import { connect } from 'dva';
import { Row, Col, Button, Affix, message } from 'antd';
import Page from '@/components/public/page'
import PageTool from '@/components/shop/diy/tool'
import PageView from '@/components/shop/diy/view'
import PageControl from '@/components/shop/diy/controller'
import BaseInfo from '@/components/shop/diy/baseinfo'
import styles from '@/styles/shop/shopPageEdit.css'

import GoodsApi from "@/services/goods";
@connect(
    ({ view: { goods: { listData }, shop: { shopPageInfo } } }) => ({
        goodsListData: listData,
        shopPageInfo,
    }),
    dispatch => bindActionCreators(Object.assign(shopDecorateActions, goodsActions), dispatch)
)

export default class PageAdd extends Component {
    state = {
        name: '',
        description: '',
        background_color: '#FFFFFF',
        body: [],
        options: {
            type: '',
            index: 0,
        },
        baseInfoVisible: true
    }

    async componentDidMount() {
        const { list } = this.props
        list({
            params: {
                page: 1,
                rows: 6,
                order_type: 8,
            }
        })
    }


    goodsListRefreshGoods = async (values: {
        options: {
            goods_sort: number,
            goods_display_num: number,
            goods_display_field: Array<string>,
            layout_style: number,
        }
    }) => {
        let order_type = 8
        switch (values.options.goods_sort) {
            case 1:
                order_type = 8
                break
            case 2:
                order_type = 3
                break
            case 3:
                order_type = 9
                break
        }

        const goodsListResult = await Fetch.fetch({
            api: GoodsApi.list,
            params: {
                page: 1,
                rows: values.options.goods_display_num,
                order_type,
            }
        })

        if (goodsListResult.code === 0) {
            return goodsListResult.result.list
        } else {
            message.warning(goodsListResult.msg)
            return []
        }
    }
    onToolItemClick = (item: any) => {
        const { goodsListData } = this.props
        let { body } = this.state
        // delete _item.icon
        if (item.type === 'goods_list') {
            let _goods = []
            goodsListData.list.map((sub, subindex) => (
                subindex < 6 && _goods.push({
                    id: sub.id,
                    img: sub.img,
                    title: sub.title,
                    price: sub.price,
                    market_price: sub.market_price ? sub.market_price : '',
                    desc: sub.desc ? sub.desc : ''
                })
            ))
            item.data = _goods
        }
        this.setState({
            baseInfoVisible: false,
            options: {
                type: item.type,
                index: body.length,
            },
            body: [...body, { ...item }]
        })
    }

    onViewItemClick = () => {
        this.setState({
            baseInfoVisible: false
        })
    }

    phoneHeaderClick = () => {
        this.setState({
            baseInfoVisible: true,
        })
    }
    setPage = (info: { options: optionsType, body: PageBodyType }) => {
        this.setState({
            options: info.options,
            body: info.body
        })
        if(Array.isArray(info.body) && info.body.length === 0){
            this.phoneHeaderClick()
        }
    }
    getControlValues = (value: any) => {
        let { options, body } = this.state
        let { index } = options
        body[index].options = value.options
        body[index].data = value.data
        this.setState({ options, body })
    }

    render() {
        const { add, history } = this.props
        let { options, body, baseInfoVisible, name, description, background_color } = this.state
        return (
            body ? <Page>
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
                                                description: value.description,
                                            })
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
                                let params = {
                                    name,
                                    description,
                                    background_color,
                                    body,
                                    module: 'mobile',
                                }
                                add({
                                    params
                                })
                            }}
                        >
                            保存
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button
                            onClick={() => {
                                history.goBack()
                            }}
                        >
                            返回
                        </Button>
                    </Col>
                </Row>
            </Page> : null
        );
    }
}
