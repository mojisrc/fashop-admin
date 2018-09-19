import { message  } from 'antd';

//只接收三个参数 天数 、小时 、 分钟 、 转化成秒并求和
export const ConversionTimer = (...args) => {
    args[0] && (args[0] *= 86400);
    args[1] && (args[1] *= 3600);
    args[2] && (args[2] *= 60);

    return args[0]+args[1]+args[2];
}

//功能判断是否为数值类型，并返回一个数组，只接受一个参数为对象或者数组，
export const judgeNumber = (values) => {
                let numberArry=[];
                let temporary='t';
                let count=0;
                for(let i in values){
                    temporary=Number(values[i]);
                    numberArry[count] = temporary;
                    count++
                }
                count=0;
                for(let j in numberArry){
                    if(isNaN(numberArry[j])){
                        numberArry = false;
                        message.warning('时间只能输入数字')
                        break;
                    }
                }
                //如果不用限制每个输入值的大小就把下面这行去掉
                (numberArry[0]>=89 || numberArry[3]>=90 || numberArry[4]>=90) && (numberArry = false,message.warning('每个输入框的时间不能大于90天欧'))
                return numberArry;
}