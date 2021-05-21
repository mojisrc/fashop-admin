import { Image, Space } from "antd";
import React from "react";
import styles from "./index.less"

const Images = (props) => {
    const { list, size } = props
    return <div className={styles.main}>
        <Image.PreviewGroup>
            <Space>
                {
                    Array.isArray(list) && list.map((src, i) =>
                        <Image
                            key={i}
                            width={size}
                            height={size}
                            src={src}
                        />
                    )
                }
            </Space>
        </Image.PreviewGroup>
    </div>
}
export default Images
