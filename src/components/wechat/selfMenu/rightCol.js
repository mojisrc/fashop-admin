import React,{ Component } from 'react'
import { Form, Card, Input, Radio, Button, Icon, Modal } from 'antd'
import { View } from '@/components/flexView'
import styles from './rightCol.css'
import MsgTab from '../public/msgTab'
import JumpWebpage from './jumpWebpage'
import JumpApplet from './jumpApplet'

const FormItem = Form.Item
const RadioGroup = Radio.Group
//
// type Props = {
//     form:formType,
//     sort:boolean,
//     wechatMenuList:{
//         menu:{
//             button:Array<{
//                 name:string,
//                 type:string,
//                 sub_button:Array<{
//                     name:string,
//                     type:string,
//                 }>
//             }>,
//         }
//     },
//     currentMenu:Array<number>,
//     setWechatMenuList:Function,
//     setCurrentMenu:Function,
//     createWechatMenuList:Function,
// }

const onFieldsChange = (props, fields)=>{
    console.log(fields);
    const { currentMenu, wechatMenuList, setWechatMenuList } = props
    const list = [...wechatMenuList.menu.button]
    if(currentMenu[1]===-1){
        if(fields[`name-${currentMenu[0]}`]){
            list[currentMenu[0]].name=fields[`name-${currentMenu[0]}`].value
        }else if (fields[`type-${currentMenu[0]}`]) {
            list[currentMenu[0]].type=fields[`type-${currentMenu[0]}`].value
        }
    }else {
        if(fields[`name-${currentMenu[0]}-${currentMenu[1]}`]){
            list[currentMenu[0]].sub_button[currentMenu[1]].name=fields[`name-${currentMenu[0]}-${currentMenu[1]}`].value
        }else if (fields[`type-${currentMenu[0]}-${currentMenu[1]}`]) {
            list[currentMenu[0]].sub_button[currentMenu[1]].type=fields[`type-${currentMenu[0]}-${currentMenu[1]}`].value
        }
    }
    setWechatMenuList({
        result:{menu:{button:
            list
        }}
    })
}

