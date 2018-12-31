//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import styles from '../../styles/shop/shopSetting.css'
import { setDiyData } from '../../actions/shop/decorate'
import ShopBasicInfo from './basicInfo'
import {dispatchType, formType} from "../../utils/flow";

type Props = {
    form: formType,
    dispatch: dispatchType,
    history: { goBack: Function, push: Function },
}

class Setting extends Component<{},
    {}> {
    render() {

        return (
            <View className={`${styles.shopSettingWarp} shopSetting`}>
                <ShopBasicInfo {...this.props} />
            </View>
        )
    }
}

const mapStateToProps = ({ view }) => {
    return {
        options: view.shop.options,
        body: view.shop.body,
    }
}

export default connect(mapStateToProps, { setDiyData })(Setting)
