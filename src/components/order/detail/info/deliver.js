import React, { Component } from "react";
import styles from "./index.css";
import { View } from "@/components/flexView";
import InfoRow from "@/components/public/info/infoRow";
import moment from "moment";
import router from "umi/router";

export default class DeliverInfo extends Component {
    render() {
        const { id, deliver_name, deliver_phone, deliver_address, tracking_time, tracking_no, remark } = this.props;
        return (
            <View className={styles.infoWarp}>
                <div>
                    <p className={styles.infoTitle}>发货信息</p>
                    <a onClick={() => {
                        router.push(`/order/list/send?id=${id}`);
                    }}
                       style={{fontSize:14,fontWeight:400,marginLeft:10}}
                    >修改</a>
                </div>
                <InfoRow
                    infoList={[
                        {
                            title: "发货人",
                            info: deliver_name
                        }, {
                            title: "电话",
                            info: deliver_phone
                        }, {
                            title: "发货地址",
                            info: deliver_address
                        }, {
                            title: "物流单号",
                            info: tracking_no ?
                                <span>{tracking_no}<a href={`https://www.kuaidi100.com/chaxun?com=[]&nu=${tracking_no}`}
                                                      target="_blank" style={{ marginLeft: 10 }}>查看物流</a></span> : "无"
                        }
                        , {
                            title: "发货时间",
                            info: moment(tracking_time, "X").format("YYYY-MM-DD HH:mm:ss")
                        }, {
                            title: "发货备注",
                            info: remark ? remark : "无"
                        }
                    ]}
                />
            </View>
        );
    }
}
