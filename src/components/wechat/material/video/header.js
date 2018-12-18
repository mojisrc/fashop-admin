import React,{ Component } from 'react'
import { Button, Radio, Modal } from 'antd';
import { View } from '@/components/flexView'
import styles from '../index.css'
import AddVideoForm from './addVideoForm'

export default class VideoHeader extends Component {
   state = {
       type:'wechat',
       addVideoVisible:false
   }
   handleClose = () => {
       this.setState({
           addVideoVisible:false
       })
   }
   render() {
       const { type, addVideoVisible } = this.state
       return (
           <View className={styles.headerView}>
               <Button
                   type="primary"
                   onClick={()=>{
                       this.setState({
                           addVideoVisible:true
                       })
                   }}
               >
                   新建{type==='wechat' ? '微信' : '服务器'}视频
               </Button>
               <Modal
                    title="新增视频"
                    width={820}
                    visible={addVideoVisible}
                    footer={null}
                    maskClosable={true}
                    onCancel={this.handleClose}
                >
                    <AddVideoForm
                        hideModal={()=>{
                            this.handleClose()
                        }}
                    />
                </Modal>
               <Radio.Group
                   value={type}
                   onChange={(e)=>{
                       this.setState({
                           type:e.target.value
                       })
                   }}
               >
                   <Radio.Button value="wechat">微信</Radio.Button>
                   <Radio.Button value="server" disabled>服务器</Radio.Button>
               </Radio.Group>
           </View>
       )
   }
}
