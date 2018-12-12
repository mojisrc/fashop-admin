
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import styles from './index.css'
import echarts from 'echarts';
import moment from 'moment'

const monthFormat = 'YYYY-MM';

class PubilcChart extends Component<
    {},
    {}
>{
    componentDidMount() {
        this.initChart(this.props)
    }
    componentDidUpdate(props) {
        this.initChart(props)
    }
    initChart = ({ yAxisName, currentMonth }) => {
        console.log('yAxisName',yAxisName);
        let data = []
        let dataShow = []
        for(let i=0;i<Number(moment(currentMonth).endOf('month').format("DD"));i++){
            data[i] = `${i+1} 日`
            dataShow[i] = (i+1)*10
        }
        let myChart = echarts.init(document.getElementById('echart'));
        if(yAxisName!=='月销售额'){
            myChart.resize({height:500})
        }
        let options = this.setChartOption({
            xAxisData:data,
            seriesData:dataShow,
            yAxisName
        })
        myChart.setOption(options)
    }
    render() {
        return (
            <View
                className={styles.echartView}
                style={{
                    backgroundColor:'#fff'
                }}
                id='echart'
            >

            </View>
        )
    }
    setChartOption = ({xAxisData,seriesData,yAxisName}) => {
        return(
            {
                title:{
                    show:true,
                    text:'',
                    left:'center',
                    textStyle:{
                        color:'#2196F3'
                    }
                },
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {
                        type : 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        nameGap:20,
                        data:xAxisData,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#ddd',
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.647058823529412)',
                                fontSize:'14'
                            }
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:yAxisName,
                        nameGap:24,
                        nameTextStyle:{
                            color:'#333',
                            fontSize:'16',
                            fontWeight:'600'
                        },
                        axisLine:{
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine:{
                            lineStyle:{
                                color:'#ddd',
                                type:'dashed'
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.647058823529412)',
                                fontSize:'12',
                                fontFamily: "'ArialMT', 'Arial'"
                            }
                        },
                    }
                ],
                series : [
                    {
                        name:'销售额',
                        type:'bar',
                        data:seriesData
                    }
                ]
            }
        )
    }
}

const mapStateToProps = ({view}) => {
   return {

   }
}

export default connect(mapStateToProps)(PubilcChart)
