import React, { Component } from "react";
import {
    Row,
    Col,
    Button,
    Input,
    Select,
    Icon,
    Modal,
    Form,
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;

export default class ConfigGroupHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }
    render() {
        return (
            <Row gutter={24}>
                <Col xl={{ span: 4 }} md={{ span: 8 }} className={styles.div1}>
                    <Search
                        placeholder="分组名称"
                        size="large"
                        onSearch={() => {}}
                    />
                </Col>
                <Col xl={{ span: 4 }} md={{ span: 8 }} className={styles.div1}>
                    <Button
                        type="primary"
                        size="large"
                        className="margin-right"
                        onClick={() => {}}
                        style={{ marginRight: 16 }}
                    >
                        Search
                    </Button>
                    <Button size="large" onClick={() => {}}>
                        Reset
                    </Button>
                </Col>
                <Col
                    xl={{ span: 16 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    className={styles.div1}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => {
                                this.setState({
                                    visible: true
                                })
                            }}
                            style={{ marginRight: 16 }}
                        >
                            添加
                        </Button>
                        <Button
                            size="large"
                            onClick={() => {}}
                        >
                            删除
                        </Button>
                    </View>
                </Col>
                <Modal
                    title="添加分组"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <AddConfigGroup
                        hideModal={this.handleCancel}
                    />
                </Modal>
            </Row>
        );
    }
    handleOk = (e) => {
        this.setState({
          visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
    }
}




class AddConfigGroup extends React.Component {
    state = {
        addAddressLoading:false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            addReasonLoading: true,
        })
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                setTimeout(() => {
                    this.setState({
                        addReasonLoading: false,
                    })
                    this.props.hideModal()
                }, 2000)
            }else {
                this.setState({
                    addReasonLoading: false,
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { addReasonLoading } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }
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
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label='分组名称'
                    hasFeedback
                >
                    {getFieldDecorator('refundReasonName', {
                        rules: [{ required: true, message: '请输入分组名称', whitespace: true }],
                    })(
                        <Input style={{ width: 240 }}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={addReasonLoading}
                    >
                        添加
                    </Button>
                    <Button
                        style={{marginLeft:'20px'}}
                        onClick={()=>{
                            this.props.hideModal()
                        }}
                    >
                        取消
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

AddConfigGroup = Form.create()(AddConfigGroup);
