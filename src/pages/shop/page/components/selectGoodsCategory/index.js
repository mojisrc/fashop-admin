import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Tree } from "antd";
import { connect } from "umi";
import Arr from "@/utils/array";

const TreeNode = Tree.TreeNode;

@connect(({ goodsCategory, loading }) => ({
    goodsCategory: goodsCategory.list.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectGoodsCategory extends Component {
    static defaultProps = {
        getState: () => {
        },
        visible: false,
        multi: false,
        checkedKeys: [],
        goodsCategory: { list: [] },
        goodsCategoryLoading: false,
        onCheck: () => {
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            value: props.value ? props.value : null,
            values: props.values ? props.values : [],
            categoryTree: [],
            visible: false
        };
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    componentDidMount() {
        const { dispatch, goodsCategory, goodsCategoryLoading } = this.props;
        if (goodsCategory.list.length === 0 && !goodsCategoryLoading) {
            dispatch({
                type: "goodsCategory/list",
                callback: (response) => {
                    this.setState({ categoryTree: Arr.toTree(response.result.list) });
                }
            });
        } else {
            this.setState({ categoryTree: Arr.toTree(goodsCategory.list) });
        }
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsCategory/list",
            callback: (response) => {
                this.setState({ categoryTree: Arr.toTree(response.result.list) });
            }
        });
    }

    onSelect = (selectedKeys) => {
        const key = selectedKeys[0];
        const { goodsCategory } = this.props;
        if (Array.isArray(goodsCategory.list)) {
            const category = goodsCategory.list.find((value) => {
                return Number(key) === Number(value.id);
            });
            this.setState({ value: category ? category : null });
        }
    };
    onCheck = checkedKeys => {
        const { goodsCategory, onCheck } = this.props;
        let categorys = [];
        if (Array.isArray(goodsCategory.list)) {
            categorys = goodsCategory.list.find((value) => {
                return Arr.inArray(String(value.id), checkedKeys);
            });
        }
        onCheck(checkedKeys, categorys);
    };

    show() {
        this.setState({
            visible: true
        }, () => {
            this.initList();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { categoryTree, visible } = this.state;
        const { checkedKeys, multi } = this.props;
        if (categoryTree) {
            const { expandedKeys, autoExpandParent } = this.state;
            const loop = categoryTree => categoryTree.map((item) => {
                const title = <span>{item.name}</span>;
                if (item.children) {
                    return (
                        <TreeNode key={item.id} title={title}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.id} title={title} />;
            });
            let footer = multi ? { footer: null } : {};
            return (
                <Modal
                    title="选择商品分类页面"
                    visible={visible}
                    onCancel={() => {
                        this.close();
                    }}
                    style={{ top: 20 }}
                    width={756}
                    okType={"primary"}
                    okText={"确定"}
                    cancelText={"取消"}
                    onOk={() => {
                        this.props.getState(this.state);
                    }}
                    okButtonProps={{ disabled: this.state.value === null }}
                    {...footer}
                >
                    <View>
                        <Tree
                            checkedKeys={checkedKeys}
                            checkable={multi}
                            onExpand={this.onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                        >
                            {loop(categoryTree)}
                        </Tree>
                    </View>
                </Modal>
            );
        } else {
            return null;
        }
    }
}
