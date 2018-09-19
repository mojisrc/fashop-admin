import React,{ Component } from "react";
import { Input,Select,Radio,Button} from 'antd';
import {Link} from 'react-router-dom';
//上传组件
import ManagementUpload from './managementUpload'
import delivePublic from '../../styles/setting/delivePublic.css';
import managementAdd from '../../styles/apply/managementAdd.css'
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
const RadioGroup = Radio.Group;
export default class ManagementAdd extends Component{
  render(){
     return(
       <div>
               <div className={managementAdd.deliveWrap}>
                   <div className={managementAdd.deliveText}>
                       <span className={delivePublic.red}>*</span>
                       <span className={managementAdd.deliveSpan}>应用标题：</span>
                   </div>
                   <div className={managementAdd.inputBox}>
                       <Input placeholder="请输入标题"/>
                   </div>
               </div>
               <div className={managementAdd.deliveWrap}>
                   <div className={managementAdd.deliveText}>
                       <span className={delivePublic.red}>*</span>
                       <span className={managementAdd.deliveSpan}>应用标识：</span>
                   </div>
                   <div className={managementAdd.inputBox}>
                       <Input placeholder="请输入应用标识"/>
                   </div>
               </div>
               <div className={managementAdd.deliveText}>
                       <span className={delivePublic.red}>*</span>
                       <span className={managementAdd.deliveSpan}>上传图标：</span>
               </div>
               <div className={managementAdd.inputBox}>
                        <ManagementUpload/>
               </div>
               <div className={managementAdd.deliveFont}>
                   建议尺寸：140*140 像素
               </div>
               <div className={managementAdd.deliveWrap}>
                   <div className={managementAdd.deliveText}>
                       <span className={delivePublic.red}>*</span>
                       <span className={managementAdd.deliveSpan}>所属分类：</span>
                   </div>
                   <div className={managementAdd.inputBox}>
                       <InputGroup compact>
                           <Select style={{ width: '100%' }} defaultValue="请选择">
                              <Option value="分类1">分类1</Option>
                              <Option value="分类2">分类2</Option>
                           </Select>
                       </InputGroup>
                   </div>
               </div>
               <div className={managementAdd.deliveText}>
                    <span className={managementAdd.deliveSpan}>应用描述：</span>
               </div>
               <div className={managementAdd.inputBox}>
                    <Input placeholder="请输入描述"/>
               </div>
               <div className={managementAdd.deliveFont}>
                   30字以内
               </div>
               <div>
                   <div className={managementAdd.deliveText}>
                       <span className={managementAdd.deliveSpan}>后端文件路径：</span>
                   </div>
                   <div className={managementAdd.inputBox}>
                       <Input placeholder="请输入路径"/>
                   </div>
                   <span className={managementAdd.managementDelete}>删除</span>
               </div>
               <div className={managementAdd.deliveFont}>
                   谨慎操作，如填/xxx/xx就是这个目录下的所有，如果是/xxx/xx/xxx.jpg就是某个文件
               </div>
               <div className={managementAdd.deliveWrap}>
                   <div className={managementAdd.deliveText}>
                       <span className={managementAdd.deliveSpan}></span>
                   </div>
                   <div className={managementAdd.inputBox}>
                       <Input placeholder="请输入后端路径"/>
                   </div>
                   <span className={managementAdd.managementAdded}>新增</span>
               </div>
               <div>
                   <div className={managementAdd.deliveText}>
                       <span className={managementAdd.deliveSpan}>前端文件路径：</span>
                   </div>
                   <div className={managementAdd.inputBox}>
                       <Input placeholder="请输入前端路径"/>
                   </div>
                   <span className={managementAdd.managementAdded}>新增</span>
               </div>
               <div className={managementAdd.deliveFont}>
                   谨慎操作，如填/xxx/xx就是这个目录下的所有，如果是/xxx/xx/xxx.jpg就是某个文件
               </div>
               <div className={managementAdd.inputButtonWrap}>
                   <Button type="primary" className={managementAdd.inputButton}>保存</Button>
                   <Link to={`/setting/deliver`}><Button>返回</Button></Link>
               </div>
       </div>
     )
  }
}
