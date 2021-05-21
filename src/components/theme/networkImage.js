import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

export default class ThemeImage extends PureComponent {
    static defaultProps = {
        resizeMode: 'cover',
        style: {}
    }

    render() {
        const {
            resizeMode,
            source,
            errImg = require('../../assets/images/fetchStatus/networkImageError.png')
        } = this.props
        if (!source || !source.uri) {
            return (
                <Image
                    resizeMode={resizeMode}
                    {...this.props}
                    source={errImg}
                />
            )
        } else {
            return (
                <Image
                    animationType='decay'
                    renderError={() => {
                        return (
                            <StatusView
                                image={errImg}
                            />
                        )
                    }}
                    {...this.props}
                />
            );
        }

    }
}

class StatusView extends PureComponent {
    render() {
        const { image } = this.props
        return (
            <View style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff'
            }}>
                <Image
                    source={image}
                    style={{
                        height: '80%',
                        width: '80%',
                        resizeMode: 'contain'
                    }}
                />
            </View>
        );
    }
}
