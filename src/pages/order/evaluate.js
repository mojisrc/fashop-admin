import React, { Component } from "react";
import { Row, Col, Button, Input, Rate, Switch, Pagination, Spin, Card, Image, Avatar, Space } from "antd";
import styles from "./evaluate.css";
import { View } from "@/components/flexView";
import moment from "dayjs";
import { connect } from "umi";
import GoodsApi from "@/services/goods";
import PageList from "@/components/pageList";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { ListEmpty } from "@/components/empty";
import Images from "@/components/images"
const { TextArea } = Input;
const { Fragment } = React;

@connect(({ goodsEvaluate, loading }) => ({
    evaluateList: goodsEvaluate.list.result,
    evaluateListLoading: loading.effects["goodsEvaluate/list"]
}))
class Evaluate extends Component {
    static defaultProps = {
        evaluateListLoading: true,
        evaluateList: {
            list: [],
            total_number: 0
        }
    };
    state = {
        reply_content: []
    };
    search = new PageList({
        router: "/order/evaluate",
        param: {
            keywords_type: "goods_name",
            keywords: null,
            create_time: [],
            type: null
        },
        rule: [{ key: "keywords_type", rule: ["rely", "keywords"] }],
        refresh: (e) => {
            this.initList(e);
        }
    });

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsEvaluate/list",
            payload: this.search.filter()
        });
    };

    componentDidMount() {
        this.initList();
    }


    render() {
        const { reply_content } = this.state;
        let { keywords_type, keywords, create_time, type } = this.search.getParam();
        const { evaluateList, evaluateListLoading, dispatch } = this.props;
        const { list } = evaluateList;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'goodsEvaluate/list'}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={evaluateListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                selectInput: [
                                    {
                                        field: "keywords_type",
                                        style: { minWidth: 115 },
                                        initialValue: keywords_type,
                                        data: [
                                            {
                                                name: "商品名称",
                                                value: "goods_name"
                                            },
                                            {
                                                name: "用户昵称",
                                                value: "user_nicknname"
                                            },
                                            {
                                                name: "用户手机号",
                                                value: "user_phone"
                                            }
                                        ]
                                    },
                                    {
                                        field: "keywords",
                                        placeholder: "请输入关键词",
                                        initialValue: keywords
                                    }
                                ]
                            },
                            {
                                label: "评价时间",
                                timeRange: {
                                    field: "create_time",
                                    initialValue: create_time
                                }
                            },
                            {
                                label: "评价类型",
                                select: {
                                    field: "type",
                                    style: { width: 100 },
                                    placeholder: "全部类型",
                                    data: [
                                        {
                                            name: "好评",
                                            value: "positive"
                                        }, {
                                            name: "中评",
                                            value: "moderate"
                                        }, {
                                            name: "差评",
                                            value: "negative"
                                        }
                                    ],
                                    initialValue: type
                                }
                            }
                        ]} />
                    <Spin tip="Loading..." spinning={evaluateListLoading}>
                        {
                            Array.isArray(list) && list.length === 0 ? <ListEmpty /> : null
                        }
                        <View className={"EvaluateListTable"}>
                            {
                                Array.isArray(list) && list.map((item, e) =>
                                    <Row key={e}>
                                        <Col span={1}>
                                            <Avatar
                                                size={40}
                                                src={item.avatar}
                                            />
                                        </Col>
                                        <Col span={16} style={{ padding: "0 20px 0 0" }}>
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
                                                            color: "#ff6969"
                                                        }}
                                                        disabled
                                                        defaultValue={item.score}
                                                    />
                                                </View>
                                                <View className={styles.topRight}>
                                            <span>
                                                {
                                                    moment(item.create_time, "X").format("YYYY-MM-DD HH:mm:ss")
                                                }
                                            </span>
                                                    <p>
                                                        <span>隐藏评价</span>
                                                        <Switch
                                                            checked={!item.display}
                                                            onChange={async () => {
                                                                dispatch({
                                                                    type: 'goodsEvaluate/display',
                                                                    payload: {
                                                                        id: item.id
                                                                    },
                                                                    callback: (e) => {
                                                                        if (e.code === 0) {
                                                                            this.initList();
                                                                        } else {
                                                                            message.error(e.msg);
                                                                        }
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </p>
                                                </View>
                                            </View>
                                            {
                                                <View className={styles.goodsList}>
                                                    <View
                                                        className={styles.goodsListItem}
                                                    >
                                                        <Space gutter={5}>
                                                            <Image
                                                                src={item.goods_img}
                                                                width={50}
                                                            />
                                                            <View className={styles.goodsListRight}>
                                                                <span>{item.goods_title}</span>
                                                            </View>
                                                        </Space>
                                                    </View>
                                                </View>
                                            }
                                            {
                                                item.content ?
                                                    <View className={styles.evaluateContent}>
                                                        <span>
                                                            <strong>评价内容：</strong>
                                                            {item.content}
                                                        </span>
                                                    </View> : null
                                            }
                                            {
                                                Array.isArray(item.images) && item.images.length > 0 ?
                                                    <View className={styles.evaluateImg}>
                                                        <Images
                                                            size={100}
                                                            list={item.images}
                                                        />
                                                    </View> : null
                                            }

                                            {
                                                item.reply_time > 0 ?
                                                    <View className={styles.contentList}>
                                                        <View
                                                            className={styles.contentListItem}
                                                        >
                                                            <p className={styles.contentItemTop}>
                                                                <i>管理员</i>
                                                                <span>{moment(item.reply_time, "X").format("YYYY-MM-DD HH:mm")}</span>
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
                                                                <i>{item.nickname}</i>
                                                                <span>{moment(item.additional_time, "X").format("YYYY-MM-DD HH:mm")}</span>
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
                                                        <Images
                                                            size={100}
                                                            list={item.additional_images}
                                                        />
                                                    </View> : null
                                            }
                                            {
                                                item.reply_time2 > 0 ?
                                                    <View className={styles.contentList}>
                                                        <View
                                                            className={styles.contentListItem}
                                                        >
                                                            <p className={styles.contentItemTop}>
                                                                <i>管理员</i>
                                                                <span>{moment(item.reply_time2, "X").format("YYYY-MM-DD HH:mm")}</span>
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
                                                            autosize={{ minRows: 5, maxRows: 12 }}
                                                            onChange={(e) => {
                                                                reply_content[item.id] = e.target.value;
                                                                this.setState({
                                                                    reply_content
                                                                });
                                                            }}
                                                        />
                                                        <Button
                                                            type='primary'
                                                            onClick={async () => {
                                                                const response = await GoodsApi.evaluate.reply({
                                                                    id: item.id,
                                                                    reply_content: reply_content[item.id]
                                                                });
                                                                if (response.code === 0) {
                                                                    reply_content[item.id] = "";
                                                                    this.setState({
                                                                        reply_content
                                                                    });
                                                                    this.initList();
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
                                                marginLeft: "4.16666667%",
                                                marginBottom: "24px",
                                                paddingBottom: "10px",
                                                borderBottom: "1px solid #e9e9e9"
                                            }}
                                        />
                                    </Row>
                                )
                            }
                            <div className={styles.pageView}>
                                <Pagination
                                    showSizeChanger={false}
                                    showQuickJumper={false}
                                    current={this.search.page}
                                    pageSize={this.search.rows}
                                    total={evaluateList.total_number}
                                    onChange={(page) => {
                                        this.search.setPage(page).push();
                                    }}
                                />
                            </div>
                        </View>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default Evaluate;
