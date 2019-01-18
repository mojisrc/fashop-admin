import React, { Component } from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import Result from '../../components/result'
import { Button} from "antd";

export default class InstallFinish extends Component {
    render() {
        return (
            <View className={styles.installFinishWarp}>
                <View className={styles.btnView}>
                    <Result
                        type="success"
                        title="安装成功"
                        description={<Button
                            type='primary'
                            onClick={() => {
                                window.location.href = "/";
                            }}
                            size='large'
                        >访问后台</Button>}
                        style={{ width: '100%' }}
                    />
                </View>
            </View>
        )
    }
}
