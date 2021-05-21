import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Input, Button, Modal,  Tree, message, Card, Spin } from "antd";
import styles from "@/styles/freight/freightAdd.css";
import FreightAddTable from "@/pages/setting/freight/components/addTable/index";
import { connect } from "umi";
import Arr from "@/utils/array";
import { View, ScrollView } from "@/components/flexView";
import { history as router } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

@Form.create()
@connect(({ area, freight, loading }) => ({
    areaList: area.list.result.list,
    freightInfo: freight.info.result,
    areaListLoading: loading.effects["area/list"],
    freightAddLoading: loading.effects["freight/add"],
    freightInfoLoading: loading.effects["freight/info"]
}))
class FreightAdd extends Component {
    static defaultProps = {
        areaList: [],
        areaListLoading: true,
        freightAddLoading: false
    };
    state = {
        info: {},
        areaListTree: [],
        payType: 1,
        visible: false,
        expandedKeys: [],
        autoExpandParent: true,

        checkedKeys: [],
        selectedKeys: [],

        rightExpandedKeys: [],
        rightAutoExpandParent: true,
        rightCheckedKeys: [],
        rightSelectedKeys: [],

        checkedAreaKeys: [],

        correctIds: [],

        editAreaTableIndex: null

    };

    componentDidMount() {
        const { location: { query: { id } }, dispatch } = this.props;
        dispatch({
            type: "freight/info",
            payload: { id },
            callback: (e) => {
                if (e.code === 0) {
                    const { info } = e.result;
                    this.setState({
                        info,
                        correctIds: info.areas,
                        payType: info.pay_type
                    });
                } else {
                    message.error(e.msg);
                    router.goBack;
                }
                dispatch({
                    type: "area/list",
                    callback: (response) => {
                        this.setState({
                            areaListTree: Arr.toTreeFillChildren(response.result.list)
                        });
                    }
                });

            }
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { location: { query: { id } }, dispatch } = this.props;
                dispatch({
                    type: "freight/edit",
                    payload: Object.assign(values, { id }),
                    callback: (e) => {
                        if (e.code === 0) {
                            message.success("保存成功");
                            router.goBack();
                        } else {
                            message.warn(e.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { form: { getFieldDecorator }, freightAddLoading, freightInfoLoading } = this.props;
        const { visible, checkedKeys, checkedAreaKeys, rightCheckedKeys, correctIds, payType, areaListTree, info } = this.state;
        const selectTreeNodesData = this.getSelectTreeNodesData(areaListTree, checkedAreaKeys);
        const filterOutAreaList = this.filterAreaList(areaListTree);
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"freight/edit"}>
                <Card bordered={false}>
                    <Spin size="large" spinning={freightInfoLoading}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label='模板名称'
                            >
                                {getFieldDecorator("name", {
                                    initialValue: info.name,
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
                                <span>{info.pay_type === 1 ? "按件数" : "按重量"}</span>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label='可配送区域'
                            >
                                {getFieldDecorator("areas", {
                                    initialValue: info.areas,
                                    rules: [{
                                        message: "请选择配送区域!",
                                        required: true
                                    }]
                                })(
                                    <FreightAddTable
                                        changeAreaListModal={this.changeAreaListModal}
                                        dataSource={correctIds}
                                        areaListTree={areaListTree}
                                        getAllChildrenIds={this.getAllChildrenIds}
                                        getIncludeIds={this.getIncludeIds}
                                        editAreaListTree={this.editAreaListTree}
                                        changeDataSource={this.changeDataSource}
                                        delAreaListTree={this.delAreaListTree}
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
                                    loading={freightAddLoading}
                                >
                                    保存
                                </Button>
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
                                            rightCheckedKeys.map((e) => {
                                                const index = newArray.findIndex((a) => a === e);
                                                if (index !== -1) {
                                                    newArray.splice(index, 1);
                                                } else {
                                                    console.log(`不存在的id ${e}`);
                                                }
                                            });
                                            this.setState({
                                                checkedAreaKeys: newArray,
                                                rightCheckedKeys: []
                                            });
                                        }}
                                        disabled={rightCheckedKeys.length === 0}
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
                                            onExpand={this.onRightExpand}
                                            expandedKeys={this.state.rightExpandedKeys}
                                            autoExpandParent={this.state.rightAutoExpandParent}
                                            onCheck={this.onRightClick}
                                            checkedKeys={rightCheckedKeys}
                                            onSelect={this.onRightSelect}
                                            selectedKeys={this.state.rightSelectedKeys}
                                        >
                                            {this.renderRightTreeNodes(selectTreeNodesData)}
                                        </Tree>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }

    changeDataSource = (index, key, value) => {
        const { correctIds } = this.state;
        const _correctIds = [...correctIds];
        _correctIds[index][key] = value;
        this.setState({ correctIds: _correctIds });
    };
    changeAreaListModal = (e) => {
        this.setState({
            visible: e,
            checkedAreaKeys: []
        });
    };
    editAreaListTree = (e, index) => {
        this.setState({
            visible: true,
            checkedAreaKeys: e,
            editAreaTableIndex: index
        });
    };
    delAreaListTree = (index) => {
        const { correctIds } = this.state;
        const _correctIds = [...correctIds];
        _correctIds.splice(index, 1);
        this.setState({ correctIds: _correctIds });
    };
    handleOk = (selectTreeNodesData) => {
        const { correctIds, checkedAreaKeys, editAreaTableIndex, areaListTree } = this.state;
        if (editAreaTableIndex !== null) {
            const _correctIds = [...correctIds];
            _correctIds[editAreaTableIndex].ids = this.correctCheckedAreaIds(areaListTree, checkedAreaKeys);
            this.setState({
                correctIds: _correctIds,
                checkedAreaKeys: [],
                editAreaTableIndex: null
            });
        } else if (selectTreeNodesData.length > 0) {
            this.setState({
                correctIds: [...correctIds, {
                    first_amount: 1,
                    first_fee: 0.00,
                    additional_amount: 1,
                    additional_fee: 0.00,
                    ids: this.correctCheckedAreaIds(areaListTree, checkedAreaKeys)
                }],
                checkedAreaKeys: []
            });
        }
        this.changeAreaListModal(false);
    };
    /**
     * 纠正选择的地区id集合，如果父级包含了所有子集，返回父级id
     * @param {[]} areaListTree
     * @param {string[]} checkedKeys
     * @returns {string[]}
     */
    correctCheckedAreaIds = (areaListTree, checkedKeys) => {
        let ids = [];
        areaListTree.map(item => {
            if (item.children.length) {
                let allIds = this.getAllChildrenIds(item);
                let checkedIds = this.getIncludeIds(allIds, checkedKeys);
                // 省级
                if (checkedIds.length === allIds.length) {
                    ids.push(`${item.id}`);
                } else if (checkedIds.length) {
                    // 市级
                    return item.children.map((sub) => {
                        if (sub.children.length) {
                            let allIds = this.getAllChildrenIds(sub);
                            let checkedIds = this.getIncludeIds(allIds, checkedKeys);
                            if (checkedIds.length === allIds.length) {
                                ids.push(`${sub.id}`);
                            } else {
                                // 区县级
                                sub.children.map((area) => {
                                    if (checkedKeys.includes(`${area.id}`)) {
                                        ids.push(`${area.id}`);
                                    }
                                });
                            }
                        } else {
                            if (checkedKeys.includes(`${sub.id}`)) {
                                ids.push(`${sub.id}`);
                            }
                        }
                    });
                } else {
                    return null;
                }
            } else {
                if (checkedKeys.includes(`${item.id}`)) {
                    ids.push(`${item.id}`);
                }
            }
        });
        return ids;
    };
    handleCancel = () => {
        this.changeAreaListModal(false);
    };
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
    renderTreeNodes = (areaListTree, checkedKeys) => {
        const newArray = [];
        areaListTree.map(item => {
            if (item.children && item.children.length) {
                const childItem = this.getAllChildrenIds(item);
                const checkedItem = this.getIncludeIds(childItem, checkedKeys);
                if (checkedItem.length !== childItem.length) {
                    newArray.push(
                        <TreeNode title={item.name} key={item.id} dataRef={item}>
                            {this.renderTreeNodes(item.children, checkedKeys)}
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
    onRightExpand = (rightExpandedKeys) => {
        this.setState({
            rightExpandedKeys,
            rightAutoExpandParent: false
        });
    };
    onRightClick = (rightCheckedKeys) => {

        this.setState({ rightCheckedKeys });
    };
    onRightSelect = (rightSelectedKeys) => {
        this.setState({ rightSelectedKeys });
    };
    renderRightTreeNodes = (data) => {
        return data.map(item => {
            if (item.children.length > 0) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderRightTreeNodes(item.children)}
                    </TreeNode>
                );
            } else {
                return (<TreeNode key={item.id} title={item.name} />);
            }
        });
    };
    getSelectTreeNodesData = (areasListTree, checkedKeys) => {
        const newArray = areasListTree.filter((item) => {
            return checkedKeys.includes(`${item.id}`) || this.isChildrenInclude(this.getAllChildrenIds(item), checkedKeys);
        });
        const newArray2 = newArray.map((e) => {
            const a = e.children.filter((item) => {
                return checkedKeys.includes(`${item.id}`) || this.isChildrenInclude(this.getAllChildrenIds(item), checkedKeys);
            });
            return { ...e, children: a };
        });
        return newArray2.map((e) => {
            const a = e.children.map((c) => {
                const d = c.children.filter((item) => {
                    return checkedKeys.includes(`${item.id}`);
                });
                return {
                    ...c,
                    children: d
                };
            });
            return {
                ...e,
                children: a
            };
        });
    };
    getIncludeIds = (areaIds, selectAreaIds) => {
        return areaIds.filter((e) => selectAreaIds.includes(e));
    };
    isChildrenInclude = (ary = [], keyArray = []) => {
        const e = keyArray.findIndex((e) => {
            return ary.includes(e);
        });
        return e !== -1;
    };
    getAllChildrenIds = (e = { id: number, name: string, children: [] }) => {
        const ids = [];
        const _recursive = (c) => {
            if (c.children && c.children.length) {
                c.children.map((a) => {
                    ids.push(`${a.id}`);
                    _recursive(a);
                });
            }
        };
        _recursive(e);
        return ids;
    };
    filterAreaList = (areaListTree = []) => {
        const { correctIds } = this.state;
        const checkedKeys = [];
        correctIds.map((e) => {
            e.ids.map((id) => {
                checkedKeys.push(id);
            });
        });
        const getItemIds = (e) => {
            return e.map((item) => (`${item.id}`));
        };
        const newArray = areaListTree.filter((item) => {
            if (checkedKeys.includes(`${item.id}`)) {
                return false;
            } else {
                return this.getIncludeIds(getItemIds(item.children), checkedKeys).length !== item.children.length;
            }

        });
        const newArray2 = newArray.map((e) => {
            const a = e.children.filter((item) => {
                if (typeof item["children"] !== "undefined" && Array.isArray(item.children) && item.children.length) {
                    if (checkedKeys.includes(`${item.id}`)) {
                        return false;
                    } else {
                        return this.getIncludeIds(getItemIds(item.children), checkedKeys).length !== item.children.length;
                    }
                } else {
                    return !checkedKeys.includes(`${item.id}`);
                }
            });
            return { ...e, children: a };
        });
        return newArray2.map((e) => {
            const a = e.children.map((c) => {
                if (typeof c["children"] !== "undefined" && Array.isArray(c.children) && c.children.length) {
                    const d = c.children.filter((item) => {
                        return !checkedKeys.includes(`${item.id}`);
                    });
                    return {
                        ...c,
                        children: d
                    };
                } else {
                    return {
                        ...c,
                        children: []
                    };
                }
            });
            return {
                ...e,
                children: a
            };

        });
    };
}

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
export default FreightAdd;
