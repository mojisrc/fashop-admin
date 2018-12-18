import React, { PureComponent, } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";

export default class Add extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    };
    static defaultProps = {
        onClick: () => {

        },
    };

    render() {
        const { onClick } = this.props;
        return <div
            className={styles.itemAdd}
            onClick={() => {
                onClick()
            }}
        >
            <Icon type='plus' /> 添加
        </div>;
    }
}
