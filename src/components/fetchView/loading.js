import React,{ Component } from 'react';
import {windowWidth} from '@/utils/style';
import { View } from "@/components/flexView";
import PropTypes from 'prop-types';

export default class Loading extends Component{
    static propTypes = {
        height : PropTypes.number,
        autoLayout : PropTypes.bool,
    };
    static defaultProps = {
        height : windowWidth*0.4,
        autoLayout : false,
    };
    render() {
        const {autoLayout,height} = this.props
        return (
            <View
                style={
                    Object.assign({},styles.loaddingView,
                        autoLayout
                        ?   {
                                flex:1
                            }
                        :   {
                                height,
                            }
                    )
                }
            >
                <svg
                    style={
                        Object.assign({},styles.loaddingImage,
                            autoLayout
                            ?   {
                                    width: windowWidth*0.5,
                                }
                            :   {
                                    height:height*0.5,
                                    width:height*0.5,
                                }
                        )
                    }
                >
                    <use xlinkHref={require('../../assets/images/loading.svg')}/>
                </svg>

            </View>
        )
    }
}



const styles = {
    loaddingView:{
        justifyContent:'center',
        alignItems:'center',
    },
    loaddingImage:{

    },
}
