//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import { Input } from "antd";
import Page from '../../components/public/page'
import styles from '../../styles/user/userInfo.css'
import UploadImage from '../../components/uploadImage'
import { editSelfAvatar } from '../../actions/member'
import types from '../../constants'
import { historyType } from "../../utils/flow";
import { dispatchProps } from "../../utils/defaultProps";
type Props = {
    history: historyType,
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string },
    userInfo:{
        avatar:string,
        nickname:string
    }

}
type State = {
}

@connect(({ app: { member: { userInfo } } }) => ({
    userInfo
}))
export default class Self extends Component<Props,State>{

    render() {
        const { dispatch, userInfo } = this.props;
        return (
            <Page className={styles.userInfoWarp}>
                <View className={styles.userInfoItem}>
                    <h3>设置头像</h3>
                    <View className={styles.settingAvatar}>
                        <img
                            src={userInfo.avatar}
                            className={styles.avatarImg}
                        />
                        <UploadImage
                            onChange={(e) => {
                                dispatch(editSelfAvatar({ params: { avatar: e, nickname: userInfo.nickname } }))
                                setTimeout(() => {
                                    dispatch({
                                        type: types.member.INIT_USER_INFO_STORAGE
                                    })
                                }, 2000)
                            }}
                            is_save={1}
                        >
                            <a className={styles.uploadIcon}>上传图像</a>
                        </UploadImage>
                        <p>仅支持JPG,GIF,PNG格式上传</p>
                    </View>
                </View>
            </Page>
        )
    }
}

