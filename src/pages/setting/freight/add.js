import React, { Component } from "react";
import { Input, Radio, Button, Modal, Form, Tree, message, Card } from "antd";
import styles from "@/styles/freight/freightAdd.css";
import FreightAddTable from "@/components/freight/addTable/index";
import { connect } from "dva";
import Arr from "@/utils/array";
import { View, ScrollView } from "@/components/flexView";
import router from "umi/router";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

@Form.create()
@connect(({ area, loading }) => ({
    areaList: area.list.result.list,
    areaListLoading: loading.effects["area/list"],
    freightAddLoading: loading.effects["freight/add"]
}))
class FreightAdd extends Component {
    static defaultProps = {
        areaList: [],
        areaListLoading: true,
        freightAddLoading: false
    };
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

        dataSource: [],

        editAreaTableIndex: null

    };
    // todo 为了方便给所有的子集补上chilren
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "area/list"
        });
    }

    changeDataSource = (index, key, value) => {
        const { dataSource } = this.state;
        const _dataSource = [...dataSource];
        _dataSource[index][key] = value;
        this.setState({ dataSource: _dataSource });
    };
    changeAreaListModal = (e) => {
        this.setState({
            visible: e,
            checkedAreaKeys: []
        });
    };
    editAreaList = (e, index) => {
        this.setState({
            visible: true,
            checkedAreaKeys: e,
            editAreaTableIndex: index
        });
    };
    delAreaList = (index) => {
        const { dataSource } = this.state;
        const _dataSource = [...dataSource];
        _dataSource.splice(index, 1);
        this.setState({ dataSource: _dataSource });
    };
    handleOk = (selectTreeNodesData) => {
        const { dataSource, checkedAreaKeys, editAreaTableIndex } = this.state;
        const { areaList } = this.props;
        if (editAreaTableIndex !== null) {
            const _dataSource = [...dataSource];
            _dataSource[editAreaTableIndex].ids = this.getAreaCheckedIds(areaList, checkedAreaKeys);
            this.setState({
                dataSource: _dataSource,
                checkedAreaKeys: [],
                editAreaTableIndex: null
            });
        } else if (selectTreeNodesData.length > 0) {
            this.setState({
                dataSource: [...dataSource, {
                    first_amount: 1,
                    first_fee: 0.00,
                    additional_amount: 1,
                    additional_fee: 0.00,
                    ids: this.getAreaCheckedIds(areaList, checkedAreaKeys)
                }],
                checkedAreaKeys: []
            });
        }
        this.changeAreaListModal(false);
    };
    /**
     * 过滤，如果父级包含了所有子集，返回父级id
     * @param {[]} areaTreeList
     * @param {string[]} checkedKeys
     * @returns {string[]}
     */
    getAreaCheckedIds = (areaTreeList, checkedKeys) => {
        let ids = [];
        areaTreeList.map(item => {
            if (typeof item["children"] !== "undefined" && Array.isArray(item.children) && item.children.length) {
                let childItem = this.getChildIds(item);
                let checkedItem = this.getChildInCludes(childItem, checkedKeys);
                if (checkedItem.length === childItem.length) {
                    ids.push(item.id);
                } else if (checkedItem.length) {
                    return item.children.map((sub) => {
                        if (typeof sub["children"] !== "undefined" && Array.isArray(sub.children) && sub.children.length) {
                            let childItem = this.getChildIds(sub);
                            let checkedItem = this.getChildInCludes(childItem, checkedKeys);
                            if (checkedItem.length === childItem.length) {
                                ids.push(sub.id);
                            } else {
                                sub.children.map((area) => {
                                    if (checkedKeys.includes(`${area.id}`)) {
                                        ids.push(area.id);
                                    }
                                });
                            }
                        } else {
                            if (checkedKeys.includes(`${sub.id}`)) {
                                ids.push(sub.id);
                            }
                        }
                    });
                } else {
                    return null;
                }
            } else {
                if (checkedKeys.includes(`${item.id}`)) {
                    ids.push(item.id);
                }
            }
        });
        return ids.map((e) => `${e}`);
    };
    handleCancel = () => {
        this.changeAreaListModal(false);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: "freight/add",
                    payload: values,
                    callback: (e) => {
                        if (e.code === 0) {
                            message.success("添加成功");
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
        const { form, areaList, freightAddLoading } = this.props;
        const { visible, checkedKeys, checkedAreaKeys, checkedKeys2, dataSource, payType } = this.state;
        const { getFieldDecorator } = form;
        const areaListTree = Arr.toTree(areaList);

        const selectTreeNodesData = this.getSelectTreeNodesData(areaListTree, checkedAreaKeys);
        const filterOutAreaList = this.filterAreaList(areaListTree);
        return (
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
                                dataSource={dataSource}
                                areaList={areaList}
                                getChildIds={this.getChildIds}
                                getChildInCludes={this.getChildInCludes}
                                editAreaList={this.editAreaList}
                                changeDataSource={this.changeDataSource}
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
            if (item.children && item.children.length) {
                const childItem = this.getChildIds(item);
                const checkedItem = this.getChildInCludes(childItem, checkedKeys);
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
    renderTreeNodes2 = (data) => {
        return data.map(item => {
            if (item.children && item.children.length) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes2(item.children)}
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
            const _children = [];
            if (typeof e["children"] !== "undefined" && Array.isArray(e.children)) {
                typeof e["children"] !== "undefined" && Array.isArray(e.children) && e.children.filter((item) => {
                    return checkedKeys.includes(`${item.id}`) || this.isChildInCludes(this.getChildIds(item), checkedKeys);
                });
            }
            return { ...e, children: _children };
        });
        return newArray2.map((e) => {
            if (typeof e["children"] !== "undefined" && Array.isArray(e.children)) {
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
            } else {
                return {
                    ...e,
                    children: []
                };
            }
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
        children: []
    }) => {
        const newArray = [];
        const newFunc = (c) => {
            if (c.children && c.children.length) {
                c.children.map((a) => {
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
        const { dataSource } = this.state;
        const checkedKeys = [];
        dataSource.map((e) => {
            e.ids.map((id) => {
                checkedKeys.push(id);
            });
        });
        const getItemIds = (e) => {
            return e.map((item) => (`${item.id}`));
        };
        const newArray = areaList.filter((item) => {
            if (typeof item["children"] !== "undefined" && Array.isArray(item.children) && item.children.length) {
                if (checkedKeys.includes(`${item.id}`)) {
                    return false;
                } else {
                    return this.getChildInCludes(getItemIds(item.children), checkedKeys).length !== item.children.length;
                }
            } else {
                return !checkedKeys.includes(`${item.id}`);
            }
        });
        const newArray2 = newArray.map((e) => {
            if (typeof e["children"] !== "undefined") {
                const a = e.children.filter((item) => {
                    if (typeof item["children"] !== "undefined" && Array.isArray(item.children) && item.children.length) {
                        if (checkedKeys.includes(`${item.id}`)) {
                            return false;
                        } else {
                            return this.getChildInCludes(getItemIds(item.children), checkedKeys).length !== item.children.length;
                        }
                    } else {
                        return !checkedKeys.includes(`${item.id}`);
                    }
                });
                return { ...e, children: a };
            } else {
                return { ...e, children: [] };
            }

        });
        return newArray2.map((e) => {
            if (typeof e["children"] !== "undefined" && Array.isArray(e.children) && e.children.length) {
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
            } else {
                return {
                    ...e,
                    children: []
                };
            }
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
