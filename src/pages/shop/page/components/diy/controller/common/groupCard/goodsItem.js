import { Form } from '@ant-design/compatible';
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import styles from "./index.css";

import Image from "@/components/image";

const FormItem = Form.Item;
// 返回组内一条的数据格式
const _response = {
    img: "",
    title: "",
    price: "",
    desc: ""
};
export default class GroupCardItem extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.any,
        desc: PropTypes.string
    };
    static defaultProps = {
        title: null,
        img: null,
        link: null,
        backgroundColor: null,
        fontColor: null,
        onChange: (data) => {
        }
    };
    state = {
        response: {..._response}
    };

    render() {
        const { title, img, price } = this.props;
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
                    label="标题"
                >
                    {title}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="价格"
                >
                    ¥ {price}
                </FormItem>
            </div>
        </div>;
    }
}
