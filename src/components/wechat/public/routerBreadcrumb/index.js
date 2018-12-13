import React,{ Component } from 'react'
import { Breadcrumb } from "antd";
// type Props = {
//     pushFunc:Function,
//     oneLevel:string,
//     twoLevel:string
// }

export default class RouterBreadcrumb extends Component {
    render() {
        const { pushFunc, oneLevel, twoLevel } = this.props
        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a
                        onClick={()=>{
                            pushFunc()
                        }}
                    >
                        {oneLevel}
                    </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{twoLevel}</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
