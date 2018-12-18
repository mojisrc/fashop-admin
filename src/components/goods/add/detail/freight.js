import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Select, Radio, InputNumber, Form, Button, DatePicker } from "antd";
import Wstyles from "./index.css";
import { Link } from "react-router-dom";
import moment from "moment";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class Freight extends Component {
    render() {
        const { getFieldDecorator, formItemLayout, shippingTemplateList, shippingCostSelect, refreshShippingTemplateList, freight_fee, sale_time } = this.props;
        return (
            <View className={Wstyles.goodsItem}>
                <h3>运费其他</h3>
                <FormItem
                    {...formItemLayout}
                    label='运费'
                >
                    {getFieldDecorator("freightData", {
                        rules: [{
                            validator: this.freightValidator,
                            required: true
                        }],
                        initialValue: { key: "freight", value: freight_fee ? freight_fee : "0.00" }
                    })(
                        <GoodsFreight
                            shippingCostSelect={shippingCostSelect}
                            shippingTemplateList={shippingTemplateList}
                            refreshShippingTemplateList={refreshShippingTemplateList}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='开售时间'
                >
                    {getFieldDecorator("sale_time", {
                        rules: [{
                            validator: this.saleTimeValidator,
                            required: true
                        }],
                        initialValue: sale_time !== undefined ? { key: 1, value: moment(sale_time, "X") } : {
                            key: 0,
                            value: null
                        }
                    })(
                        <GoodsSaleTime />
                    )}
                </FormItem>
            </View>
        );
    }

    freightValidator = (rule, value, callback) => {
        if (value) {
            if (value.key === "freight") {
                if (value.value >= 0) {
                    callback();
                } else {
                    callback("请输入统一运费");
                }
            } else {
                if (value.value > 0) {
                    callback();
                } else {
                    callback("请选择运费模板");
                }
            }
        } else {
            callback("请选择运费模式");
        }
    };
    saleTimeValidator = (rule, value, callback) => {
        if (value) {
            if (value.key === 0) {
                callback();
            } else {
                if (value.value) {
                    callback();
                } else {
                    callback("请选择开售时间");
                }
            }
        } else {
            callback("请选择开售时间模式");
        }
    };
}

//
//  onChange: Function
// immediateSale: 1 | 0 | null,
// sale_time: number | null

class GoodsSaleTime extends Component {
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            immediateSale: value.key || 0,
            sale_time: value.value || null
        };
    }

    static defaultProps = {
        onChange: (any) => {
        }
    };
    triggerChange = (changedValue) => {
        const {
            onChange
        } = this.props;
        if (onChange) {
            onChange(changedValue);
        }
    };

    componentWillUpdate(nextProps, nextState) {
        const {
            immediateSale,
            sale_time
        } = nextState;
        if (this.state.immediateSale !== immediateSale || this.state.sale_time !== sale_time) {
            this.triggerChange({
                key: immediateSale,
                value: sale_time
            });
        }
    }

    render() {
        const { immediateSale, sale_time } = this.state;
        const radioStyle = {
            display: "block",
            height: "30px",
            lineHeight: "30px"
        };
        return (
            <RadioGroup
                onChange={(e) => {
                    const { value } = e.target;
                    this.setState({
                        immediateSale: value
                    });
                }}
                value={immediateSale}
            >
                <Radio value={0} style={radioStyle}>
                    立即开售
                </Radio>
                <Radio value={1} style={{ ...radioStyle, marginTop: 20 }}>
                    定时开售
                    {immediateSale === 1 ? <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择时间"
                        style={{ marginLeft: 20 }}
                        defaultValue={sale_time}
                        onOk={(e) => {
                            if (e) {
                                this.setState({
                                    immediateSale: 1,
                                    sale_time: e
                                });
                            }
                        }}
                        showToday={false}
                    /> : null}
                </Radio>
            </RadioGroup>
        );
    }
}

//
// type FreightProps = {
//     shippingCostSelect: string | null,
//     shippingTemplateList: Array<{
//         id: number,
//         name: string
//     }>,
//     refreshShippingTemplateList: Function,
//     onChange: Function,
//     freight_fee: number,
// }
//
// type FreightState = {
//     loading: boolean,
//     shippingCostSelect: string | null,
//     freight: number,
//     freight_id: number | null,
// }

class GoodsFreight extends Component {
    state = {
        loading: false,
        shippingCostSelect: "freight",
        freight_id: null,
        freight: 0
    };
    static defaultProps = {
        onChange: (any) => {
        }
    };
    triggerChange = (changedValue) => {
        const {
            onChange
        } = this.props;
        if (onChange) {
            onChange(changedValue);
        }
    };

    componentWillUpdate(nextProps, nextState) {
        const { shippingCostSelect, freight, freight_id } = nextState;
        if (this.state.shippingCostSelect !== shippingCostSelect || this.state.freight !== freight || this.state.freight_id !== freight_id) {
            const keyValue = shippingCostSelect === "freight" ? freight : freight_id;
            this.triggerChange({
                key: shippingCostSelect,
                value: keyValue
            });
        }
    }

    render() {
        const { shippingTemplateList, refreshShippingTemplateList, value } = this.props;
        const { loading, freight_id, shippingCostSelect } = this.state;
        const radioStyle = {
            display: "block",
            height: "30px",
            lineHeight: "30px"
        };
        return (
            <RadioGroup
                onChange={(e) => {
                    const { value } = e.target;
                    this.setState({ shippingCostSelect: value });
                }}
                value={shippingCostSelect}
            >
                <Radio value={"freight"} style={radioStyle}>
                    统一邮费
                    {shippingCostSelect === "freight" ? <InputNumber
                        placeholder="请输入"
                        style={{
                            width: 150,
                            marginLeft: 20
                        }}
                        formatter={value => `￥ ${value}`}
                        min={0}
                        precision={2}
                        value={value.value}
                        onChange={(e) => {
                            this.setState({ freight: e });
                        }}
                    /> : null}
                </Radio>
                <Radio value={"freight_id"} style={{ ...radioStyle, marginTop: 20, display: "none" }}>
                    运费模板
                    {shippingCostSelect === "freight_id" ? [<Select
                            showSearch
                            style={{ width: 440, marginLeft: 20 }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            onChange={(value) => {
                                this.setState({
                                    freight_id: value
                                });
                            }}
                            value={freight_id}
                            filterOption={(input, option) => option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                shippingTemplateList.map((e) => (
                                    <Option value={e.id} key={e.id}>
                                        <p>{e.name}</p>
                                    </Option>
                                ))
                            }
                        </Select>,
                            <Button
                                type="primary"
                                style={{
                                    marginLeft: 10
                                }}
                                size={"small"}
                                loading={loading}
                                onClick={() => {
                                    this.setState({
                                        loading: true
                                    }, () => {
                                        refreshShippingTemplateList(() => {
                                            this.setState({
                                                loading: false
                                            });
                                        });
                                    });
                                }}
                            >
                                刷新
                            </Button>,
                            <Link
                                style={{
                                    marginLeft: 10
                                }}
                                to={"/setting/freightAdd"}
                                target={"_blank"}
                            >
                                新增运费模板
                            </Link>]
                        : null}
                </Radio>
            </RadioGroup>
        );
    }
}

export default Freight;
