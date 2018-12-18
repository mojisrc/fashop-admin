import React, { Component } from "react";
import { connect } from 'dva';
import { Form, Button, Input, Icon } from "antd";
import { View } from "@/components/flexView";
import styles from '@/styles/user/login.css'

const FormItem = Form.Item

@connect(({ app: { member: { fetchLoginLoading } } }) => ({
    fetchLoginLoading
}))
@Form.create()
export default class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const {
            dispatch,
            form,
        } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: types.member.USER_LOGIN,
                    params: values,
                })
            }
        })
    }

    componentDidMount() {
        // const {
        //     dispatch
        // } = this.props
        // dispatch({
        //     type: types.member.GET_VERIFY_CODE
        // })
    }

    render() {
        const {
            fetchLoginLoading,
            form,
        } = this.props
        const { getFieldDecorator } = form;
        return (
            <View className={styles.loginBgc}>
                <View className={styles.loginWarp}>
                    <View className={styles.logo}>
                        <img
                            alt={'logo'}
                            src={'/logo-black.png'}
                        />
                    </View>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                    size="large"
                                    placeholder="请输入用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            style={{ marginTop: 15 }}
                        >
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                    size="large"
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            )}
                        </FormItem>
                        {/*<FormItem*/}
                        {/*style={{ marginTop: 15 }}*/}
                        {/*>*/}
                        {/*{getFieldDecorator('verify_code', {*/}
                        {/*rules: [*/}
                        {/*{*/}
                        {/*required: true,*/}
                        {/*message: '请输入验证码',*/}
                        {/*},*/}
                        {/*],*/}
                        {/*})(*/}
                        {/*<Input*/}
                        {/*prefix={<Icon type="lock" style={{ fontSize: 13 }} />}*/}
                        {/*size="large"*/}
                        {/*placeholder="请输入验证码"*/}
                        {/*/>*/}
                        {/*)}*/}
                        {/*</FormItem>*/}
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ width: '100%', marginTop: 10 }}
                            size={'large'}
                            loading={fetchLoginLoading}
                        >
                            登录
                        </Button>
                    </Form>
                </View>
            </View>
        )
    }
}
