import React, { Component } from "react";
import {
    Row,
    Col,
    Button
} from "antd";
import router from "umi/router";
import OrderEditPrice from "@/components/order/editPrice/index";

export default class OrderDetailOperateInfo extends Component {
    render() {
        const { info } = this.props;
        const { id, state } = info;
        return (
            <Row style={{ marginTop: 24 }} type="flex" justify="start">
                <OrderEditPrice ref={(e) => this.editPrice = e} />
                {state === 20 ? <Col>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push(`/order/list/send?id=${id}`);
                        }}
                        style={{ marginRight: 15 }}
                    >
                        设置发货
                    </Button>
                </Col> : null}
                {state === 10 ? <Col>
                    <Button
                        type='primary'
                        onClick={() => {
                            this.editPrice.getWrappedInstance().show({
                                orderId: id
                            });
                        }}
                    >
                        改价格
                    </Button>
                </Col> : null}
            </Row>
        );
    }
}
