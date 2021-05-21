import { Icon } from '@ant-design/compatible';
import React, { Component } from "react";
import styles from "./item.css";
import { Input, Checkbox } from "antd";

export default class FolderItem extends Component {
    static defaultProps = {
        name:"",
        onNameInputBlur: () => {

        },
        onImageDoubleClick: () => {

        },
        onImageClick: () => {

        },
        onDel: () => {
        }
    }
    state = {
        editState: false,
        name: "",
        value: ""
    };
    render() {
        const { editState, value } = this.state;
        const {  name, onNameInputBlur, onImageDoubleClick, onImageClick, checked, onDel, onChecked } = this.props;
        return (
            <div
                className={styles.imageListItem}
            >
                <div
                    onClick={onImageClick}
                    onDoubleClick={onImageDoubleClick}
                    className={styles.image}
                    style={checked ? { borderColor: "#3E86DC" } : {}}
                >
                    <Icon
                        style={{ fontSize: 50, color: "#72BFEB" }}
                        type="folder-open"
                    />
                    <div className={styles.imageHover}
                         style={checked ? { display: "initial" } : {}}
                         onClick={() => {
                             onChecked();
                         }}
                    >
                        <Checkbox
                            checked={!!checked}
                        />
                    </div>
                </div>
                <div className={styles.title}>
                    {editState === false ? <p
                            onClick={() => {
                                this.setState({
                                    editState: true
                                }, () => {
                                    this.input.focus();
                                });
                            }}
                        >
                            {name}
                        </p> :
                        <Input
                            ref={e => this.input = e}
                            defaultValue={name}
                            onChange={(e) => {
                                const value = e.target.value;
                                this.setState({
                                    value
                                });
                            }}
                            onBlur={() => {
                                this.setState({
                                    editState: false
                                }, () => {
                                    onNameInputBlur(value);
                                });
                            }}
                        />
                    }
                </div>
            </div>
        );
    }

}
