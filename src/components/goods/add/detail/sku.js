import React, { Component } from 'react';
import { Form, InputNumber, Table, Input } from "antd";
import { View } from "@/components/flexView";
import styles from "./spec.css";

const FormItem = Form.Item;

class GoodsAddSpec extends Component {
    state = {
        skus: [],
    }

    renderColumns({ text, record, index, dataIndex }) {
        const { onChange, skus } = this.props
        return (
            <InputNumber
                value={text}
                onChange={(e) => {
                    const _skus = [...skus]
                    _skus[index][dataIndex] = e
                    onChange(_skus)
                }}
            />
        )
    }

    render() {
        const { skus, specs } = this.props;
        let dataSource = []
        skus.map((sku, i) => {
            const newObj = {}
            sku.spec.map((spec) => {
                newObj[`${spec.id}`] = spec.value_name
            })
            dataSource.push({
                ...newObj,
                key: i,
                price: sku.price,
                stock: sku.stock,
                code: sku.code,
                weight: null,
            })
        })
        let long = specs.length + 2
        let columns = new Array(long)
        // 过滤掉未选择型号值的项
        let _specs = specs.filter((spec) => {
            return spec.values.length > 0
        })
        _specs.map((spec, i) => {
            let rowSpanNum = 1
            if (i === 1) {
                rowSpanNum = _specs[0].values.length
            } else if (i === 2) {
                rowSpanNum = _specs[0].values.length * _specs[1].values.length
            }
            columns[i] = {
                title: spec.name,
                dataIndex: `${spec.id}`,
                render:
                    i > 0 ?
                        (value, row, index) => {
                            const obj = {
                                children: value,
                                props: {},
                            };
                            if (index % rowSpanNum === 0 || index === 0) {
                                obj.props.rowSpan = rowSpanNum;
                            } else {
                                obj.props.colSpan = 0;
                            }
                            return obj
                        } :
                        (value) => {
                            return {
                                children: value,
                                props: {},
                            };
                        },
            }
            columns[long - 2] = {
                title: '价格',
                dataIndex: 'price',
                render: (text, record, index) => this.renderColumns({
                    text,
                    record,
                    index,
                    dataIndex: 'price',
                    spec
                }),
                width: 100,
            }
            columns[long - 1] = {
                title: '库存',
                dataIndex: 'stock',
                render: (text, record, index) => this.renderColumns({
                    text,
                    record,
                    index,
                    dataIndex: 'stock',
                    spec
                }),
                width: 100,
            }
            columns[long] = {
                title: '商品编号',
                dataIndex: 'code',
                render: (text, record, index) => this.renderColumns({
                    text,
                    record,
                    index,
                    dataIndex: 'code',
                    spec
                }),
                width: 100,
            }
        })

        const footer = () => <View className={styles.tableFooter}>
            <span>批量修改</span>
            <View className={styles.tableFooterRight}>
                <FormItem
                    className={styles.tableBottom}
                    hasFeedback
                >
                    <InputNumber
                        precision={2}
                        min={0}
                        onChange={(e) => {
                            this.allEdit({ number: e, dataIndex: 'price', dataSource: skus })
                        }}
                    />
                </FormItem>
                <FormItem
                    className={styles.tableBottom}
                    hasFeedback
                >
                    <InputNumber
                        precision={0}
                        min={0}
                        onChange={(e) => {
                            this.allEdit({ number: e, dataIndex: 'stock', dataSource: skus })
                        }}
                    />
                </FormItem>
                <FormItem
                    className={styles.tableBottom}
                    hasFeedback
                >
                    <Input
                        onChange={(e) => {
                            this.allEdit({ number: e.target.value, dataIndex: 'code', dataSource: skus })
                        }}
                    />

                </FormItem>
            </View>
        </View>
        return (
            <Table
                bordered
                footer={skus.length > 0 ? footer : () => {
                }}
                pagination={false}
                dataSource={dataSource}
                columns={columns}
                style={{
                    marginTop: 24
                }}
            />
        )
    }

    allEdit({ number, dataIndex, dataSource }: { number: Object, dataIndex: string, dataSource: SkusType }) {
        const { onChange } = this.props
        const _dataSource = dataSource.map((item) => {
            return {
                ...item,
                [dataIndex]: number
            }
        })
        onChange(_dataSource)
    }
}
export default GoodsAddSpec
