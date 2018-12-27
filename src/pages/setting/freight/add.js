import React, { Component } from "react";
import { Input, Radio, Button, Modal, Form, Tree, message, Card } from "antd";
import { Link } from "react-router-dom";
import styles from "@/styles/freight/freightAdd.css";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

import FreightAddTable from "@/components/setting/freightAddTable/index";
import { connect } from "dva";
import { View, ScrollView } from "@/components/flexView";

import { FreightApi } from "@/services/freight";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
@connect(({ app: { setting: { areaList } } }) => ({
    areaList
}))
@Form.create()
export default class Add extends Component {
    state = {
        payType: 1,
        visible: false,
        expandedKeys: [],
        autoExpandParent: true,

        checkedKeys: [],
        selectedKeys: [],

        expandedKeys2: [],
        autoExpandParent2: true,
        checkedKeys2: [],
        selectedKeys2: [],

        checkedAreaKeys: [],

        tableDataSource: [],

        editAreaTableIndex: null,

        loading: false
    };

    componentDidMount() {
        const {
            areaList,
            dispatch
        } = this.props;

        if (!areaList.length) {
            dispatch(areaList());
        }
    }

    changeTableDataSource = (index, key, value) => {
        const {
            tableDataSource
        } = this.state;
        const newArray = [...tableDataSource];
        newArray[index][key] = value;
        this.setState({
            tableDataSource: newArray
        });
    };
    changeAreaListModal = (e) => {
        this.setState({
            visible: e,
            checkedAreaKeys: []
        });
    };
// : IdsType
    editAreaList = (e, index) => {
        this.setState({
            visible: true,
            checkedAreaKeys: e,
            editAreaTableIndex: index
        });
    };
    delAreaList = (index) => {
        const {
            tableDataSource
        } = this.state;
        const newArray = [...tableDataSource];
        newArray.splice(index, 1);
        this.setState({
            tableDataSource: newArray
        });
    };
// : AreaType
    handleOk = (selectTreeNodesData) => {
        const {
            tableDataSource,
            checkedAreaKeys,
            editAreaTableIndex
        } = this.state;
        const {
            areaList
        } = this.props;
        if (editAreaTableIndex !== null) {
            const newArray = [...tableDataSource];
            newArray[editAreaTableIndex].ids = this.getTreeNodesData(areaList, checkedAreaKeys);
            this.setState({
                tableDataSource: newArray,
                checkedAreaKeys: [],
                editAreaTableIndex: null
            });
        } else if (selectTreeNodesData.length > 0) {
            this.setState({
                tableDataSource: [...tableDataSource, {
                    first_amount: 1,
                    first_fee: 0.00,
                    additional_amount: 1,
                    additional_fee: 0.00,
                    ids: this.getTreeNodesData(areaList, checkedAreaKeys)
                }],
                checkedAreaKeys: []
            });
        }
        this.changeAreaListModal(false);
    };
    // data: AreaType, checkedKeys: IdsType
    getTreeNodesData = (data, checkedKeys) => {
        let newArray = [];
        data.map(item => {
            if (item._child.length) {
                let childItem = this.getChildIds(item);
                let checkedItem = this.getChildInCludes(childItem, checkedKeys);
                if (checkedItem.length === childItem.length) {
                    newArray.push(item.id);
                } else if (checkedItem.length) {
                    return item._child.map((itemB) => {
                        if (itemB._child.length) {
                            let childItem = this.getChildIds(itemB);
                            let checkedItem = this.getChildInCludes(childItem, checkedKeys);
                            if (checkedItem.length === childItem.length) {
                                newArray.push(itemB.id);
                            } else {
                                itemB._child.map((itemC) => {
                                    if (checkedKeys.includes(`${itemC.id}`)) {
                                        newArray.push(itemC.id);
                                    }
                                });
                            }
                        } else {
                            if (checkedKeys.includes(`${itemB.id}`)) {
                                newArray.push(itemB.id);
                            }
                        }
                    });
                } else {
                    return null;
                }
            } else {
                if (checkedKeys.includes(`${item.id}`)) {
                    newArray.push(item.id);
                }
            }
        });
        return newArray.map((e) => `${e}`);
    };
    handleCancel = () => {
        this.changeAreaListModal(false);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const {
            validateFieldsAndScroll,
            resetFields
        } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                }, async () => {
                    const e = await Fetch.fetch({
                        api: FreightApi.add,
                        params: values
                    });
                    if (e.code === 0) {
                        resetFields();
                        message.success("添加成功");
                        router.push("/setting/deliver/freight");
                        this.setState({
                            tableDataSource: [],
                            loading: false
                        });
                    } else {
                        this.setState({ loading: false });
                        message.warn(e.msg);
                    }
                });
            }
        });
    };

    render() {
        const {
            form,
            areaList
        } = this.props;
        const {
            visible,
            checkedKeys,
            checkedAreaKeys,
            checkedKeys2,
            tableDataSource,
            loading,
            payType
        } = this.state;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 22 }
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
                    offset: 2
                }
            }
        };
        const selectTreeNodesData = this.getSelectTreeNodesData(areaList, checkedAreaKeys);
        const filterOutAreaList = this.filterAreaList(areaList);
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label='模板名称'
                        >
                            {getFieldDecorator("name", {
                                rules: [{
                                    required: true,
                                    message: "请输入模板名称!"
                                }]
                            })(
                                <Input placeholder="请输入模板名称" style={{ width: 400 }} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='计费方式'
                        >
                            {getFieldDecorator("pay_type", {
                                initialValue: payType,
                                rules: [{
                                    required: true,
                                    message: "请选择计费方式!"
                                }]
                            })(
                                <RadioGroup onChange={(e) => {
                                    this.setState({
                                        payType: e.target.value
                                    });
                                }}>
                                    <Radio value={1}>按件数</Radio>
                                    <Radio value={2}>按重量</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='可配送区域'
                        >
                            {getFieldDecorator("areas", {
                                rules: [{
                                    message: "请选择配送区域!",
                                    required: true
                                }]
                            })(
                                <FreightAddTable
                                    changeAreaListModal={this.changeAreaListModal}
                                    dataSource={tableDataSource}
                                    areaList={areaList}
                                    getChildIds={this.getChildIds}
                                    getChildInCludes={this.getChildInCludes}
                                    editAreaList={this.editAreaList}
                                    changeTableDataSource={this.changeTableDataSource}
                                    delAreaList={this.delAreaList}
                                    payType={payType}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            {...tailFormItemLayout}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: 20 }}
                                loading={loading}
                            >
                                保存
                            </Button>
                            <Link to={`/setting/deliver/freight`}>
                                <Button>返回</Button>
                            </Link>
                        </FormItem>
                    </Form>
                    <Modal
                        title={"可配送区域"}
                        visible={visible}
                        onOk={() => {
                            this.handleOk(selectTreeNodesData);
                        }}
                        onCancel={this.handleCancel}
                        width={700}
                    >
                        <View className={styles.view1}>
                            <View className={styles.view2}>
                                <View className={styles.view3}>
                                    可选省、市、区
                                </View>
                                <ScrollView
                                    display={"block"}
                                    style={{ height: 500 }}
                                >
                                    <Tree
                                        checkable
                                        onExpand={this.onExpand}
                                        expandedKeys={this.state.expandedKeys}
                                        autoExpandParent={this.state.autoExpandParent}
                                        onCheck={this.onCheck}
                                        checkedKeys={this.state.checkedKeys}
                                        onSelect={this.onSelect}
                                        selectedKeys={this.state.selectedKeys}
                                    >
                                        {this.renderTreeNodes(filterOutAreaList, checkedAreaKeys)}
                                    </Tree>
                                </ScrollView>
                            </View>
                            <View className={styles.view4}>
                                <Button
                                    onClick={() => {
                                        this.setState({
                                            checkedAreaKeys: [...checkedAreaKeys, ...checkedKeys],
                                            checkedKeys: []
                                        });
                                    }}
                                    disabled={checkedKeys.length === 0}
                                >
                                    添加
                                </Button>
                                <Button
                                    onClick={() => {
                                        const newArray = [...checkedAreaKeys];
                                        checkedKeys2.map((e) => {
                                            const index = newArray.findIndex((a) => a === e);
                                            if (index !== -1) {
                                                newArray.splice(index, 1);
                                            } else {
                                                console.log(`不存在的id ${e}`);
                                            }
                                        });
                                        this.setState({
                                            checkedAreaKeys: newArray,
                                            checkedKeys2: []
                                        });
                                    }}
                                    disabled={checkedKeys2.length === 0}
                                    type="danger"
                                    style={{ marginTop: 15 }}
                                >
                                    移除
                                </Button>
                            </View>
                            <View className={styles.view2}>
                                <View className={styles.view3}>
                                    已选省、市、区
                                </View>
                                <ScrollView
                                    display={"block"}
                                    style={{ height: 500 }}
                                >
                                    <Tree
                                        checkable
                                        onExpand={this.onExpand2}
                                        expandedKeys={this.state.expandedKeys2}
                                        autoExpandParent={this.state.autoExpandParent2}
                                        onCheck={this.onCheck2}
                                        checkedKeys={checkedKeys2}
                                        onSelect={this.onSelect2}
                                        selectedKeys={this.state.selectedKeys2}
                                    >
                                        {this.renderTreeNodes2(selectTreeNodesData)}
                                    </Tree>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </Card>
            </PageHeaderWrapper>
        );
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };
    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
    };
    onSelect = (selectedKeys) => {
        this.setState({ selectedKeys });
    };
    // data: AreaType, checkedKeys
    renderTreeNodes = (data, checkedKeys) => {
        const newArray = [];
        data.map(item => {
            if (item._child && item._child.length) {
                const childItem = this.getChildIds(item);
                const checkedItem = this.getChildInCludes(childItem, checkedKeys);
                if (checkedItem.length !== childItem.length) {
                    newArray.push(
                        <TreeNode title={item.name} key={item.id} dataRef={item}>
                            {this.renderTreeNodes(item._child, checkedKeys)}
                        </TreeNode>
                    );
                }
            } else {
                if (!checkedKeys.includes(`${item.id}`)) {
                    newArray.push(<TreeNode key={item.id} title={item.name} />);
                }
            }
        });
        return newArray;
    };
// : IdsType
    onExpand2 = (expandedKeys2) => {
        this.setState({
            expandedKeys2,
            autoExpandParent2: false
        });
    };
    onCheck2 = (checkedKeys2) => {

        this.setState({ checkedKeys2 });
    };
    onSelect2 = (selectedKeys2) => {
        this.setState({ selectedKeys2 });
    };
// : AreaType
    renderTreeNodes2 = (data) => {
        return data.map(item => {
            if (item._child && item._child.length) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes2(item._child)}
                    </TreeNode>
                );
            } else {
                return (<TreeNode key={item.id} title={item.name} />);
            }
        });
    };
    // data: AreaType, checkedKeys: IdsType
    getSelectTreeNodesData = (data, checkedKeys) => {
        const newArray = data.filter((item) => {
            return checkedKeys.includes(`${item.id}`) || this.isChildInCludes(this.getChildIds(item), checkedKeys);
        });
        const newArray2 = newArray.map((e) => {
            const a = e._child.filter((item) => {
                return checkedKeys.includes(`${item.id}`) || this.isChildInCludes(this.getChildIds(item), checkedKeys);
            });
            return { ...e, _child: a };
        });
        return newArray2.map((e) => {
            const a = e._child.map((c) => {
                const d = c._child.filter((item) => {
                    return checkedKeys.includes(`${item.id}`);
                });
                return {
                    ...c,
                    _child: d
                };
            });
            return {
                ...e,
                _child: a
            };
        });
    };
    // itemArray: IdsType, selectArray: IdsType
    getChildInCludes = (itemArray, selectArray) => {
        return itemArray.filter((e) => selectArray.includes(e));
    };
    isChildInCludes = (ary = [], keyArray = []) => {
        const e = keyArray.findIndex((e) => {
            return ary.includes(e);
        });
        if (e === -1) {
            return false;
        } else {
            return true;
        }
    };
    getChildIds = (e = {
        id: number,
        name: string,
        _child: []
    }) => {
        const newArray = [];
        const newFunc = (c) => {
            if (c._child && c._child.length) {
                c._child.map((a) => {
                    newArray.push(`${a.id}`);
                    newFunc(a);
                });
            }
        };
        newFunc(e);
        return newArray;
    };
    // AreaType
    filterAreaList = (areaList = []) => {
        const {
            tableDataSource
        } = this.state;
        const checkedKeys = [];
        tableDataSource.map((e) => {
            e.ids.map((id) => {
                checkedKeys.push(id);
            });
        });
        const getItemIds = (e) => {
            return e.map((item) => (`${item.id}`));
        };
        const newArray = areaList.filter((item) => {
            if (item._child.length) {
                if (checkedKeys.includes(`${item.id}`)) {
                    return false;
                } else {
                    return this.getChildInCludes(getItemIds(item._child), checkedKeys).length !== item._child.length;
                }
            } else {
                return !checkedKeys.includes(`${item.id}`);
            }
        });
        const newArray2 = newArray.map((e) => {
            const a = e._child.filter((item) => {
                if (item._child.length) {
                    if (checkedKeys.includes(`${item.id}`)) {
                        return false;
                    } else {
                        return this.getChildInCludes(getItemIds(item._child), checkedKeys).length !== item._child.length;
                    }
                } else {
                    return !checkedKeys.includes(`${item.id}`);
                }
            });
            return { ...e, _child: a };
        });
        return newArray2.map((e) => {
            const a = e._child.map((c) => {
                const d = c._child.filter((item) => {
                    return !checkedKeys.includes(`${item.id}`);
                });
                return {
                    ...c,
                    _child: d
                };
            });
            return {
                ...e,
                _child: a
            };
        });
    };
}
