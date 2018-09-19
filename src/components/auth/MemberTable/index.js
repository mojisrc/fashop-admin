//@flow

import React, { Component } from "react";
import {
    Table,
    Popconfirm,
    Switch,
    Avatar,
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import EditMemberModal from '../editMemberModal'
import { connect } from "react-redux";
import types from "../../../constants";
import {
    delMember
} from '../../../actions/auth/member';
import {AuthCom,authHoc} from '../../../components/auth/authRules'


type Props = {
    dispatch: Function,
    memberList: {
        list: Array<{}>,
        total_number: number,
    },
    memberListLoading: boolean,
}
type State = {
    visible: boolean,
    onSelectMemeber: {
        nickname: string,
        avatar: string,
        id: number,
    }
}


@authHoc({
    rules: ['member/list','member/edit','member/del']
})
@connect(({auth:{member:{
    memberList,
    memberListLoading,
}}})=>({
    memberList,
    memberListLoading,
}))
export default class MemberTable extends Component<Props,State> {
    static defaultProps = {
        dispatch: ()=>{},
        memberList: {
            list: [],
            total_number: 0,
        },
        memberListLoading: false,
    }
    state = {
        visible:false,
        onSelectMemeber:{
            nickname: '',
            avatar: '',
            id: 0,
        }
    }
    fetch = ()=>{
        const {
            dispatch,
        } = this.props
        dispatch({
            type: types.member.MEMBER_LIST_LOADING,
        })
    }
    componentDidMount() {
        this.fetch()
    }
    render() {
        const { visible, onSelectMemeber } = this.state
        const {
            memberList,
            memberListLoading,
            dispatch,
        } = this.props
        const {
            list,
            total_number,
        } = memberList
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
            },{
                title: '启用状态',
                dataIndex: 'state',
                render:(text) => <Switch checked={!!text} />
            },{
                title: "操作",
                key: "operation",
                render: (text, record) => {
                    return (
                        <View className={styles.operation}>
                            <AuthCom rules={['member/edit']}>
                                <a
                                    onClick={()=>{
                                        this.setState({
                                            visible: true,
                                            onSelectMemeber:{
                                                nickname: record.nickname,
                                                avatar: record.avatar,
                                                id: record.id
                                            },
                                        })
                                    }}
                                >
                                    编辑
                                </a>
                            </AuthCom>
                            <AuthCom rules={['member/del']}>
                                <Popconfirm
                                    title="确认删除？"
                                    okText="确认"
                                    cancelText="取消"
                                    onConfirm={()=>{
                                        dispatch(delMember({id:record.id}))
                                    }}
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            </AuthCom>
                        </View>
                    );
                },
            }
        ]
        return (
            <div>
                <EditMemberModal
                    visible={visible}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    initialValue={onSelectMemeber}
                    id={onSelectMemeber.id}
                />
                <AuthCom rules={['member/list']} hide={false}>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={list}
                        pagination={{
                            showSizeChanger:true,
                            showQuickJumper:true,
                            pageSize:10,
                            total: total_number,
                        }}
                        onChange={(pagination)=>{
                        }}
                        loading={memberListLoading}
                        bordered={true}
                    />
                </AuthCom>
            </div>
        )
    }
}
