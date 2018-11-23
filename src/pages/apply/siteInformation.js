import React,{ Component } from "react";
import { Button , Modal , Pagination} from 'antd';
import delivePublic from '../../styles/setting/delivePublic.css';
import siteInformation from '../../styles/apply/siteInformation.css';
export default class SiteInformation extends Component{
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
       return(
          <div className={delivePublic.tabPane}>
              <div className={siteInformation.siteWrap}>
                  <div className={siteInformation.informationTitle}>
                      站点信息
                  </div>
                  <div className={siteInformation.informationBox}>
                      <div className={siteInformation.informationLeft}>
                          站点ID
                      </div>
                      <div className={siteInformation.informationRight}>
                          100001
                      </div>
                  </div>
                  <div className={siteInformation.informationBox}>
                      <div className={siteInformation.informationLeft}>
                          密匙
                      </div>
                      <div className={siteInformation.informationRight}>
                          <span className={siteInformation.informationBlue} onClick={this.showModal}>查看密匙</span>
                      </div>
                  </div>
                  <div className={siteInformation.informationBox}>
                      <div className={siteInformation.informationLeft}>
                          授权域名
                      </div>
                      <div className={siteInformation.informationRight}>
                          47.107.139.33
                      </div>
                  </div>
                  <div className={siteInformation.informationBox}>
                      <div className={siteInformation.informationLeft}>
                          授权IP白名单
                      </div>
                      <div className={siteInformation.informationRight}>
                          <span className={siteInformation.informationMargin}>59.110.167.111</span>
                          <span className={siteInformation.informationMargin}>59.110.167.111</span>
                          <span className={siteInformation.informationMargin}>59.110.167.111</span>
                      </div>
                  </div>
                  <div className={siteInformation.informationBox}>
                      <div className={siteInformation.informationLeft}>
                          授权版面
                      </div>
                      <div className={siteInformation.informationRight}>
                          <span className={siteInformation.informationOrange}>
                              商业授权vip版
                          </span>
                      </div>
                  </div>
              </div>
              <div className={siteInformation.informationBottom}>
                  <span>如有任何疑问，请联系客服进行咨询</span>
                  <div className={siteInformation.informationButton}>
                      在线客服
                  </div>
              </div>
              <Modal
                  title="密匙"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={null}
                  width="700px"
                >
                    <div className={siteInformation.siteModal}>
                          <div className={siteInformation.siteModalLeft}>
                              App Key
                              <div className={siteInformation.siteModalLine}></div>
                          </div>
                          <div className={siteInformation.siteModalRight}>
                              1111111111111
                          </div>
                    </div>
                    <div className={siteInformation.siteModal}>
                          <div className={siteInformation.siteModalLeft+ " " + siteInformation.siteBorder}>
                              App Secret
                          </div>
                          <div className={siteInformation.siteModalRight}>
                              1111111111111
                              <div>显示全部</div>
                          </div>
                    </div>
                    <div className={siteInformation.siteModal}>
                          <div className={siteInformation.siteModalLeft}>
                              App Key
                              <div className={siteInformation.siteModalLine}></div>
                          </div>
                          <div className={siteInformation.siteModalRight}>
                              1111111111111
                          </div>
                    </div>
                    <div className={siteInformation.siteModal}>
                          <div className={siteInformation.siteModalLeft+ " " + siteInformation.siteBorder}>
                              App Secret
                          </div>
                          <div className={siteInformation.siteModalRight}>
                              1111111111111
                              <div>显示全部</div>
                          </div>
                    </div>
                    <div className={siteInformation.sitePage}>
                        <Pagination defaultCurrent={1} total={50} />
                    </div>

             </Modal>
          </div>
       )

    }

}
