import React, { Component } from "react";
import { Button, Input, Select, DatePicker, Form } from "antd";
import { initialValue } from "@/utils/form";

const Option = Select.Option;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

// TODO 简化外部传值
@Form.create()
class FormSearch extends Component {
    static defaultProp = {
        items: [],
        onSubmit: () => {
        }
    };

    render() {
        const { items, onSubmit } = this.props;
        return (
            <Form layout="inline" className="ant-advanced-search-form" onSubmit={(e) => {
                e.preventDefault();
                this.props.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        onSubmit(values);
                    }
                });
            }}>
                {
                    items.map((item, index) => {
                        return this.renders[item.type](this.formatItem(item), index);
                    })
                }
            </Form>
        );
    }

    formatItem = (item) => {
        return item;
    };

    renders = {
        select: (item, index) => {
            const { getFieldDecorator } = this.props.form;
            const { options: { select, label } } = item;
            return <FormItem label={label} key={index}>
                {getFieldDecorator(select.field, {
                    ...initialValue(select.initialValue)
                })(
                    <Select
                        placeholder={select.placeholder}
                        allowClear={select.allowClear}
                        style={select.style}
                        onChange={(e) => {
                            select.onChange(e);
                        }}
                    >
                        {select.data.map((op, opIndex) => {
                            return <Option value={op.value} key={opIndex}>{op.name}</Option>;
                        })}
                    </Select>
                )}
            </FormItem>;
        },
        select_input: (item, index) => {
            const { getFieldDecorator } = this.props.form;
            const { options: { select, input, label } } = item;

            const prefixSelector = getFieldDecorator(select.field, {
                ...initialValue(select.initialValue)
            })(<Select
                style={select.style}
                placeholder={select.placeholder}
                onChange={(e) => {
                    input.onChange(e);
                }}
            >
                {select.data.map((op, opIndex) => {
                    return <Option value={op.value} key={opIndex}>{op.name}</Option>;
                })}
            </Select>);
            return <FormItem label={label} key={index}>
                {getFieldDecorator(input.field, {
                    ...initialValue(input.initialValue)
                })(<Input
                    addonBefore={prefixSelector}
                    placeholder={input.placeholder}
                    onChange={(e) => {
                        input.onChange(e);
                    }}
                />)}
            </FormItem>;
        },
        range_picker: (item, index) => {
            const { getFieldDecorator } = this.props.form;
            const { options: { rangePicker, label } } = item;
            return <FormItem label={label} key={index}>
                {getFieldDecorator(rangePicker.field, {
                    ...initialValue(rangePicker.initialValue)
                })(
                    <RangePicker
                        allowClear={true}
                        onChange={(dates, create_time) => {
                            rangePicker.onChange(dates, create_time);
                        }}
                    />
                )}
            </FormItem>;
        },
        submit: (item, index) => {
            return <FormItem key={index}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: 14 }}
                >
                    筛选
                </Button>
            </FormItem>;
        },
        reset: (item, index) => {
            const { options: { button } } = item;
            return <FormItem key={index}>
                <Button
                    onClick={() => {
                        button.onChange();
                    }}
                >
                    清空筛选
                </Button>
            </FormItem>;
        }
    };
}


const defaultData = [
    {
        type: "select_input",
        options: {
            label: null,
            select: {
                field: null,
                style: { minWidth: 115 },
                placeholder: null,
                onChange: (value) => {
                },
                initialValue: null,
                data: [
                    { name: "标题1", value: "value1" },
                    { name: "标题2", value: "value2" }
                ]
            },
            input: {
                field: null,
                placeholder: null,
                onChange: (value) => {
                },
                initialValue: null
            }
        }
    },
    {
        type: "range_picker",
        options: {
            label: null,
            rangePicker: {
                field: null,
                style: null,
                placeholder: null,
                onChange: (value) => {
                },
                allowClear: true,
                initialValue: null
            }
        }
    },
    {
        type: "select",
        options: {
            label: null,
            select: {
                field: null,
                style: null,
                placeholder: null,
                onChange: (value) => {
                },
                allowClear: true,
                initialValue: null
            }
        }
    },
    {
        type: "submit",
        options: {
            button: {
                onChange: (value) => {
                }
            }
        }
    },
    {
        type: "reset",
        options: {
            button: {
                onChange: (value) => {
                }
            }
        }
    }
];

export default FormSearch;
