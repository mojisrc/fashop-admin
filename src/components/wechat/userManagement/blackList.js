import React,{ Component } from 'react'
import { connect } from "dva";
import { View } from '@/components/flexView'
import { Button, Table, Popover, Popconfirm } from 'antd'
import styles from './index.css'
import PublicPopoverContent from './publicPopoverContent'
import AvatarPopover from '../public/avatarPopover'
//
// type Props = {
//     getWechatuserBlackList:Function,
//     setUserUnblock:Function,
//     editUserRemark:Function,
//     userBlackList:Array<string>,
//     userInfoBlackList:Array<{}>,
// }
// type State = {
//     selectedRowKeys:Array<string>,
//     currentId:string
// }

@connect(
    ({view:{wechatUser:{ userBlackList, userInfoBlackList }}}) => ({
        userBlackList,
        userInfoBlackList,
    }),

)
export default class BlackList extends Component{
    state = {
        selectedRowKeys:[],
        currentId:'-1'
    }
    componentDidMount(){
        this.props.getWechatuserBlackList()
    }
    onSelectChange = (selectedRowKeys:Array<string>) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){
        // console.log(this.props);
        const { selectedRowKeys, currentId } = this.state;
        const { userBlackList, userInfoBlackList } = this.props;
        const columns = [
            {
                title: '头像',
                dataIndex: 'headimgurl',
                className: styles.column,
                width: '10%',
                render: (text, record:{
                    openid:string,
                    headimgurl:string,
                    nickname:string,
                    sex:number,
                    subscribe_time:string,
                    remark:string,
                    tagid_list:Array<string>
                }) =>
                <AvatarPopover
                    record={record}
                    tagList={[]}
                    avatarType='black'
                    editRemarkFunc={(params)=>{
                        this.editRemarkFunc({params})
                    }}
                    addTagFunc={()=>{}}
                    tagWechatUserFunc={()=>{}}
                    blackFunc={()=>{
                        this.userUnblockFunc([record.openid])
                    }}
                />
            }, {
                title: '昵称',
                dataIndex: 'nickname',
                render: (text, record, index) =>
                <span>
                    {
                        record.remark.length ? `${record.remark}(${record.nickname})` : record.nickname
                    }
                </span>
            }, {
                title: '操作',
                width:'20%',
                render: (text, record, index) =>
                <Popover
                    visible={record.openid===currentId}
                    trigger="click"
                    placement="bottomLeft"
                    onVisibleChange={(visible)=>{
                        if(!visible){
                            this.setState({
                                currentId:'-1'
                            })
                        }
                    }}
                    content={(
                        <PublicPopoverContent
                            okFunc={(remark)=>{
                                this.editRemarkFunc({
                                    params:{
                                        openid : currentId,
                                        remark ,
                                    }
                                })
                            }}
                            closePopover={()=>{
                                this.setState({
                                    currentId:'-1'
                                })
                            }}
                            initValue={record.remark.length ? record.remark : record.name}
                        />
                    )}
                >
                    <a
                        onClick={()=>{
                            this.setState({
                                currentId:record.openid
                            })
                        }}
                    >
                        修改备注
                    </a>
                </Popover>
            }
        ]
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <View>
                <View className={styles.btnGroup}>
                    <Popconfirm
                        title='确认移出黑名单？'
                        okText="确定"
                        cancelText="取消"
                        onConfirm={()=>{
                            this.userUnblockFunc(selectedRowKeys)
                            this.setState({
                                selectedRowKeys:[]
                            })
                        }}
                    >
                        <Button
                            type="primary"
                            disabled={!selectedRowKeys.length}
                        >
                            移出黑名单
                        </Button>
                    </Popconfirm>
                </View>
                <Table
                    rowKey={record => record.openid}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={userBlackList.total ? userInfoBlackList : []}
                    pagination={{
                        // showQuickJumper: true,
                        // showSizeChanger: true
                    }}
                />
            </View>
        )
    }
    editRemarkFunc({params}:{params:{}}){
        this.props.editUserRemark({ params, editType:'black' })
    }
    userUnblockFunc(openids:Array<string>){
        this.props.setUserUnblock({
            params:{
                openids
            }
        })
    }
}
