import React,{ Component } from 'react'
import { Button, Radio, Modal } from 'antd';
import { View } from '@/components/flexView'
import styles from '../index.css'
import AddVoiceForm from './addVoiceForm'
// type State = {
//    type:string,
//    addVoiceVisible:boolean
// }

export default class VoiceHeader extends Component {
   state = {
       type:'wechat',
       addVoiceVisible:false
   }
   handleClose = () => {
       this.setState({
           addVoiceVisible:false
       })
   }
   render() {
       const { type, addVoiceVisible } = this.state
       return (
           <View className={styles.headerView}>
               <Button
                   type="primary"
                   onClick={()=>{
                       this.setState({
                           addVoiceVisible:true
                       })
                   }}
               >
                   新建{type==='wechat' ? '微信' : '服务器'}语音
               </Button>
               <Modal
                    title="新增语音"
                    width={660}
                    visible={addVoiceVisible}
                    footer={null}
                    maskClosable={true}
                    onCancel={this.handleClose}
                >
                    <AddVoiceForm
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
