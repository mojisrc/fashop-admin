export default {
    // "GET /admin/setting/info": info,
    // "POST /admin/setting/add": { code: 0 },
    // "POST /admin/setting/edit": { code: 0 }
};

function info(req, res) {
    const params = req.query;
    switch (params.key) {
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
                key: "alidayu",
                name: "阿里云短信",
                status: 1,
                config: {
                    access_key_id: "xxxxxxxxxx",
                    access_key_secret: "xxxxxxxxxx",
                    signature: "FaShop",
                    template_list: {
                        "register": {
                            "template_id": "SMS_xxxxx",
                            "template_name": "注册",
                            "template_variable": "code",
                            "template_status": 1,
                            "template_content": "您的验证码：${code}，如非本人操作，请忽略本短信！"
                        },
                        "find_password": {
                            "template_id": "SMS_xxxxx",
                            "template_name": "找回密码",
                            "template_variable": "code",
                            "template_status": 1,
                            "template_content": "您的验证码：${code}，如非本人操作，请忽略本短信！"
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
                            "template_status": 1,
                            "template_content": "1.订单号 2.订单总额 3.订单商品名称 4.下单时间 5.商品数量"
                        },
                        "order_pay_fail": {
                            "template_id": "Y1blRZEdiqSXSDOfiKT9rG4oEmlpfeq_rjcpuuo",
                            "template_name": "订单支付失败",
                            "template_status": 1,
                            "template_content": "1.订单号 2.订单总额 3.订单商品名称 4.下单时间 5.商品数量"
                        },
                        "order_cancel": {
                            "template_id": "Y1blRZEdiqSXSDOfiKT9rG4oEmlpfeq_rjcpuuo",
                            "template_name": "订单取消",
                            "template_status": 1,
                            "template_content": "1.订单号 2.订单总额 3.订单商品名称 4.下单时间 5.商品数量"
                        },
                        "order_refund_apply": {
                            "template_id": "Y1blRZEdiqSXSDOfiKT9rG4oEmlpfeq_rjcpuuo",
                            "template_name": "订单退款申请",
                            "template_status": 1,
                            "template_content": "1.订单号 2.订单总额 3.订单商品名称 4.下单时间 5.商品数量"
                        }
                    }
                }
            }
        },
        msg: null
    });
}
