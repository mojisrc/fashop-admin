import React, { Component, Fragment } from "react";
import { Select, Radio, InputNumber, Button } from "antd";
import router from "umi/router";
import { connect } from "dva";

const Option = Select.Option;
const RadioGroup = Radio.Group;

@connect(({ freight, loading }) => ({
    freightList: freight.list.result.list,
    freightListLoading: loading.effects["freightList/list"]
}))
class GoodsFreight extends Component {
    static defaultProps = {
        freightList: [],
        freightListLoading: false,
        /**
         * 当freight_id = 0时，运费算统一运费
         * @param e
         */
        onChange: (e = { freight_type: "freight_fee", freight_fee: 0, freight_id: 0 }) => {
        }
    };

    constructor(props) {
        super(props);
        const value = props.value || { freight_id: 0, freight_fee: 0 };
        this.state = {
            freight_fee: value.freight_fee,
            freight_id: value.freight_id,
            freight_type: value.freight_id > 0 ? "freight_id" : "freight_fee"
        };
        this.initList();
    }

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "freight/list",
            payload: {
                page: 1,
                rows: 1000
            }
        });
    };

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value || { freight_id: 0, freight_fee: 0 };
        this.setState({
            freight_fee: value.freight_fee,
            freight_id: value.freight_id,
            freight_type: value.freight_id > 0 ? "freight_id" : "freight_fee"
        })
    }

    render() {
        const { freightList, freightListLoading, onChange } = this.props;
        const { freight_type, freight_id, freight_fee } = this.state;

        return (
            <RadioGroup
                onChange={(e) => {
                    this.setState({ freight_type: e.target.value });
                }}
                value={freight_type}
            >
                <Radio value={"freight_fee"}>
                    统一邮费
                    {freight_type === "freight_fee" ? <InputNumber
                        placeholder="请输入"
                        style={{
                            width: 150,
                            marginLeft: 20
                        }}
                        formatter={value => `￥ ${value}`}
                        min={0}
                        precision={2}
                        value={freight_fee}
                        onChange={(freight_fee) => {
                            this.setState({ freight_fee });
                            onChange({ freight_type: "freight_id", freight_id: 0, freight_fee });
                        }}
                    /> : null}
                </Radio>
                <br />
                <Radio value={"freight_id"}>
                    运费模板
                    {freight_type === "freight_id" ? <Fragment><Select
                            showSearch
                            style={{ width: 240, marginLeft: 20 }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            onChange={(value) => {
                                this.setState({
                                    freight_id: value
                                });
                                onChange({ freight_type: "freight_id", freight_id: value, freight_fee: 0 });
                            }}
                            value={freight_id === 0 ? null : freight_id}
                            filterOption={(input, option) => option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                freightList.map((e) => (
                                    <Option value={e.id} key={e.id}>
                                        <p>{e.name}</p>
                                    </Option>
                                ))
                            }
                        </Select>
                            <Button
                                type="primary"
                                style={{
                                    marginLeft: 10
                                }}
                                size={"small"}
                                loading={freightListLoading}
                                onClick={this.initList}
                            >
                                刷新
                            </Button>
                        </Fragment>
                        : null}
                </Radio>
            </RadioGroup>
        );
    }
}

export default GoodsFreight;
