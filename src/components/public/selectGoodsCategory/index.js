//@flow
import React, { Component } from "react";
import { View } from "react-web-dom";
import { Modal, Tree } from "antd";
import { connect } from "react-redux";
import { getGoodsCategoryList } from "../../../actions/goods/category";

const TreeNode = Tree.TreeNode;

type CategoryRowType = {
    id: number,
    name: string,
    icon: string,
    pid: number,
    children: Array<any>
}
type CategoryType = {
    id: number,
    name: string,
    icon: string,
    pid: number,
}
type Props = {
    visible: boolean,
    close: Function,
    getState: Function,
    dispatch?: Function,
    categoryTree?: Array<CategoryRowType>,
    value?: CategoryRowType | null,
    categoryList?: Array<CategoryType>,
}
type State = {
    expandedKeys: Array<any>,
    autoExpandParent: boolean,
    value: CategoryType | null
}
@connect(
    ({ view: { goods: { categoryTree, categoryList } } }) => ({
        categoryTree, categoryList
    })
)
export default class SelectGoodsCategory extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            value: props.value ? props.value : null
        }
    }

    onExpand = (expandedKeys: Array<any>) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }


    componentDidMount() {
        const { dispatch } = this.props
        if (dispatch) {
            dispatch(getGoodsCategoryList())
        }
    }

    onSelect = (selectedKeys: any, e: { selected: boolean, selectedNodes: Array<any>, node: any, event: any }) => {
        const key = selectedKeys[0]
        const { categoryList } = this.props
        if (Array.isArray(categoryList)) {
            const category = categoryList.find((value) => {
                return Number(key) === Number(value.id)
            })
            this.setState({
                value: category ? category : null
            })
        }
    }

    render() {
        const { visible, categoryTree } = this.props
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
            return (
                <Modal
                    title="选择商品分类页面"
                    visible={visible}
                    onCancel={() => {
                        this.props.close()
                    }}
                    style={{ top: 20 }}
                    width={756}
                    okType={'primary'}
                    okText={'确定'}
                    cancelText={'取消'}
                    onOk={() => {
                        this.props.getState(this.state)
                    }}
                    okButtonProps={{ disabled: this.state.value === null }}
                >
                    <View>
                        <Tree
                            onExpand={this.onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onSelect={this.onSelect}
                        >
                            {loop(categoryTree)}
                        </Tree>
                    </View>
                </Modal>
            )
        } else {
            return null
        }
    }
}
