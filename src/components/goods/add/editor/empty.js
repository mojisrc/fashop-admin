
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
// import { Form, Icon, Button } from "antd";
import styles from './empty.css'

class Empty extends Component<
    {
        data:Array<{
            video:{url:string}
        }>,
        indexSort:number
    },
    {}
> {
    render() {
        console.log('EmptyDetail',this.props);
        const { data, indexSort } = this.props
        return (
            <View className={styles.emptyDetail}>

            </View>
        )
    }
}

const mapStateToProps = ({view}) => {
    return {

    }
}

export default connect(mapStateToProps)(Empty)
