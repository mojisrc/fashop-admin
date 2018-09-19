import React, { Component } from "react";
import {
    Row,
    Col,
    Button,
    Modal,
    Tree,
    message,
    Popover,
    Radio,
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import NodeModal from "../nodeModal";
import { changeRouterConfigRouters } from "../../../actions/setting";
import { routerConfig } from "../../index/layout/routerConfig";

const routerData = routerConfig.routers;
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;

export default class SettingNodeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNodeVisible: false,
            pidShow: false,
            selectTypeVisible: false,
            visible: false,
            routers: this.props.routers,
            addType: 1,
        };
    }
    render() {
        const {
            routers,
            addType,
            addNodeVisible,
            pidShow,
            selectTypeVisible,
        } = this.state
        const content = (
            <View>
                <RadioGroup
                    onChange={(e)=>{
                        if(e.target.value===1){
                            this.setState({
                                pidShow:false
                            })
                        }else {
                            this.setState({
                                pidShow:true
                            })
                        }
                        this.setState({
                            addType:e.target.value,
                        })
                    }}
                    value={addType}
                >
                    <Radio value={1}>一级节点</Radio>
                    <Radio value={2}>二级节点</Radio>
                </RadioGroup>
                <View className={styles.addNodeBtn}>
                    <Button
                        onClick={() => {
                            this.setState({
                                selectTypeVisible:false,
                            })
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        type='primary'
                        onClick={() => {
                            this.setState({
                                selectTypeVisible:false,
                                addNodeVisible:true,
                            })
                        }}
                    >
                        确定
                    </Button>
                </View>
            </View>
        );
        return (
            <Row gutter={24}>
                <Col xl={{ span: 2 }} md={{ span: 8 }} className={styles.div1}>
                    <Popover
                        content={content}
                        visible={selectTypeVisible}
                        title="添加节点"
                        trigger="click"
                        placement="bottomLeft"
                        onVisibleChange={(selectTypeVisible)=>{
                            this.setState({
                                selectTypeVisible,
                            })
                        }}
                    >
                        <Button
                            type="primary"
                            className="margin-right"
                            onClick={() => {

                            }}
                        >
                            添加节点
                        </Button>
                    </Popover>
                </Col>
                <NodeModal
                    {...this.props}
                    type='add'
                    pidShow={pidShow}
                    nodeVisible={addNodeVisible}
                    nodeCancel = {()=>{
                        this.setState({addNodeVisible:false})
                    }}
                    initialValue={{
                        name:'',
                        title:'',
                        pid:'',
                        route:'',
                        display:1,
                    }}
                    routerData={routerData}
                />
                <Col xl={{ span: 2 }} md={{ span: 8 }} className={styles.div1}>
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
                </Col>
                <Modal
                    title="更改排序"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tree
                        draggable
                        onDrop={this.onDrop}
                        autoExpandParent = {false}
                        defaultExpandedKeys = {['节点']}
                    >
                        {
                            routerData.map((data,i)=>(
                                <TreeNode title={data.title} key={data.path}>
                                    {
                                        data.children&&data.children.map((item)=>(
                                            <TreeNode title={item.title} key={`${data.path}/${item.path}`} />
                                        ))
                                    }
                                </TreeNode>
                            ))
                        }
                    </Tree>
                </Modal>
            </Row>
        );
    }
    handleOk = (e) => {
        console.log('routers',this.state.routers);
        let sorts = []
        this.state.routers.map((item,index)=>{
            // sorts.push({id:item.id,index:index,children:[]})
            sorts.push({id:item.id,index:index})
            item.children.map((childItem,j)=>{
                sorts.push({
                    id:childItem.id,index:j
                })
                // sorts[index].children.push({
                //     id:childItem.id,index:j
                // })
            })
        })
        console.log('sorts',sorts);
        this.setState({
            visible: false,
        },()=>{
            const {
                sortAuthRuleTree
            } = this.props
            sortAuthRuleTree(sorts)
        })
    }
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
    }
    onDrop = (info) => {
        // console.log(info);
        // console.log(info.node.props.eventKey);
        const {
            routers
        } = this.state
        const startNodeKey = info.dragNodesKeys[info.dragNodesKeys.length-1]
        const endNodeKey = info.node.props.eventKey

        if(startNodeKey.includes('/')===endNodeKey.includes('/')){
            const includesBool = startNodeKey.includes('/')
            if(includesBool){
                const startNodeArray = startNodeKey.split('/')
                const endNodeArray = endNodeKey.split('/')
                if(startNodeArray[0]===endNodeArray[0]){

                    const oneLevelIndex = routers.findIndex((e)=>{
                        return e.path===startNodeArray[0]
                    })
                    const startNodeIndex = routers[oneLevelIndex].children.findIndex((e)=>{
                        return e.path===startNodeArray[1]
                    })
                    const endNodeIndex = routers[oneLevelIndex].children.findIndex((e)=>{
                        return e.path===endNodeArray[1]
                    })

                    let newArray = [...routers]
                    const startNodeData = newArray[oneLevelIndex].children[startNodeIndex]
                    newArray[oneLevelIndex].children.splice(startNodeIndex,1)
                    newArray[oneLevelIndex].children.splice(endNodeIndex,0,startNodeData)
                    this.setState({
                        routers: newArray
                    })

                }else {
                    message.warning('必须更改同一层级')
                }
            }else {
                const startNodeIndex = routers.findIndex((e)=>{
                    return e.path===startNodeKey
                })
                const endNodeIndex = routers.findIndex((e)=>{
                    return e.path===endNodeKey
                })
                let newArray = [...routers]
                const startNodeData = newArray[startNodeIndex]
                newArray.splice(startNodeIndex,1)
                newArray.splice(endNodeIndex,0,startNodeData)
                this.setState({
                    routers: newArray
                })
            }
        }else {
            message.warning('必须更改同一层级')
        }

    }
}
