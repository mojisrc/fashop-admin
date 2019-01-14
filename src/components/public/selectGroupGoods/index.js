import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Input, Checkbox, Pagination, Spin, Button } from "antd";
import styles from "./index.css";
import { list } from "@/models/goods";
import { connect } from "dva";
import { ScrollView } from "@/components/flexView";
import Image from "@/components/image";

const Search = Input.Search;
// type GoodsRowType = { id: number, title: string, price: string, img: { url: string } }
// type Props = {
//     dispatch?: Function,
//     loading?: boolean,
//     listData?: {
//         page: number,
//         rows: number,
//         total_number: number,
//         list: Array<GoodsRowType>,
//     },
//     multiSelect: boolean,
//     visible: boolean,
//     close: Function,
//     onOk: Function,
// }
// type State = {
//     url: string,
//     checkedValues: Array<any>,
//     checkedData: Array<GoodsRowType>
// }

@connect(({ group, loading }) => ({
    goodsList: group.pageGoods.result,
    goodsListLoading: loading.effects["group/pageGoods"]
}))
export default class SelectGoods extends Component {
    static defaultProps = {
        goodsList: { total_number: 0, list: [] },
        goodsListLoading: true,
        multiSelect:false
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rows: 10,
            multiSelect: props.multiSelect ? props.multiSelect : false,
            url: "",
            checkedData: [],
            checkedValues: []
        };
    }

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "group/pageGoods",
            payload: {
                page: this.state.page,
                rows: this.state.rows
            }
        });
    }

    render() {
        const { visible, close, onOk, multiSelect, goodsList, goodsListLoading, dispatch } = this.props;
        if (goodsList) {
            const { total_number, list } = goodsList;
            const { page, rows, checkedData } = this.state;
            return (
                <Modal
                    title="添加拼团商品"
                    cancelText='取消'
                    okText='确定'
                    visible={visible}
                    style={{ top: 20 }}
                    width={756}
                    onCancel={() => {
                        close();
                    }}
                    onOk={() => {
                        onOk(checkedData);
                        this.setState({ checkedData: [] });
                    }}
                    footer={multiSelect ? <div>
                        <Button type="primary" onClick={() => {
                            onOk(checkedData);
                            this.setState({ checkedData: [] });
                        }}>确认</Button>
                    </div> : null}
                >
                    <Spin spinning={goodsListLoading}>
                        <View className={styles.goodsList}>
                            {/* <View className={styles.goodsListTop}>
                                <Search
                                    placeholder="请输入商品名称"
                                    onSearch={(value) => {
                                        dispatch({
                                            type: "goods/list",
                                            payload: {
                                                page,
                                                rows,
                                                title: value
                                            }
                                        })
                                    }}
                                    style={{ width: 200 }}
                                />
                            </View> */}
                            <ScrollView className={styles.scrollView}>
                                {
                                    list.map((item, i) => {
                                        const index = checkedData.findIndex((e) => e.id === item.id);
                                        const checked = index !== -1;
                                        const onPress = () => {
                                            let _checkedData = checkedData;
                                            if (checked) {
                                                _checkedData.splice(index, 1);
                                                this.setState({
                                                    checkedData: _checkedData
                                                });
                                            } else {
                                                _checkedData = multiSelect ? [..._checkedData, item] : [item];
                                                this.setState({
                                                    checkedData: _checkedData
                                                }, () => {
                                                    !multiSelect ? onOk(this.state) : null;
                                                });
                                            }
                                        };
                                        return (
                                            <View className={styles.view1} key={i}>
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={(e) => {
                                                        onPress();
                                                    }}
                                                />
                                                <View
                                                    className={styles.goodsListItem}
                                                    onClick={() => {
                                                        onPress();
                                                    }}
                                                >
                                                    <View className={styles.itemLeft}>
                                                        <Image
                                                            type='goods'
                                                            src={item.img}
                                                        />
                                                        <View className={styles.itemText}>
                                                            <p>{item.title}</p>
                                                            <p className={styles.smallPrice} style={{ fontSize: 14, color: '#999' }}>
                                                                {item.limit_buy_num}人团 已拼{item.group_sale_num}件
                                                            </p>
                                                            <p className={styles.listPrice}>
                                                                ￥{item.group_price}
                                                                <span className={styles.marketPrice}>￥{item.price}</span>
                                                            </p>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </ScrollView>
                            <View className={styles.paginationView}>
                                <Pagination
                                    size="small"
                                    showSizeChanger={false}
                                    showQuickJumper={false}
                                    pageSize={rows}
                                    total={total_number}
                                    current={page}
                                    onChange={(current, pageSize) => {
                                        this.setState({
                                            page: current,
                                            rows: pageSize
                                        }, () => {
                                            this.initList();
                                        });
                                    }}
                                    onShowSizeChange={(current, pageSize) => {
                                        this.setState({
                                            page: current,
                                            rows: pageSize
                                        }, () => {
                                            this.initList();
                                        });
                                    }}
                                />
                            </View>
                        </View>
                    </Spin>
                </Modal>
            );
        } else {
            return null;
        }
    }
}
