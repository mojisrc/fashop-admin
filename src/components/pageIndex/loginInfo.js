//@flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import { Card } from 'antd';
import styles from './index.css'

class LoginInfo extends Component<
   {},
   {}
> {
   render() {
       return (
           <View className={styles.loginInfoWarp}>
               <Card
                   title="登录信息"
                   style={{ width: '100%' }}
               >
                   <p>本次登录IP：<span>180.213.210.132</span></p>
                   <p>最后登录IP：<span>180.213.210.132</span></p>
                   <p>最后登录时间：<span>2017-11-28 09:44:53</span></p>
               </Card>
           </View>
       )
   }
}

const mapStateToProps = ({view}) => {
   return {

   }
}

export default connect(mapStateToProps)(LoginInfo)
