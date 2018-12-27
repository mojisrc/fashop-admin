import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, Tabs, Button, Table, Divider, Select } from "antd";
import styles from "./index.css";
import router from "umi/router";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option

@connect()
class Wechat extends Component {
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        getFieldDecorator("goods", {
            rules: [{ required: true, message: "请选择商品!" }]
        });
        const tabList = [
            {
                title: "选择商品",
                render: ()=> <ChoiceGoods />
            }, {
                title: "已参与商品",
                render: ()=> <TakePartGoods />
            }
        ]
        return (
            <View>
                <h3>编辑商品</h3>
                <Tabs 
                    onChange={()=>{}} 
                    type="card"
                    tabBarStyle={{
                        marginBottom: 0
                    }}
                    style={{
                        marginLeft: 20
                    }}
                >
                    {
                        tabList.map((item,index)=>(
                            <TabPane tab={item.title} key={index}>
                                {
                                    item.render()
                                }
                            </TabPane>
                        ))
                    }
                </Tabs>
            </View>
        );
    }
}
export default Wechat

class ChoiceGoods extends Component{
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
                title: "商品图",
                dataIndex: "img",
            }, {
                title: "商品标题",
                dataIndex: "title",
            }, {
                title: "价格（元）",
                dataIndex: "price",
            }, {
                title: "库存",
                dataIndex: "storage"
            }, {
                title: "SKU数量",
                dataIndex: "num"
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <Button>
                    参与活动
                </Button>
            }
        ]
        const category_list = [
            {
                title: '分类一'
            }
        ]
        return(
            <View className={styles.tableWarp}>
                <Form
                    layout="inline"
                    style={{
                        margin: "20px",
                    }}
                >
                    <FormItem label={`商品名称`}>
                        <Input
                            placeholder={`请输入商品名称`}
                            onChange={(e) => {
                                // this.setState(update(this.state, {
                                //     queryParams: { keywords: { $set: e.target.value } }
                                // }))
                            }}
                            // value={keywords}
                        />
                    </FormItem>
                    <FormItem label={`商品分类`}>
                        <Select
                            placeholder="请选择"
                            style={{ width: 130 }}
                            // value={order_kind}
                            onChange={(order_kind) => {
                                // this.setState(update(this.state, {
                                //     queryParams: { order_kind: { $set: order_kind } }
                                // }))
                            }}
                        >
                            {
                                category_list.map((item, index) =>
                                    <Option
                                        value={item.title}
                                        key={index}
                                    >
                                        {item.title}
                                    </Option>
                                )
                            }
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            onClick={() => {
                                const path = getQueryPath('/order/list', {
                                    page: 1,
                                    rows: 10,
                                    keywords_type,
                                    keywords,
                                    create_time,
                                    state_type,
                                    order_kind,
                                })
                                router.push(path)
                            }}
                            style={{ marginRight: 14 }}
                        >
                                筛选
                        </Button>
                        <Button
                            onClick={() => {
                                const path = getQueryPath('/order/list')
                                router.push(path)
                            }}
                        >
                                清空筛选
                        </Button>
                    </FormItem>
                </Form>
                <Table 
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={[{}]} 
                    footer={() => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <span>
                                {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
                            </span>
                            <Button
                                type="primary"
                                size="small"
                                style={{ marginLeft: 8 }}
                                disabled={!selectedRowKeys.length}
                            >
                                批量参加
                            </Button>
                        </View>
                    )}
                />
            </View>
        )
    }
}
class TakePartGoods extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
                title: "商品图",
                dataIndex: "img",
            }, {
                title: "商品标题",
                dataIndex: "title",
            }, {
                title: "价格（元）",
                dataIndex: "price",
            }, {
                title: "库存",
                dataIndex: "storage"
            }, {
                title: "SKU数量",
                dataIndex: "num"
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <div>
                    <a href="#">设置拼团</a>
                    <Divider type="vertical" />
                    <a href="#">取消参加</a>
                </div>
            }
        ]
        return (
            <View className={styles.tableWarp}>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={[{}]}
                    footer={() => (
                        <View style={{flexDirection: 'row',alignItems: 'center',}}>
                            <span>
                                {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
                            </span>
                            <Button
                                type="primary"
                                size="small"
                                style={{ marginLeft: 8 }}
                                disabled={!selectedRowKeys.length}
                            >
                                全部取消参加
                            </Button>
                        </View>
                    )}
                />
            </View>
        )
    }
}
