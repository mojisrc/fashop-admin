import React, { Component } from "react";
import { View } from "react-web-dom";
import { connect } from "react-redux";
import styles from "../styles/containers/index.css"
import types from "../constants";
import {
    withRouter,
    Redirect,
} from 'react-router-dom'

import { LocaleProvider, Spin } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

@withRouter
@connect(({
              app: {
                  app: {
                      initUserInfoStorageState,
                  },
                  member: {
                      login,
                  }
              },
              auth: {
                  auth: {
                      authTree,
                  }
              }
          }) => ({
    initUserInfoStorageState,
    login,
    authTree,
}))
export default class Container extends Component {
    componentWillMount() {
        const {
            dispatch
        } = this.props
        dispatch({
            type: types.member.INIT_USER_INFO_STORAGE
        })
    }

    render() {
        const {
            initUserInfoStorageState,
            login,
            location: {
                pathname
            },
            authTree,
        } = this.props
        //初始化用户信息over
        if (!initUserInfoStorageState) {
            return <div>初始化用户信息中</div>
        }

        //验证登录状态
        if (!login && pathname !== '/member/login') {
            return <Redirect to="/member/login" />
        }

        if (login && !authTree.length) {
            // 初始化中
            return <View className={styles.containerInit}><Spin /></View>
        }

        return (
            <LocaleProvider locale={zh_CN}>
                {this.props.children}
            </LocaleProvider>
        )
    }
}
