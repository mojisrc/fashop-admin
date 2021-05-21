export default class Modal {
    static signString(sign) {
        let str = "";
        switch (sign) {
            case 10001:
                str = "会员注册完弹出";
                break;
            case 50001:
                str = "购买完弹出";
                break;
            case 50002:
                str = "使用时积分不足弹出";
                break;
            case 50003:
                str = "使用会员权限未开通时弹出";
                break;
            default :
                str = "-";
                break;
        }
        return str;
    }
}
