
import React, { Component } from "react";
import {
    Icon,
    Table,
    Popconfirm,
    Tooltip,
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import NodeModal from "../nodeModal";
import { routerConfig } from "../../index/layout/routerConfig";

const routerData = routerConfig.routers;

export default class SettingNodeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editNodeVisible:false,
            currentNode:{},
            key:null,
        };
    }
    render() {
        // const {
        //     tree
        // } = this.props
        const {
            editNodeVisible,
            currentNode
        } = this.state
        // tree.map((item,index)=>{
        //     item['children']=item['_child']
        // })
        // console.log('tree',tree);
        // console.log('SettingNodeTable',this.props);
        const columns = [
            {
                title: "节点名称",
                dataIndex: "title",
            },
            {
                title: "是否显示",
                dataIndex: "hideInMenu",
                className: styles.iconcolumn,
                render: (text) => {
                    return !text
                    ?   <Icon type="check" />
                    :   <Icon type="close" style={{color:'red'}}/>
                }
            },
            {
                title: "操作",
                key: "operation",
                render: (text, record) => {
                    return (
                        <View className={styles.operation}>
                            <a
                                onClick={()=>{
                                    this.setState({
                                        currentNode:record,
                                        editNodeVisible:true,
                                    })
                                }}
                            >
                                修改
                            </a>

                            {
                                currentNode==record ?
                                <NodeModal
                                    {...this.props}
                                    type='edit'
                                    pidShow={currentNode.pid===0 ? false : true}
                                    nodeVisible={editNodeVisible}
                                    nodeCancel = {()=>{
                                        this.setState({editNodeVisible:false})
                                    }}
                                    initialValue={currentNode}
                                    routerData={routerData}
                                /> : null
                            }
                            {
                                record.children&&record.children.length ? <Tooltip title='存在子项，不可删除！'>
                                    <a style={{color:'#ccc'}}>删除</a>
                                </Tooltip> : <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() => {
                                        this.props.delAuthRuleTree({id:record.id})
                                    }}
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            }
                        </View>
                    );
                },
                className: styles.column
            }
        ];
        return (
            <Table
                bordered
                columns={columns}
                // defaultExpandAllRows
                rowKey={record => record.path}
                dataSource={routerData}
                pagination={{
                    showQuickJumper: true,
                    // total: total_number,
                }}
                loading={false}
            />
        );
    }
}
