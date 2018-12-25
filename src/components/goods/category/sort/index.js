import React, { Component, Fragment } from "react";
import { Button, Modal, Tree, message } from "antd";

const TreeNode = Tree.TreeNode;

export default class CategorySort extends Component {
    state = {
        visible: false,
        dataSource: this.props.dataSource
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
                                        data.children && data.children.map((item, j) => (
                                            <TreeNode title={`${item.name}`} key={item.id} data={item} index={j} />
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
        let newArray = [];
        dataSource.map((e) => {
            newArray.push({
                id: e.id,
                index
            });
            index++;
            e.children.map((a) => {
                newArray.push({
                    id: a.id,
                    index
                });
                index++;
            });
        });
        dispatch({
            type: "goodsCategory/sort",
            payload: { sorts: newArray },
            callback: () => {
                this.setState({
                    visible: false
                });
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
        const startData = info.dragNode.props.data;
        const endData = info.node.props.data;
        const startIndex = info.dragNode.props.index;
        if (startData.pid === endData.pid) {
            if (startData.pid === 0) {
                const newArray = [...dataSource];
                newArray.splice(startIndex, 1);
                const endIndex = newArray.findIndex((e) => e.id === endData.id);
                newArray.splice(endIndex, 0, startData);
                this.setState({
                    dataSource: newArray
                });
            } else {
                const oneLevelIndex = dataSource.findIndex((e) => e.id === startData.pid);
                const newArray = [...dataSource];
                if (typeof newArray[oneLevelIndex] !== "undefined" && typeof newArray[oneLevelIndex]["children"] !== "undefined") {
                    newArray[oneLevelIndex].children.splice(startIndex, 1);
                    const endIndex = newArray[oneLevelIndex].children.findIndex((e) => e.id === endData.id);
                    newArray[oneLevelIndex].children.splice(endIndex, 0, startData);
                }
                this.setState({
                    dataSource: newArray
                });
            }
        } else {
            message.warning("必须更改同一层级");
        }

    };
}
