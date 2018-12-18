import React from 'react'
import { View } from '@/components/flexView'
import { Icon, Table,  Alert, Popover, Input, Popconfirm, Select, Upload, message, Modal } from 'antd'
import styles from './index.css'
import { imageUpload } from "@/utils";

const Option = Select.Option;
//
// type Props = {
//     wechatConfigInfo:{
//         account:string,
//         description:string,
//         level:number,
//         original:string,
//         app_id:string,
//         app_key:string,
//         app_secret:string,
//         headimg:string,
//         name:string,
//         qrcode:string,
//     },
//     editWechatConfig:Function,
// }
// type State = {
//     activeId:string,
//     activeValue:string,
//     app_key_new:string,
//     app_secret_new:string,
//     appSecretVisible:boolean,
// }

export default class BasicsSetting extends React.Component {
    state = {
        activeId:'-1',
        activeValue:'',
        app_key_new:'',
        app_secret_new:'',
        appSecretVisible:false
    }
    render() {
        const { activeId, activeValue, app_key_new, app_secret_new, appSecretVisible } = this.state
        const { wechatConfigInfo, editWechatConfig } = this.props
        const {
            account, description,
            level, original,
            app_id, headimg,
            name, qrcode ,
            app_key, app_secret ,
        } = wechatConfigInfo
        const accountType = [
            {
                id:1,
                title:'普通订阅号',
            }, {
                id:2,
                title:'普通服务号',
            }, {
                id:'3',
                title:'认证订阅号',
            }, {
                id:'4',
                title:'认证服务号/认证媒体/政府订阅号',
            }
        ]
        const columns = [
            {
                title: '',
                dataIndex: 'name',
                width:'20%'
            }, {
                title: '',
                dataIndex: 'value',
                render: (text, record) =>
                record.id===activeId ?
                <View>
                    {
                        record.id==='3' ?
                        <Select
                            placeholder="请选择账号类型"
                            style={{
                                width:300
                            }}
                            value={activeValue.length ? activeValue : text}
                            onChange={(value)=>{
                                this.setState({
                                    activeValue:value
                                })
                            }}
                        >
                            {
                                accountType.map((accountTypeItem,index)=>
                                    <Option
                                        key={index}
                                        value={accountTypeItem.id}
                                    >
                                        {
                                            accountTypeItem.title
                                        }
                                    </Option>
                                )
                            }
                        </Select> :
                        <Input
                            style={{
                                width:300
                            }}
                            value={activeValue.length ? activeValue : text}
                            onChange={(e)=>{
                                this.setState({
                                    activeValue:e.target.value
                                })
                            }}
                        />
                    }
                </View> :
                record.name==='AppSecret' ?
                <a
                    onClick={()=>{
                        Modal.info({
                            title: 'AppSecret',
                            width:440,
                            content: (
                                <div>
                                    <p>app_key : {app_key}</p>
                                    <p>app_secret : {app_secret}</p>
                                </div>
                            ),
                            onOk() {},
                        })
                    }}
                >
                    查看
                </a> :
                <span>{text}</span>
            }, {
                title: '',
                render: (text, record) =>
                record.id==='6' ? <a
                    onClick={()=>{
                        this.setState({
                            appSecretVisible:true
                        })
                    }}
                >
                    修改
                </a> :
                record.id===activeId ?
                <View className={styles.opration}>
                    <a
                        onClick={()=>{
                            this.resetState()
                        }}
                    >
                        取消
                    </a>
                    <Popconfirm
                        title="确认保存?"
                        okText="保存"
                        cancelText="取消"
                        onCancel={()=>{
                            this.resetState()
                        }}
                        onConfirm={()=>{
                            let editInfo = this.returnNewEdit()
                            let params = Object.assign({}, wechatConfigInfo, editInfo)
                            editWechatConfig({
                                params
                            })
                            this.resetState()
                        }}
                    >
                        <a>
                            保存
                        </a>
                    </Popconfirm>
                </View> :
                <a
                    onClick={()=>{
                        this.setState({
                            activeId:record.id
                        })
                    }}
                >
                    修改
                </a>,
            }
        ]
        const data = [
            {
                id: 1,
                name: '账号',
                value: account,
            }, {
                id: 2,
                name: '公众号描述',
                value: description,
            }, {
                id: '3',
                name: '账号类型',
                value: level===1 ? '普通订阅号' :
                level===2 ? '普通服务号' :
                level===3 ? '认证订阅号' :
                level===4 ? '认证服务号/认证媒体/政府订阅号' : '' ,
            }, {
                id: '4',
                name: '原始ID',
                value: original,
            }, {
                id: '5',
                name: 'AppID',
                value: app_id,
            }, {
                id: '6',
                name: 'AppSecret',
                value: '查看',
            }
        ]
        return (
            <View className={`${styles.container} publicAccountsBasicSetting`}>
                <Alert
                    message="帮助提示"
                    description={(
                        <div>
                            已获得该公众号的所有接口权限，可以正常对接微信。如果使用中发现接口有异常，或账号信息更新时，您可以：<br/>
                            <a>重新授权</a>
                        </div>
                    )}
                    type="info"
                    showIcon
                />
                <View className={styles.tableView}>
                    <Table
                        bordered
                        showHeader={false}
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={data}
                        title={() =>
                            <View className={styles.tableTitleView}>
                                <p>
                                    公众号设置
                                </p>
                                <View className={styles.tableTitleMain}>
                                    <View className={styles.avatar}>
                                        <Upload
                                            name="upload"
                                            showUploadList={false}
                                            beforeUpload={beforeUpload}
                                            customRequest={({file})=>{
                                                imageUpload({
                                                    file,
                                                    onSuccess:(e:{origin:{path:string}})=>{
                                                        let params = Object.assign({}, wechatConfigInfo, {headimg:e.origin.path})
                                                        editWechatConfig({
                                                            params
                                                        })
                                                    }
                                                })
                                            }}
                                        >
                                            <View className={styles.uploadView}>
                                                <img
                                                    alt=''
                                                    src={headimg}
                                                />
                                                <View className={styles.cover} />
                                            </View>
                                        </Upload>
                                    </View>
                                    {
                                        activeId==='7' ?
                                        <View className={styles.opration}>
                                            <Input
                                                style={{
                                                    width:200,
                                                    marginRight:10,
                                                    marginTop:10,
                                                }}
                                                value={activeValue.length ? activeValue : name}
                                                onChange={(e)=>{
                                                    this.setState({
                                                        activeValue:e.target.value
                                                    })
                                                }}
                                            />
                                            <a
                                                onClick={()=>{
                                                    this.resetState()
                                                }}
                                            >
                                                取消
                                            </a>
                                            <Popconfirm
                                                title="确认保存?"
                                                okText="保存"
                                                cancelText="取消"
                                                onCancel={()=>{
                                                    this.resetState()
                                                }}
                                                onConfirm={()=>{
                                                    let editInfo = this.returnNewEdit()
                                                    let params = Object.assign({}, wechatConfigInfo, editInfo)
                                                    editWechatConfig({
                                                        params
                                                    })
                                                    this.resetState()
                                                }}
                                            >
                                                <a>
                                                    保存
                                                </a>
                                            </Popconfirm>
                                        </View> :
                                        <h3>
                                            {name}
                                            <Icon
                                                type="edit"
                                                onClick={()=>{
                                                    this.setState({
                                                        activeId:'7'
                                                    })
                                                }}
                                            />
                                        </h3>
                                    }
                                    <Popover
                                        placement='bottom'
                                        content={(
                                            <View className={styles.bigqrcode}>
                                                <img
                                                    alt=''
                                                    src={qrcode}
                                                />
                                            </View>
                                        )}
                                    >
                                        <View className={styles.qrcode}>
                                            <img
                                                alt=''
                                                src={qrcode}
                                            />
                                        </View>
                                    </Popover>
                                </View>
                            </View>
                        }
                    />
                </View>
                <Modal
                    title="修改 AppSecret"
                    visible={appSecretVisible}
                    width={500}
                    onOk={()=>{
                        let params = Object.assign({}, wechatConfigInfo, {
                            app_key:app_key_new.length ? app_key_new : app_key,
                            app_secret:app_secret_new.length ? app_secret_new : app_secret
                        })
                        editWechatConfig({
                            params
                        })
                        this.resetState()
                    }}
                    onCancel={()=>{
                        this.resetState()
                    }}
                >
                    <div>
                        <p>
                            app_key :
                            <Input
                                style={{
                                    width:200,
                                    marginLeft:10
                                }}
                                defaultValue={app_key}
                                onChange={(e)=>{
                                    this.setState({
                                        app_key_new:e.target.value
                                    })
                                }}
                            />
                        </p>
                        <p>
                            app_secret :
                            <Input
                                style={{
                                    width:300,
                                    marginLeft:10
                                }}
                                defaultValue={app_secret}
                                onChange={(e)=>{
                                    this.setState({
                                        app_secret_new:e.target.value
                                    })
                                }}
                            />
                        </p>
                    </div>
                </Modal>
            </View>
        )
    }
    returnNewEdit(){
        const { activeId, activeValue } = this.state
        switch (activeId) {
            case 1: return {account:activeValue}
            case 2: return {description:activeValue}
            case '3': return {level:activeValue}
            case '4': return {original:activeValue}
            case '5': return {app_key:activeValue}
            case '7': return {name:activeValue}
            default:

        }
    }
    resetState(){
        this.setState({
            activeId:'-1',
            activeValue:'',
            app_key_new:'',
            app_secret_new:'',
            appSecretVisible:false,
        })
    }
}

function beforeUpload(file) {
    const isImage = file.type.includes('image')!==-1;
    if (!isImage) {
        message.error('你只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片不能超过2MB!');
    }
    return isImage && isLt2M;
}
