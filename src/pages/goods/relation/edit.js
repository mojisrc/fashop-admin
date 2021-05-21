import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import {
    Card,

    Button,
    Input,
    Table,
    message
} from "antd";
import { connect } from "umi";
import SelectGoods from "./components/selectGoods";
import Arr from "@/utils/array";
import Image from "@/components/image";
import { history as router } from "umi";

const FormItem = Form.Item;
@Form.create()
@connect(({ loading }) => ({
    goodsRelationEditLoading: loading.effects["goodsRelation/edit"]
}))
export default class CouponEdit extends Component {
    static defaultProps = {
        goodsRelationEditLoading: false
    };
    state = {
        goodsList: [],
        info: {}
    };

    componentDidMount() {
        this.initInfo();
    }

    initInfo() {
        const { location: { query: { id } }, dispatch } = this.props;
        const { setFieldsValue } = this.props.form;
        dispatch({
            type: "goodsRelation/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    const values = response.result.info;
                    this.setState({
                        info: values,
                        goodsList: values.goods
                    }, () => {
                        setFieldsValue({
                            title: values.title
                        });
                    });
                } else {
                    message.warning("模板详情获取失败");
                }
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let params = {
                    id: this.state.info.id,
                    title: values.title,
                    goods_ids: this.state.goodsList.map((item) => {
                        return item.id;
                    })
                };
                dispatch({
                    type: "goodsRelation/edit",
                    payload: params,
                    callback: (e) => {
                        if (e.code === 0) {
                            message.success("已保存");
                            router.goBack();
                        } else {
                            message.warn(e.msg);
                        }
                    }
                });
            } else {
                message.warn("请输入正确的信息");
            }
        });
    };

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { goodsList } = this.state;
        const goodsColumns = [
            {
                title: "ID",
                dataIndex: "id",
                width: 50
            },
            {
                title: "商品图",
                dataIndex: "img",
                width: 50,
                render: (e) => (
                    <Image
                        type='goods'
                        src={e}
                        style={{ width: 50, height: 50 }}
                    />
                )
            }, {
                title: "商品标题",
                dataIndex: "title",
                width: 230
            }, {
                title: "价格（元）",
                dataIndex: "price",
                width: 120
            }, {
                title: "销量",
                dataIndex: "base_sale_num",
                width: 80
            }, {
                title: "库存",
                dataIndex: "stock",
                width: 80
            }, {
                title: "操作",
                key: "operation",
                width: 100,
                render: (text, record) => <a
                    onClick={async () => {
                        const { goodsList } = this.state;
                        let _goodsList = [...goodsList];
                        const index = _goodsList.findIndex((e) => e.id === record.id);
                        _goodsList.splice(index, 1);
                        this.setState({
                            goodsList: _goodsList
                        });
                    }}
                >移除</a>
            }
        ];

        return <PageHeaderWrapper hiddenBreadcrumb={true} policy={"coupon/edit"}>
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label='模板名称'
                    >
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "请输入模板名称" }]
                        })(
                            <Input
                                placeholder="如：xxx手机关联商品"
                                style={{ width: 230 }}
                            />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="关联商品"
                    >
                        <SelectGoods
                            ref={(e) => {
                                this.selectGoods = e;
                            }}
                            multiSelect={true}
                            onOk={(state) => {
                                const { goodsList } = this.state;
                                let _goodsList = [...goodsList];
                                state.checkedData.map((goods) => {
                                    _goodsList.push(goods);
                                });
                                this.setState({
                                    goodsList: Arr.unique(_goodsList)
                                });
                            }}
                        />
                        <a onClick={() => {
                            this.selectGoods.show();
                            this.selectGoods.setDisabledIds(goodsList.map((item) => {
                                return item.id;
                            }));
                        }}>选择商品</a>

                        {goodsList.length > 0 && <Table
                            dataSource={goodsList}
                            columns={goodsColumns}
                            rowKey={record => record.id}
                            pagination={false}
                        />}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保 存</Button>
                    </FormItem>

                </Form>
            </Card>
        </PageHeaderWrapper>;
    }

}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 3
        }
    }
};

