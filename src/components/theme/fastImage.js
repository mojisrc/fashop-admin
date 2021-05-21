import React, { Component } from 'react';
import { Image,  StyleSheet } from 'react-native';
import FastImage from '@/libs/fastImage'
import { windowWidth } from '@/utils/style';

export default class ThemeFastImage extends Component {
    static defaultProps = {
        resizeMode: 'cover',
        style: {},
        autoHeight: false,
        isFocused: true,
        hidden: false,
        index: 0,
        onLoad: () => {

        },
        onLoadEnd: () => {
        }
    }

    state = {
        width: windowWidth,
        height: 'auto',
    }

    componentWillUnmount() {
        this.mounted = false
    }

    componentDidMount() {
        this.mounted = true
    }

    nativeEvent = {
        width: 0,
        height: 0
    }

    render() {
        const { resizeMode, source, hidden, style, autoHeight, errImg = require('../../assets/images/fetchStatus/imageUnFocused.png'), index } = this.props
        const { width, height } = this.state
        let _style = StyleSheet.flatten(style)
        let _width = typeof _style['width'] !== "undefined" ? _style.width : width
        if (autoHeight === true) {
            _style = {
                ..._style,
                ...{
                    width: _width,
                    height
                }
            }
        }
        const normalisedSource = source && typeof source.uri === 'string' && !source.uri.split('http')[1] ? null : source;

        if (!normalisedSource) {
            return (
                <Image
                    resizeMode={resizeMode}
                    {...this.props}
                    source={errImg}
                    style={style}
                />
            )
        } else {
            let _props = {}
            if (autoHeight === true) {
                _style['overflow'] = 'hidden'
                _props = {
                    onLoad: (e) => {
                        if ( autoHeight === true) {
                            const ratio = e.nativeEvent.width / _width
                            this.setState({
                                height: parseInt(e.nativeEvent.height / ratio),
                            })
                            this.props.onLoad({
                                width: _width,
                                height: e.nativeEvent.height / ratio
                            })
                        }
                    },
                }
            }
            // TODO 通过动画来优化
            // ,{borderWidth:1,borderColor:'#000'}
            // minHiehgt是为了解决FlatList里嵌套FlatList的时候 子元素没高度不渲染的bug
            // Platform.OS !== 'ios' &&
            // Platform.OS !== 'ios'
            return  <FastImage
                source={source}
                style={_style}
                resizeMode={resizeMode}
                {..._props}
            />
        }
    }
}
