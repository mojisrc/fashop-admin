import React,{ Component } from 'react'
import { Button, Icon, Popover, Modal } from 'antd'
import { View } from '@/components/flexView'
import styles from './leftCol.css'
import DragAndDrop from '../dragAndDrop'
//
// type Props = {
//     sort:boolean,
//     sortEnd:Function,
//     sortStart:Function,
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
// }

export default class LeftCol extends Component{
    render(){
        const { sort, sortEnd, sortStart, setWechatMenuList, setCurrentMenu, wechatMenuList } = this.props
        let allowSort = wechatMenuList.menu ? wechatMenuList.menu.button.filter((filterItem,index)=>{
            return filterItem.sub_button&&filterItem.sub_button.length>1
        }) : []
        return(
            <View className={styles.leftColView}>
                <View className={styles.diyPhoneTop}>
                    <img
                        alt=''
                        src={require('@/assets/images/wechat/diyPhone.png')}
                    />
                </View>
                <View className={styles.diyPhoneBody}/>
                <View className={styles.diyPhoneBot}>
                    <View className={styles.botLeftView}>
                        <img
                            alt=''
                            src={require('@/assets/images/wechat/mobile_foot.png')}
                        />
                    </View>
                    {
                        sort ? this.sortView() : wechatMenuList.menu&&wechatMenuList.menu.button.length ?
                        this.contentView() : this.emptyView()
                    }
                </View>
                <View className={styles.sortBtnView}>
                    {
                        sort ? <Button
                            onClick={()=>{
                                const { emptyStateCards, state } = this.DragAndDrop
                                let newcards = [...state.cards]
                                if(newcards.length){
                                    newcards.map((cardsItem)=>{
                                        delete cardsItem.id
                                        if(cardsItem.sub_button){
                                            cardsItem.sub_button.map((sub_button_item)=>{
                                                delete sub_button_item.id
                                            })
                                        }
                                    })
                                    setWechatMenuList({result:{menu:{button:newcards}}})
                                    setCurrentMenu({currentMenu:[-1,-1]})
                                    emptyStateCards()
                                }
                                sortEnd()
                            }}
                        >
                            完成
                        </Button> :
                        <Button
                            disabled={
                                wechatMenuList.menu&&wechatMenuList.menu.button.length>=2 ? false :
                                !allowSort.length
                            }
                            onClick={()=>{
                                sortStart()
                            }}
                        >
                            菜单排序
                        </Button>
                    }
                </View>
            </View>
        )
    }
    emptyView(){
        const { setWechatMenuList, setCurrentMenu } = this.props
        return(
            <View
                className={styles.emptyView}
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
                <Icon type="plus" />
            </View>
        )
    }
    sortView(){
        const list = [...this.props.wechatMenuList.menu.button]
        list.map((listItem,i)=>{
            listItem.id=`${i}`
            listItem.sub_button&&listItem.sub_button.map((subItem,j)=>{
                subItem.id=`${i}-${j}`
            })
        })
        return(
            <View className={styles.sortView}>
                <DragAndDrop
                    ref={(e) => this.DragAndDrop = e}
                    {...this.props}
                    list={list}
                />
            </View>
        )
    }
    contentView(){
        const { currentMenu, setWechatMenuList, setCurrentMenu, wechatMenuList } = this.props
        return(
            <View className={styles.menuList}>
                {
                    wechatMenuList.menu.button.map((menuListItem,index) =>
                        <Popover
                            key={index}
                            placement='top'
                            visible={currentMenu[0]===index}
                            overlayClassName='menuListPopover'
                            overlayStyle={{zIndex:999}}
                            content={(
                                this.popoverContent({
                                    fatherIndex:index,
                                    menuList:wechatMenuList.menu.button,
                                    currentMenu,
                                    sub_button:menuListItem.sub_button ? menuListItem.sub_button : []
                                })
                            )}
                        >
                            <View
                                className={styles.menuListItem}
                                style={
                                    currentMenu[0]===index&&currentMenu[1]===-1 ? {
                                        border:'1px solid #188fff'
                                    } : {}
                                }
                                onClick={()=>{
                                    this.props.setCurrentMenu({
                                        currentMenu:[index,-1]
                                    })
                                }}
                            >
                                <p>
                                    {menuListItem.name}
                                </p>
                            </View>
                        </Popover>
                    )
                }
                {
                    wechatMenuList.menu.button.length<3 ?
                    <View
                        className={styles.menuListItem}
                        style={{

                        }}
                        onClick={()=>{
                            setWechatMenuList({
                                result:{menu:{button:
                                    [...wechatMenuList.menu.button,{
                                        type:'click',
                                        name:'菜单名称',
                                        sub_button:[]
                                    }]
                                }}
                            })
                            this.props.setCurrentMenu({
                                currentMenu:[currentMenu[0]+1,-1]
                            })
                        }}
                    >
                        <Icon type="plus" />
                    </View> : null
                }
            </View>
        )
    }
    popoverContent({menuList,sub_button,currentMenu,fatherIndex}:{
        menuList:Array<{
            name:string,
            type:string,
            sub_button:Array<{
                name:string,
                type:string,
            }>,
        }>,
        sub_button:Array<{
            name:string,
            type:string,
        }>,
        currentMenu:Array<number>,
        fatherIndex:number
    }){
        return(
            <View>
                {
                    sub_button.map((sub_button_item,index) =>
                    <View
                        key={index}
                        className={styles.sub_button_item}
                        style={{
                            width:252/(menuList.length<3 ? menuList.length+1 : menuList.length),
                            borderBottom:`${index===4 ? 0 : 1}`,
                            border:`${currentMenu[1]===index ? '1px solid #188fff' : ''}`
                        }}
                        onClick={()=>{
                            this.props.setCurrentMenu({
                                currentMenu:[fatherIndex,index]
                            })
                        }}
                    >
                        <p>
                            {sub_button_item.name}
                        </p>
                    </View>
                    )
                }
                {
                    sub_button.length<5 ?
                    <View
                        className={styles.subButtonItem}
                        style={{
                            width:252/(menuList.length<3 ? menuList.length+1 : menuList.length)
                        }}
                        onClick={()=>{
                            if(sub_button.length){
                                this.subButtonAdd({menuList,currentMenu})
                            }else {
                                const _this = this
                                Modal.confirm({
                                    title: '子菜单确认?',
                                    content: '添加子菜单后，一级菜单的内容将被清除。确定添加子菜单？',
                                    zIndex:2000,
                                    onOk() {
                                        _this.subButtonAdd({menuList,currentMenu})
                                    },
                                    onCancel() {
                                        console.log('Cancel');
                                    },
                                });
                            }
                        }}
                    >
                        <Icon type="plus" />
                    </View> : null
                }
            </View>
        )
    }
    subButtonAdd({menuList,currentMenu}:{
        menuList:Array<{
            name:string,
            type:string,
            sub_button:Array<{
                name:string,
                type:string,
            }>,
        }>,
        currentMenu:Array<number>,
    }){
        let list = [...menuList]
        if(menuList[currentMenu[0]].sub_button){
            list[currentMenu[0]].sub_button =
            [...list[currentMenu[0]].sub_button,{
                type:'click',
                name:'子菜单名称'
            }]
        }else {
            list.splice(currentMenu[0],1,{
                ...list[currentMenu[0]],
                sub_button:[{
                    type:'click',
                    name:'子菜单名称'
                }]
            })
        }
        this.props.setWechatMenuList({
            result:{menu:{button:
                list
            }}
        })
        this.props.setCurrentMenu({
            currentMenu:[currentMenu[0],list[currentMenu[0]].sub_button.length-1]
        })
    }
}
