import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Tabs, Button, Row, Col, Checkbox, Pagination, Spin, Input, DatePicker } from "antd";
import styles from "./index.css";
import { connect } from "dva";
import UploadImage from "@/components/uploadImage";
import Image from "@/components/image";
import moment from "moment"

const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
const { RangePicker } = DatePicker;
function disabledDate(current) {
    // Can not select days after today
    return current && current > moment().endOf('day');
}

@connect(({ image, loading }) => ({
    imageList: image.list.result,
    imageListLoading: loading.effects["image/list"],
    goodsImageList: image.goodsImageList.result,
    goodsImageListLoading: loading.effects["image/goodsImageList"],
}))
export default class PhotoGallery extends Component {
    static defaultProps = {
        imageList: {
            total_number: 0,
            list: []
        },
        goodsImageList: {
            total_number: 0,
            list: []
        }
    };
    state = {
        page: 1,
        rows: 18,
        goodsPage: 1,
        goodsRows: 18,
        checkedImg: [],
        checkedGoodsImg: [],
        keywords: null,
        create_time: []
    };
    componentDidMount() {
        this.initImgList();
        this.initGoodsImgList();
    }
    initImgList() {
        const { dispatch } = this.props;
        const { page, rows, create_time } = this.state
        dispatch({
            type: "image/list",
            payload: {
                page,
                rows,
                create_time
            }
        });
    }
    initGoodsImgList() {
        const { dispatch } = this.props;
        const { goodsPage, goodsRows, keywords } = this.state;
        dispatch({
            type: "image/goodsImageList",
            payload: {
                page: goodsPage,
                rows: goodsRows, 
                keywords
            }
        });
    }
    clearCheckedValues = () => {
        this.setState({
            checkedImg: [],
            checkedGoodsImg: [],
        })
    }
    render() {
        const {
            visible,
            onCancel,
            onOk
        } = this.props;
        const tabList = [
            {
                tab: "图片库",
                render: this.imgList
            }, {
                tab: "商品图",
                render: this.goodsImgList
            }
        ]
        return (
            <Modal
                title="我的图库"
                cancelText="取消"
                okText="确定"
                visible={visible}
                bodyStyle={{
                    padding: "0"
                }}
                style={{ top: 20 }}
                width={800}
                onCancel={() => {
                    onCancel();
                    this.clearCheckedValues();
                }}
                onOk={() => {
                    const result = [
                        ...this.state.checkedImg,
                        ...this.state.checkedGoodsImg,
                    ].map(item=>{
                        let index = item.indexOf("-")
                        return item.substr(index+1)
                    })
                    onOk(result);
                    this.clearCheckedValues();
                }}
            >
                <Tabs
                    tabBarStyle={{
                        paddingLeft: 24
                    }}
                >
                    {
                        tabList.map((item,index)=>(
                            <TabPane tab={item.tab} key={index}>
                                {
                                    item.render()
                                }
                            </TabPane>
                        ))
                    }
                </Tabs>
            </Modal>
        );
    }

