import React, { Component } from "react";
import { Spin } from 'antd';
import { View } from "react-web-dom";
import styles from "../../styles/bundle/index.css";

export default class Bundle extends Component {
    state = {
        mod: null
    };

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        props.load().then(mod => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? (
            this.props.children(this.state.mod)
        ) : (
            <View className={styles.containerInit}><Spin /></View>
        );
    }
}
