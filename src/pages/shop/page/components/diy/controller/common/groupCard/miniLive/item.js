import { Form } from '@ant-design/compatible';
import React, { PureComponent } from "react";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import styles from "./index.css";

import Image from "@/components/image";

const FormItem = Form.Item;
// 返回组内一条的数据格式
const _response = {
    img: "",
    title: "",
    desc: ""
};
export default class WechatLiveCardItem extends PureComponent {
    static defaultProps = {
        img: null,
        title: null,
        onChange: (data) => {
        }
    };
    state = {
        response: { ..._response }
    };

    render() {
        const { title, img } = this.props;
        return <div className={styles.itemBot}>
            <div className={styles.itemLeft}>
                <Image
                    type='goods'
                    src={img}
                    style={{
                        width: 80,
                        height: 80
                    }}
                />
            </div>
            <div style={{ flex: 1 }}>
                <FormItem
                    {...formItemLayout}
                    label="名称"
                >
                    {title}
                </FormItem>
            </div>
        </div>;
    }
}
