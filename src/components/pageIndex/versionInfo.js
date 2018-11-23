//@flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import { Card, Badge, Button } from 'antd';
import styles from './index.css'

class VersionInfo extends Component<
   {},
   {}
> {
   render() {
       return (
           <View className={styles.versionInfoWarp}>
               <Card
                   title="版本信息"
                   style={{ width: '100%' }}
               >
                   {/* <View className={styles.versionImgWarp}>
                       <img alt='' src={require('../../images/pageIndex/versionImg.png')} />
                   </View> */}
                   <p>
                       程序版本：
                       <span>hyx v 1.0</span>
                       <Button
                           size='small'
                           className={styles.newVersionBtn}
                       >
                           新版本 2.0
                       </Button>
                   </p>
                   <p>更新时间：<span>2017-11-28 09:44:53</span></p>
                   <p>
                       授权方式：
                       <Button
                           size='small'
                           className={styles.authTypeBtn}
                           disabled
                        >
                           非商业授权
                       </Button>
                       <Badge dot>
                           <a>
                               升级商业授权版
                           </a>
                        </Badge>
                    </p>
               </Card>
           </View>
       )
   }
}

const mapStateToProps = ({view}) => {
   return {

   }
}

export default connect(mapStateToProps)(VersionInfo)