@Form.create({
    onFieldsChange,
})
export default class RightCol extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        const { form, wechatMenuList, createWechatMenuList } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // console.log(wechatMenuList);
                createWechatMenuList({
                    params:{
                        buttons:wechatMenuList.menu.button
                    }
                })
            }
        });
    }
    render(){
        const { sort, currentMenu, wechatMenuList } = this.props
        return(
            <View>
                {
                    sort ? this.sortView() :
                    wechatMenuList.menu&&wechatMenuList.menu.button.length&&currentMenu[0]===-1 ?
                    this.clickTishiView() : wechatMenuList.menu&&wechatMenuList.menu.button.length ?
                    this.contentView() : this.emptyView()
                }
            </View>
        )
    }
    emptyView(){
        const { setWechatMenuList, setCurrentMenu } = this.props
        return(
            <View className={styles.emptyView}>
                <View className={styles.emptyImgView}>
                    <img
                        alt='empty'
                        src={require('@/assets/images/fetchStatus/emptyMenu.png')}
                    />
                </View>
                <strong>还没有菜单，点击左图进行操作</strong>
                <Button
                    type='primary'
                    onClick={()=>{
                        setWechatMenuList({
                            result:{menu:{button:
                                [{
                                    type:'click',
                                    name:'菜单名称',
                                    sub_button:[]
                                }]
                            }}
                        })
                        setCurrentMenu({
                            currentMenu:[0,-1]
                        })
                    }}
                >
                    立即添加
                </Button>
            </View>
        )
    }
    clickTishiView(){
        return(
            <View className={styles.emptyView}>
                <p>点击左侧菜单进行编辑操作</p>
            </View>
        )
    }
    sortView(){
        return(
            <View className={styles.emptyView}>
                <p>请通过拖拽左边的菜单进行排序</p>
            </View>
        )
    }
    contentView(){
        const { currentMenu, wechatMenuList } = this.props
        return(
            <Form onSubmit={this.handleSubmit}>
                {
                    currentMenu[1]===-1&&wechatMenuList.menu.button[currentMenu[0]].sub_button.length ?
                    this.fatherChildForm() :
                    currentMenu[1]!==-1 ? this.childForm() :
                    this.fatherNoChildForm()
                }
                <FormItem>
                    <View className={styles.subBtnView}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            保存并发布
                        </Button>
                        <Button>预览</Button>
                    </View>
                </FormItem>
            </Form>
        )
    }
    fatherChildForm(){
        const { form, sort, currentMenu, wechatMenuList } = this.props
        const { getFieldDecorator, getFieldValue } = form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const menuList = wechatMenuList.menu.button
        return(
            <Card
                title={menuList[currentMenu[0]].name}
                extra={
                    <a
                        onClick={()=>{
                            this.fatherDelete({name:menuList[currentMenu[0]].name})
                        }}
                    >
                        删除菜单
                    </a>
                }
                bodyStyle={{
                    minHeight:463
                }}
            >
                <p className={styles.fatherTishi}>已添加子菜单，仅可设置菜单名称。</p>
                <FormItem
                    {...formItemLayout}
                    label="菜单名称"
                    extra='字数不超过4个汉字或8个字母'
                >
                    {getFieldDecorator(`name-${currentMenu[0]}`, {
                        initialValue: menuList[currentMenu[0]].name,
                        rules: [
                            {
                                required: true, message: '菜单名称必填!',
                            }, {
                                pattern:/^([A-z]{1,8}|[\u4e00-\u9fa5]{1,4})$/,
                                message: '字数超过上限!',
                            }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Card>
        )
    }
    fatherNoChildForm(){
        const { form, sort, currentMenu, wechatMenuList } = this.props
        const { getFieldDecorator, getFieldValue } = form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const menuList = wechatMenuList.menu.button
        return(
            <Card
                title={menuList[currentMenu[0]].name}
                extra={
                    <a
                        onClick={()=>{
                            this.fatherDelete({name:menuList[currentMenu[0]].name})
                        }}
                    >
                        删除菜单
                    </a>
                }
                bodyStyle={{
                    minHeight:463
                }}
            >
                <FormItem
                    {...formItemLayout}
                    label="菜单名称"
                    extra='字数不超过4个汉字或8个字母'
                >
                    {getFieldDecorator(`name-${currentMenu[0]}`, {
                        initialValue: menuList[currentMenu[0]].name,
                        rules: [
                            {
                                required: true, message: '菜单名称必填!',
                            }, {
                                pattern:/^([A-z]{1,8}|[\u4e00-\u9fa5]{1,4})$/,
                                message: '字数超过上限!',
                            }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="菜单内容"
                >
                    {getFieldDecorator(`type-${currentMenu[0]}`, {
                        initialValue:menuList[currentMenu[0]].type,
                        rules: [{
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <RadioGroup>
                            <Radio value="click">发送消息</Radio>
                            <Radio value="view">跳转网页</Radio>
                            <Radio value="miniprogram">跳转小程序</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                {
                    getFieldValue(`type-${currentMenu[0]}`)==='click' ?
                    <MsgTab
                        showTabKey={[1,3,4,5]}
                        size='small'
                        initialValue={{}}
                    /> : getFieldValue(`type-${currentMenu[0]}`)==='view' ?
                    <JumpWebpage
                        {...this.props}
                    /> : getFieldValue(`type-${currentMenu[0]}`)==='miniprogram' ?
                    <JumpApplet
                        {...this.props}
                    /> : null
                }
            </Card>
        )
    }
    childForm(){
        const { form, sort, currentMenu, wechatMenuList } = this.props
        const { getFieldDecorator, getFieldValue } = form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const menuList = wechatMenuList.menu.button
        return(
            <Card
                title={menuList[currentMenu[0]].sub_button[currentMenu[1]].name}
                extra={
                    <a
                        onClick={()=>{
                            this.childDelete({name:menuList[currentMenu[0]].sub_button[currentMenu[1]].name})
                        }}
                    >
                        删除子菜单
                    </a>
                }
                bodyStyle={{
                    minHeight:463
                }}
            >
                <FormItem
                    {...formItemLayout}
                    label="子菜单名称"
                    extra='字数不超过8个汉字或16个字母'
                >
                    {getFieldDecorator(`name-${currentMenu[0]}-${currentMenu[1]}`, {
                        initialValue: menuList[currentMenu[0]].sub_button[currentMenu[1]].name,
                        rules: [
                            {
                                required: true, message: '子菜单名称必填!',
                            }, {
                                pattern:/^([A-z]{1,16}|[\u4e00-\u9fa5]{1,8})$/,
                                message: '字数超过上限!',
                            }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="子菜单内容"
                >
                    {getFieldDecorator(`type-${currentMenu[0]}-${currentMenu[1]}`, {
                        initialValue:menuList[currentMenu[0]].sub_button[currentMenu[1]].type,
                        rules: [{
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <RadioGroup>
                            <Radio value="click">发送消息</Radio>
                            <Radio value="view">跳转网页</Radio>
                            <Radio value="miniprogram">跳转小程序</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                {
                    getFieldValue(`type-${currentMenu[0]}-${currentMenu[1]}`)==='click' ?
                    <MsgTab
                        showTabKey={[1,3,4,5]}
                        size='small'
                    /> : getFieldValue(`type-${currentMenu[0]}-${currentMenu[1]}`)==='view' ?
                    <JumpWebpage
                        {...this.props}
                    /> : getFieldValue(`type-${currentMenu[0]}-${currentMenu[1]}`)==='miniprogram' ?
                    <JumpApplet
                        {...this.props}
                    /> : null
                }
            </Card>
        )
    }
    fatherDelete({name}){
        const { wechatMenuList, currentMenu, setWechatMenuList, setCurrentMenu } = this.props
        const list = [...wechatMenuList.menu.button]
        list.splice(currentMenu[0],1)
        Modal.confirm({
            title: '确认删除?',
            content: `删除后“${name}”菜单下设置的内容将被删除`,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                setWechatMenuList({
                    result:{menu:{button:
                        list
                    }}
                })
                setCurrentMenu({currentMenu:[-1,-1]})
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    childDelete({name}:{name:string}){
        const { wechatMenuList, currentMenu, setWechatMenuList, setCurrentMenu } = this.props
        const list = [...wechatMenuList.menu.button]
        list[currentMenu[0]].sub_button.splice(currentMenu[1],1)
        if(!list[currentMenu[0]].sub_button.length){
            delete list[currentMenu[0]].sub_button
        }
        Modal.confirm({
            title: '确认删除?',
            content: `删除后“${name}”菜单下设置的内容将被删除`,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                setWechatMenuList({
                    result:{menu:{button:
                        list
                    }}
                })
                setCurrentMenu({currentMenu:[-1,-1]})
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
}
