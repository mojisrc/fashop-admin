// @flow
import React, { Component } from "react";
import { Row, Col, Button, Input, Rate, Switch, Pagination, Spin, } from "antd";
import styles from "./index.css";
import Image from "../../image";
import { View } from "react-web-dom";
import moment from "moment";
import Query from "../../../utils/query";
import connect from "react-redux/es/connect/connect";
import { getOrderEvaluateList } from "../../../actions/order/evaluate";
import { dispatchType } from "../../../utils/flow";
import PhotoGallery from "../../../components/photoGallery"
import Fetch from "../../../utils/fetch";
import { GoodsApi } from "../../../config/api/goods";

const { TextArea } = Input;
const { Fragment } = React

type Props = {
    dispatch: dispatchType,
    orderEvaluateList: {
        list: Array<{
            id: number,
            avatar: string,
            nickname: string,
            score: number,
            create_time: number,
            display: number,
            goods_img: string,
            goods_price: number,
            goods_title: string,
            goods_number: number,
            phone: string,
            content: string,
            images: Array<string>,
            reply_time: number,
            reply_content: string,
            reply_time2: number,
            reply_content2: string,
            additional_content: string,
            additional_time: number,
            additional_images: Array<string>,
        }>,
        total_number: number,
        page: number,
        rows: number
    },
    orderEvaluateListLoading: boolean,
    location: { state: { type: string, record: {} }, search: string },
    history: { push: Function },
}

type State = {
    reply_content: Array<string>,
    queryParams: {
        keywords_type: string,
        keywords: string | null,
        create_time: Array<{}>,
        type: string,
    }
}
@connect(({
              view: {
                  order: {
                      orderEvaluateList,
                      orderEvaluateListLoading
                  }
              }
          }) => ({
    orderEvaluateList,
    orderEvaluateListLoading,
}))
export default class EvaluateListTable extends Component<Props, State> {

    state = {
        reply_content: [],
        queryParams: {
            keywords_type: 'goods_name',
            keywords: null,
            create_time: [],
            type: 'all',
        },
    }
    PhotoGallery: any

    componentDidMount() {
        this.getGoodsEvaluateList()
    }

    getGoodsEvaluateList() {
        const { dispatch } = this.props
        let params = Query.invokerForListParams([
            { key: 'type', rule: ['eq', 'all'] },
            { key: 'keywords_type', rule: ['rely', 'keywords'] },
        ])
        if (params['create_time'] !== undefined) {
            params['create_time'] = [moment(params['create_time'][0]).unix(), moment(params['create_time'][1]).unix()]
        }
        dispatch(getOrderEvaluateList({ params }))
    }

