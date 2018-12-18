import React, { Component } from "react";
import { Form, Select, Card, Row, Col, Alert } from "antd";
import { View } from "@/components/flexView";
import styles from "./index.css";
import { connect } from "dva";

const FormItem = Form.Item;
const Option = Select.Option;
export default class SendAddress extends Component {
    static defaultProps = {
        shipperList: [],
        shipper_id: 0,
        deliver_name: "",
        deliver_phone: "",
        deliver_address: "",
        onShipperChange: () => {
        }
    };
    state = {
        selectVisible: true,
        shipper_id: 0
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectVisible: nextProps.deliver_phone === null
        });
        const { deliver_name, deliver_phone, deliver_address } = this.props;
        if (deliver_name !== nextProps.deliver_name || deliver_phone !== nextProps.deliver_phone || deliver_address !== nextProps.deliver_address) {
            const { onChange } = this.props;
            if (typeof onChange === "function") {
                onChange({
                    deliver_name: nextProps.deliver_name,
                    deliver_phone: nextProps.deliver_phone,
                    deliver_address: nextProps.deliver_address
                });
            }
        }
    }

    onReSelect = () => {
        this.setState({
            selectVisible: true
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { shipper_id } = this.state;
        const { shipperList, deliver_name, deliver_phone, deliver_address, onShipperChange } = this.props;
        const { selectVisible } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            }
        };
        const cardTitle = (
            selectVisible ? <FormItem
                {...formItemLayout}
                style={{
                    marginBottom: 0
                }}
            >
                {getFieldDecorator("shipper_id", {
                    initialValue: shipper_id ? shipper_id : undefined,
                    rules: [{
                        required: true, message: "选择发货地址"
                    }]
                })(
                    <View className={styles.sendAddress}><Select
                        className={styles.sendAddressSelect}
                        placeholder="选择发货地址" onChange={(id) => {
                        const item = shipperList.find((e) => {
                            return e.id === id;
                        });
                        if (item) {
                            this.setState({
                                selectVisible: false,
                                shipper_id: id
                            }, () => {
                                onShipperChange({
                                    deliver_name: item.name,
                                    deliver_phone: item.contact_number,
                                    deliver_address: item.combine_detail + " " + item.address
                                });
                            });
                        }
                    }}>
                        {shipperList.length > 0 ? shipperList.map((item) => {
                            return <Option value={item.id} key={item.id}>{item.name}</Option>;
                        }) : null}
                    </Select>
                        {deliver_name && deliver_phone && deliver_address ? <a onClick={() => {
                            this.setState({
                                selectVisible: false
                            });
                        }}>取消</a> : null}
                    </View>
                )}
            </FormItem> : <a onClick={() => {
                this.onReSelect();
            }}>重新选择</a>
        );
        return (
            <View className={styles.orderSendItemWarp}>
                <p className={styles.title}>确认发货地址</p>
                <Card
                    type="inner"
                    title={cardTitle}
                    extra={
                        <View className={styles.cardExtra}>
                            {/*<a>新增地址</a>*/}
                        </View>
                    }
                >
                    {deliver_name ? <Row>
                        <Col span={24}>
                            <p className={styles.cardInnerCol}>
                                联系人：<span>{deliver_name}</span>
                            </p>
                        </Col>
                        <Col span={24}>
                            <p className={styles.cardInnerCol}>
                                联系电话：<span>{deliver_phone}</span>
                            </p>
                        </Col>
                        <Col span={24}>
                            <p className={styles.cardInnerCol}>
                                详细地址：<span>{deliver_address}</span>
                            </p>
                        </Col>
                    </Row> : <View><Alert
                        message="暂无选择"
                        type="warning"
                        showIcon
                    /></View>}

                </Card>
            </View>
        );
    }
}
