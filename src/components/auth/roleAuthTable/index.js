//@flow

import React, { Component } from "react";
import {
    Checkbox,
    Button,
} from "antd";
import styles from "./index.css";
import { View, ScrollView } from "react-web-dom";
import {
    groupAuthInfo
} from "../../../actions/auth/role";
import { connect } from "react-redux";
import { publicFunction } from "../../../utils";
import { saveAuthRuleids } from "../../../actions/auth/role";
import { AuthCom, authHoc } from '../../../components/auth/authRules'

const { unique } = publicFunction
const CheckboxGroup = Checkbox.Group;


type Props = {
    dispatch: Function,
    authTree: Array<{
        _child: Array<{
            id: number,
            title: string
        }>,
        title: string
    }>,
    selectRuleids: Array<string>,
    id: number,
    authTreeMap: Array<{ id: number }>,
}
type State = {
    selectRuleids: Array<string>,
}

@authHoc({
    rules: ['auth/grouplist', 'auth/groupmemberedit']
})
@connect(({
              auth: {
                  authIndex: {
                      authTree,
                      authTreeMap,
                  },
                  group: {
                      selectRuleids
                  },
              },
          }) => ({
    authTree,
    selectRuleids,
    authTreeMap,
}))
export default class RoleAuthTable extends Component <Props, State> {
    static defaultProps = {
        authTreeMap: [],
        authTree: [],
        dispatch: () => {
        },
        selectRuleids: [],
    }
    state = {
        selectRuleids: [],
    }

    componentDidMount() {
        const {
            dispatch,
            id,
        } = this.props
        dispatch(groupAuthInfo({
            id
        }))
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.selectRuleids !== this.props.selectRuleids) {
            this.setState({
                selectRuleids: nextProps.selectRuleids
            })
        }
        if (this.props.id !== nextProps.id) {
            const {
                dispatch
            } = this.props
            dispatch(groupAuthInfo({
                id: nextProps.id
            }))
        }
    }

    onSave = () => {
        const {
            selectRuleids
        } = this.state
        const {
            dispatch,
            id,
        } = this.props
        dispatch(saveAuthRuleids({
            rule_ids: selectRuleids,
            id,
        }))
    }
    // getSelectRuleidsTitle = (e)=>{
    //     const {
    //         authTreeMap
    //     } = this.props
    //     return e.map((item)=>{
    //         const index = authTreeMap.findIndex((a)=>Number(item)===a.id)
    //         if(index!==-1){
    //             return authTreeMap[index].title
    //         }else {
    //             return ''
    //         }
    //     })
    // }
    render() {
        const {
            selectRuleids
        } = this.state
        const {
            authTree,
            authTreeMap,
        } = this.props
        const allAuth = authTreeMap.map((e) => `${e.id}`)
        const isAllChecked = selectRuleids.length === allAuth.length
        return (
            <div>
                <View className={styles.checkedAllWarp}>
                    <p>设置角色对应的功能操作、应用管理、后台管理权限</p>
                    <AuthCom rules={['auth/groupmemberedit']}>
                        <View className={styles.view1}>
                            <Button
                                onClick={this.onSave}
                                type={'primary'}
                                style={{ marginRight: 30 }}
                            >
                                保存
                            </Button>
                            <Checkbox
                                indeterminate={!isAllChecked && selectRuleids.length > 0}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        this.setState({
                                            selectRuleids: allAuth,
                                        })
                                    } else {
                                        this.setState({
                                            selectRuleids: [],
                                        })
                                    }
                                }}
                                checked={isAllChecked}
                            >
                                全选
                            </Checkbox>
                        </View>
                    </AuthCom>
                </View>
                <AuthCom rules={['auth/groupinfo']} hide={false}>
                    <ScrollView style={{ height: 500 }} block={true}>
                        {
                            authTree.map((item: { _child: Array<{ id: number, title: string }>, title: string }, i: number) => {
                                const thisRosChecked = item._child.filter((e) => selectRuleids.includes(`${e.id}`))
                                const thisRosCheckedNumber = thisRosChecked.length
                                const isRowsAllChecked = thisRosCheckedNumber === item._child.length
                                const checkboxGroupOptions = item._child.map((sub) => ({
                                    value: `${sub.id}`,
                                    label: sub.title
                                }))
                                return (
                                    <View key={i} className={styles.table}>
                                        <View className={styles.tableLeft}>
                                            <Checkbox
                                                indeterminate={!isRowsAllChecked && thisRosCheckedNumber > 0}
                                                onChange={(e) => {
                                                    const {
                                                        checked
                                                    } = e.target
                                                    if (checked) {
                                                        const childArray = item._child.map((e) => `${e.id}`)
                                                        this.setState({
                                                            selectRuleids: unique([...childArray, ...selectRuleids])
                                                        })
                                                    } else {
                                                        const newArray = [...selectRuleids]
                                                        thisRosChecked.map((e) => {
                                                            const index = newArray.findIndex((item) => item === `${e.id}`)
                                                            if (index !== -1) {
                                                                newArray.splice(index, 1)
                                                            }
                                                        })
                                                        this.setState({
                                                            selectRuleids: newArray
                                                        })
                                                    }
                                                }}
                                                checked={isRowsAllChecked && thisRosChecked.length > 0}
                                            >
                                                {item.title}
                                            </Checkbox>
                                        </View>
                                        <View className={styles.tableRight}>
                                            <CheckboxGroup
                                                options={checkboxGroupOptions}
                                                value={selectRuleids}
                                                onChange={(e) => {
                                                    this.setState({
                                                        selectRuleids: e
                                                    })
                                                }}
                                            />
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </AuthCom>
            </div>
        )
    }
}
