//@flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import { Card, Badge } from 'antd';
import styles from './index.css'

class SyatemNote extends Component<
   {},
   {}
> {
   render() {
       const noteList = [
           {
               status:'processing',
               text:'小程序代注册功能上线公告',
               time:'11-17'
           },{
               status:'processing',
               text:'小程序代注册功能上线公告',
               time:'11-17'
           },{
               status:'default',
               text:'小程序代注册功能上线公告',
               time:'11-17'
           },{
               status:'default',
               text:'小程序代注册功能上线公告',
               time:'11-17'
           },{
               status:'default',
               text:'小程序代注册功能上线公告',
               time:'11-17'
           },{
               status:'default',
               text:'小程序代注册功能上线公告',
               time:'11-17'
           }
       ]
       return (
           <View className={styles.cardWarp}>
               <Card
                   title="系统公告"
                   style={{ width: '100%' }}
                   extra={<a>更多</a>}
               >
                  {
                      noteList.map(({status,text,time},index)=>
                          <View className={styles.noteListItem} key={index}>
                              <Badge status={status} />
                              <View className={styles.noteListText}>
                                  <span>{text}</span>
                                  <span>{time}</span>
                              </View>
                          </View>
                      )
                  }
               </Card>
           </View>
       )
   }
}

const mapStateToProps = ({view}) => {
   return {

   }
}

export default connect(mapStateToProps)(SyatemNote)
