import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import styles from './index.css'
import {sendDataInfor} from '../../actions/statistics';

@connect(
    ({
        view:{statistics:{statisticsDatainfor}}
    }) => ({
        statisticsDatainfor
    }),
    {sendDataInfor}
)

export default class DataDisplay extends Component{
   componentWillMount(){
       const { sendDataInfor } = this.props;
       sendDataInfor();
   }
   render() {
       const {statisticsDatainfor} = this.props
       return (
           <View className={styles.dataDisplayWarp}>
               <View className={styles.dataDisplay}>
                   <View className={styles.dataDisplayItem}>
                       <span>未发货订单</span>
                       <p>{statisticsDatainfor.no_send_count}</p>
                   </View>
                   <View className={styles.dataDisplayItem}>
                       <span>当日销售额 (元)</span>
                       <p>{statisticsDatainfor.day_total}</p>
                   </View>
                   <View className={styles.dataDisplayItem}>
                       <span>平均客单价 (元)</span>
                       <p>{statisticsDatainfor.cost_average}</p>
                   </View>
                   <View className={styles.dataDisplayItem}>
                       <span>昨日新增客户</span>
                       <p>{statisticsDatainfor.yesterday_new_user}</p>
                   </View>
                   <View className={styles.dataDisplayItem}>
                       <span>累计客户</span>
                       <p>{statisticsDatainfor.all_user}</p>
                   </View>
               </View>
               <View className={styles.dataDisplay}>
                   <View className={styles.dataDisplayItem}>
                       <span>累计好评度</span>
                       <p>{statisticsDatainfor.positive_count}</p>
                   </View>
                   <View className={styles.dataDisplayItem}>
                       <span>昨日好评数</span>
                       <p>{statisticsDatainfor.yesterday_positive_count}</p>
                   </View>
                   <View className={styles.dataDisplayItem}>
                       <span>昨日中评数</span>
                       <p>{statisticsDatainfor.yesterday_moderate_count}</p>
                   </View>
                   <View className={styles.dataDisplayItem}>
                       <span>昨日差评数</span>
                       <p>{statisticsDatainfor.yesterday_negative_count}</p>
                   </View>
                   <View className={styles.dataDisplayItem}>
                       <span>累计好评数</span>
                       <p>{statisticsDatainfor.positive_count}</p>
                   </View>
               </View>
           </View>
       )
   }
}
