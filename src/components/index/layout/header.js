//@flow
import React, { Component } from "react";
import {
    Menu,
    Icon,
    Avatar,
    Dropdown,
    Modal,
    Button,
    Input,
    Form,
    message
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import types from "../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HeaderBreadcrumb from "../../headerBreadcrumb";
import Fetch from "../../../utils/fetch";
import { MemberApi } from "../../../config/api/member";

const FormItem = Form.Item;

type Props = {
    history: {
        location: {
            pathname: string
        },
        push: Function
    },
    dispatch: Function,
    breadcrumbNameMap: {},
    routerData: {},
    routes: [],
    location: { pathname: string },
    userInfo: {
        avatar: string,
        nickname: string,
        username: string
    }
};

type State = {
    passwordEditShow: boolean
};

@withRouter
@connect(({ app: { member: { userInfo } } }) => ({ userInfo }))
export default class LayoutHeader extends Component<Props, State> {
    static defaultProps = {
        dispatch: () => {
        },
        history: {
            location: {
                pathname: ''
            },
            push: () => {
            },
        },
        userInfo: {
            avatar: '',
            nickname: '',
            username: '',
        }
    }
    state = {
        passwordEditShow: false
    };

    getDefaultCollapsedBreadcrumb(props: Props) {
        const { location: { pathname } } = props.history || this.props.history;
        let snippets = pathname.split("/");
        snippets.shift();
        snippets = snippets.map((item, index) => {
            if (index > 0) {
                return snippets.slice(0, index + 1).join("/");
            }
            return item;
        });
        snippets.shift();
        return snippets;
    }

    render() {
        const {
            dispatch,
            userInfo,
            routes,
            breadcrumbNameMap,
            location
        } = this.props;
        const { passwordEditShow } = this.state;
        return (
            <View className={styles.header}>
                <View className={styles.breadTitle}>
                    <HeaderBreadcrumb routes={routes} location={location} breadcrumbNameMap={breadcrumbNameMap}
                                      tabActiveKey={location.pathname} />
                </View>
                <Dropdown
                    overlay={
                        <Menu
                            onClick={({ key }) => {
                                switch (key) {
                                    case "userInfo":
                                        return this.props.history.push(
                                            "/member/self"
                                        );
                                    case "passwordEdit":
                                        return this.setState({
                                            passwordEditShow: true
                                        });
                                    case "logout":
                                        return dispatch({
                                            type: types.member.USER_SIGN_OUT
                                        });
                                    default:
                                }
                            }}
                        >
                            {/*<Menu.Item key="userInfo">*/}
                                {/*<span>个人资料</span>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key="passwordEdit">
                                <span>修改密码</span>
                            </Menu.Item>
                            <Menu.Item key="logout">
                                <span>退出账号</span>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <View className={styles.avatarName}>
                        {/*<Avatar*/}
                            {/*style={{*/}
                                {/*color: "#f56a00",*/}
                                {/*backgroundColor: "#fde3cf"*/}
                            {/*}}*/}
                            {/*src={userInfo.avatar}*/}
                        {/*>*/}
                            {/*{userInfo.nickname}*/}
                        {/*</Avatar>*/}
                        <span>{userInfo.username}</span>
                        <Icon type="down" />
                    </View>
                </Dropdown>
                <Modal
                    title="修改密码"
                    visible={passwordEditShow}
                    footer={null}
                    onCancel={() => {
                        this.setState({ passwordEditShow: false });
                    }}
                >
                    <EditPasswordForm
                        {...this.props}
                        close={() => {
                            this.setState({ passwordEditShow: false });
                        }}
                    />
                </Modal>
            </View>
        );
    }
}

@Form.create()
class EditPasswordForm extends Component<{
    form: {
        validateFieldsAndScroll: Function,
        getFieldValue: Function,
        validateFields: Function,
        getFieldDecorator: Function
    },
    close: Function
},
    {
        confirmDirty: boolean
    }> {
    static defaultProps = {
        form: {
            validateFieldsAndScroll: () => {
            },
            getFieldValue: () => {
            },
            validateFields: () => {
            },
            getFieldDecorator: () => {
            },
        }
    }
    state = {
        confirmDirty: false
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const editResult = await Fetch.fetch({
                    api: MemberApi.selfPassword,
                    params: {
                        password: values.password,
                        oldpassword: values.oldpassword,
                    }
                })
                if (editResult.code === 0) {
                    message.success("修改成功")
                } else {
                    message.warning(editResult.msg)
                }
                this.props.close()
            }
        })
    }
    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value === form.getFieldValue("oldpassword")) {
            callback("两次密码不能一样");
        } else {
            callback();
        }
    };
    render() {
        const { form, close } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="现密码">
                    {getFieldDecorator("oldpassword", {
                        rules: [
                            {
                                required: true,
                                message: "请输入现密码"
                            }
                        ]
                    })(<Input type="password" placeholder="请输入新密码" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="新密码">
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "请输入确认密码"
                            },
                            {
                                validator: this.checkPassword
                            }
                        ]
                    })(
                        <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                            placeholder="请再次输入密码"
                        />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button
                        style={{
                            marginRight: 10
                        }}
                        onClick={() => {
                            close();
                        }}
                    >
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
