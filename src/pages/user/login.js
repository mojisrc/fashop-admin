import React, { Component } from "react";
import { connect } from "dva";
import { formatMessage, FormattedMessage } from "umi/locale";
import { Alert } from "antd";
import Login from "@/components/login";
import styles from "./login.less";

const { UserName, Password, Submit } = Login;

@connect(({ member, loading }) => ({
    login: member.login,
    submitting: loading.effects["member/login"]
}))
class LoginPage extends Component {
    state = {};

    handleSubmit = (err, values) => {
        const { type } = this.state;
        if (!err) {
            const { dispatch } = this.props;
            dispatch({
                type: "member/login",
                payload: {
                    ...values,
                    type
                }
            });
        }
    };

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );

    render() {
        const { login, submitting } = this.props;
        const { type } = this.state;
        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form;
                    }}
                >
                    {login.status === "error" &&
                    login.type === "account" &&
                    !submitting &&
                    this.renderMessage(formatMessage({ id: "app.login.message-invalid-credentials" }))}
                    <UserName
                        name="username"
                        placeholder={`${formatMessage({ id: "app.login.userName" })}`}
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: "validation.userName.required" })
                            }
                        ]}
                    />
                    <Password
                        name="password"
                        placeholder={`${formatMessage({ id: "app.login.password" })}`}
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: "validation.password.required" })
                            }
                        ]}
                        onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
                    />

                    <Submit loading={submitting}>
                        <FormattedMessage id="app.login.login" />
                    </Submit>
                </Login>
            </div>
        );
    }
}

export default LoginPage;
