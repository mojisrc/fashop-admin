import React, { Component } from "react";
import styles from "./index.css";
//
// type Props = {
//     options: any,
//     data: { url: string }
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { data } = this.props
        const { url } = data
        return (
            <div className={styles.videoPhoneWarp}>
                <video src={url} controls="controls">
                    您的浏览器不支持 video 标签。
                </video>
                {/* <video
                    controls="controls"
                    width='100%'
                    height={200}
                >
                    <source
                        src="https://storage.googleapis.com/androiddevelopers/videos/studio-install-mac.mp4"
                        type="video/mp4"
                    />
                </video> */}
            </div>
        )
    }
}
