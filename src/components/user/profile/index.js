import React, { PureComponent } from "react";
import styles from "./index.css";
import { history as router } from "umi";
import { Avatar, Tooltip } from "antd";

export default class UserProfile extends PureComponent {
    static defaultProps = {
        id: null,
        avatar: null,
        nickname: null
    };


    render() {
        const { avatar, nickname, id, phone } = this.props;
        return (
            <div className={styles.main}>
                <div className={styles.avatar}>
                    <Tooltip title={`UID：${id}`}>
                        <Avatar icon="user" src={avatar} />
                    </Tooltip>
                </div>
                <div className={styles.nameWrap}>
                    <a onClick={() => {
                        router.push(`/user/list/detail?id=${id}`);
                    }}
                    >
                        {nickname}
                    </a>
                    {phone && <div className={styles.phone}>{phone}</div>}
                </div>
            </div>
        );
    }
}
