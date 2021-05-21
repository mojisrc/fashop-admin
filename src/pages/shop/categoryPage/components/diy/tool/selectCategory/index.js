import React, { Component } from "react";
import { Modal, Button,  Tree } from "antd";
import { list } from "@/models/goodsCategory";
import { connect } from "umi";
import Arr from "@/utils/array";
const { TreeNode } = Tree;

@connect(({ goodsCategory, loading }) => ({
    goodsCategoryList: goodsCategory.list.result,
    goodsCategoryListLoading: loading.effects["goodsCategory/list"]
}), null, null, {
    forwardRef: true
})
export default class SelectCoupon extends Component {
    static defaultProps = {
        goodsCategoryList: { total_number: 0, list: [] },
        goodsCategoryListLoading: true,
        multiSelect: false
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rows: 10,
            multiSelect: props.multiSelect ? props.multiSelect : false,
            checkedData: [],
            visible: false,
            selectedRowKeys: [],
            disabledIds: [],
            categoryTree: [],
            // tree
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: []
        };
    }

    componentDidMount() {
        const { goodsCategoryList } = this.props;
        if (goodsCategoryList.list.length === 0) {
            this.initList();
        }
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsCategory/list",
            payload: {
                page: this.state.page,
                rows: 10000
            },
            callback: (response) => {
                if(response.result.list.length>0){
                    let list = [...response.result.list]
                    list.map((item,index)=>{
                        list[index]['title'] = item.name
                    })
                    this.setState({ categoryTree: Arr.toTree(list) });
                }
            }
        });
    }

    show() {
        this.setState({
            visible: true
        });
        this.initList();
    }

    close() {
        this.setState({
            visible: false
        });
    }

    // tree
    onExpand = (expandedKeys) => {
        console.log("onExpand", expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    onCheck = (checkedKeys) => {
        console.log("onCheck", checkedKeys);
        this.setState({ checkedKeys });
    };

    onSelect = (selectedKeys, info) => {
        console.log("onSelect", info);
        this.setState({ selectedKeys });
    };

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} />;
    });

    render() {
        const { onOk, multiSelect } = this.props;
        const { categoryTree } = this.state;
        if (categoryTree) {
            const { checkedData, visible } = this.state;

            return (
                <Modal
                    title="选择分类"
                    cancelText='取消'
                    okText='确定'
                    visible={visible}
                    width={556}
                    onCancel={() => {
                        this.close();
                    }}
                    onOk={() => {
                        onOk(checkedData);
                        this.setState({ checkedData: [], selectedRowKeys: [] });
                        this.close();
                    }}
                    footer={multiSelect ? <div>
                        <Button
                            disabled={checkedData.length === 0}
                            type="primary"
                            onClick={() => {
                                onOk(this.state);
                                this.setState({ checkedData: [], selectedRowKeys: [] });
                                this.close();
                            }}>确认</Button>
                    </div> : null}
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
                        {this.renderTreeNodes(categoryTree)}
                    </Tree>
                </Modal>
            );
        } else {
            return null;
        }
    }
}
