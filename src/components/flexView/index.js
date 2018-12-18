import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";

export class View extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
    };
    static defaultProps = {
        className: '',
        style: undefined,
    };
    render() {
        return <div
            {...this.props}
            className={`${styles.View} ${this.props.className}`}
            style={this.props.style}
        >
            {this.props.children}
        </div>
    }
}

export class ScrollView extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        block: PropTypes.bool,
    };
    static defaultProps = {
        className: '',
        style: undefined,
        block: false,
    };
    render() {
        const { block } = this.props
        return (
            <div
                className={`${styles.ScrollView} ${block ? styles.block : styles.flex} ${this.props.className}`}
                style={this.props.style}
                ref={(e) => {
                    if (e) {
                        this.ScrollView = e
                    }
                }}
            >
                {this.props.children}
            </div>
        )
    }
    scrollTopTo(e) {
        this.ScrollView.scrollTop = e
    }
    getLayout() {
        const {
            scrollHeight,
            scrollWidth,
            offsetHeight,
            scrollTop,
        } = this.ScrollView
        return {
            height: scrollHeight,
            width: scrollWidth,
            offsetHeight,
            scrollTop,
        }
    }
    log() {
        console.log({
            'ScrollView': this.ScrollView
        })
    }
}
