export default class Time {
    /**
     * 判断是否过期
     * @param time 10位时间戳
     * 超过当前时间就过期
     */
    static overdue(time){
        var timestamp3 = Date.parse(new Date());
        return timestamp3 > parseInt(`${time}000`)
    }

    /**
     * 返回时间戳的状态
     * 0未开始
     * 1进行中
     * 2已结束
     * @param start_time
     * @param end_time
     */
    static status( start_time ,end_time){
        if(Time.overdue(start_time) &&  !Time.overdue(end_time) ){
            return 1
        }else if(!Time.overdue(start_time)){
            return 0
        }else{
            return 2
        }
    }
}
