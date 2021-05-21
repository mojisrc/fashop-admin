import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


export default class ThemeHeaderButton extends Component {

    static defaultProps = {
        buttonStyle: {},
        onPress: () => {
        },
    }

    render() {
        const {
            buttonStyle,
            onPress,
        } = this.props
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.buttonStyle, buttonStyle]}
                onPress={onPress}
            >
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 40,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
