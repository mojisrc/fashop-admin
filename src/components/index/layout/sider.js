//@flow

import React, { Component } from "react";
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Avatar,
    Row,
    Col,
    Dropdown,
    Modal,
    Form,
    Button,
    Input
} from "antd";
import styles from "./index.css";
import { Link } from "react-router-dom";
import { View } from "react-web-dom";
import { routerConfig } from "./routerConfig";
import types from "../../../constants";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const { routers } = routerConfig;
const {  Sider } = Layout;
const { SubMenu } = Menu;

type Props = {
    history: {
        location: {
            pathname: string
        },
        push: Function
    },
    userInfo: {
        rules: Array<string>
    },
    dispatch: Function,
    collapsed: boolean
};

type State = {
    openKeys: Array<string>,
};

@withRouter
@connect(({app:{appInitial:{collapsed},user:{userInfo}}})=>({collapsed,userInfo}))
export default class LayoutSider extends Component<Props, State> {
    static defaultProps = {
        dispatch: ()=>{},
        history: {
            location: {
                pathname: ''
            },
            push: ()=>{},
        },
        collapsed: false,
    }
    constructor(props: Props) {
        super(props);
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props),
        };
    }
    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            openKeys: nextProps.collapsed?[]:this.getDefaultCollapsedSubMenus(nextProps)
        });
    }
    getDefaultCollapsedSubMenus(props: Props) {
        const { location: { pathname } } = props.history || this.props.history;
        let snippets = pathname.split("/");
        snippets.pop();
        snippets.shift();
        snippets = snippets.map((item, index) => {
            if (index > 0) {
                return snippets.slice(0, index + 1).join("/");
            }
            return item;
        });
        return snippets;
    }
    handleOpenChange = (openKeys: string) => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = routers.some(
            item => lastOpenKey && item.path === lastOpenKey
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys]
        });
    };
    onCollapse = (collapsed: boolean) => {
        this.props.dispatch({
            type: types.app.APP_SIDER_COLLAPSE,
            collapsed,
        })
    };
    routerAuthFilter = (ra:any,userRules:Array<string>)=>{
        const authRules = (rules)=>{
            const meetAuth = rules.filter((e)=>userRules.includes(e))
            return meetAuth.length>0
        }
        let routerArray = []
        ra.map((e,i)=>{
            if(e.children){
                const e2 = {...e}
                e2.children = []
                routerArray.push(e2)
                e.children.map((a,j)=>{
                    if(a.children){
                        const a2 = {...a}
                        a2.children = []
                        routerArray[i].children.push(e2)
                        a.children.map((c,z)=>{
                            if(c.rules){
                                if(authRules(c.rules)){
                                    routerArray[i].children[j].children.push(c)
                                }
                            }else {
                                routerArray[i].children[j].children.push(c)
                            }
                        })
                    }else {
                        if(a.rules){
                            if(authRules(a.rules)){
                                routerArray[i].children.push(a)
                            }
                        }else {
                            routerArray[i].children.push(a)
                        }
                    }
                })
            }else {
                if(e.rules){
                    if(authRules(e.rules)){
                        routerArray.push(e)
                    }
                }else {
                    routerArray.push(e)
                }
            }
        })
        return routerArray
    }
    render() {
        const {  collapsed, history,userInfo } = this.props;
        const { openKeys } = this.state;
        const { location } = history;

        const routerArray = this.routerAuthFilter(routers,userInfo.rules)

        return (
            <Sider
                collapsed={collapsed}
                onCollapse={this.onCollapse}
                collapsible
                breakpoint="lg"
                style={{
                    overflow: "visible",
                    minHeight: "100vh",
                    position: "relative",
                    left: 0,
                    width: "176px",
                    boxShadow: '2px 0 6px rgba(0,21,41,.35)',
                    zIndex: 10
                }}
            >
                <View className={styles.logo}>
                    <img
                        alt=""
                        src={require("../../../images/logo.png")}
                        style={collapsed?{width:65,height:23}:{width:94,height:31}}
                    />
                </View>
                <Menu
                    style={{marginBottom:48}}
                    inlineCollapsed={false}
                    mode={'inline'}
                    theme="dark"
                    onClick={(item) => {
                        this.props.history.push(`/${item.key}`);
                    }}
                    openKeys={openKeys}
                    selectedKeys={[location.pathname.slice(1)]}
                    onOpenChange={this.handleOpenChange}
                >
                    {routerArray.map((data) => {
                        if (data.children && data.children.length && !data.hideInMenu) {
                            return (
                                <SubMenu
                                    key={data.path}
                                    title={
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <img
                                                alt=""
                                                src={require(`../../../images/menuIcon/${
                                                    data.path
                                                }.png`)}
                                                style={{
                                                    width: "18px",
                                                    height: "18px",
                                                    marginRight: collapsed ? 0 : 10,
                                                    opacity: `${
                                                        openKeys[0] ===
                                                        data.path
                                                            ? "1"
                                                            : "0.65"
                                                    }`
                                                }}
                                                className={"anticon"}
                                            />
                                            <span>{data.title}</span>
                                        </View>
                                    }
                                >
                                    {data.children.map((valueData, j) => {
                                        if (!valueData.hideInMenu) {
                                            if (valueData.children) {
                                                return (
                                                    <SubMenu
                                                        key={`${data.path}/${
                                                            valueData.path
                                                        }`}
                                                        title={valueData.title}
                                                    >
                                                        {valueData.children.map(
                                                            (item, z) => (
                                                                <Menu.Item
                                                                    key={`${
                                                                        data.path
                                                                    }/${
                                                                        valueData.path
                                                                    }/${
                                                                        item.path
                                                                    }`}
                                                                >
                                                                    {item.title}
                                                                </Menu.Item>
                                                            )
                                                        )}
                                                    </SubMenu>
                                                );
                                            } else {
                                                return (
                                                    <Menu.Item
                                                        key={`${data.path}/${
                                                            valueData.path
                                                        }`}
                                                    >
                                                        {valueData.title}
                                                    </Menu.Item>
                                                );
                                            }
                                        } else {
                                            return null;
                                        }
                                    })}
                                </SubMenu>
                            );
                        } else if (!data.hideInMenu) {
                            return (
                                <Menu.Item key={data.path}>
                                    <Icon type={data.icon} />
                                    <span className="nav-text">
                                        {data.title}
                                    </span>
                                </Menu.Item>
                            );
                        }
                    })}
                </Menu>
            </Sider>
        );
    }
}
