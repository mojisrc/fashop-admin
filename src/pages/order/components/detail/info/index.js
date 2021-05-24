import React, { Component, Fragment } from "react";
import BasicInfo from "./basic";
import AddressInfo from "./address";
import DeliverInfo from "./deliver";
import OtherInfo from "./other";
import GoodsInfo from "./goods";
import OperateInfo from "./operate";
import Invoice from "./invoice";
import { isEmpty } from "@/utils";
import styles from "@/pages/order/components/detail/info/index.css";
import InfoRow from "@/components/public/info/infoRow";
import { View } from "@/components/flexView";
import Image from "@/components/image";
import { history as router } from "umi";

export default class OrderDetailInfo extends Component {
    render() {
        const { orderInfo } = this.props;
        const { info } = orderInfo;
        const { id, extend_order_extend, extend_user, create_time, sn, trade_no, state, extend_order_goods, amount, freight_fee, payment_code, revise_amount, revise_freight_fee, extend_order_discount, points, pay_balance, is_revise, is_revise_freight, marketing_activity, extend_order_invoice, payable_time } = info;
        const { reciver_name, reciver_info, message, deliver_name, deliver_phone, deliver_address, tracking_time, tracking_no, remark, reciver_idcard } = extend_order_extend;
        const { history } = this.props;
        return (
          <Fragment>
              <BasicInfo
                sn={sn}
                reciver_name={reciver_name}
                create_time={create_time}
                state={state}
                trade_no={trade_no}
                payment_code={payment_code}
                marketing_activity={marketing_activity}
                payable_time={payable_time}
              />
              <AddressInfo
                reciver_info={reciver_info ? reciver_info : {
                    address: "",
                    name: "",
                    phone: "",
                    combine_detail: ""
                }}
                idcard={reciver_idcard}
              />
              <View className={styles.infoWarp}>
                  <p className={styles.infoTitle}>用户信息</p>
                  <InfoRow
                    infoList={[
                        {
                            title: "头像",
                            info: <Image
                              type='avatar'
                              src={extend_user.profile.avatar}
                              style={{
                                  width: 20,
                                  height: 20
                              }}
                            />
                        }, {
                            title: "昵称",
                            info: extend_user.profile.nickname
                        }, {
                            title: "账号",
                            info: <a
                              onClick={() => {
                                  router.push(`/user/list/detail?id=${extend_user.id}`);
                              }}
                            >{extend_user.username}</a>
                        }
                    ]}
                  />
              </View>
              {!isEmpty(extend_order_invoice) && <Invoice
                invoice={extend_order_invoice}
              />}
              {state >= 30 ? <DeliverInfo
                id={id}
                deliver_name={deliver_name}
                deliver_phone={deliver_phone}
                deliver_address={deliver_address}
                tracking_no={tracking_no}
                tracking_time={tracking_time}
                remark={remark}
              /> : null}
              <OtherInfo
                message={message}
              />
              <GoodsInfo
                extend_order_goods={extend_order_goods ? extend_order_goods : []}
                amount={amount ? amount : 0}
                freight_fee={freight_fee ? freight_fee : 0}
                is_revise={is_revise}
                is_revise_freight={is_revise_freight}
                revise_amount={revise_amount ? revise_amount : 0}
                revise_freight_fee={revise_freight_fee ? revise_freight_fee : 0}
                discount={extend_order_discount}
                points={points}
                pay_balance={pay_balance}
              />
              <OperateInfo history={history} info={info} />
          </Fragment>
        );

    }
}
