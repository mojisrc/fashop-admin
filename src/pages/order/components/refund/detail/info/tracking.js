import React, { Component } from "react";
import styles from "../index.css";
import { View } from "@/components/flexView";
import InfoColumn from "@/components/public/info/infoColumn";
import moment from "moment";
import { Modal, message } from "antd";
import { connect } from "umi";

@connect()
export default class Tracking extends Component {
    static defaultProps = {
        dispatch: () => {
        }
    };

    render() {
        const {
            dispatch,
            id,
            tracking_no,
            tracking_phone,
            tracking_company,
            tracking_explain,
            tracking_time,
            tracking_images,
            receive,
            receive_time
        } = this.props;
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>买家发货信息</p>
                <InfoColumn
                    infoList={[
                        {
                            title: "物流单号",
                            info: tracking_no
                        }, {
                            title: "联系电话",
                            info: tracking_phone
                        }, {
                            title: "物流公司",
                            info: tracking_company
                        },
                        {
                            title: "买家备注",
                            info: tracking_explain
                        },
                        {
                            title: "操作时间",
                            info: tracking_time ? moment(tracking_time, "X").format("YYYY-MM-DD HH:mm:ss") : ""
                        },
                        {
                            title: "发货凭证",
                            images: Array.isArray(tracking_images) && tracking_images.length > 0 ? tracking_images.map((img) => {
                                return { img };
                            }) : []
                        },
                        {
                            title: "收货状态",
                            info: receive === 1 ?
                                <div><span>未收到买家的退货物品，</span> <a onClick={() => {
                                    Modal.confirm({
                                        title: "确认收货吗?",
                                        maskClosable: true,
                                        okText: "确认",
                                        okType: "danger",
                                        cancelText: "取消",
                                        onOk: () => {
                                            // TODO 成功了 但是没刷新界面，确认收货还一直存在
                                            dispatch({
                                                type: "refund/receive",
                                                payload: { id, handle_state: 10 },
                                                callback: (response) => {
                                                    if (response.code === 0) {
                                                        dispatch({
                                                            type: "refund/detail",
                                                            payload: { id }
                                                        });
                                                    } else {
                                                        message.error(response.msg);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }}>确认收货？</a></div>
                                :
                                <div>已收货，时间：{moment(receive_time, "X").format("YYYY-MM-DD HH:mm:ss")}</div>
                        }
                    ]}
                />
            </View>
        );
    }
}
