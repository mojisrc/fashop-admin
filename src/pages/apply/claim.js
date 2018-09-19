import React,{ Component } from "react";
import delivePublic from '../../styles/setting/delivePublic.css';
import claim from '../../styles/apply/claim.css';

export default class SystemUpdating extends Component{
    render(){
        return(
          <div className={delivePublic.tabPane}>
              <div className={claim.claimTitle}>业务类</div>
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
              <div className={claim.claimTitle}>营销类</div>
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
              <div className={claim.claimTitle}>工具类</div>
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
              <div className={claim.claimTitle}>辅助类</div>
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
          </div>
        )

    }

}
