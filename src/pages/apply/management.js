import React,{ Component } from "react";
import { Button } from 'antd';
import ManagementModify from './managementModify'
import ManagementAdd from './managementAdd'
import delivePublic from '../../styles/setting/delivePublic.css';
import claim from '../../styles/apply/claim.css';
import management from '../../styles/apply/management.css';
export default class SiteInformation extends Component{
   render(){
     return(
       <div className={delivePublic.tabPane}>
           <div className={management.managementBox+ " " + delivePublic.clearfix}>
                <div className={management.managementLeft}>全部分类：</div>
                <div className={management.managementRight}>
                    <span>全部</span>
                    <span>业务类</span>
                    <span>营销类</span>
                    <span>工具类</span>
                    <span>辅助类</span>
                </div>
           </div>
           <div className={management.managementBotton}>
                <Button type="primary">添加应用</Button>
                <Button>添加分类</Button>
           </div>
           <div className={claim.business + " " + delivePublic.clearfix}>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange}>
                         <img src={require('../../images/apply/08.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>分销乐</div>
                         <div>让客户参与推广，佣金拿不断</div>
                      </div>
                   </div>
               </div>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange}>
                         <img src={require('../../images/apply/02.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>积分商城</div>
                         <div>积分换好礼，花样不断</div>
                      </div>
                   </div>
               </div>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange}>
                         <img src={require('../../images/apply/09.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>多人拼团</div>
                         <div>拼单成团，促进客户转化，裂变营销</div>
                      </div>
                   </div>
               </div>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange}>
                         <img src={require('../../images/apply/11.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>全民股东</div>
                         <div>成为股东，天天拿分红</div>
                      </div>
                   </div>
               </div>
           </div>
           <div className={claim.business + " " + delivePublic.clearfix}>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange + " " + claim.red}>
                         <img src={require('../../images/apply/01.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>FA社区</div>
                         <div>购物心得分享，紧抓客源</div>
                      </div>
                   </div>
               </div>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange + " " + claim.red}>
                         <img src={require('../../images/apply/04.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>整点秒杀</div>
                         <div>快速抢购引导消费</div>
                      </div>
                   </div>
               </div>
           </div>
           <div className={claim.business + " " + delivePublic.clearfix}>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange + " " + claim.blue}>
                         <img src={require('../../images/apply/10.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>淘宝助手</div>
                         <div>连接淘宝账号，多渠道统一管理</div>
                      </div>
                   </div>
               </div>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange + " " + claim.blue}>
                         <img src={require('../../images/apply/03.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>快递助手</div>
                         <div>快递单打印，一键发货</div>
                      </div>
                   </div>
               </div>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange + " " + claim.blue}>
                         <img src={require('../../images/apply/05.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>手机端商家管理中心</div>
                         <div>更专业的移动管理专家</div>
                      </div>
                   </div>
               </div>
           </div>
           <div className={claim.business + " " + delivePublic.clearfix}>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange + " " +claim.green}>
                         <img src={require('../../images/apply/07.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>文章营销</div>
                         <div>软文推广，快速吸粉</div>
                      </div>
                   </div>
               </div>
               <div className={claim.businessSon}>
                   <div className={claim.businessContent}>
                      <div className={claim.orange+ " " +claim.green}>
                         <img src={require('../../images/apply/06.png')} className={claim.claimImg}/>
                      </div>
                      <div className={claim.businessText}>
                         <div>帮助中心</div>
                         <div>常见问题贴心指导</div>
                      </div>
                   </div>
               </div>
           </div>
           <ManagementModify/>
           <ManagementAdd/>
       </div>
     )
   }
}
