export default {
    "GET /admin/setting/info": info
};

function info(req, res) {
    const params = req.query;
    switch (params.type) {
        case "alidayu":
            alidayu(req, res);
            break;
        case "wechat_mini_template":
            wechatMiniTemplate(req, res);
            break;
        default :
            return res.json({
                code: -1,
                result: {},
                msg: "参数错误，没有找到该类型"
            });
    }

}

function alidayu(req, res) {
    return res.json({
        code: 0,
        result: {
            info: {
                key: "alidayu_template",
                name: "阿里云短信",
                status: 1,
                config: {
                    access_key_id: "xxxxxxxxxx",
                    access_key_secret: "xxxxxxxxxx",
                    signature: "FaShop",
                    template_list: {
                        "register": {
                            "template_id": "SMS_xxxxx",
                            "template_name": "注册验证码",
                            "template_variable": "code",
                            "template_status": 1
                        },
                        "find_password": {
                            "template_id": "SMS_xxxxx",
                            "template_name": "找回密码验证码",
                            "template_variable": "code",
                            "template_status": 1
                        }
                    }
                }
            }
        },
        msg: null
    });
}


function wechatMiniTemplate(req, res) {
    return res.json({
        code: 0,
        result: {
            info: {
                key: "alidayu_template",
                name: "微信小程序模板消息",
                status: 1,
                config: {
                    template_list: {
                        "order_pay_success": {
                            "template_id": "Y1blRZEdiqSXSDOfiKT9rG4oEmlpfeq_rjcpuuo",
                            "template_name": "订单支付成功",
                            "template_status": 1
                        },
                        "order_pay_fail": {
                            "template_id": "Y1blRZEdiqSXSDOfiKT9rG4oEmlpfeq_rjcpuuo",
                            "template_name": "订单支付失败",
                            "template_status": 1
                        },
                        "order_cancel": {
                            "template_id": "Y1blRZEdiqSXSDOfiKT9rG4oEmlpfeq_rjcpuuo",
                            "template_name": "订单取消",
                            "template_status": 1
                        },
                        "order_refund_apply": {
                            "template_id": "Y1blRZEdiqSXSDOfiKT9rG4oEmlpfeq_rjcpuuo",
                            "template_name": "订单退款申请",
                            "template_status": 1
                        }
                    }
                }
            }
        },
        msg: null
    });
}
