export const toolListData = [
    {
        name: "基础模块",
        list: [
            {
                type: "image_gallery",
                icon: require("@/assets/images/shop/image_gallery.png"),
                title: "图片列表",
                options: {
                    layout_style: 2// 折叠轮播1、上下平铺2
                },
                data: []
            },
            {
                type: "image_ads",
                icon: require("@/assets/images/shop/image_ads.png"),
                title: "图片广告",
                options: {
                    layout_style: 1// 折叠轮播1、上下平铺2
                },
                data: [
                    {
                        img: {
                            url: require("@/assets/images/page/view/image-ads-default.png")
                        },
                        title: "",
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }
                ]
            },
            {
                type: "separator",
                icon: require("@/assets/images/shop/separator.png"),
                title: "分割线",
                options: {
                    color: "#e8e8e8",
                    style: "solid" // 'dashed' or 'solid'
                }
            }, {
                type: "auxiliary_blank",
                icon: require("@/assets/images/shop/auxiliary_blank.png"),
                title: "辅助空白",
                options: {
                    height: 5
                }
            }, {
                type: "shop_window",
                icon: require("@/assets/images/shop/shop_window.png"),
                title: "橱窗",
                options: {
                    layout_style: 1
                },
                data: [
                    {
                        img: {
                            url: require("@/assets/images/page/view/shop-window-1-default.png")
                        },
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }, {
                        img: {
                            url: require("@/assets/images/page/view/shop-window-2-default.png")
                        },
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }, {
                        img: {
                            url: require("@/assets/images/page/view/shop-window-3-default.png")
                        },
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }
                ]
            }
        ]
    }
];



