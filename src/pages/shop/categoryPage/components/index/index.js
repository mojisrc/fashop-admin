import React, { Component } from "react";
import SystemTemplate from "./systemTemplate";
import MyTemplate from "./myTemplate";

export default class ShopIndex extends Component {
    render() {
        const tabList = [
            {
                key: 1,
                tab: "我的模板",
                main: () => <MyTemplate {...this.props} />
            },
            {
                key: 2,
                tab: "系统模板",
                main: () => <SystemTemplate {...this.props} />
            }
        ];
        return (
            <MyTemplate {...this.props} />
            // <Tabs defaultActiveKey="1">
            //     {
            //         tabList.map(({key,tab,main}:{key:string,tab:string,main:Function})=>
            //             <TabPane tab={tab} key={key}>
            //                 {
            //                     main()
            //                 }
            //             </TabPane>
            //         )
            //     }
            // </Tabs>
        );
    }
}
