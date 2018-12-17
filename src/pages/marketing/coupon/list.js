import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import CouponListHeader from "@/components/marketing/coupon/listHeader";
import CouponListTable from "@/components/marketing/coupon/listTable";
import { connect } from "dva";
import { Card } from "antd";

@connect()
class Coupon extends Component {
    render() {
        return <PageHeaderWrapper>
            <Card bordered={false}>
                <CouponListHeader {...this.props} />
                <CouponListTable {...this.props} />
            </Card>
        </PageHeaderWrapper>
    }
}
export default Coupon
