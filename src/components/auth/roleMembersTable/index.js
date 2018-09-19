//@flow

import React, { Component } from "react";
import {
    Table,
    Popconfirm,
    Switch,
    Avatar,
    Button,
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { data } from "./testData";
import RoleMembersModal from '../addMemberModal'
import { connect } from "react-redux";
import types from "../../../constants";
import {AuthCom,authHoc} from '../../../components/auth/authRules'

type Props = {
    dispatch: Function,
    id: null|number,
    groupMemberList: Array<{}>,
    groupMemberListLoading: boolean,
    editGroupMember: Function,
}
type State = {
    roleMembersVisible: boolean,
    currentRoleMemeber: {}
}


@authHoc({
    rules: ['auth/groupmemberlist','auth/groupmemberedit']
})
@connect(({auth:{group:{
    groupMemberList,
    groupMemberListLoading,
}}})=>({
    groupMemberList,
    groupMemberListLoading,
}))
export default class OrderManagementTable extends Component<Props,State> {
    static defaultProps = {
        dispatch: ()=>{},
        groupMemberList: [],
        groupMemberListLoading: false,
    }
    state = {
        roleMembersVisible:false,
        currentRoleMemeber:{}
    }
    fetch = (params?:{})=>{
        const {
            dispatch,
            id,
        } = this.props
        dispatch({
            type: types.auth.GET_AUTH_GROUP_MEMBER_LIST,
            params: params||{id}
        })
    }
    componentWillReceiveProps(nextProps:Props) {
        if(this.props.id!==nextProps.id){
            this.fetch({
                id: nextProps.id
            })
        }
    }
    componentDidMount() {
        this.fetch()
    }
    render() {
        const { roleMembersVisible, currentRoleMemeber } = this.state
        const {
            groupMemberList,
            groupMemberListLoading,
            editGroupMember,
        } = this.props
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },{
                title: '头像',
                dataIndex: 'avatar',
                render:(e,a) => (
                    <Avatar src={e}>{a.nickname}</Avatar>
                )
            },{
                title: '用户名',
                dataIndex: 'username',
            },{
                title: '昵称',
                dataIndex: 'nickname',
            }
        ]
        return (
            <div>
                <View className={styles.view1}>
                    <AuthCom rules={['auth/groupmemberedit']}>
                        <Button
                            type={'primary'}
                            onClick={editGroupMember}
                            icon="user-add"
                        >
                            编辑成员
                        </Button>
                    </AuthCom>
                </View>
                <AuthCom rules={['auth/groupmemberlist']} hide={false}>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={groupMemberList}
                        pagination={false}
                        onChange={(pagination, filters, sorter)=>{
                            console.log(pagination);
                        }}
                        loading={groupMemberListLoading}
                        bordered={true}
                    />
                </AuthCom>
            </div>
        )
    }
}
