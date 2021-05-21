import React, { Component } from 'react';
import { Image } from 'react-native-web';

export default class FastImage extends Component {
    static defaultProps = {
        source:null,
        style:{},
        onLoad:()=>{},
        resizeMode:'contain'

    }
    render() {
        const { source, style, onLoad,resizeMode } = this.props;
        return <Image
            source={source}
            style={style}
            resizeMode={resizeMode}
            onLoad={(e)=>{
                if(!!e){
                    Image.getSize(source.uri,(width,height)=>{
                        onLoad({
                            nativeEvent:{
                                ...e.nativeEvent,
                                ...{
                                    width,height
                                }
                            }
                        })
                    })
                }
            }}
        />;
    }

    static preload(images) {
        images.map(({uri})=>{
            Image.prefetch(uri).then(() => {
                // image is now prefetched
            });
        })
    }
}
