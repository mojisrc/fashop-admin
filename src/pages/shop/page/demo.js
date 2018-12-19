import React, { Component } from "react";
import { query } from "@/utils/fa";
import Goods from "@/components/shop/diy/controller/goods";
import GoodsList from "@/components/shop/diy/controller/goodsList";
import GoodsSearch from "@/components/shop/diy/controller/goodsSearch";
import Separator from "@/components/shop/diy/controller/separator";
import AuxiliaryBlank from "@/components/shop/diy/controller/auxiliaryBlank";
import ImageAds from "@/components/shop/diy/controller/imageAds";
import ImageNav from "@/components/shop/diy/controller/imageNav";
import ShopWindow from "@/components/shop/diy/controller/shopWindow";
import Video from "@/components/shop/diy/controller/video";
import TopMenu from "@/components/shop/diy/controller/topMenu";
import Title from "@/components/shop/diy/controller/title";
import TextNav from "@/components/shop/diy/controller/textNav";
import { Card, Row, Col } from "antd";
import styles from "./demo.css";

export default class Demo extends Component {
    static defaultProps = {
        goodList: { total_number: 0, list: [] },
        goodsListLoading: true,
        pageInfo: { info: {} },
        pageInfoLoading: true
    };
    state = {
        options: 0,
        pageInfo: {
            "id": 67,
            "name": "测试测试1",
            "description": "",
            "body": [{
                "data": [],
                "type": "goods_search",
                "options": { "background_color": "#fff" }
            }, {
                "data": [{
                    "img": { "url": "https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/PublicMob/images/ind3_1.png" },
                    "link": { "param": [], "action": "portal" },
                    "title": "首页",
                    "font_color": "#fff",
                    "background_color": "#07a0e7"
                }, {
                    "img": { "url": "https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/PublicMob/images/ind3_2.png" },
                    "link": { "param": [], "action": "portal" },
                    "title": "新品",
                    "font_color": "#fff",
                    "background_color": "#71c201"
                }, {
                    "img": { "url": "https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/PublicMob/images/ind3_3.png" },
                    "link": { "param": [], "action": "portal" },
                    "title": "热卖",
                    "font_color": "#fff",
                    "background_color": "#ffaa00"
                }, {
                    "img": { "url": "https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/PublicMob/images/ind3_4.png" },
                    "link": { "param": [], "action": "portal" },
                    "title": "推荐",
                    "font_color": "#fff",
                    "background_color": "#d50303"
                }], "type": "top_menu", "options": { "menu_space": 1, "menu_format": 1 }
            }, {
                "data": [],
                "type": "title",
                "options": {
                    "align": "left",
                    "title": "猜你喜欢",
                    "font_color": "#999",
                    "leading_image": { "url": "https://avatars2.githubusercontent.com/u/5318333?s=40&v=4" },
                    "background_color": "#fff"
                }
            }, {
                "data": [{
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": ""
                }, {
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": ""
                }, {
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": ""
                }], "type": "shop_window", "options": { "layout_style": 1 }
            }, {
                "data": [{
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": "导航一"
                }, {
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": "导航二"
                }, {
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": "导航三"
                }, {
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": "导航四"
                }], "type": "image_nav", "options": { "rows": 1, "each_row_display": 4 }
            }, {
                "data": [{
                    "id": 32,
                    "title": "extend resource",
                    "images": ["https://demo.fashop.cn/Upload/20181214/aIFKMUm9gfAHrQZ.gif", "https://demo.fashop.cn/Upload/20181214/369xUEnDCQvWGKF.gif"],
                    "category_ids": [728],
                    "base_sale_num": 0,
                    "body": [{ "type": "text", "value": { "content": "extend resource" } }, {
                        "type": "image",
                        "value": { "url": "https://demo.fashop.cn/Upload/20181214/aIFKMUm9gfAHrQZ.gif" }
                    }, {
                        "type": "image",
                        "value": { "url": "https://demo.fashop.cn/Upload/20181214/369xUEnDCQvWGKF.gif" }
                    }],
                    "is_on_sale": 1,
                    "image_spec_id": 0,
                    "image_spec_images": null,
                    "sku_list": [{
                        "spec": [{
                            "id": 0,
                            "name": null,
                            "value_id": 0,
                            "value_name": null,
                            "value_img": null
                        }], "price": 18, "stock": 999, "code": null, "weight": null
                    }],
                    "create_time": 1544762830,
                    "price": "18.00",
                    "update_time": null,
                    "evaluation_good_star": 5,
                    "evaluation_count": 0,
                    "stock": 999,
                    "sale_num": 0,
                    "sale_time": 1544762830,
                    "delete_time": null,
                    "spec_list": [{ "id": 0, "name": null, "value_list": [{ "id": 0, "name": null }] }],
                    "img": "https://demo.fashop.cn/Upload/20181214/aIFKMUm9gfAHrQZ.gif",
                    "pay_type": 1,
                    "freight_fee": "0.00",
                    "freight_id": 0
                }, {
                    "id": 31,
                    "title": "解决测试环境下的路由驼峰无法访问的问题",
                    "images": ["https://demo.fashop.cn/Upload/20181128/UeIWQcEw6mG7Mb9.png", "https://demo.fashop.cn/Upload/20181128/UxXqNtTHFSzJWMZ.png"],
                    "category_ids": [734, 735, 736, 737],
                    "base_sale_num": 0,
                    "body": [{
                        "type": "text",
                        "value": { "content": "解决测试环境下的路由驼峰无法访问的问题" }
                    }, {
                        "type": "image",
                        "value": { "url": "https://demo.fashop.cn/Upload/20181128/UeIWQcEw6mG7Mb9.png" }
                    }, {
                        "type": "image",
                        "value": { "url": "https://demo.fashop.cn/Upload/20181128/UxXqNtTHFSzJWMZ.png" }
                    }],
                    "is_on_sale": 1,
                    "image_spec_id": 0,
                    "image_spec_images": null,
                    "sku_list": [{
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 232, "value_name": "xxl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 178,
                            "value_name": "小尺码"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 233, "value_name": "xl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 178,
                            "value_name": "小尺码"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 234, "value_name": "s" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 178,
                            "value_name": "小尺码"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 249, "value_name": "a" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 178,
                            "value_name": "小尺码"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 212, "value_name": "xxxl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 178,
                            "value_name": "小尺码"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 232, "value_name": "xxl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 240,
                            "value_name": "aaaa"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 233, "value_name": "xl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 240,
                            "value_name": "aaaa"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 234, "value_name": "s" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 240,
                            "value_name": "aaaa"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 249, "value_name": "a" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 240,
                            "value_name": "aaaa"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 212, "value_name": "xxxl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 240,
                            "value_name": "aaaa"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 232, "value_name": "xxl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 262,
                            "value_name": "112"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 233, "value_name": "xl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 262,
                            "value_name": "112"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 234, "value_name": "s" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 262,
                            "value_name": "112"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 249, "value_name": "a" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 262,
                            "value_name": "112"
                        }],
                        "weight": null
                    }, {
                        "price": 123,
                        "stock": 123,
                        "code": "123",
                        "spec": [{ "id": 5, "name": "尺寸", "value_id": 212, "value_name": "xxxl" }, {
                            "id": 3,
                            "name": "尺码",
                            "value_id": 262,
                            "value_name": "112"
                        }],
                        "weight": null
                    }],
                    "create_time": 1544512883,
                    "price": "123.00",
                    "update_time": null,
                    "evaluation_good_star": 5,
                    "evaluation_count": 0,
                    "stock": 1842,
                    "sale_num": 3,
                    "sale_time": 1544512799,
                    "delete_time": null,
                    "spec_list": [{
                        "id": 5,
                        "name": "尺寸",
                        "value_list": [{ "id": 232, "name": "xxl" }, { "id": 233, "name": "xl" }, {
                            "id": 234,
                            "name": "s"
                        }, { "id": 249, "name": "a" }, { "id": 212, "name": "xxxl" }]
                    }, {
                        "id": 3,
                        "name": "尺码",
                        "value_list": [{ "id": 178, "name": "小尺码" }, { "id": 240, "name": "aaaa" }, {
                            "id": 262,
                            "name": "112"
                        }]
                    }],
                    "img": "https://demo.fashop.cn/Upload/20181128/UeIWQcEw6mG7Mb9.png",
                    "pay_type": 1,
                    "freight_fee": "0.00",
                    "freight_id": 0
                }, {
                    "id": 29,
                    "title": "模拟商品",
                    "images": ["https://demo.fashop.cn/Upload/20181128/Hh8enE73v2GWTYr.png"],
                    "category_ids": [728],
                    "base_sale_num": 0,
                    "body": [{ "type": "text", "value": { "content": "模拟商品" } }, {
                        "type": "image",
                        "value": { "url": "https://demo.fashop.cn/Upload/20181128/Hh8enE73v2GWTYr.png" }
                    }],
                    "is_on_sale": 1,
                    "image_spec_id": 0,
                    "image_spec_images": null,
                    "sku_list": [{
                        "price": 1234,
                        "stock": 111,
                        "code": "111",
                        "spec": [{ "id": 2, "name": "型号", "value_id": 235, "value_name": "222" }],
                        "weight": null
                    }, {
                        "price": 1230,
                        "stock": 111,
                        "code": "111",
                        "spec": [{ "id": 2, "name": "型号", "value_id": 251, "value_name": "aaa" }],
                        "weight": null
                    }, {
                        "price": 1231,
                        "stock": 111,
                        "code": "111",
                        "spec": [{ "id": 2, "name": "型号", "value_id": 252, "value_name": "haha" }],
                        "weight": null
                    }],
                    "create_time": 1543624466,
                    "price": "1230.00",
                    "update_time": null,
                    "evaluation_good_star": 5,
                    "evaluation_count": 0,
                    "stock": 331,
                    "sale_num": 7,
                    "sale_time": 1544370550,
                    "delete_time": null,
                    "spec_list": [{
                        "id": 2,
                        "name": "型号",
                        "value_list": [{ "id": 235, "name": "222" }, { "id": 251, "name": "aaa" }, {
                            "id": 252,
                            "name": "haha"
                        }]
                    }],
                    "img": "https://demo.fashop.cn/Upload/20181128/Hh8enE73v2GWTYr.png",
                    "pay_type": 1,
                    "freight_fee": "0.00",
                    "freight_id": 0
                }, {
                    "id": 30,
                    "title": "模拟商品",
                    "images": ["https://demo.fashop.cn/Upload/20181128/mfWkMq2yPtnjY3A.jpeg"],
                    "category_ids": [729, 713, 736],
                    "base_sale_num": 0,
                    "body": [{ "type": "text", "value": { "content": "模拟商品" } }, {
                        "type": "image",
                        "value": { "url": "https://demo.fashop.cn/Upload/20181128/mfWkMq2yPtnjY3A.jpeg" }
                    }],
                    "is_on_sale": 1,
                    "image_spec_id": 0,
                    "image_spec_images": null,
                    "sku_list": [{ "price": 1, "stock": 122222, "code": null, "spec": [], "weight": null }],
                    "create_time": 1543624484,
                    "price": "1.00",
                    "update_time": null,
                    "evaluation_good_star": 5,
                    "evaluation_count": 0,
                    "stock": 122222,
                    "sale_num": 0,
                    "sale_time": 1543902188,
                    "delete_time": null,
                    "spec_list": null,
                    "img": "https://demo.fashop.cn/Upload/20181128/mfWkMq2yPtnjY3A.jpeg",
                    "pay_type": 1,
                    "freight_fee": "0.00",
                    "freight_id": 0
                }, {
                    "id": 28,
                    "title": "模拟商品",
                    "images": ["https://demo.fashop.cn/Upload/20181128/8Wk6bhDYciUXNMv.jpeg"],
                    "category_ids": [729],
                    "base_sale_num": 0,
                    "body": [{ "type": "text", "value": { "content": "模拟商品" } }, {
                        "type": "image",
                        "value": { "url": "https://demo.fashop.cn/Upload/20181128/8Wk6bhDYciUXNMv.jpeg" }
                    }],
                    "is_on_sale": 1,
                    "image_spec_id": 0,
                    "image_spec_images": null,
                    "sku_list": [{
                        "spec": [{
                            "id": 0,
                            "name": null,
                            "value_id": 0,
                            "value_name": null,
                            "value_img": null
                        }], "price": 1, "stock": 100, "code": null, "weight": null
                    }],
                    "create_time": 1543624447,
                    "price": "1.00",
                    "update_time": null,
                    "evaluation_good_star": 5,
                    "evaluation_count": 0,
                    "stock": 97,
                    "sale_num": 3,
                    "sale_time": 1543624447,
                    "delete_time": null,
                    "spec_list": [{ "id": 0, "name": null, "value_list": [{ "id": 0, "name": null }] }],
                    "img": "https://demo.fashop.cn/Upload/20181128/8Wk6bhDYciUXNMv.jpeg",
                    "pay_type": 1,
                    "freight_fee": "0.00",
                    "freight_id": 0
                }, {
                    "id": 27,
                    "title": "啊啊啊",
                    "images": ["https://demo.fashop.cn/Upload/20181128/UxXqNtTHFSzJWMZ.png"],
                    "category_ids": [728],
                    "base_sale_num": 0,
                    "body": [{ "type": "text", "value": { "content": "啊啊啊" } }, {
                        "type": "image",
                        "value": { "url": "https://demo.fashop.cn/Upload/20181128/UxXqNtTHFSzJWMZ.png" }
                    }],
                    "is_on_sale": 1,
                    "image_spec_id": 0,
                    "image_spec_images": null,
                    "sku_list": [{
                        "spec": [{
                            "id": 0,
                            "name": null,
                            "value_id": 0,
                            "value_name": null,
                            "value_img": null
                        }], "price": 1, "stock": 1, "code": "1", "weight": null
                    }],
                    "create_time": 1543624422,
                    "price": "1.00",
                    "update_time": null,
                    "evaluation_good_star": 5,
                    "evaluation_count": 0,
                    "stock": -1,
                    "sale_num": 2,
                    "sale_time": 1543624422,
                    "delete_time": null,
                    "spec_list": [{ "id": 0, "name": null, "value_list": [{ "id": 0, "name": null }] }],
                    "img": "https://demo.fashop.cn/Upload/20181128/UxXqNtTHFSzJWMZ.png",
                    "pay_type": 1,
                    "freight_fee": "0.00",
                    "freight_id": 0
                }],
                "type": "goods_list",
                "options": {
                    "goods_sort": 1,
                    "layout_style": 1,
                    "goods_display_num": 6,
                    "goods_display_field": ["title", "price"]
                }
            }, { "data": [], "type": "separator", "options": { "color": "#e8e8e8", "style": 0 } }, {
                "data": [],
                "type": "auxiliary_blank",
                "options": { "height": 5 }
            }, {
                "data": [{
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": ""
                }], "type": "image_ads", "options": { "layout_style": 1 }
            }, {
                "data": [{
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": "导航一"
                }, {
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": "导航二"
                }, {
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": "导航三"
                }, {
                    "img": { "url": "https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/25082/17/883/132021/5c0dde98E08b30ecb/f2891b8e23ab699b.jpeg!q90!cc_350x250.webp" },
                    "link": { "param": [], "action": "portal" },
                    "title": "导航四"
                }], "type": "image_nav", "options": { "rows": 1, "each_row_display": 4 }
            }, {
                "data": { "url": "http://220.194.79.149/vlive.qqvideo.tc.qq.com/A44f-7Bd5gEvD4wYTtCGBOEFPrcIWRFdfQsr8BDJWOWI/q0165pxycze.p702.1.mp4?sdtfrom=v1010&guid=224fe29557094643a3b5c045c75fa598&vkey=ADE1E90A794A80EF494CA002FD512294CD5552FA16A31B753DB404AF4898902228AA0B105EA8211A4E8205DB1C5605FD5413F744FDD8845A998D012FC84AC908ACD0761136BC6F015252E71AB2161D11D569E4D4F0EE86A61B5464CA365ED752950731DFD7F6DA2890CB74FFFF6E312FC98F301E630E60D4" },
                "type": "video",
                "options": null
            }, {
                "data": [{
                    "img": { "url": "" },
                    "link": { "param": [], "action": "portal" },
                    "title": "店铺首页"
                }], "type": "text_nav", "options": null
            }],
            "is_portal": 0,
            "is_system": 0,
            "background_color": "#FFFFFF",
            "type": "",
            "create_time": 1545116433,
            "update_time": 1545126774,
            "module": "mobile",
            "delete_time": null,
            "clone_from_id": null
        }
    };

    getValues(e) {

    }

    render() {
        const { pageInfo } = this.state;
        return <div className={styles.main}><Row>
            <Col span={12}>
                <Card>
                    {pageInfo.body.map((item, index) => {
                        let content;
                        switch (item.type) {
                            case "goods":
                                content =
                                    <Goods options={item.options} data={item.data} getValues={this.props.getValues}
                                           key={index} />;
                                break;
                            case "goods_list":
                                content = <GoodsList
                                    options={item.options} data={item.data}
                                    getValues={this.props.getValues}
                                    refreshGoods={this.props.goodsListRefreshGoods} key={index} />;
                                break;
                            case "goods_search":
                                content = <GoodsSearch options={item.options} data={{}} getValues={this.props.getValues}
                                                       key={index} />;
                                break;
                            case "separator":
                                content = <Separator options={item.options} data={{}} getValues={this.props.getValues}
                                                     key={index} />;
                                break;
                            case "auxiliary_blank":
                                content =
                                    <AuxiliaryBlank options={item.options} data={{}} getValues={this.props.getValues}
                                                    key={index} />;
                                break;
                            case "image_ads":
                                content =
                                    <ImageAds options={item.options} data={item.data} getValues={this.props.getValues}
                                              key={index} />;
                                break;
                            case "image_nav":
                                content =
                                    <ImageNav options={item.options} data={item.data} getValues={this.props.getValues}
                                              key={index} />;
                                break;
                            case "shop_window":
                                content =
                                    <ShopWindow options={item.options} data={item.data} getValues={this.props.getValues}
                                                key={index} />;
                                break;
                            case "video":
                                content =
                                    <Video options={item.options} data={item.data} getValues={this.props.getValues}
                                           key={index} />;
                                break;
                            case "top_menu":
                                content =
                                    <TopMenu options={item.options} data={item.data} getValues={this.props.getValues}
                                             key={index} />;
                                break;
                            case "title":
                                content =
                                    <Title options={item.options} data={item.data} getValues={this.props.getValues}
                                           key={index} />;
                                break;
                            case "text_nav":
                                content =
                                    <TextNav options={item.options} data={item.data} getValues={this.props.getValues}
                                             key={index} />;
                                break;
                            default:

                        }
                        return content;
                    })}
                </Card>
            </Col>
        </Row></div>;

    }
}
