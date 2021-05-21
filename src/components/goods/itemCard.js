import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "@/components/image";

export default class GoodsItemCard extends Component {
    static propTypes = {
        style: PropTypes.object,
        img: PropTypes.string,
        title: PropTypes.string,
        desc: PropTypes.string
    };
    static defaultProps = {
        style: {},
        img: "",
        title: "",
        desc: ""
    };

    render() {
        const { img, title, desc, style } = this.props;
        return <div style={{ ...{ display: "flex", flexDirection: "column" }, ...style }}>
            <span style={{marginBottom:5,fontSize:14,fontWeight:'bold'}}>{title}</span>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" ,alignItems:'center',padding:5}}>
                <Image
                    type='goods'
                    src={img}
                    style={{ width: 20, height: 20,marginRight:5 }}
                />
                <span style={{ fontSize: 12,flex:1 ,color:'#999'}}>{desc}</span>
            </div>
        </div>;
    }
}
