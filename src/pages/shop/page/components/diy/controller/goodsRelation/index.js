import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Radio } from "antd";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import SelectGoodsRelation from "@/pages/shop/page/components/selectGoodsRelation";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class Index extends Component {
    static defaultProps = {
        componentName: "goods_relation",
        refreshCoupon: () => {
        }
    };

    render() {
        const { options, data, getValues } = this.props;
        const { layout_style, goods_title_rows, goods_relation_id } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="展现形式"
                >
                    <RadioGroup
                        value={layout_style}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ layout_style: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>小图</Radio>
                        <Radio value={2}>大图</Radio>
                        {/*<Radio value={3}>一大两小</Radio>*/}
                        <Radio value={4}>列表</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题行数"
                >
                    <RadioGroup
                        value={goods_title_rows}
                        onChange={async (e) => {
                            getValues({
                                options: { ...options, ...{ goods_title_rows: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>一行</Radio>
                        <Radio value={2}>两行</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="关联模板"
                >
                    {goods_relation_id > 0 && <span>模板ID {goods_relation_id}&nbsp;&nbsp;&nbsp;</span>}
                    <a onClick={() => {
                        this.selectGoodsRelation.show({
                            id: goods_relation_id
                        });
                    }}>
                        <span>选择</span>
                    </a>
                    <SelectGoodsRelation
                        ref={(e) => this.selectGoodsRelation = e}
                        getState={(e) => {
                            this.selectGoodsRelation.close();
                            getValues({
                                options: { ...options, ...{ goods_relation_id: e.value.id } },
                                data: e.value.goods
                            });
                        }}
                    />
                </FormItem>
            </Form>
        );
    }
}
