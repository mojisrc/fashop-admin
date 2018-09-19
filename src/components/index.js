//@flow
import React,{ Component,PropTypes } from 'react';


export default class NetWorkImage extends Component{
    constructor(props){
        super(props);
        this.state = {
            loadingImage : require('../images/imageLoading.png'),
            success : false,
            src : this.props.src,
        };
    }
    componentWillUpdate(nextProps){
        if(nextProps.src!==this.state.src&&success===false){
            this.setState({
                success : true
            })
        }
    }
    render() {
        const {src} = this.props
        const {success} = this.state
        if(success){
            return (
                <img
                    {...this.props}
                >
                    {this.props.children}
                </img>
            )
        }else {
            return(
                <img
                    {...this.props}
                    src={src}
                >
                    {this.props.children}
                </img>
            )
        }
    }
}
