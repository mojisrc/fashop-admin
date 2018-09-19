import React,{ Component } from "react";
import { Button } from 'antd';
import delivePublic from '../../styles/setting/delivePublic.css';
import claim from '../../styles/apply/claim.css';
import site from '../../styles/apply/site.css';
import SiteInformation from './siteInformation'

export default class Site extends Component{
    render(){
        return(
          <div className={delivePublic.tabPane}>
              <div className={site.siteTitle}>
                  绑定站点获取更多商业应用
              </div>
              <div className={site.siteContent}>
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
                  <div className={site.siteMore}>全部应用</div>
                  <div className={site.siteBox}>
                      <div className={site.siteNum}>
                          01
                          <div className={site.siteText}>
                              官网注册账号
                          </div>
                      </div>
                      <div className={site.siteLine}></div>
                      <div className={site.siteNum}>
                          02
                          <div className={site.siteText}>
                              购买商业版，获取密钥
                          </div>
                      </div>
                      <div className={site.siteLine}></div>
                      <div className={site.siteNum}>
                          03
                          <div className={site.siteText}>
                              进行绑定，升级获取新功能
                          </div>
                      </div>
                      <div className={site.siteBind}>
                          输入商业版密钥进行绑定
                      </div>
                      <div className={site.siteInputWarp}>
                          <input type="text" placeholder="App Key" className={site.siteInput} />
                          <input type="text" placeholder="App Secret" className={site.siteInput} />
                          <div className={site.siteButtonWrap}>
                              <Button type="primary" className={site.buttonWidth}>绑定</Button>
                              <span className={site.siteSpan}>没有密钥？去开通</span>
                          </div>
                      </div>
                  </div>
              </div>
              <SiteInformation/>
          </div>
        )
    }
}
