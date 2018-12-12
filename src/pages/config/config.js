import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Form,
    Select,
    Input,
    Button,
    InputNumber,
    Tabs,
} from "antd";
import Page from "components/public/Page";
import {data} from "./configTestData";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};


const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 14,
            offset: 6
        }
    }
};



class CustomizedForm extends React.Component {
    render(){
        const {data} = this.props
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: 540}}>
                {
                    data.data.map((data,i)=>{
                        return (
                            <div key={i}>
                                {this.valueComponent(data)}
                            </div>
                        )
                    })
                }
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        确认修改
                    </Button>
                </FormItem>
            </Form>
        )
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };
    valueComponent({title,value,type,id}){
        const { getFieldDecorator } = this.props.form;
        switch (type) {
            case 'number':
                return (
                    <FormItem {...formItemLayout} label={title} hasFeedback>
                        {getFieldDecorator("numberValue", {
                            initialValue : value,
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Value!"
                                }
                            ]
                        })(<InputNumber style={{width:150}}/>)}
                    </FormItem>
                )
            case 'string':
                return(
                    <FormItem
                        {...formItemLayout}
                        label={title}
                        hasFeedback
                    >
                        {getFieldDecorator(`stringValue`, {
                            initialValue : value,
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Value!",
                                    whitespace: true
                                }
                            ]
                        })(<Input placeholder={'value'}/>)}
                    </FormItem>
                )
            case 'text':
                return(
                    <FormItem
                        {...formItemLayout}
                        label={title}
                        hasFeedback
                    >
                        {getFieldDecorator("textValue", {
                            initialValue : value,
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Value!",
                                    whitespace: true
                                }
                            ]
                        })(<TextArea placeholder={'value'}/>)}
                    </FormItem>
                )
            case 'array':
                const formItemLayoutWithOutLabel = {
                    wrapperCol: {
                        xs: { span: 24, offset: 0 },
                        sm: { span: 14, offset: 6 }
                    }
                };
                const formItems = value.map((data, index) => {
                    return (
                        <FormItem
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index===0?title:''}
                            required={true}
                            key={index}
                            hasFeedback
                        >
                            {getFieldDecorator(`arrayValues-${index}`, {
                                validateTrigger: ["onChange", "onBlur"],
                                initialValue : data,
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input arrayValue or delete this field."
                                    }
                                ]
                            })(
                                <Input
                                    placeholder={`arrayValue-${index}`}
                                />
                            )}
                        </FormItem>
                    );
                });
                return(
                    <div>
                        {formItems}
                    </div>
                )

                case 'enum':
                    const defaultIndex = value.findIndex((e)=>{return e.default})
                    const initialValue = value[defaultIndex].value
                    return(
                        <FormItem
                            {...formItemLayout}
                            label={title}
                            required={true}
                            hasFeedback
                        >
                            {
                                getFieldDecorator(`enumKey`, {
                                    validateTrigger: ["onChange", "onBlur"],
                                    initialValue : `${initialValue}`,
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input enumValue or delete this field."
                                        }
                                    ]
                                })(
                                    <Select placeholder={'选择数据类型'}>
                                        {
                                            value.map((data, index) => (
                                                <Option value={`${data.value}`} key={index}>{data.key}</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                    )
            default:
                return null
        }
    }
}




class SettingConfig extends Component {
    state = {
        confirmDirty: false,
    };
    render() {
        const NewComponent = Form.create({
            mapPropsToFields: (props)=>{
                return {
                    data: props.data
                }
            }
        })(CustomizedForm)
        return (
            <Page>
                <Tabs>
                    {
                        data.map((data,i)=>{
                            return (
                                <TabPane tab={data.title} key={i}>
                                    <NewComponent data={data}/>
                                </TabPane>
                            )
                        })
                    }
                </Tabs>
            </Page>
        )
    }
}

const mapStateToProps = store => {
    return {
        login: store.app.member.login
    };
};

export default connect(mapStateToProps)(SettingConfig);
