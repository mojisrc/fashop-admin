import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";
import PlusOutlined from "@ant-design/icons/PlusOutlined";

export default class GroupCardAdd extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };
    static defaultProps = {
        onClick: () => {

        }
    };

    render() {
        const { onClick } = this.props;
        return <div
          className={styles.itemAdd}
          onClick={() => {
              onClick();
          }}
        >
            <PlusOutlined /> 添加
        </div>;
    }
}
