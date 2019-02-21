import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "dva";
import * as actions from "@/actions/wechat/autoReply";
import { Tabs, Alert, Switch } from "antd";
import { View } from "@/components/flexView";
import styles from "./index.css";
import KeyWordsReplyTable from "./keyWordsReply";
import FollowedReply from "./followedReply";

const TabPane = Tabs.TabPane;
//
// type Props = {
//     pathSearch:{
//         menu:string,
//         tab:string,
//     },
//     getAutoReplyStatus:Function,
//     setAutoReplyStatus:Function,
//     autoReplyStatus:number
// }

@connect(
    ({ view: { wechatAutoReply: { autoReplyStatus } } }) => ({
        autoReplyStatus
    }),
    dispatch => bindActionCreators(actions, dispatch)
)
export default class AutoReply extends Component {
    componentDidMount() {
        this.props.getAutoReplyStatus();
    }

    render() {
        const { autoReplyStatus } = this.props;
        const tabList = [
            {
                key: 1,
                tab: "关键词回复",
                main: () => <KeyWordsReplyTable {...this.props} />
            }, {
                key: 2,
                tab: "被关注回复",
                main: () => <FollowedReply {...this.props} />
            }
        ];
        return (
            <Tabs defaultActiveKey="1">
                {
                    tabList.map(({ tab, main, key }: { tab: string, main: Function, key: string }) =>
                        <TabPane tab={tab} key={key}>
                            <View className={styles.alertSwitchView}>
                                <Alert
                                    message="自动回复"
                                    description="通过编辑内容或关键词规则，快速进行自动回复设置。关闭自动回复之后，将立即对所有用户生效。"
                                    type="info"
                                    showIcon
                                />
                                <Switch
                                    checked={!!autoReplyStatus}
                                    onChange={() => {
                                        this.props.setAutoReplyStatus({ params: { status: autoReplyStatus ? 0 : 1 } });
                                    }}
                                />
                            </View>
                            {
                                autoReplyStatus ? main() : ""
                            }
                        </TabPane>
                    )
                }
            </Tabs>
        );
    }
}
