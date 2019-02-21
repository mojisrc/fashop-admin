import React,{ Component } from 'react'
import { View } from '@/components/flexView'
import { Popover, Button, Input, Tag, Checkbox, Row, Col } from 'antd'
import styles from './index.css'

// type Props = {
//     tagList:Array<{
//         name:string,
//         count:number,
//         id:number
//     }>,
//     record:{
//         tagid_list:Array<string>,
//     },
//     addTagFunc:Function,
//     addUserTagFunc:Function,
//     popoverContent:Function,
//     popoverTrigger:string,
// }
// type State = {
//     tagValue:string,
//     addTag:boolean,
//     id:Array<number>
// }

export default class TagPopover extends Component {
    state = {
        addTag:false,
        tagValue:'',
        id:[]
    }
    render() {
        const { tagList, record, popoverContent, popoverTrigger, topBtn } = this.props
        return (
            <View className={styles.tagPopoverView}>
                {
                    tagList&&tagList.length ? tagList.map((tagItem,index) =>
                        record.tagid_list.indexOf(tagItem.id)>-1 ?
                        <Tag key={index}>{tagItem.name}</Tag> : ''
                    ) : topBtn ? '' : '暂无标签'
                }
                <Popover
                    trigger={popoverTrigger}
                    overlayClassName='tagPopover'
                    content={(
                        this.contentView()
                    )}
                >
                    {
                        popoverContent()
                    }
                </Popover>
            </View>
        )
    }
    contentView(){
        const { addTag, tagValue, id } = this.state
        const { tagList, record, addTagFunc, addUserTagFunc } = this.props
        return (
            <View className={styles.poppverContent}>
                <Checkbox.Group
                    defaultValue={record.tagid_list}
                    style={{ width: '100%' }}
                    onChange={(checkedValues)=>{
                        this.setState({
                            id:checkedValues
                        })
                    }}
                >
                    <Row>
                        <Col span={3}>标签：</Col>
                        <Col span={21}>
                            <View>
                                <Row>
                                    {
                                        tagList.map((tagListItem,index) =>
                                            <Col span={6} key={index}>
                                                <Checkbox value={tagListItem.id}>
                                                    {tagListItem.name}
                                                </Checkbox>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </View>
                        </Col>
                    </Row>
                </Checkbox.Group>
                <View className={styles.addTagView}>
                    {
                        addTag ?
                        <Input
                            placeholder='请输入'
                            style={{
                                width:200
                            }}
                            onChange={(e)=>{
                                this.setState({
                                    tagValue:e.target.value
                                })
                            }}
                        /> :
                        <a
                            onClick={()=>{
                                this.setState({
                                    addTag:true
                                })
                            }}
                        >
                            新建标签
                        </a>
                    }
                    {
                        addTag ?
                        <a
                            onClick={()=>{
                                addTagFunc(tagValue)
                                this.setState({
                                    addTag:false,
                                    tagValue:''
                                })
                            }}
                        >
                            添加
                        </a> : null
                    }
                    {
                        addTag ?
                        <a
                            onClick={()=>{
                                this.setState({
                                    addTag:false
                                })
                            }}
                        >
                            取消
                        </a> : null
                    }
                </View>
                <View className={styles.btnGroup}>
                    <Button>取消</Button>
                    <Button
                        type='primary'
                        onClick={()=>{
                            addUserTagFunc(id)
                            this.setState({
                                id:[]
                            })
                        }}
                    >
                        确定
                    </Button>
                </View>
            </View>
        )
    }
}
