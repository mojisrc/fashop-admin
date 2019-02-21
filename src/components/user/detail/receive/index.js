import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Card, Pagination } from "antd";
import styles from "./index.css";
import InfoRow from "../../../public/info/infoRow";
import UserApi from "@/services/user";
//
// type Props = {
//     user_id: number,
//
// }
// type State = {
//     list: Array<{
//         id: number,
//         truename: string,
//         address: string,
//         combine_detail: string,
//         is_default: number,
//         mobile_phone: number
//     }>,
//     page: number,
//     rows: number,
//     total_number: number
// }
@connect()
export default class ReceiveInfo extends Component {
    state = {
        list: [],
        page: 1,
        rows: 10,
        total_number: 0
    };

    async componentWillMount() {
        await this.getAddressList();
    }

    async getAddressList() {
        const { user_id } = this.props;
        const response = await UserApi.address({ id: user_id });
        if (response.code === 0) {
            const { list, total_number } = response.result;
            this.setState({
                list,
                total_number
            });
        }
    }

    render() {
        const { list, page, rows, total_number } = this.state;
        return (
            <View className={styles.cardWarp}>
                {
                    Array.isArray(list) && list.length > 0 && list.map((item, index) =>
                        <Card
                            key={index}
                            type="inner"
                            title={`收货地址`}
                            extra={
                                <span>
                                    {
                                        item.is_default ? "默认地址" : ""
                                    }
                                </span>
                            }
                        >
                            <InfoRow
                                infoList={[
                                    {
                                        title: "联系人",
                                        info: item.truename
                                    }, {
                                        title: "联系电话",
                                        info: item.mobile_phone
                                    }, {
                                        title: "所在地区",
                                        info: item.combine_detail
                                    }, {
                                        title: "详细地址",
                                        info: item.address
                                    }
                                ]}
                            />
                        </Card>
                    )
                }
                {total_number > 0 ? <Pagination
                    current={page}
                    pageSize={rows}
                    total={total_number}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    onChange={(page) => {
                        this.setState({
                            page
                        }, () => {
                            this.getAddressList();
                        });
                    }}
                /> : <View className={styles.addressEmpty}>
                    <img
                        src={require("@/assets/images/fetchStatus/emptySearch.png")}
                    />
                    <p>该用户还没有添加收货地址</p>
                </View>}
            </View>
        );
    }
}
