import React, { Component } from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import Result from '../../components/result'
export default class InstallFinish extends Component {
    render() {
        return (
            <View className={styles.installFinishWarp}>
                <View className={styles.btnView}>
                    <Result
                        type="success"
                        title="安装成功"
                        description={<p>后台控制面板、小程序、App客户端的部署，请看官方文档</p>}
                        style={{ width: '100%' }}
                    />
                </View>
            </View>
        )
    }
}
