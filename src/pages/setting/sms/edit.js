import React, { Component } from "react";
import { Input, Button, Form, Row, Col, Layout,Card } from "antd";
import SmsEdits from "@/styles/setting/smsEdits.css";
import delivePublic from "@/styles/setting/delivePublic.css";
import { Link } from "react-router-dom";
import { connect } from "dva";
import PropTypes from "prop-types";

const { Content } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
let graphText = "$(code)";
let modelId = "您的验证码为：$(code)，该验证码 5 分钟内有效，请勿泄漏给其他人";

@Form.create()
@connect(
    ({
         app: { setting: { getInfo } }
     }) => ({ getInfo }),
    { smsScenceedit, sendSmsinfo }
)
export default class Edit extends Component {
    static propTypes = {
        smsScenceedit: PropTypes.func.isRequired,
        sendSmsinfo: PropTypes.func.isRequired
    };
    static defaultProps = {
        smsScenceedit: () => {
        },
        sendSmsinfo: () => {
        }
    };

    componentWillMount() {
        const data = this.props.location.state;
        const { sendSmsinfo } = this.props;
        sendSmsinfo({
            params: {
                sign: data.sign
            }
        });
    }

    subClick(e) {
        const data = this.props.location.state;
        const { smsScenceedit } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                smsScenceedit({
                    params: {
                        id: data.id,
                        name: data.name,
                        sign: data.sign,
                        signature: values.note,
                        provider_template_id: values.gender,
                        provider_type: "阿里云",
                        body: modelId
                    }
                });
            }
        });
    }

    SelectChange = (e) => {
        graphText = e.target.value;
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        };
        const data = this.props.location.state;
        return (
            <Layout className={delivePublic.tabPane}>
                <Content>
                    <Row type="flex" align="bottom">
                        <Col span={14}>
                            <Form onSubmit={this.handleSubmit} className={SmsEdits.formAdjust}>
                                <FormItem
                                    {...formItemLayout}
                                    label="模块名称 :"
                                >
                                    {(
                                        <span className="ant-form-text">{data.name}</span>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="短信服务商 :"
                                    extra="阿里云同手机号60秒内只能发送一次验证码"
                                >
                                    {(
                                        <span className="ant-form-text">阿里云短信</span>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="签名"
                                    extra="短信签名由服务商提供"
                                    labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator("note", {
                                        rules: [{ required: true, max: 20, message: "请输入内容，并且不能太长" }]
                                    })(
                                        <Input onChange={this.SelectChange} placeholder="请输入签名" max={10} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="模版ID"
                                    extra="模版ID由服务商提供"
                                    labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator("gender", {
                                        rules: [{ required: true, message: "Please select your gender!" }]
                                    })(
                                        <Input placeholder="请输入模版ID" />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="模版内容"
                                    help={(<p>变量格式：$(code)<br />
                                        示例：您的验证码为：$(code)，该验证码 5 分钟内有效，
                                        请勿泄漏给其他人</p>)}
                                    labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    <TextArea value={modelId} className={SmsEdits.textAdjust} rows={4}
                                              placeholder="请输入内容" />
                                </FormItem>
                                <FormItem
                                    wrapperCol={{ span: 8, offset: 3 }}
                                    className={SmsEdits.fromitemLast}
                                >
                                    <Button type="primary" htmlType="submit" onClick={this.subClick.bind(this)}>
                                        保存
                                    </Button>
                                    <Link to={`/setting/smsSetting`}>
                                        <Button htmlType="submit" className={SmsEdits.backBut}>
                                            返回
                                        </Button>
                                    </Link>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span={8} className={SmsEdits.factUpdata}>
                            <div className={SmsEdits.test}>
                                您的验证码为：{graphText}，该验证码 5 分钟内有效，请勿泄漏给其他人
                                <span className={SmsEdits.bot}></span>
                                <span className={SmsEdits.top}></span>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}
