//@flow
import React, { Component } from "react";
import { View } from "react-web-dom";
import { Tabs, DatePicker } from 'antd';
import styles from './index.css'
import ReactEcharts from 'echarts-for-react';
import { StatisticsApi } from "../../config/api/statistics";
import moment from 'moment'
import Fetch from "../../utils/fetch";

const TabPane = Tabs.TabPane;
const { MonthPicker } = DatePicker;
export default class Charts extends Component<{},
    {
        activeKey: string,
        chartDate: moment,
        monthSaleChartList: Array<{
            day: number,
            sale_number: number
        }>,
        monthOrderChartList: Array<{
            day: number,
            order_number: number
        }>,
        customerGrowthChartList: Array<{
            day: number,
            customer_number: number
        }>,
        newCustomerCostList: Array<{
            day: number,
            cost: number
        }>,
        xAxisData: Array<number>,
        yAxisData: Array<number>,
    }> {
    state = {
        activeKey: '月销售额',
        chartDate: moment(`${moment().format('YYYY')}-${moment().format('MM')}`),
        monthSaleChartList: [],
        monthOrderChartList: [],
        customerGrowthChartList: [],
        newCustomerCostList: [],
        xAxisData: [],
        yAxisData: [],
    }

    componentDidMount() {
        const { activeKey, chartDate } = this.state
        this.initChart(moment(chartDate).format('YYYY-MM'), activeKey)
    }

    async initChart(date: string, activeKey: string) {
        const {
            monthSaleChartList,
            monthOrderChartList,
            customerGrowthChartList,
            newCustomerCostList
        } = this.state
        let e
        let list
        switch (activeKey) {
            case '月销售额':
                e = await Fetch.fetch({
                    api: StatisticsApi.monthSalesHistogram,
                    params: { date }
                })
                if(e.result.list){
                    list = e.result.list
                    this.setState({
                        monthSaleChartList: list,
                        xAxisData: list.map((item) => {
                            return `${item.day}日`
                        }),
                        yAxisData: list.map((item) => {
                            return item.sale_number
                        })
                    })
                }
                break
            case '月订单量':
                e = await Fetch.fetch({
                    api: StatisticsApi.monthOrderCountHistogram,
                    params: { date }
                })
                list = e.result.list
                this.setState({
                    monthOrderChartList: list,
                    xAxisData: list.map((item) => {
                        return `${item.day}日`
                    }),
                    yAxisData: list.map((item) => {
                        return item.order_number
                    })
                })
                break
            case '客户增量':
                e = await Fetch.fetch({
                    api: StatisticsApi.monthUserAddCountHistogram,
                    params: { date }
                })
                list = e.result.list
                this.setState({
                    customerGrowthChartList: list,
                    xAxisData: list.map((item) => {
                        return `${item.day}日`
                    }),
                    yAxisData: list.map((item) => {
                        return item.customer_number
                    })
                })
                break
            case '新客户消费':
                e = await Fetch.fetch({
                    api: StatisticsApi.monthNewUserSalesHistogram,
                    params: { date }
                })
                list = e.result.list
                this.setState({
                    newCustomerCostList: list,
                    xAxisData: list.map((item) => {
                        return `${item.day}日`
                    }),
                    yAxisData: list.map((item) => {
                        return item.cost
                    })
                })
                break
        }
    }

    getOption = () => {
        const { activeKey, xAxisData, yAxisData } = this.state
        return {
            title: {
                show: true,
                text: '',
                left: 'center',
                textStyle: {
                    color: '#2196F3'
                }
            },
            color: ['#188fff'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    nameGap: 20,
                    data: xAxisData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ddd',
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.647058823529412)',
                            fontSize: '14'
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: `${activeKey}`,
                    nameGap: 24,
                    nameTextStyle: {
                        color: '#333',
                        fontSize: '16',
                        fontWeight: '600'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ddd',
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.647058823529412)',
                            fontSize: '12',
                            fontFamily: "'ArialMT', 'Arial'"
                        }
                    },
                }
            ],
            series: [
                {
                    name: '数值',
                    type: 'bar',
                    stack: 'one',
                    itemStyle: {
                        normal: {},
                        emphasis: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    },
                    data: yAxisData
                },
            ]
        }
    }

    render() {
        const { activeKey, chartDate } = this.state
        const tabList = [
            {
                id: 1,
                tab: '月销售额',
            }, {
                id: 2,
                tab: '月订单量',
            }, {
                id: '3',
                tab: '客户增量',
            }, {
                id: '4',
                tab: '新客户消费',
            }
        ]
        return (
            <View className={styles.indexChartWarp}>
                <Tabs
                    activeKey={activeKey}
                    onChange={(activeKey) => {
                        this.setState({ activeKey })
                        this.initChart(moment(chartDate).format('YYYY-MM'), activeKey)
                    }}
                    tabBarExtraContent={
                        <View className={styles.chartOperate}>
                            {/*<p>累计：<span>￥{saleAccumulative.accumulative_amount}.00</span></p>*/}
                            {/*<p>日均：<span>￥{saleAverage.day_average}.00</span></p>*/}
                            <MonthPicker
                                style={{ width: 110 }}
                                format={'YYYY-MM'}
                                defaultValue={chartDate}
                                onChange={(date: moment, dateString: string) => {
                                    const { activeKey } = this.state
                                    this.initChart(dateString, activeKey)
                                }}
                            />
                        </View>
                    }
                >
                    {
                        tabList.map(({ id, tab }) =>
                            <TabPane tab={tab} key={tab}>
                                <ReactEcharts
                                    option={this.getOption()}
                                    style={{ height: '340px', width: '100%' }}
                                    className={styles.react_for_echarts}
                                />
                            </TabPane>
                        )
                    }
                </Tabs>
            </View>
        )
    }
}
