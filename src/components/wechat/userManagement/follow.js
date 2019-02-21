
import React,{ Component } from 'react'
import { connect } from "dva";
import {
    getWechatUserList,
    getWechatuserBlackList,
    setUserBlock,
    setUserUnblock,
    editUserRemark,
    getWechatUserListByTag,
} from "@/actions/wechat/user";
import {
    getWechatUserTagList,
    addWechatUserTagList,
    editWechatUserTagList,
    delWechatUserTagList,
    tagWechatUser,
    untagWechatUser,
} from "@/actions/wechat/userTags";
import { View } from '@/components/flexView'
import { Row, Col, Button, Table, Menu, Pagination, Popover, Popconfirm, Icon } from 'antd'
import styles from './index.css'
import AvatarPopover from '../public/avatarPopover'
import TagPopover from '../public/tagPopover'
import PublicPopoverContent from './publicPopoverContent'
//
// type Props = {
//     dispatch:Function,
//     editUserRemark:Function,
//     setUserBlock:Function,
//     setUserUnblock:Function,
//     getWechatUserList:Function,
//     getWechatuserBlackList:Function,
//     getWechatUserListByTag:Function,
//     getWechatUserTagList:Function,
//     addWechatUserTagList:Function,
//     editWechatUserTagList:Function,
//     delWechatUserTagList:Function,
//     userTagList:Array<{
//         name:string,
//         count:number,
//         id:number
//     }>,
//     userList:{
//         total:number,
//         next_openid:string,
//         data:{openid:Array<string>}
//     },
//     prev_openid:string,
//     next_openid:string,
//     userBlackList:{
//         total:number,
//         data:{openid:Array<string>}
//     },
//     userInfoList:Array<{
//         openid:string,
//         headimgurl:string,
//         nickname:string,
//         sex:number,
//         subscribe_time:string,
//         remark:string,
//         tagid_list:Array<string>
//     }>,
//     userListLoading:boolean,
// }
// type State = {
//     currentMenu:string,
//     editTagId:string,
//     currentId:string,
//     selectedRowKeys:Array<string>,
// }

