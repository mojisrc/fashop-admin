import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'antd-mobile';
import ReactNativePropRegistry from 'react-native-web/dist/cjs/exports/StyleSheet/ReactNativePropRegistry';

export default class ThemeButton extends Component {
    static defaultProps = {
        type: 'primary',
        onPress: () => {
        },
        style: {},
        disabled: false,
        loading:false,
        onClick:()=>{},
        className:''
    };

    render() {
        const { onPress, type, disabled, style ,className} = this.props;
        const otherStyle = typeof style === 'number'  ? ReactNativePropRegistry.getByID(style) : style
        return (
            <Button
                type={type}
                disabled={disabled}
                style={{
                    ...{
                        borderRadius: 3,
                    },
                    ...otherStyle,
                }}
                onClick={onPress}
                className={className}
            >
                {this.props.children}
            </Button>
        );
    }
}

const styles = StyleSheet.create({});
