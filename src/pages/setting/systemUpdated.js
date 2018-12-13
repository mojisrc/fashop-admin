import React,{ Component } from "react";
import {Checkbox,Button,Modal} from 'antd';
import delivePublic from '@/styles/setting/delivePublic.css'
import systemSetting from '@/styles/setting/systemSetting.css'
export default class SystemUpdated extends Component{
      state = { visible: false }
      showModal = () => {
         this.setState({
           visible: true,
         });
      }
      handleOk = (e) => {
         console.log(e);
         this.setState({
           visible: false,
         });
      }
      handleCancel = (e) => {
         console.log(e);
         this.setState({
           visible: false,
         });
      }

      render(){
          const TabsStyle = {
                 tab:{
                   paddingLeft:"20px",
                   backgroundColor:"#fff",
                   borderBottom:"1px solid #e9e9e9",
                   marginBottom:"0px"
                 }
           }
           return(
             <div className={delivePublic.tabPane}>
                <img src={require('../../images/setting/logo.png')} className={systemSetting.logo}/>
                <div className={systemSetting.version}>
                    当前系统版本：V 1.0 ( 201708180001 )
                </div>
                <div className={systemSetting.systemHeader}>
                    <span>最新版本：V 1.1（201710280002）</span>
                </div>
                <div className={delivePublic.clearfix + " " +systemSetting.systemWrap}>
                    <div className={systemSetting.systemLeft}>
                        <span>需要更新文件</span>
                    </div>
                    <div className={systemSetting.systemIntermediate}>
                        <span>14个</span>
                    </div>
                    <div className={systemSetting.systemRight} onClick={this.showModal}>
                        查看
                    </div>
                </div>
                <div className={delivePublic.clearfix + " " +systemSetting.systemWrap}>
                    <div className={systemSetting.systemLeft}>
                        <span>需要更新数据库</span>
                    </div>
                    <div className={systemSetting.systemIntermediate}>
                        <span>14项</span>
                    </div>
                    <div className={systemSetting.systemRight} onClick={this.showModal}>
                        查看
                    </div>
                </div>
                <div className={delivePublic.clearfix + " " +systemSetting.systemWrap}>
                    <div className={systemSetting.systemLeft}>
                        <span>需要新脚本</span>
                    </div>
                    <div className={systemSetting.systemIntermediate}>
                        <span>6项</span>
                    </div>
                    <div className={systemSetting.systemRight} onClick={this.showModal}>
                        查看
                    </div>
                </div>
                <div className={delivePublic.clearfix + " " +systemSetting.systemWrap}>
                    <div className={systemSetting.systemPosition}>
                          <span>更新协议事项</span>
                    </div>
                    <div className={systemSetting.systemSon}>
                       <div className={systemSetting.systemInputWrap}>
                           <Checkbox className={systemSetting.systemInput}>
                                确保您的系统文件与官方文件保持一致，避免被非法篡改，远离盗版
                           </Checkbox>
                       </div>
                       <div className={systemSetting.systemInputWrap}>
                           <Checkbox className={systemSetting.systemInput}>
                                确保您的系统文件与官方文件保持一致，避免被非法篡改，远离盗版
                           </Checkbox>
                       </div>
                       <div className={systemSetting.systemInputWrap}>
                           <Checkbox className={systemSetting.systemInput}>
                                确保您的系统文件与官方文件保持一致，避免被非法篡改，远离盗版
                           </Checkbox>
                       </div>
                    </div>
                </div>
                <div className={systemSetting.updated}>
                    <Button type="primary">一键更新</Button>
                </div>
                <Modal
                  title="更新文件（14）"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <div className={systemSetting.sysBox}>111</div>
                  <div className={systemSetting.sysBox}>111</div>
                  <div className={systemSetting.sysBox}>111</div>
                </Modal>
             </div>
           )

      }

}
