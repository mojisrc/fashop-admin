import React,{ Component } from "react";
import {Alert} from 'antd';
import delivePublic from '@/styles/setting/delivePublic.css'
import systemSetting from '@/styles/setting/systemSetting.css'
export default class SystemUpdating extends Component{
    render(){

       return(
          <div className={delivePublic.tabPane}>
              <img src={require('../../images/setting/logo.png')} className={systemSetting.logo}/>
              <div className={systemSetting.version}>
                  当前系统版本：V 1.0 ( 201708180001 )
              </div>
              <div className={systemSetting.systemHeader}>
                  <span>最新版本：V 1.1（201710280002）</span>
              </div>
              <div className={systemSetting.systemContent}>
                  <div>
                      <Alert
                        message="请注意！"
                        description="正在更新系统文件，请不要关闭此浏览器窗口,如果下载文件失败，可能造成的原因：写入失败，请仔细检查写入权限是否正确"
                        type="warning"
                        showIcon
                      />
                  </div>
                  <div>
                      <Alert
                        message="整体进度  1/14"
                        description="正在下载文件：／framework/model/cloud.mod.php"
                        type="info"
                      />
                  </div>
              </div>
          </div>
       )
    }
}
