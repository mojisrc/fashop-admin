import React, { Component } from "react";
import { connect } from 'dva';
import {
    Tabs,
    Layout,
    Menu,
    Button,
    Popover,
    Input,
    Card,
    Tooltip,
    message,
    Modal,
    Card
} from "antd";
import { View } from "@/components/flexView";
import styles from "@/styles/auth/role.css";
import RoleMembersTable from '@/components/auth/roleMembersTable'
import RoleAuthTable from '@/components/auth/roleAuthTable'
import GroupEditModal from '@/components/auth/groupEditModal'
import types from '../../constants'
import EditGroupMemberModal from '@/components/auth/editGroupMemberModal'
import {AuthCom,authHoc} from '@/components/auth/authRules'
import authSignConfig from '@/utils/authSignConfig'
const MenuItem = Menu.Item;
const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;

@authHoc({
    rules: authSignConfig.auth.role
})
@connect(({auth:{group:{
    groupListLoading,
    groupList,
    groupMemberList,
}}})=>({
    groupListLoading,
    groupList,
    groupMemberList,
}))
export default class RoleOwner extends Component {
    state = {
        onSelectKey: null,
        editModalVisible: false,
        onSelectIndex: null,
        addGroupVisible: false,
        editGroupMemberModalVisible: false,
    }
    addGroupInput = {input:{value:''}}
    changeEditModalVisible = (e: boolean)=>{
        this.setState({
            editModalVisible: e,
        })
    }
    addGroup = ()=>{
        const {
            dispatch
        } = this.props
        const {
            value
        } = this.addGroupInput.input
        if(value.length){
            dispatch(addGroup({
                params:{
                    name: value
                },
                func:()=>{
                    this.changeGroupVisible(false)
                }
            }))
        }else {
            message.warning('请输入角色名称')
        }
    }
    changeGroupVisible = (e:boolean)=>{
        this.setState({
            addGroupVisible: e
        })
    }
    changeGroupMemberVisible = (e:boolean)=>{
        this.setState({
            editGroupMemberModalVisible: e
        })
    }
    closeSelectGroup = ()=>{
        this.setState({
            onSelectKey: null,
            onSelectIndex: null,
        })
    }
    componentDidMount() {
        const {
            dispatch
        } = this.props
        dispatch({
            type: types.auth.GET_AUTH_GROUPLIST
        })
    }
    render() {
        const {
            groupListLoading,
            groupList,
            dispatch,
        } = this.props
        const {
            onSelectKey,
            editModalVisible,
            onSelectIndex,
            addGroupVisible,
            editGroupMemberModalVisible,
        } = this.state
        const onSelectGroup = onSelectIndex!==null?groupList[onSelectIndex]:{}

        return (
            <Layout style={{ margin: '24px', background: '#fff' }}>
                <Sider width={200} style={{ background: '#fff' }}>
                    <AuthCom rules={['auth/groupadd']}>
                        <Header
                            style={{
                                padding: '0 30px',
                                background: '#fff',
                            }}
                        >
                            <Popover
                                placement="rightBottom"
                                title='新增角色'
                                content={(
                                    <View className={styles.popoverContent}>
                                        <Input
                                            placeholder='请输入角色名称'
                                            style={{width:300}}
                                            onPressEnter={()=>{}}
                                            ref={(e)=>{if(e){this.addGroupInput=e}}}
                                        />
                                        <View className={styles.popoverBtnView}>
                                            <Button
                                                onClick={()=>{
                                                    this.changeGroupVisible(false)
                                                }}
                                            >
                                                取消
                                            </Button>
                                            <Button
                                                type='primary'
                                                onClick={this.addGroup}
                                            >
                                                确定
                                            </Button>
                                        </View>
                                    </View>
                                )}
                                trigger="click"
                                onVisibleChange={(e)=>{
                                    this.changeGroupVisible(e)
                                }}
                                visible={addGroupVisible}
                            >
                                <Button type='primary' style={{width:'100%'}}>
                                    新增角色
                                </Button>
                            </Popover>
                        </Header>
                    </AuthCom>
                    <Card loading={groupListLoading} bordered={false} bodyStyle={{padding:0}}>
                        <Menu
                            mode="inline"
                            // defaultSelectedKeys={groupList.length&&[groupList[0].id.toString()]}
                            style={{
                                border:0
                            }}
                            onSelect={({item, key, selectedKeys})=>{
                                const newKey = Number(key)
                                const index = groupList.findIndex((e)=>e.id===newKey)
                                this.setState({
                                    onSelectKey: newKey,
                                    onSelectIndex: index,
                                })
                            }}
                        >
                            {
                                groupList.map((item,index)=>(
                                    <MenuItem
                                        key={item.id}
                                    >
                                        <View className={styles.mentItem}>
                                            <p>{item.name}</p>
                                        </View>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Card>
                </Sider>
                {
                    onSelectKey&&
                    <Content
                        style={{
                            padding: '24px',
                            minHeight: 280 ,
                            borderLeft:'1px solid #f4f4f4'
                        }}
                    >
                        <Tabs
                            tabBarExtraContent={
                                <div>
                                    <AuthCom rules={['auth/groupdel']}>
                                        <Button
                                            type={'danger'}
                                            onClick={()=>{
                                                Modal.confirm({
                                                    title: `你确定要删除${onSelectGroup.name}?`,
                                                    content: "你可想好了",
                                                    okType: 'danger',
                                                    okText: '删除',
                                                    cancelText: '取消',
                                                    onOk:()=>{
                                                        dispatch(groupDel({
                                                            id:onSelectGroup.id,
                                                            func:this.closeSelectGroup,
                                                        }))
                                                    }
                                                })
                                            }}
                                            icon="delete"
                                            style={{marginLeft:30}}
                                        >
                                            删除角色
                                        </Button>
                                    </AuthCom>
                                    <AuthCom rules={['auth/groupedit']}>
                                        <Tooltip title="修改组名">
                                            <Button
                                                type={'danger'}
                                                onClick={()=>{
                                                    this.changeEditModalVisible(true)
                                                }}
                                                style={{marginLeft:30}}
                                                icon="edit"
                                                shape="circle"
                                            />
                                        </Tooltip>
                                    </AuthCom>
                                </div>
                            }
                            animated={false}
                        >
                            <TabPane tab='角色成员' key='0'>
                                <RoleMembersTable
                                    id={onSelectKey}
                                    editGroupMember={()=>{
                                        this.changeGroupMemberVisible(true)
                                    }}
                                />
                            </TabPane>
                            <TabPane tab='功能权限' key='1'>
                                <RoleAuthTable
                                    id={onSelectKey}
                                />
                            </TabPane>
                        </Tabs>
                        <GroupEditModal
                            visible={editModalVisible}
                            initialValue={onSelectGroup?{name:onSelectGroup.name}:{name:''}}
                            onCancel={()=>{
                                this.changeEditModalVisible(false)
                            }}
                            dispatch={dispatch}
                            id={onSelectKey}
                        />
                        <EditGroupMemberModal
                            visible={editGroupMemberModalVisible}
                            onCancel={()=>{
                                this.changeGroupMemberVisible(false)
                            }}
                            id={onSelectKey}
                        />
                    </Content>
                }
            </Layout>
        )
    }
}
