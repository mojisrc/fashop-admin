import React, { Component } from "react";
import styles from "./image.css";
import NetWorkImage from "@/components/image";
import { Input, Checkbox } from "antd";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";

export default class FolderImage extends Component {
    static defaultProps = {
        name: "",
        url: "",
        onNameInputBlur: () => {

        },
        onImageDoubleClick: () => {

        },
        onImageClick: () => {

        },
        onDel: () => {
        }
    };

    state = {
        editState: false,
        name: "",
        value: ""
    };

    render() {
        const { editState, value } = this.state;
        const { url, name, onNameInputBlur, onImageDoubleClick, onImageClick, checked, onDel, onChecked } = this.props;
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
                  <NetWorkImage
                    style={{ height: 128, width: 128 }}
                    src={`${url}?x-oss-process=image/resize,w_100`}
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
                  <div className={styles.imageToolWrap}
                       style={checked ? { display: "initial" } : {}}
                  >
                      <div className={styles.imageTool} onClick={() => {
                          onDel();
                      }}>
                          <DeleteOutlined style={{ color: "#fff" }} />
                      </div>
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
