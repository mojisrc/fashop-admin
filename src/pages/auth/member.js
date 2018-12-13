import React, { Component } from "react";
import {Row,Button} from "antd";
import Page from "@/components/public/page";
import MemberTable from "@/components/auth/MemberTable";
import AddMemberModal from '@/components/auth/addMemberModal'
import {AuthCom,authHoc} from '@/components/auth/authRules'
import authSignConfig from '@/utils/authSignConfig'

@authHoc({
    rules: authSignConfig.auth.member
})
export default class Member extends Component {
    state = {
        roleMembersVisible: false,
    };
    changeRoleMembersModalVisible = (e: boolean)=>{
        this.setState({
            roleMembersVisible: e,
        })
    }
    render(){
        const {
            roleMembersVisible
        } = this.state

        return(
            <Page>
                <AuthCom rules={['member/add']}>
                    <Row
                        style={{
                            paddingBottom:'24px',
                            marginBottom:'24px',
                            borderBottom:'1px dashed #ededed'
                        }}
                        justify={'end'}
                        type={'flex'}
                    >
                        <Button
                            type={'primary'}
                            onClick={()=>{
                                this.changeRoleMembersModalVisible(true)
                            }}
                        >
                            添加成员
                        </Button>
                    </Row>
                </AuthCom>
                <MemberTable/>
                <AddMemberModal
                    type='add'
                    visible={roleMembersVisible}
                    onCancel={()=>{
                        this.changeRoleMembersModalVisible(false)
                    }}
                />
            </Page>
        )
    }
}
