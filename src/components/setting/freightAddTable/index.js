import React, { Component } from "react";
import { Table, Button, InputNumber } from "antd";
import styles from './index.css'
//
// type IdsType = Array<string>
//
// type AreaType = Array<{
//     id: number,
//     name: string,
//     _child: Array<{
//         id: number,
//         name: string,
//         _child: Array<any>
//     }>
// }>
// type Props = {
//     onChange?: Function,
//     areaList: AreaType,
//     dataSource: Array<{
//         additional_amount: number,
//         additional_fee: number,
//         first_amount: number,
//         first_fee: number,
//         ids: Array<string>
//     }>,
//     payType: 1 | 2,
//     changeAreaListModal: Function,
//     changeTableDataSource: Function,
//     delAreaList: Function,
//     editAreaList: Function,
//     getChildIds: Function,
//     getChildInCludes: Function,
// }
// type State = {
//     payType: number,
//     visible: boolean,
//     checkedAreaKeys: IdsType,
//     expandedKeys,
//     checkedKeys: IdsType,
//     editAreaTableIndex: number | null,
//     loading: boolean,
//     autoExpandParent: boolean,
//     autoExpandParent2: boolean,
//     expandedKeys2: IdsType,
//     checkedKeys2: IdsType,
//     selectedKeys2: IdsType,
//     selectedKeys: IdsType,
//     tableDataSource: Array<{
//         additional_amount: number,
//         additional_fee: number,
//         first_amount: number,
//         first_fee: number,
//         ids: Array<string>
//     }>
// }

export default class FreightAddTable extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.dataSource !== nextProps.dataSource) {
            const { onChange } = this.props
            if (typeof onChange === 'function') {
                onChange(nextProps.dataSource.map((e) => {
                    return {
                        ...e,
                        area_ids: e.ids
                    }
                }));
            }
        }
    }

    render() {
        const {
            changeAreaListModal,
            dataSource,
            areaList,
            editAreaList,
            delAreaList,
            getChildIds,
            changeTableDataSource,
            payType
        } = this.props
        const firstAmountPrecision = payType === 1 ? 0 : 1
        const unit = payType === 1 ? '件 (个)' : '重 (KG)'
        const columns = [
            {
                title: "可配送区域",
                dataIndex: "ids",
                className: `${styles.deliverableArea}`,
                render: (e) => {
                    const newArray = this.getTreeNodesData(areaList, e)
                    return <span>
                        {
                            newArray.map((a, i) => {
                                if (!a.child) {
                                    return <span style={{ color: '#000' }}
                                                 key={a.id}>{i === 0 ? null : '、'}{a.name}</span>
                                } else {
                                    return (
                                        <span style={{ color: '#000' }} key={a.id}>
                                            {i === 0 ? null : '、'}{a.name}[
                                            {a.child.map((b, j) => {
                                                if (!b.child) {
                                                    return <span style={{ color: '#555' }}
                                                                 key={b.id}>{j === 0 ? null : '、'}{b.name}</span>
                                                } else {
                                                    return (
                                                        <span style={{ color: '#555' }} key={b.id}>
                                                             {j === 0 ? null : '、'}
                                                            {b.name}
                                                            ({b.child.map((c, z) => (<span style={{ color: '#999' }}
                                                                                           key={c.id}>{z === 0 ? null : '、'}{c.name}</span>))})
                                                        </span>
                                                    )
                                                }
                                            })}
                                            ]
                                        </span>
                                    )
                                }
                            })
                        }
                    </span>
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
                                let newArray = []
                                record.ids.map((e) => {
                                    areaList.map((item) => {
                                        if (e === `${item.id}`) {
                                            let childIds = getChildIds(item)
                                            return newArray = [...newArray, e, ...childIds]
                                        } else {
                                            item._child.map((itemB) => {
                                                if (e === `${itemB.id}`) {
                                                    let childIds = getChildIds(itemB)
                                                    return newArray = [...newArray, e, ...childIds]
                                                } else {
                                                    itemB._child.map((itemC) => {
                                                        if (e === `${itemC.id}`) {
                                                            return newArray = [...newArray, e]
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                })
                                editAreaList(newArray, index)
                            }}
                        >
                            编辑
                        </a>
                        <a
                            onClick={() => {
                                delAreaList(index)
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
                            changeTableDataSource(index, 'first_amount', e)
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
                            changeTableDataSource(index, 'first_fee', e)
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
                            changeTableDataSource(index, 'additional_amount', e)
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
                            changeTableDataSource(index, 'additional_fee', e)
                        }}
                        min={0}
                    />
                )
            },
        ]

        return (
            <Table
                bordered
                columns={columns}
                simple
                rowKey={(record, index) => {
                    return `${index}`
                }}
                dataSource={dataSource}
                pagination={false}
                footer={() => {
                    return (
                        <Button
                            type="dashed"
                            icon='plus'
                            onClick={() => {
                                changeAreaListModal(true)
                            }}
                        >
                            添加可配送区域和运费
                        </Button>
                    )
                }}
            />
        );
    }

    getTreeNodesData = (data: AreaType, checkedKeys: IdsType) => {
        const {
            getChildIds,
            getChildInCludes,
        } = this.props

        let newArray = []
        data.map(item => {
            if (item._child.length) {
                if (checkedKeys.includes(`${item.id}`)) {
                    newArray.push({
                        name: item.name,
                        id: item.id
                    })
                } else {
                    let childItem = getChildIds(item)
                    let checkedItem = getChildInCludes(childItem, checkedKeys)
                    if (checkedItem.length > 0) {
                        let newArrayB = []
                        item._child.map((itemB) => {
                            let childItem = getChildIds(itemB)
                            let checkedItem = getChildInCludes(childItem, checkedKeys)
                            if (checkedKeys.includes(`${itemB.id}`)) {
                                newArrayB.push({
                                    name: itemB.name,
                                    id: itemB.id
                                })
                            } else if (checkedItem.length > 0) {
                                let newArrayC = []
                                itemB._child.map((itemC) => {
                                    if (checkedKeys.includes(`${itemC.id}`)) {
                                        newArrayC.push({
                                            name: itemC.name,
                                            id: itemC.id,
                                        })
                                    }
                                })
                                newArrayB.push({
                                    name: itemB.name,
                                    id: itemB.id,
                                    child: newArrayC
                                })
                            }
                        })
                        newArray.push({
                            name: item.name,
                            id: item.id,
                            child: newArrayB
                        })
                    }
                }
            } else {
                if (checkedKeys.includes(`${item.id}`)) {
                    newArray.push({
                        name: item.name,
                        id: item.id,
                    })
                }
            }
        })
        return newArray
    }
}
