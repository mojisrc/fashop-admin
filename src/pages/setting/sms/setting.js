import React,{ Component } from "react";
import {Tabs} from 'antd';
import Remind from "./smsRemind";
const TabPane = Tabs.TabPane;
export default class Setting extends Component{
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
        <div>
            <Tabs defaultActiveKey="1" tabBarStyle={TabsStyle.tab}>
                <TabPane tab="短信提醒" key="1" >
                    <Remind/>
                </TabPane>
                <TabPane tab="位置预留" key="2">
                    位置预留
                </TabPane>
            </Tabs>
        </div>
     )
  }
}
