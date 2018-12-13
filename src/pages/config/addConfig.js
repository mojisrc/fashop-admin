import React, { Component } from "react";
import { connect } from 'dva';
import { View } from "react-web-dom";
import {
    Icon,
    Card,
    Form,
    Select,
    AutoComplete,
    Input,
    Button,
    Tooltip,
    InputNumber,
    Switch,
} from "antd";
import Page from "components/public/Page";

let arrayValuesUuid = 0;
let enumValuesUuid = 0;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

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

class SettingAddConfig extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };
    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = [".com", ".org", ".net"].map(
                domain => `${value}${domain}`
            );
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;


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
        const prefixSelector = getFieldDecorator("prefix", {
            initialValue: "86"
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Page>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: 540}}>
                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                Key&nbsp;
                                <Tooltip title="配置信息的key，唯一字段">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                        hasFeedback
                    >
                        {getFieldDecorator("nickname", {
                            validateTrigger: ["onChange", "onBlur"],
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Key!",
                                    whitespace: true
                                }
                            ]
                        })(<Input placeholder={'key'}/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={'标题'}
                        hasFeedback
                    >
                        {getFieldDecorator("title", {
                            validateTrigger: ["onChange", "onBlur"],
                            rules: [
                                {
                                    required: true,
                                    message: "Please input 标题!",
                                    whitespace: true
                                }
                            ]
                        })(<Input placeholder={'标题'}/>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="排序" hasFeedback>
                        {getFieldDecorator("sort", {
                            initialValue : 99,
                            rules: [
                                {
                                    required: true,
                                    message: "Please input 排序!"
                                }
                            ]
                        })(<InputNumber />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="分组" hasFeedback>
                        {getFieldDecorator("group", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select 分组!"
                                }
                            ]
                        })(
                            <Select placeholder={'选择分组'}>
                                <Option value="1">基本</Option>
                                <Option value="2">内容</Option>
                                <Option value="3">用户</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="类型" hasFeedback>
                        {getFieldDecorator("type", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select 类型!"
                                }
                            ]
                        })(
                            <Select placeholder={'选择数据类型'}>
                                <Option value="number">数字</Option>
                                <Option value="string">字符</Option>
                                <Option value="array">数组</Option>
                                <Option value="enum">枚举</Option>
                                <Option value="text">文本</Option>
                            </Select>
                        )}
                    </FormItem>
                    {
                        this.valueComponent()
                    }
                    <FormItem
                        {...formItemLayout}
                        label={'说明'}
                        hasFeedback
                    >
                        {getFieldDecorator("description", {
                            validateTrigger: ["onChange", "onBlur"],
                            rules: [
                                {
                                    required: true,
                                    message: "Please input description!",
                                }
                            ]
                        })(<TextArea placeholder={'description'}/>)}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            确认添加
                        </Button>
                    </FormItem>
                </Form>
            </Page>
        );
    }
    valueComponent(){
        const { getFieldDecorator,getFieldValue } = this.props.form;
        switch (getFieldValue('type')) {
            case 'number':
                return (
                    <FormItem {...formItemLayout} label="Value" hasFeedback>
                        {getFieldDecorator("numberValue", {
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
                        label={'Value'}
                        hasFeedback
                    >
                        {getFieldDecorator("stringValue", {
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
            case 'array':
                const formItemLayoutWithOutLabel = {
                    wrapperCol: {
                        xs: { span: 24, offset: 0 },
                        sm: { span: 14, offset: 6 }
                    }
                };
                getFieldDecorator("arrayValues", { initialValue: [] });
                const arrayValues = getFieldValue("arrayValues");
                const formItems = arrayValues.map((k, index) => {
                    return (
                        <FormItem
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? "arrayValues" : ""}
                            required={true}
                            key={k}
                            hasFeedback
                        >
                            {getFieldDecorator(`arrayValues-${k}`, {
                                validateTrigger: ["onChange", "onBlur"],
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
                                    style={{ width: "80%", marginRight: 8 }}
                                />
                            )}
                            {arrayValues.length > 1
                                ? <Icon
                                      className="dynamic-delete-button"
                                      type="minus-circle-o"
                                      disabled={arrayValues.length === 1}
                                      onClick={() =>{this.arrayValueRemove(k)}}
                                  />
                                : null}
                        </FormItem>
                    );
                });
                return(
                    <div>
                        {formItems}
                        <FormItem
                            wrapperCol = {{
                                sm: {offset: 6,span: 14},
                            }}
                        >
                            <Button type="dashed" onClick={()=>{this.arrayValueAdd()}} style={{ width: '100%' }}>
                                <Icon type="plus" /> Add field
                            </Button>
                        </FormItem>
                    </div>
                )

                case 'enum':
                    const formItemLayoutWithOutLabel2 = {
                        wrapperCol: {
                            xs: { span: 24, offset: 0 },
                            sm: { span: 14, offset: 6 }
                        }
                    };
                    getFieldDecorator("enumValues", { initialValue: [] });
                    const enumValues = getFieldValue("enumValues");
                    const formItems2 = enumValues.map((k, index) => {
                        return (
                            <FormItem
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel2)}
                                label={index === 0 ? "enumValues" : ""}
                                required={true}
                                key={k}
                                hasFeedback
                            >
                                <Card style={{border: '1px solid #e9e9e9'}}>
                                    {
                                        getFieldDecorator(`enumKey-${k}`, {
                                            validateTrigger: ["onChange", "onBlur"],
                                            rules: [
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input enumValue or delete this field."
                                                }
                                            ]
                                        })(
                                            <Input
                                                placeholder={`enumKey-${index}`}
                                            />
                                        )
                                    }

                                    {
                                        getFieldDecorator(`enumValue-${k}`, {
                                            validateTrigger: ["onChange", "onBlur"],
                                            rules: [
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input enumValue or delete this field."
                                                }
                                            ]
                                        })(
                                            <Input
                                                placeholder={`enumValue-${index}`}
                                                style={{margin:'15px 0'}}
                                            />
                                        )
                                    }

                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        {
                                            getFieldDecorator(`switch-${k}`,{
                                                valuePropName: 'checked'
                                            })(
                                                <Switch checkedChildren={'default'} unCheckedChildren={'default'} onChange={(e)=>{this.switchOnChange(e,k)}}/>
                                            )
                                        }
                                        {
                                            enumValues.length > 1
                                            ? <Button
                                                  onClick={() =>{this.enumValueRemove(k)}}
                                                  type="primary"
                                              >
                                              delete
                                              </Button>
                                            : null
                                        }
                                    </View>
                                </Card>
                            </FormItem>
                        );
                    });
                    return(
                        <div>
                            {formItems2}
                            <FormItem
                                wrapperCol = {{
                                    sm: {offset: 6,span: 14},
                                }}
                            >
                                <Button type="dashed" onClick={()=>{this.enumValueAdd()}} style={{ width: '100%' }}>
                                    <Icon type="plus" /> Add field
                                </Button>
                            </FormItem>
                        </div>
                    )
            case 'text':
                return(
                    <FormItem
                        {...formItemLayout}
                        label={'Value'}
                        hasFeedback
                    >
                        {getFieldDecorator("textValue", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input textValue!",
                                    whitespace: true
                                }
                            ]
                        })(<TextArea placeholder={'value'}/>)}
                    </FormItem>
                )
            default:
                return null
        }
    }
    arrayValueAdd(){
        arrayValuesUuid++;
        const { form } = this.props;
        // can use data-binding to get
        const arrayValues = form.getFieldValue('arrayValues');
        const nextKeys = arrayValues.concat(arrayValuesUuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            arrayValues: nextKeys,
        });
    }
    arrayValueRemove(k){
        const { form } = this.props;
        // can use data-binding to get
        const arrayValues = form.getFieldValue('arrayValues');
        // We need at least one passenger
        if (arrayValues.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            arrayValues: arrayValues.filter(key => key !== k),
        });
    }
    enumValueAdd(){
        enumValuesUuid++;
        const { form } = this.props;
        // can use data-binding to get
        const arrayValues = form.getFieldValue('enumValues');
        const nextKeys = arrayValues.concat(enumValuesUuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            enumValues: nextKeys,
        });
    }
    enumValueRemove(k){
        const { form } = this.props;
        // can use data-binding to get
        const enumValues = form.getFieldValue('enumValues');
        // We need at least one passenger
        if (enumValues.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            enumValues: enumValues.filter(key => key !== k),
        });
    }
    switchOnChange(e,k){
        if(e===true){
            const { form } = this.props;
            const enumValues = form.getFieldValue('enumValues');

            let newData = {}
            enumValues.map((data,i)=>{
                if(data!==k){
                    newData[`switch-${data}`] = false
                }
                return true
            })
            form.setFieldsValue(newData);
        }
    }
}

const mapStateToProps = store => {
    const { shopCartIndex } = store.view;
    return {
        login: store.app.member.login
    };
};

export default connect(mapStateToProps)(Form.create()(SettingAddConfig));
