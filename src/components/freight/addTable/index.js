import React, { Component } from "react";
import { Table, Button, InputNumber } from "antd";
import styles from "./index.css";

export default class FreightAddTable extends Component {
    static defaultProps = {
        changeAreaListModal: () => {},
        dataSource:[],
        areaListTree:[],
        editAreaListTree: () => {},
        delAreaListTree: () => {},
        getAllChildrenIds: () => {},
        changeDataSource: () => {},
        payType:1,
        onChange: () => {}
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.dataSource !== nextProps.dataSource) {
            const { onChange } = this.props;
            onChange(nextProps.dataSource.map((e) => {
                return {
                    ...e,
                    area_ids: e.ids
                };
            }));
        }
    }

    render() {
        const {
            changeAreaListModal,
            dataSource,
            areaListTree,
            editAreaListTree,
            delAreaListTree,
            getAllChildrenIds,
            changeDataSource,
            payType
        } = this.props;
        const firstAmountPrecision = payType === 1 ? 0 : 1;
        const unit = payType === 1 ? "件 (个)" : "重 (KG)";
        const columns = [
            {
                title: "可配送区域",
                dataIndex: "ids",
                className: `${styles.deliverableArea}`,
                render: (e) => {
                    const newArray = this.getTreeNodesData(areaListTree, e);
                    return <span>
                        {
                            newArray.map((a, i) => {
                                if (!a.child) {
                                    return <span style={{ color: "#000" }}
                                                 key={a.id}>{i === 0 ? null : "、"}{a.name}</span>;
                                } else {
                                    return (
                                        <span style={{ color: "#000" }} key={a.id}>
                                            {i === 0 ? null : "、"}{a.name}[
                                            {a.child.map((b, j) => {
                                                if (!b.child) {
                                                    return <span style={{ color: "#555" }}
                                                                 key={b.id}>{j === 0 ? null : "、"}{b.name}</span>;
                                                } else {
                                                    return (
                                                        <span style={{ color: "#555" }} key={b.id}>
                                                             {j === 0 ? null : "、"}
                                                            {b.name}
                                                            ({b.child.map((c, z) => (<span style={{ color: "#999" }}
                                                                                           key={c.id}>{z === 0 ? null : "、"}{c.name}</span>))})
                                                        </span>
                                                    );
                                                }
                                            })}
                                            ]
                                        </span>
                                    );
                                }
                            })
                        }
                    </span>;
                }
            },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record, index) => (
                    <span>
                        <a
                            style={{ marginRight: 10 }}
                            onClick={() => {
                                let newArray = [];
                                record.ids.map((e) => {
                                    areaListTree.map((item) => {
                                        if (e === `${item.id}`) {
                                            let childIds = getAllChildrenIds(item);
                                            return newArray = [...newArray, e, ...childIds];
                                        } else {
                                            item.children.map((itemB) => {
                                                if (e === `${itemB.id}`) {
                                                    let childIds = getAllChildrenIds(itemB);
                                                    return newArray = [...newArray, e, ...childIds];
                                                } else {
                                                    itemB.children.map((itemC) => {
                                                        if (e === `${itemC.id}`) {
                                                            return newArray = [...newArray, e];
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                });
                                editAreaListTree(newArray, index);
                            }}
                        >
                            编辑
                        </a>
                        <a
                            onClick={() => {
                                delAreaListTree(index);
                            }}
                        >删除</a>
                    </span>
                )
            },
            {
                title: `首${unit}`,
                dataIndex: "first_amount",
                render: (e, record, index) => (
                    <InputNumber
                        value={e}
                        precision={firstAmountPrecision}
                        onChange={(e) => {
                            changeDataSource(index, "first_amount", e);
                        }}
                        min={0}
                    />
                )
            },
            {
                title: "运费 (元)",
                dataIndex: "first_fee",
                render: (e, record, index) => (
                    <InputNumber
                        value={e}
                        precision={2}
                        onChange={(e) => {
                            changeDataSource(index, "first_fee", e);
                        }}
                        min={0}
                    />
                )
            },
            {
                title: `续${unit}`,
                dataIndex: "additional_amount",
                render: (e, record, index) => (
                    <InputNumber
                        value={e}
                        precision={firstAmountPrecision}
                        onChange={(e) => {
                            changeDataSource(index, "additional_amount", e);
                        }}
                        min={0}
                    />
                )
            },
            {
                title: "续费 (元)",
                dataIndex: "additional_fee",
                render: (e, record, index) => (
                    <InputNumber
                        value={e}
                        precision={2}
                        onChange={(e) => {
                            changeDataSource(index, "additional_fee", e);
                        }}
                        min={0}
                    />
                )
            }
        ];

        return (
            <Table
                bordered
                columns={columns}
                simple
                rowKey={(record, index) => {
                    return `${index}`;
                }}
                dataSource={dataSource}
                pagination={false}
                footer={() => {
                    return (
                        <Button
                            type="dashed"
                            icon='plus'
                            onClick={() => {
                                changeAreaListModal(true);
                            }}
                        >
                            添加可配送区域和运费
                        </Button>
                    );
                }}
            />
        );
    }

    getTreeNodesData = (areaListTree, checkedKeys) => {
        const { getAllChildrenIds, getIncludeIds } = this.props;
        let newArray = [];
        areaListTree.map(item => {
            if (item.children.length) {
                if (checkedKeys.includes(`${item.id}`)) {
                    newArray.push({
                        name: item.name,
                        id: item.id
                    });
                } else {
                    let childItem = getAllChildrenIds(item);
                    let checkedItem = getIncludeIds(childItem, checkedKeys);
                    if (checkedItem.length > 0) {
                        let newArrayB = [];
                        item.children.map((itemB) => {
                            let childItem = getAllChildrenIds(itemB);
                            let checkedItem = getIncludeIds(childItem, checkedKeys);
                            if (checkedKeys.includes(`${itemB.id}`)) {
                                newArrayB.push({
                                    name: itemB.name,
                                    id: itemB.id
                                });
                            } else if (checkedItem.length > 0) {
                                let newArrayC = [];
                                itemB.children.map((itemC) => {
                                    if (checkedKeys.includes(`${itemC.id}`)) {
                                        newArrayC.push({
                                            name: itemC.name,
                                            id: itemC.id
                                        });
                                    }
                                });
                                newArrayB.push({
                                    name: itemB.name,
                                    id: itemB.id,
                                    child: newArrayC
                                });
                            }
                        });
                        newArray.push({
                            name: item.name,
                            id: item.id,
                            child: newArrayB
                        });
                    }
                }
            } else {
                if (checkedKeys.includes(`${item.id}`)) {
                    newArray.push({
                        name: item.name,
                        id: item.id
                    });
                }
            }
        });
        return newArray;
    };
}