    render() {
        const { reply_content } = this.state
        const { orderEvaluateList, orderEvaluateListLoading } = this.props
        const { list, total_number, page } = orderEvaluateList
        return (
            <Spin tip="Loading..." spinning={orderEvaluateListLoading}>
                <PhotoGallery ref={(e) => {
                    this.PhotoGallery = e
                }} />
                <View className={'EvaluateListTable'}>
                    {
                        list && list.map((item, e) =>
                            <Row key={e}>
                                <Col span={1}>
                                    <Image
                                        type='avatar'
                                        src={item.avatar}
                                        className={styles.avatar}
                                    />
                                </Col>
                                <Col span={16} style={{ padding: '0 20px' }}>
                                    <View className={styles.top}>
                                        <View className={styles.topLeft}>
                                            <p>
                                                {item.nickname}
                                                {item.phone ? <span>
                                                    {item.phone}
                                                </span> : null}
                                            </p>
                                            <Rate
                                                style={{
                                                    color: '#ff6969'
                                                }}
                                                disabled
                                                defaultValue={item.score}
                                            />
                                        </View>
                                        <View className={styles.topRight}>
                                            <span>
                                                {
                                                    moment(item.create_time, 'X').format('YYYY-MM-DD HH:mm:ss')
                                                }
                                            </span>
                                            <p>
                                                <span>隐藏评价</span>
                                                <Switch
                                                    checked={!item.display}
                                                    onChange={async () => {
                                                        const response = await Fetch.fetch({
                                                            api: GoodsApi.evaluate.display,
                                                            params: { id: item.id }
                                                        })
                                                        if (response.code === 0) {
                                                            this.getGoodsEvaluateList()
                                                        }
                                                    }}
                                                />
                                            </p>
                                        </View>
                                    </View>
                                    {
                                        item.content ?
                                            <View className={styles.evaluateContent}>
                                                <p>
                                                    <strong>评价内容：</strong>
                                                    {item.content}
                                                </p>
                                            </View> : null
                                    }
                                    {
                                        Array.isArray(item.images) && item.images.length > 0 ?
                                            <View className={styles.evaluateImg}>
                                                {
                                                    item.images.map((imgListItem, i) =>
                                                        <div key={`evaluateImg_${i}`}>
                                                            <Image
                                                                key={i}
                                                                src={imgListItem}
                                                                onClick={() => {
                                                                    this.PhotoGallery.setState({
                                                                        index: i,
                                                                        photos: item.images.map((src) => {
                                                                            return { src }
                                                                        }),
                                                                        open: true
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </View> : null
                                    }
                                    {
                                        <View className={styles.goodsList}>
                                            <View
                                                className={styles.goodsListItem}
                                            >
                                                <Image
                                                    src={item.goods_img}
                                                />
                                                <View className={styles.goodsListRight}>
                                                    <a>{item.goods_title}</a>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                    {
                                        item.reply_time > 0 ?
                                            <View className={styles.contentList}>
                                                <View
                                                    className={styles.contentListItem}
                                                >
                                                    <p className={styles.contentItemTop}>
                                                        <a>管理员</a>
                                                        <span>{moment(item.reply_time, 'X').format('YYYY-MM-DD HH:mm')}</span>
                                                    </p>
                                                    <p
                                                        className={styles.contentItemBot}
                                                    >
                                                        {item.reply_content}
                                                    </p>
                                                </View>
                                            </View> : null
                                    }
                                    {
                                        item.additional_time > 0 ?
                                            <View className={styles.contentList}>
                                                <View
                                                    className={styles.contentListItem}
                                                >
                                                    <p className={styles.contentItemTop}>
                                                        <a>{item.nickname}</a>
                                                        <span>{moment(item.additional_time, 'X').format('YYYY-MM-DD HH:mm')}</span>
                                                    </p>
                                                    <p
                                                        className={styles.contentItemBot}
                                                    >
                                                        {item.additional_content}
                                                    </p>
                                                </View>
                                            </View> : null
                                    }
                                    {
                                        Array.isArray(item.additional_images) && item.additional_images.length > 0 ?
                                            <View className={styles.evaluateImg}>
                                                {
                                                    item.additional_images.map((imgListItem, i) =>
                                                        <div key={`additional_images_${i}`}><Image
                                                            key={i}
                                                            src={imgListItem}
                                                            onClick={() => {
                                                                this.PhotoGallery.setState({
                                                                    index: i,
                                                                    photos: item.additional_images.map((src) => {
                                                                        return { src }
                                                                    }),
                                                                    open: true
                                                                })
                                                            }}
                                                        /></div>
                                                    )
                                                }
                                            </View> : null
                                    }
                                    {
                                        item.reply_time2 > 0 ?
                                            <View className={styles.contentList}>
                                                <View
                                                    className={styles.contentListItem}
                                                >
                                                    <p className={styles.contentItemTop}>
                                                        <a>管理员</a>
                                                        <span>{moment(item.reply_time2, 'X').format('YYYY-MM-DD HH:mm')}</span>
                                                    </p>
                                                    <p
                                                        className={styles.contentItemBot}
                                                    >
                                                        {item.reply_content2}
                                                    </p>
                                                </View>
                                            </View> : null
                                    }
                                </Col>
                                <Col span={7} className={styles.replyCol}>
                                    {
                                        !item.reply_time || (item.additional_time > 0 && !item.reply_time2) ?
                                            <Fragment>
                                                <TextArea
                                                    value={reply_content[item.id] ? reply_content[item.id] : null}
                                                    placeholder="感谢您对本店的支持！我们会更加的努力为您提供更优质的服务。（可在此输入回复内容，也可直接点击回复选择系统自动回复）"
                                                    autosize={{ minRows: 8, maxRows: 12 }}
                                                    onChange={(e) => {
                                                        reply_content[item.id] = e.target.value
                                                        this.setState({
                                                            reply_content
                                                        })
                                                    }}
                                                />
                                                <Button
                                                    type='primary'
                                                    onClick={async () => {
                                                        const response = await Fetch.fetch({
                                                            api: GoodsApi.evaluate.reply,
                                                            params: {
                                                                id: item.id,
                                                                reply_content: reply_content[item.id]
                                                            }
                                                        })
                                                        if (response.code === 0) {
                                                            reply_content[item.id] = ''
                                                            this.setState({
                                                                reply_content
                                                            })
                                                            this.getGoodsEvaluateList()
                                                        }
                                                    }}
                                                >
                                                    回复
                                                </Button>
                                            </Fragment>
                                            : null
                                    }
                                </Col>
                                <Col
                                    span={23}
                                    style={{
                                        marginLeft: '4.16666667%',
                                        marginBottom: '24px',
                                        paddingBottom: '10px',
                                        borderBottom: '1px solid #e9e9e9',
                                    }}
                                />
                            </Row>
                        )
                    }
                    <View className={styles.pageView}>
                        <Pagination
                            current={page}
                            pageSize={10}
                            total={total_number}
                            onChange={(page, pageSize) => {
                                this.props.history.push(Query.page(page, pageSize))
                            }}
                        />
                    </View>
                </View>
            </Spin>
        )
    }
}
