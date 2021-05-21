import React, { Component } from "react";
import styles from "./index.css";

export default class RichTextView extends Component {
    render() {
        const { data, options } = this.props;
        const { html_content } = data;
        const { padding, background_color } = options;
        return (
            <div className={styles.diyRichText} style={{ padding, backgroundColor: background_color }}>
                <div className={styles.diyRichTextContainner}>
                    <div dangerouslySetInnerHTML={{ __html: html_content }} />
                </div>
            </div>
        );
    }
}
