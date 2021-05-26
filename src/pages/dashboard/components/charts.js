import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Tabs, DatePicker } from "antd";
import styles from "./index.css";
import statistics from "@/services/statistics";
import dayjs from "dayjs";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { GridComponent, TooltipComponent, TitleComponent } from "echarts/components";
// https://github.com/hustcc/echarts-for-react
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);
const TabPane = Tabs.TabPane;
const { MonthPicker } = DatePicker;
export default class Charts extends Component {
    state = {
        activeKey: "月销售额",
        chartDate: dayjs(`${dayjs().format("YYYY")}-${dayjs().format("MM")}`),
        monthSaleChartList: [],
        monthOrderChartList: [],
        customerGrowthChartList: [],
        newCustomerCostList: [],
        xAxisData: [],
        yAxisData: []
    };

    componentDidMount() {
        const { activeKey, chartDate } = this.state;
        this.initChart(dayjs(chartDate).format("YYYY-MM"), activeKey);
    }

    async initChart(date, activeKey) {
        let e;
        let list;
        let xAxisData = [];
        let yAxisData = [];
        switch (activeKey) {
            case "月销售额":
                e = await statistics.monthSalesHistogram({ date });
                if (Array.isArray(e.result.list) && e.result.list.length > 0) {
                    list = e.result.list;
                    xAxisData = list.map((item) => {
                        return `${item.day}日`;
                    });
                    yAxisData = list.map((item) => {
                        return item.sale_number;
                    });
                }
                this.setState({
                    monthSaleChartList: list,
                    xAxisData,
                    yAxisData
                });
                break;
            case "月订单量":
                e = await statistics.monthOrderCountHistogram({ date });
                if (Array.isArray(e.result.list) && e.result.list.length > 0) {
                    list = e.result.list;
                    xAxisData = list.map((item) => {
                        return `${item.day}日`;
                    });
                    yAxisData = list.map((item) => {
                        return item.order_number;
                    });
                }
                this.setState({
                    monthOrderChartList: list,
                    xAxisData,
                    yAxisData
                });
                break;
            case "客户增量":
                e = await statistics.monthUserAddCountHistogram({ date });
                if (Array.isArray(e.result.list) && e.result.list.length > 0) {
                    list = e.result.list;
                    xAxisData = list.map((item) => {
                        return `${item.day}日`;
                    });
                    yAxisData = list.map((item) => {
                        return item.customer_number;
                    });
                }
                this.setState({
                    customerGrowthChartList: list,
                    xAxisData,
                    yAxisData
                });
                break;
            case "新客户消费":
                e = await statistics.monthNewUserSalesHistogram({ date });
                if (Array.isArray(e.result.list) && e.result.list.length > 0) {
                    list = e.result.list;
                    xAxisData = list.map((item) => {
                        return `${item.day}日`;
                    });
                    yAxisData = list.map((item) => {
                        return item.cost;
                    });
                }
                this.setState({
                    newCustomerCostList: list,
                    xAxisData,
                    yAxisData
                });
                break;
        }
    }

    getOption = () => {
        const { activeKey, xAxisData, yAxisData } = this.state;
        return {
            title: {
                show: true,
                text: "",
                left: "center",
                textStyle: {
                    color: "#2196F3"
                }
            },
            color: ["#188fff"],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "10%",
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
                    nameGap: 20,
                    data: xAxisData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#ddd"
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "rgba(0, 0, 0, 0.647058823529412)",
                            fontSize: "14"
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: `${activeKey}`,
                    nameGap: 24,
                    nameTextStyle: {
                        color: "#333",
                        fontSize: "16",
                        fontWeight: "600"
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#ddd",
                            type: "dashed"
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "rgba(0, 0, 0, 0.647058823529412)",
                            fontSize: "12",
                            fontFamily: "'ArialMT', 'Arial'"
                        }
                    }
                }
            ],
            series: [
                {
                    name: "数值",
                    type: "bar",
                    stack: "one",
                    itemStyle: {
                        normal: {},
                        emphasis: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: "rgba(0,0,0,0.5)"
                        }
                    },
                    data: yAxisData
                }
            ]
        };
    };

    render() {
        const { activeKey, chartDate } = this.state;
        const tabList = [
            {
                id: 1,
                tab: "月销售额"
            }, {
                id: 2,
                tab: "月订单量"
            }, {
                id: "3",
                tab: "客户增量"
            }, {
                id: "4",
                tab: "新客户消费"
            }
        ];

        // 选定的时间必须小于当前月
        function disabledDate(current) {
            return current && current > dayjs().endOf("day");
        }

        return (
          <View className={styles.indexChartWarp}>
              <Tabs
                activeKey={activeKey}
                onChange={(activeKey) => {
                    this.setState({ activeKey });
                    this.initChart(dayjs(chartDate).format("YYYY-MM"), activeKey);
                }}
                tabBarExtraContent={
                    <View className={styles.chartOperate}>
                        {/*<p>累计：<span>￥{saleAccumulative.accumulative_amount}.00</span></p>*/}
                        {/*<p>日均：<span>￥{saleAverage.day_average}.00</span></p>*/}
                        <MonthPicker
                          disabledDate={disabledDate}
                          style={{ width: 110 }}
                          format={"YYYY-MM"}
                          defaultValue={chartDate}
                          onChange={(date, dateString) => {
                              const { activeKey } = this.state;
                              this.initChart(dateString, activeKey);
                          }}
                        />
                    </View>
                }
              >
                  {
                      tabList.map(({ id, tab }) =>
                        <TabPane tab={tab} key={tab}>
                            <ReactEChartsCore
                              echarts={echarts}
                              notMerge={true}
                              lazyUpdate={true}
                              option={this.getOption()}
                              style={{ height: "340px", width: "100%" }}
                              className={styles.react_for_echarts}
                            />
                        </TabPane>
                      )
                  }
              </Tabs>
          </View>
        );
    }
}
