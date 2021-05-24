import { Form } from "@ant-design/compatible";
import { Card, Row, Col } from "antd";
import React, { useState } from "react";
import Draggable from "react-draggable";
import Resizable from "re-resizable";
import ProForm, { ProFormText, ProFormSelect, ProFormDependency } from "@ant-design/pro-form";

const maxWidth = 324;
const maxHeight = 464;
const defaultData = [
    {
        type: "image",
        options: {
            style: {
                width: 284,
                height: 284,
                left: 20,
                top: 20
            },
            src: "https://img.alicdn.com/bao/uploaded/i2/2206685154891/O1CN01Un0s8s1m07kEjlmqX_!!0-item_pic.jpg_400x400q90.jpg_.webp"
        }
    },
    {
        type: "text",
        options: {
            style: {
                width: 285,
                height: 42,
                left: 20,
                top: 284 + 20 + 10
            }
        }
    },
    {
        type: "qr",
        options: {
            style: {
                width: 76,
                height: 76,
                left: maxWidth - 76 - 20,
                top: maxHeight - 20 - 76
            },
            src: "https://tvax2.sinaimg.cn/crop.0.0.850.850.180/684ff39bly8fi57d6kk3oj20nm0nm75h"
        }
    }
];
const Diy = (props) => {
    const [styles, setStyles] = useState({});
    const [body, setBody] = useState([]);
    const [current, setCurrent] = useState(0);
    setStyles(styles);

    const onReposition = (x, y, index) => {
        let _body = [...body];
        _body[index].options.style = { left: x, top: y };
        setBody(_body);
    };
    const onResize = (d, index) => {
        let _body = [...body];
        let { style } = _body[index].options.style;
        const width = style.width + d.width;
        _body[index].options.style = {
            ...style,
            width,
            height: lastSize.height + d.height
        };
        setBody(_body);
    };
    const onAdd = (type) => {
        let data = {};
        defaultData.map((item) => {
            if (item.type === type) {
                data = item;
            }
        });
        setBody([...body, ...[data]]);
    };
    const getDraggableItem = (item, i) => {
        return <Draggable
          key={`k${i}`}
          bounds="parent"
          axis="both"
          handle='.handle'
          position={{
              x: item.options.style.left,
              y: item.options.style.top
          }}
          grid={[1, 1]}
          onStart={() => {
              setCurrent(i);
          }}
          onStop={(e, data) => {
              setCurrent(i);
              onReposition(data.lastX, data.lastY, i);
          }}>
            {typeof item["resizableProps"] !== "undefined" ? <Resizable
              bounds={"parent"}
              className={`${styles.item}  ${current === i ? styles.active : ""} `}
              size={{
                  width: item.options.style.width,
                  height: item.options.style.height
              }}
              onResizeStop={(e, direction, ref, d) => {
                  onResize(d, i);
              }}
              data-index={i}
              {...item.resizableProps}
              handleComponent={{
                  bottomRight: () => (
                    <div className={styles.handleComponentBottomRight} />)
              }}
            >
                <div className={`${styles[item.type]} handle`}>
                    {item.children}
                </div>
            </Resizable> : <div
              className={`${styles.item}  ${current === i ? styles.active : ""} `}
              style={item.options.size}
              data-index={i}
            >
                <div className={`${styles[item.type]} handle`}>
                    {item.children}
                </div>
            </div>}
        </Draggable>;
    };
    let types = {};
    body.map((item) => {
        types[item.type] = item;
    });
    return (
      <Card bordered={false}>
          <Row>
              <Col span={12}>
                  <div className={styles.container}>
                      {
                          body.map((item, i) => getDraggableItem(item, i))
                      }
                  </div>
              </Col>
              <Col span={12}>
                  <ProForm
                    onFinish={async (values) => {
                        await waitTime(2000);
                        console.log(values);
                        message.success("提交成功");
                    }}
                    initialValues={{
                        name: "蚂蚁设计有限公司",
                        name2: "蚂蚁设计集团",
                        useMode: "chapter"
                    }}
                  >
                      <ProFormText
                        width="md"
                        name="name"
                        label="签约客户名称"
                        tooltip="最长为 24 位"
                        placeholder="请输入名称"
                      />
                      <ProFormText
                        width="md"
                        name={["name2", "text"]}
                        label="签约客户名称"
                        tooltip="最长为 24 位"
                        placeholder="请输入名称"
                      />
                      {/*  ProFormDependency 会自动注入并且 进行 shouldUpdate 的比对  */}
                      <ProFormDependency name={["name", ["name2", "text"]]}>
                          {({ name, name2 }) => {
                              return (
                                <ProFormSelect
                                  options={[
                                      {
                                          value: "chapter",
                                          label: "盖章后生效"
                                      }
                                  ]}
                                  width="md"
                                  name="useMode"
                                  label={`与《${name || ""}》 与 《${name2?.text || ""}》合同约定生效方式`}
                                />
                              );
                          }}
                      </ProFormDependency>
                      {/* noStyle shouldUpdate 是必选的，写了 name 就会失效 */}
                      <Form.Item noStyle shouldUpdate>
                          {(form) => {
                              return (
                                <ProFormSelect
                                  options={[
                                      {
                                          value: "chapter",
                                          label: "盖章后生效"
                                      }
                                  ]}
                                  width="md"
                                  name="useMode"
                                  label={`与《${form.getFieldValue("name")}》合同约定生效方式`}
                                />
                              );
                          }}
                      </Form.Item>
                  </ProForm>
              </Col>
          </Row>
      </Card>
    );
};
export default Diy;