@connect(
    ({view:{
        wechatUser:{ userList, userBlackList, userInfoList, userListLoading, allUserListTotal, pageArr },
        wechatUserTags:{ userTagList },
    }}) => ({
        userList,
        allUserListTotal,
        pageArr,
        userBlackList,
        userListLoading,
        userTagList,
        userInfoList,
    }),
    //
)
export default class FollowTable extends Component {
    state = {
        currentMenu:'0',
        editTagId:'0',
        currentId:'-1',
        selectedRowKeys:[]
    }
    componentDidMount(){
        const { dispatch } = this.props
        dispatch(getWechatUserList({params:{}}))
        dispatch(getWechatuserBlackList())
        dispatch(getWechatUserTagList())
        // e.result.data.openid[(currentPage-1)*20]
    }
    onSelectChange = (selectedRowKeys:Array<string>) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render() {
        // console.log(this.props);
        const { currentMenu, currentId, selectedRowKeys, editTagId } = this.state
        const { userTagList, userBlackList, userInfoList, userListLoading, userList, dispatch, allUserListTotal, pageArr } = this.props
        const tableTitle = userTagList ? userTagList.filter((filterItem,index)=>{
            return filterItem.id===Number(currentMenu)
        }) : []
        const columns = [
            {
                title: '头像',
                dataIndex: 'headimgurl',
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
                    tagList={userTagList}
                    avatarType={userBlackList.data&&userBlackList.data.openid.indexOf(record.openid)>-1 ? 'black' : ''}
                    editRemarkFunc={(params)=>{
                        this.editRemarkFunc({params})
                    }}
                    addTagFunc={(name)=>{
                        this.addTagFunc({
                            params:{ name }
                        })
                    }}
                    tagWechatUserFunc={(id)=>{
                        this.tagWechatUserFunc({
                            params:{
                                openids:[record.openid],
                                id:id[0]
                            }
                        })
                    }}
                    blackFunc={()=>{
                        if(userBlackList.data&&userBlackList.data.openid.indexOf(record.openid)>-1){
                            this.userUnblockFunc([record.openid])
                        }else{
                            this.userBlackFunc([record.openid])
                        }
                    }}
                />
            }, {
                title: '昵称',
                dataIndex: 'nickname',
                render: (text, record, index) =>
                <View>
                    <span>
                        {
                            record.remark.length ? `${record.remark}(${record.nickname})` : record.nickname
                        }
                    </span>
                    <View className={styles.recordTagView}>
                        <TagPopover
                            tagList={userTagList}
                            popoverTrigger="hover"
                            record={record}
                            addTagFunc={(name)=>{
                                this.addTagFunc({
                                    params:{ name }
                                })
                            }}
                            addUserTagFunc={(id)=>{
                                this.tagWechatUserFunc({
                                    params:{
                                        openids:[record.openid],
                                        id:id[0]
                                    }
                                })
                            }}
                            popoverContent={()=>{
                                return(
                                    <p>
                                        {
                                            !record.tagid_list.length ? '暂无标签 ' : ''
                                        }
                                        <Icon type="caret-down" />
                                    </p>
                                )
                            }}
                        />
                    </View>
                </View>
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
                            initValue={record.remark.length ? record.remark : record.nickname}
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
        let currentPage = pageArr.findIndex(item=>userList.data&&item===userList.data.openid[0])+1
        return (
            <View className={`${styles.followTableView} followTable`}>
                <View className={styles.btnGroup}>
                    <Popover
                        visible={currentId==='0'}
                        trigger="click"
                        placement="topLeft"
                        onVisibleChange={(visible)=>{
                            if(!visible){
                                this.setState({
                                    currentId:'-1'
                                })
                            }
                        }}
                        content={(
                            <PublicPopoverContent
                                okFunc={(name)=>{
                                    this.addTagFunc({
                                        params:{ name }
                                    })
                                }}
                                closePopover={()=>{
                                    this.setState({
                                        currentId:'-1'
                                    })
                                }}
                                initValue=''
                            />
                        )}
                    >
                        <Button
                            type="primary"
                            onClick={()=>{
                                this.setState({
                                    currentId:'0'
                                })
                            }}
                        >
                            新建标签
                        </Button>
                    </Popover>
                    <TagPopover
                        topBtn
                        tagList={userTagList}
                        popoverTrigger="click"
                        record={{tagid_list:[]}}
                        addTagFunc={(name)=>{
                            this.addTagFunc({
                                params:{ name }
                            })
                        }}
                        addUserTagFunc={(id)=>{
                            this.tagWechatUserFunc({
                                params:{
                                    openids:selectedRowKeys,
                                    id:id[0]
                                }
                            })
                        }}
                        popoverContent={()=>{
                            return(
                                <Button
                                    disabled={!selectedRowKeys.length}
                                >
                                    加入标签
                                </Button>
                            )
                        }}
                    />
                    <Popconfirm
                        title={(
                            <span>
                                加入黑名单后，你将无法接收该用户<br/>
                                发来的消息，且该用户无法接收公众<br/>
                                号发出的消息，无法参与留言和赞赏，<br/>确认加入黑名单？
                            </span>
                        )}
                        okText="确定"
                        cancelText="取消"
                        onConfirm={()=>{
                            this.userBlackFunc(selectedRowKeys)
                        }}
                    >
                        <Button
                            style={{
                                marginLeft: 24
                            }}
                            disabled={!selectedRowKeys.length}
                        >
                            加入黑名单
                        </Button>
                    </Popconfirm>
                </View>
                <Row gutter={24} className={styles.searchTable}>
                    <Col span={18}>
                        <Table
                            loading={userListLoading}
                            title={() =>
                                <View className={styles.tableTitleView}>
                                    <p>{tableTitle.length ? tableTitle[0].name : '全部用户'}</p>
                                    {
                                        currentMenu!=='0'  ?
                                        <p>
                                            <Popover
                                                visible={editTagId===currentMenu}
                                                trigger="click"
                                                placement="topLeft"
                                                onVisibleChange={(visible)=>{
                                                    if(!visible){
                                                        this.setState({
                                                            editTagId:'-1'
                                                        })
                                                    }
                                                }}
                                                content={(
                                                    <PublicPopoverContent
                                                        okFunc={(name)=>{
                                                            dispatch(
                                                                editWechatUserTagList({
                                                                    params:{
                                                                        id:currentMenu,
                                                                        name,
                                                                    }
                                                                })
                                                            )
                                                        }}
                                                        closePopover={()=>{
                                                            this.setState({
                                                                editTagId:'-1'
                                                            })
                                                        }}
                                                        initValue={tableTitle.length ? tableTitle[0].name : ''}
                                                    />
                                                )}
                                            >
                                                <a
                                                    onClick={()=>{
                                                        this.setState({
                                                            editTagId:currentMenu
                                                        })
                                                    }}
                                                >
                                                    重命名
                                                </a>
                                            </Popover>
                                            <Popconfirm
                                                title={(
                                                    <span>
                                                        删除标签后，该标签下的所有用户将<br/>
                                                        失去该标签属性。是否确定删除？
                                                    </span>
                                                )}
                                                okText="确定"
                                                cancelText="取消"
                                                onConfirm={()=>{
                                                    this.setState({
                                                        currentMenu:'0'
                                                    })
                                                    dispatch(
                                                        delWechatUserTagList({
                                                            params:{
                                                                id:currentMenu,
                                                            }
                                                        })
                                                    )
                                                }}
                                            >
                                                <a>删除</a>
                                            </Popconfirm>
                                        </p> : null
                                    }
                                </View>
                            }
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={userInfoList}
                            bordered
                            pagination={false}
                            rowKey={record => record.openid}
                        />
                    </Col>
                    <Col span={6}>
                        <Menu
                            selectedKeys={[currentMenu]}
                            onClick={(e)=>{
                                this.setState({
                                    currentMenu:e.key
                                })
                                dispatch(
                                    getWechatUserListByTag({
                                        params:{
                                            id:e.key,
                                        }
                                    })
                                )
                            }}
                        >
                            <Menu.Item
                                key={'0'}
                            >
                                全部用户&nbsp;({allUserListTotal})
                            </Menu.Item>
                            {
                                userTagList&&userTagList.map((tagListItem,index)=>
                                    <Menu.Item
                                        key={tagListItem.id}
                                    >
                                        {tagListItem.name}&nbsp;({tagListItem.count})
                                    </Menu.Item>
                                )
                            }
                        </Menu>
                    </Col>
                </Row>
                <View className={styles.paginationView}>
                    <Pagination
                        pageSize={20}
                        hideOnSinglePage
                        total={userList.total}
                        current={currentPage}
                        onChange={(page,pageSize)=>{
                            dispatch(
                                getWechatUserList({params:{next_openid:pageArr[page-1]}})
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
    editRemarkFunc({params}:{params:{}}){
        this.props.dispatch(
            editUserRemark({ params, editType:'' })
        )
    }
    addTagFunc({params}:{params:{}}){
        this.props.dispatch(
            addWechatUserTagList({params})
        )
    }
    userBlackFunc(openids:Array<string>){
        this.props.dispatch(
            setUserBlock({
                params:{
                    openids,
                }
            })
        )
    }
    userUnblockFunc(openids:Array<string>){
        this.props.dispatch(
            setUserUnblock({
                params:{
                    openids
                }
            })
        )
    }
    tagWechatUserFunc({params}:{params:{}}){
        this.props.dispatch(
            tagWechatUser({params})
        )
    }
}
