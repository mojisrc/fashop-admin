import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Input, Checkbox, Pagination, Spin, Button } from "antd";
import styles from "./index.css";
import { connect } from "umi";
import { ScrollView } from "@/components/flexView";
import Image from "@/components/image";

const Search = Input.Search;

@connect(({ supplier, loading }) => ({
    userList: supplier.selectableUsers.result,
    userListLoading: loading.effects["supplier/selectableUsers"]
}), null, null, {
    forwardRef: true
})
export default class SelectUser extends Component {
    static defaultProps = {
        userList: { total_number: 0, list: [] },
        userListLoading: true,
        multiSelect: false
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rows: 10,
            multiSelect: props.multiSelect ? props.multiSelect : false,
            url: "",
            checkedData: [],
            checkedValues: [],
            visible: false
        };
    }

    show() {
        this.setState({
            visible: true
        },()=>{
            this.initList();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "supplier/selectableUsers",
            payload: {
                page: this.state.page,
                rows: this.state.rows
            }
        });
    }

    render() {
        const { onOk, multiSelect, userList, userListLoading, dispatch } = this.props;
        if (userList) {
            const { total_number, list } = userList;
            const { page, rows, checkedData, visible } = this.state;
            return (
                <Modal
                    title="选择用户"
                    cancelText='取消'
                    okText='确定'
                    style={{ top: 20 }}
                    width={756}
                    visible={visible}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        });
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
                    <Spin spinning={userListLoading}>
                        <View className={styles.userList}>
                            <View className={styles.userListTop}>
                                <Search
                                    placeholder="请输入用户名"
                                    onSearch={(value) => {
                                        dispatch({
                                            type: "supplier/selectableUsers",
                                            payload: {
                                                page,
                                                rows,
                                                keywords: value
                                            }
                                        });
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
                                                    className={styles.userListItem}
                                                    onClick={() => {
                                                        onPress();
                                                    }}
                                                >
                                                    <View className={styles.itemLeft}>
                                                        <Image
                                                            type='user'
                                                            src={item.avatar}
                                                            style={{width:40,height:40,marginRight:8}}
                                                        />
                                                        <View className={styles.itemText}>
                                                            <p>{item.phone}</p>
                                                            <span>{item.nickname}</span>
                                                            <span>{item.username}</span>
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
