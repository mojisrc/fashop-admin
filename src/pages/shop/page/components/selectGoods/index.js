import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Input, Checkbox, Pagination, Spin, Button } from "antd";
import styles from "./index.css";
import { connect } from "umi";
import { ScrollView } from "@/components/flexView/index";
import Image from "@/components/image/index";

const Search = Input.Search;
@connect(({ goods, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectPointsGoods extends Component {
    static defaultProps = {
        goodsList: { total_number: 0, list: [] },
        goodsListLoading: false,
        multiSelect: false
    };

    show() {
        this.setState({
            visible: true
        }, () => {
            this.initList();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rows: 10,
            multiSelect: props.multiSelect ? props.multiSelect : false,
            url: "",
            checkedData: [],
            checkedValues: [],
            visible: false,
            keywords:null
        };
    }

    componentDidMount() {
        const { goodsList, goodsListLoading } = this.props;
        if (goodsList.list.length === 0 && goodsListLoading === false) {
            this.initList();
        }
    }

    initList() {
        const { dispatch } = this.props;
        const {page,rows,keywords} = this.state
        dispatch({
            type: "goods/list",
            payload: {
                page,
                rows,
                keywords
            }
        });
    }


    render() {
        const {  onOk, multiSelect, goodsList, goodsListLoading, dispatch } = this.props;
        if (goodsList) {
            const { total_number, list } = goodsList;
            const { page, rows, checkedData, visible } = this.state;
            return (
                <Modal
                    title="添加商品"
                    cancelText='取消'
                    okText='确定'
                    visible={visible}
                    style={{ top: 20 }}
                    width={756}
                    onCancel={() => {
                        this.close();
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
                            <View className={styles.goodsListTop}>
                                <Search
                                    placeholder="请输入商品名称"
                                    onSearch={(value) => {
                                        this.setState({
                                            keywords:value
                                        },()=>{
                                            this.initList()
                                        })
                                    }}
                                    style={{ width: 200 }}
                                />
                            </View>
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
                                                            style={{
                                                                width: 80,
                                                                height: 80
                                                            }}
                                                        />
                                                        <View className={styles.itemText}>
                                                            <p>{item.title}</p>
                                                            <span>￥{item.price}</span>
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
