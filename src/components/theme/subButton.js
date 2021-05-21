import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { ThemeStyle } from '@/utils/style';

export default class ThemeSubButton extends Component {
    static propTypes = {
        style: PropTypes.object,
        type: PropTypes.string,
        onPress: PropTypes.func,
    }
    static defaultProps = {
        style: {},
        type: 'default',
        onPress: () => {
        },
    }

    render() {
        const { style, onPress, text } = this.props
        return (
            <TouchableOpacity
                style={[styles.btn, style]}
                activeOpacity={.5}
                onPress={onPress}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 18,
        borderColor: ThemeStyle.themeColor,
        borderWidth:1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    text: {
        fontSize: 14,
        color: ThemeStyle.themeColor,
    }
})
