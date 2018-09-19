import React,{ Component } from "react";
import {Table,Button,Modal,Input,Checkbox} from 'antd';
import delivePublic from '../../styles/setting/delivePublic.css'
import deliveDelivery from '../../styles/setting/deliveDelivery.css'
export default class DeliveLogistics extends Component{
  constructor(){
      super();
      //用于是否显示弹窗
      this.state = {
         visible: false
      };
  }
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
    //表格数据
    const dataSource = [{
       key: 1,
       template: '我是模板名称',
       area: '我是配送区域',
       commodity:'我是使用商品',
       operating:<div className={delivePublic.pointer}>
                       <span className={delivePublic.edit}>编辑</span>
                       <span className={delivePublic.color}>删除</span>
                 </div>,
     }];
     const columns = [{
         title: '模板名称',
         dataIndex: 'template',
         key: 'template',
       }, {
         title: '配送区域',
         dataIndex: 'area',
         key: 'area',
       }, {
         title: '使用商品',
         dataIndex: 'commodity',
         key: 'commodity',
       },{
         title: '操作',
         dataIndex: 'operating',
         key: 'operating',
     }];
     return(
       <div className={delivePublic.tabPane}>
           <div className={delivePublic.tabButton}>
              <Button type="primary" onClick={this.showModal}>新增可配送区域</Button>
              <Modal
                 title="新增可配送区域"
                 visible={this.state.visible}
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}
                 okText="确 定"
                 cancelText="取消"
                 width="50%"
               >
                   <div className={deliveDelivery.deliveWrap}>
                       <div className={deliveDelivery.deliveText}>
                           <span className={delivePublic.red}>*</span>
                           <span className={deliveDelivery.deliveSpan}>公司名称：</span>
                       </div>
                       <div className={deliveDelivery.inputBox}>
                           <Input placeholder="请输入模板名称"/>
                       </div>
                   </div>
                   <div className={deliveDelivery.deliveWrap}>
                       <div className={deliveDelivery.deliveText}>
                           <span className={delivePublic.red}>*</span>
                           <span className={deliveDelivery.deliveSpan}>支持配送的地区：</span>
                       </div>
                   </div>
                   <div className={deliveDelivery.deliveArea +" "+ delivePublic.clearfix}>
                       <div className={delivePublic.flt+" "+deliveDelivery.deliveAreaLeft}>
                            <div className={deliveDelivery.deliveTop}>
                                  省份
                            </div>
                            <div className={deliveDelivery.deliveBottom}>
                                <ul>
                                    <li>
                                        北京
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        天津
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        北京
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        天津
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        北京
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        天津
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        北京
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        天津
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        北京
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        天津
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        北京
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        天津
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                </ul>
                            </div>
                       </div>
                       <div className={delivePublic.flt+" "+deliveDelivery.deliveAreaRight}>
                            <div className={deliveDelivery.deliveTop}>
                                  城市
                                  <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                            </div>
                            <div className={deliveDelivery.deliveBottom}>
                                <ul>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                    <li>
                                        河西区
                                        <Checkbox className={deliveDelivery.deliveCheckbox}></Checkbox>
                                    </li>
                                </ul>
                            </div>
                       </div>
                   </div>
               </Modal>
           </div>
           <Table
              bordered
              dataSource={dataSource}
              columns={columns}
              size="middle"
              pagination={{
                  showQuickJumper: true,
                  showSizeChanger: true
              }}
           />
       </div>
     )
  }

}
