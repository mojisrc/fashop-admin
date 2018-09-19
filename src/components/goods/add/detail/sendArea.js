//@flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import styles from './sendArea.css'

class GoodsSendArea extends Component<
    {},
    {}
> {
    render() {
        return (
            <View className={styles.sendArea}>
                
            </View>
        )
    }
}

const mapStateToProps = ({view}) => {
    return {

    }
}

export default connect(mapStateToProps)(GoodsSendArea)
