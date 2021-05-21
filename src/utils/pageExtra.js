export default class PageExtra {
    static signString(sign) {
        let str = "";
        switch (sign) {
            case 10001:
                str = "会员中心底部";
                break;
            case 20001:
                str = "购物车未登录底部";
                break;
            case 20002:
                str = "购物车已登录底部";
                break;
            case 30001:
                str = "商品详情公共顶部";
                break;
            case 30002:
                str = "商品详情公共底部";
                break;
            case 40001:
                str = "订单详情底部";
                break;
            case 40002:
                str = "订单购买成功结果底部";
                break;
            default :
                str = "-";
                break;
        }
        return str;
    }
}