    imgList = () => {
        const { checkedImg } = this.state;
        const { imageList, imageListLoading } = this.props;
        const { list } = imageList;
        return (
            <View className={styles.imgList}>
                <View className={styles.imgListTop}>
                    <UploadImage
                        onChange={(e) => {
                            this.initImgList();
                        }}
                        is_save={1}
                    >
                        <Button type="primary">上传图片</Button>
                    </UploadImage>
                    <RangePicker 
                        style={{width: 318}}
                        disabledDate={disabledDate}
                        onChange={(date)=>{
                            this.setState({
                                create_time: date.length ? [
                                    moment(date[0]).format('X'),
                                    moment(date[1]).format('X')
                                ] : []
                            },()=>{
                                this.initImgList()
                            })
                        }} 
                    />
                </View>
                <Spin spinning={imageListLoading}>
                    <CheckboxGroup
                        value={checkedImg}
                        onChange={checkedImg => {
                            this.setState({ checkedImg });
                        }}
                        style={{ display: "block" }}
                    >
                        <View className={styles.imgContent}>
                            <Row gutter={30} type={"flex"}>
                                {list.map((item, index) => (
                                    <Col
                                        span={4}
                                        key={index}
                                        style={{ marginTop: 15 }}
                                    >
                                        <Checkbox
                                            value={`${item.id}-${item.url}`}
                                            className={styles.checkbox}
                                        >
                                            <View
                                                className={styles.imgItem}
                                                style={
                                                    checkedImg.indexOf(`${item.id}-${item.url}`) > -1 ? {
                                                        borderColor: "#188fff"
                                                    } : {}
                                                }
                                            >
                                                {
                                                    item.title ? <p className={styles.title}>{item.title}</p> : null
                                                }
                                                <div>
                                                    <Image
                                                        src={item.url}
                                                        style={{ minHeight: 101.33 }}
                                                    />
                                                </div>
                                            </View>
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </View>
                    </CheckboxGroup>
                </Spin>
                <View className={styles.paginationView}>
                    <Pagination
                        size="small"
                        showSizeChanger={false}
                        showQuickJumper={false}
                        current={this.state.page}
                        pageSize={this.state.rows}
                        total={imageList.total_number}
                        onChange={(page, rows) => {
                            this.setState({
                                page,
                                rows
                            }, () => {
                                this.initImgList();
                            });
                        }}
                        pageSizeOptions={[`${this.state.rows}`]}
                    />
                </View>
            </View>
        );
    }

    goodsImgList = () => {
        const { checkedGoodsImg } = this.state;
        const { goodsImageList, goodsImageListLoading } = this.props;
        const { list } = goodsImageList;
        return (
            <View className={styles.imgList}>
                <View className={styles.imgListTop}>
                    <View/>
                    <Search
                        placeholder="请输入关键词"
                        onSearch={value => {
                            this.setState({ keywords: value },()=>{
                                this.initGoodsImgList()
                            })
                        }}
                        style={{ width: 200 }}
                    />
                </View>
                <Spin spinning={goodsImageListLoading}>
                    <CheckboxGroup
                        value={checkedGoodsImg}
                        onChange={checkedGoodsImg => {
                            this.setState({ checkedGoodsImg });
                        }}
                        style={{ display: "block" }}
                    >
                        <View className={styles.imgContent}>
                            <Row gutter={30} type={"flex"}>
                                {list.map((item, index) => (
                                    <Col
                                        span={4}
                                        key={index}
                                        style={{ marginTop: 15 }}
                                    >
                                        <Checkbox
                                            value={`${item.id}-${item.img}`}
                                            className={styles.checkbox}
                                        >
                                            <View
                                                className={styles.imgItem}
                                                style={
                                                    checkedGoodsImg.indexOf(`${item.id}-${item.img}`) > -1 ? {
                                                        borderColor: "#188fff"
                                                    } : {}
                                                }
                                            >
                                                {
                                                    item.title ? <p className={styles.title}>{item.title}</p> : null
                                                }
                                                <div>
                                                    <Image
                                                        src={item.img}
                                                        style={{ minHeight: 101.33 }}
                                                    />
                                                </div>
                                            </View>
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </View>
                    </CheckboxGroup>
                </Spin>
                <View className={styles.paginationView}>
                    <Pagination
                        size="small"
                        showSizeChanger={false}
                        showQuickJumper={false}
                        current={this.state.goodsPage}
                        pageSize={this.state.goodsRows}
                        total={goodsImageList.total_number}
                        onChange={(page, rows) => {
                            this.setState({
                                goodsPage: page,
                                goodsRows: rows
                            }, () => {
                                this.initImgList();
                            });
                        }}
                        pageSizeOptions={[`${this.state.goodsRows}`]}
                    />
                </View>
            </View>
        );
    }
}
