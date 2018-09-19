import React, { Component } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    Radio,
    Select,
} from "antd";
import styles from "./index.css";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class NodeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                let newvalues = {}
                if(values.pid){
                    let newpid = this.props.tree.filter((filterItem,index)=>{
                        return filterItem.title===values.pid
                    })
                    newvalues = Object.assign({},values,{pid:newpid[0].id})
                }else {
                    newvalues = Object.assign({},{pid:0},values)
                }
                // console.log('Received values of form: ', newvalues);
                const {
                    type,
                    nodeCancel,
                    editAuthRuleTree,
                    addAuthRuleTree,
                } = this.props
                if(type==='edit'){
                    editAuthRuleTree(Object.assign({},newvalues,{id:this.props.initialValue.id}))
                }else {
                    addAuthRuleTree(newvalues)
                }
                nodeCancel()
            }
        });
    }
    render() {
        const {
            nodeVisible,
            nodeCancel,
            initialValue,
            routerData,
            // tree,
            pidShow,
            type,
        } = this.props
        const {
            name,
            title,
            path,
            route,
            display,
        } = initialValue
        let pidinit = routerData.filter((filterItem,index)=>{
            return filterItem.path===path
        })
        // console.log('NodeModal',pid);
        // console.log('NodeModal',pidinit);
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={type==='edit' ? "修改节点" : "添加节点"}
                visible={nodeVisible}
                footer={null}
                onCancel={nodeCancel}
            >
                <Form onSubmit={this.handleSubmit}>
                    {
                        pidShow ?
                        <FormItem
                            {...formItemLayout}
                            label='上一级'
                        >
                            {getFieldDecorator('pid', {
                                initialValue:pidinit.length ? pidinit[0].path : path,
                                rules: [{
                                    required: true,
                                    message: 'Please select higher',
                                }],
                            })(
                                <Select
                                    placeholder="Select a higher"
                                >
                                    {
                                        routerData.map((treeItem,index)=>{
                                            return <Option
                                                key={treeItem.title}
                                                value={treeItem.title}
                                            >
                                                {treeItem.title}
                                            </Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem> : null
                    }
                    <FormItem {...formItemLayout} label="节点标识">
                        {getFieldDecorator('name', {
                            initialValue:name,
                            rules: [{
                                required: true,
                                message: 'Please input name',
                            }],
                        })(
                            <Input placeholder="Please input name" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('title', {
                            initialValue:title,
                            rules: [{
                                required: true,
                                message: 'Please input title',
                            }],
                        })(
                            <Input placeholder="Please input title" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="路由地址">
                        {getFieldDecorator('route', {
                            initialValue:route,
                            rules: [{
                                required: true,
                                message: 'Please input route',
                            }],
                        })(
                            <Input placeholder="Please input route" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="是否显示">
                        {getFieldDecorator('display', {
                            initialValue:display,
                            rules: [{
                                required: true,
                                message: 'Please input route',
                            }],
                        })(
                            <RadioGroup>
                                <Radio value={1}>显示</Radio>
                                <Radio value={0}>不显示</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            style={{marginRight:'10px'}}
                            onClick={nodeCancel}
                        >
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

NodeModal = Form.create()(NodeModal);

export default NodeModal
