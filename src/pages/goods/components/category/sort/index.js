import React, { Component, Fragment } from "react";
import { Button, Modal, Tree, message } from "antd";

const TreeNode = Tree.TreeNode;

export default class CategorySort extends Component {
    state = {
        visible: false,
        dataSource: Array.isArray(this.props.dataSource) ? this.props.dataSource : []
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource) {
            this.setState({
                dataSource: nextProps.dataSource
            });
        }
    }

    render() {
        const { dataSource } = this.state;
        return (
            <Fragment>
                <Button
                    type="primary"
                    className="margin-right"
                    onClick={() => {
                        this.setState({
                            visible: true
                        });
                    }}
                >
                    更改排序
                </Button>
                <Modal
                    title="更改排序"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tree
                        draggable
                        onDrop={this.onDrop}
                        autoExpandParent={false}
                        defaultExpandedKeys={["节点"]}
                    >
                        {
                            dataSource.map((data, i) => (
                                <TreeNode title={data.name} key={data.id} data={data} index={i}>
                                    {
                                        typeof data["children"] !== "undefined" && Array.isArray(data.children) && data.children.map((item, j) => (
                                            <TreeNode key={item.id} title={`${item.name}`} data={item} index={j}>
                                                {
                                                    typeof item["children"] !== "undefined" && Array.isArray(item.children) && item.children.map((sub, s) => (
                                                        <TreeNode
                                                            title={`${sub.name}`}
                                                            key={sub.id}
                                                            data={sub}
                                                            index={s}
                                                        />
                                                    ))
                                                }
                                            </TreeNode>
                                        ))
                                    }
                                </TreeNode>
                            ))
                        }
                    </Tree>
                </Modal>
            </Fragment>
        );
    }

    handleOk = () => {
        const { dispatch } = this.props;
        const { dataSource } = this.state;
        let index = 0;
        let sorts = [];

        function recursive(list) {
            if (Array.isArray(list)) {
                list.map((item) => {
                    index++;
                    sorts.push({
                        id: item.id,
                        index
                    });
                    if (typeof item["children"] !== "undefined" && Array.isArray(item.children)) {
                        item.children = recursive(item.children);
                    }
                    return item;
                });
            }
        }

        recursive([...dataSource]);

        dispatch({
            type: "goodsCategory/sort",
            payload: { sorts },
            callback: () => {
                this.setState({
                    visible: false
                });
                const { onSubmit } = this.props;
                if (typeof onSubmit === "function") {
                    onSubmit();
                }
            }
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    onDrop = (info) => {
        const { dataSource } = this.state;
        const start = info.dragNode.props.data;
        const end = info.node.props.data;
        const startIndex = info.dragNode.props.index;

        // TODO 封装一个数组排序的方法复用
        function recursive(list) {
            if (Array.isArray(list)) {
                list.map((item) => {
                    if (item.id === start.pid && typeof item["children"] !== "undefined") {
                        // 排序
                        item.children.splice(startIndex, 1);
                        const endIndex = item.children.findIndex((e) => e.id === end.id);
                        item.children.splice(endIndex, 0, start);
                    }
                    if (typeof item["children"] !== "undefined") {
                        item.children = recursive(item.children);
                    }
                    return item;
                });
                return list;
            } else {
                return [];
            }
        }

        if (start.pid === end.pid) {
            const _dataSource = [...dataSource];
            if (start.pid === 0) {
                _dataSource.splice(startIndex, 1);
                const endIndex = _dataSource.findIndex((e) => e.id === end.id);
                _dataSource.splice(endIndex, 0, start);
                this.setState({
                    dataSource: _dataSource
                });
            } else {
                this.setState({
                    dataSource: recursive(_dataSource)
                });
            }
        } else {
            message.warning("必须更改同一层级");
        }

    };
}
