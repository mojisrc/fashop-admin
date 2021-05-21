export const toolListData = [
    {
        name: "基础模块",
        list: [
            {
                type: "goods",
                icon: require("@/assets/images/shop/goods.png"),
                title: "商品",
                data: [],
                options: {
                    layout_style: 1, // 小图 1、大图 2、一大两小 3、列表 4
                    goods_title_rows: 1 // 标题行数 1 一行、2 两行
                }
            }, {
                type: "goods_list",
                icon: require("@/assets/images/shop/goods_list.png"),
                title: "商品列表",
                options: {
                    goods_sort: 1,
                    goods_display_num: 6,
                    goods_display_field: ["title", "price", "market_price"],
                    layout_style: 1,
                    goods_title_rows: 1 // 标题行数 1 一行、2 两行
                },
                data: []
            },
           {
                type: "goods_search",
                icon: require("@/assets/images/shop/goods_search.png"),
                title: "商品搜索",
                options: {
                    background_color: "#fff"
                }
            }, {
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
                type: "image_ads",
                icon: require("@/assets/images/shop/image_ads.png"),
                title: "图片广告",
                options: {
                    // 展现形式
                    layout_style: 1,// 1折叠轮播1、2上下平铺  3卡片
                    // 背景色彩
                    background_color: "rgba(0, 0, 0, 0)",
                    // 是否显示面板指示点
                    indicator_dots: 0,
                    // 指示点颜色
                    indicator_color: "rgba(0, 0, 0, .3)",
                    // 当前选中的指示点颜色
                    indicator_active_color: "#000000",
                    // 是否自动切换
                    autoplay: 0,
                    // 当前所在滑块的 index
                    current: 0,
                    // 自动切换时间间隔
                    interval: 5000,
                    // 滑动动画时长
                    duration: 500,
                    // 是否采用衔接滑动
                    circular: 0,
                    // 滑动方向是否为纵向
                    vertical: 0,
                    //  前边距，可用于露出前一项的一小部分，接受 px 值
                    previous_margin: 60,
                    // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
                    next_margin: 60,
                    // 同时显示的滑块数量
                    display_multiple_items: 1,
                    // 内边距-上
                    padding_top: 0,
                    // 内边距-下
                    padding_bottom: 0,
                    // 圆角
                    radius: 0
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
            }, {
                type: "image_nav",
                icon: require("@/assets/images/shop/image_nav.png"),
                title: "图片导航",
                options: {
                    rows: 1,
                    each_row_display: 4
                },
                data: [
                    {
                        img: {
                            url: require("@/assets/images/page/view/image-nav-default.png")
                        },
                        title: "导航一",
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }, {
                        img: {
                            url: require("@/assets/images/page/view/image-nav-default.png")
                        },
                        title: "导航二",
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }, {
                        img: {
                            url: require("@/assets/images/page/view/image-nav-default.png")
                        },
                        title: "导航三",
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }, {
                        img: {
                            url: require("@/assets/images/page/view/image-nav-default.png")
                        },
                        title: "导航四",
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }
                ]
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
            },
            {
                type: "video",
                icon: require("@/assets/images/shop/video.png"),
                title: "视频",
                options: null,
                data: {
                    url: "https://mvvideoshare2.meitudata.com/5e9c13d2d78bbh1bas050r1901_H264_4_2db337e55ae3d.mp4?k=1c73edf483fe3cfaa45688994af6a265&t=5ed35951"
                }
            },
            {
                type: "top_menu",
                icon: require("@/assets/images/shop/top_menu.png"),
                title: "顶部菜单",
                options: {
                    menu_format: 1,
                    menu_space: 1
                },
                data: [
                    {
                        title: "首页",
                        img: {
                            url: "https://cdn.jsdelivr.net/gh/mojisrc/fashop@latest/src/assets/page/data/ind3_1.png"
                        },
                        link: {
                            action: "do_not_jump",
                            param: {}
                        },
                        background_color: "#07a0e7",
                        font_color: "#fff"
                    }, {
                        title: "新品",
                        img: {
                            url: "https://cdn.jsdelivr.net/gh/mojisrc/fashop@latest/src/assets/page/data/ind3_2.png"
                        },
                        link: {
                            action: "do_not_jump",
                            param: {}
                        },
                        background_color: "#71c201",
                        font_color: "#fff"
                    }, {
                        title: "热卖",
                        img: {
                            url: "https://cdn.jsdelivr.net/gh/mojisrc/fashop@latest/src/assets/page/data/ind3_3.png"
                        },
                        link: {
                            action: "do_not_jump",
                            param: {}
                        },
                        background_color: "#ffaa00",
                        font_color: "#fff"
                    }, {
                        title: "推荐",
                        img: {
                            url: "https://cdn.jsdelivr.net/gh/mojisrc/fashop@latest/src/assets/page/data/ind3_4.png"
                        },
                        link: {
                            action: "do_not_jump",
                            param: {}
                        },
                        background_color: "#d50303",
                        font_color: "#fff"
                    }
                ]
            }, {
                type: "title",
                icon: require("@/assets/images/shop/title.png"),
                title: "标题",
                options: {
                    title: "猜你喜欢",
                    align: "left",
                    background_color: "#fff",
                    font_color: "#999",
                    leading_image: {
                        url: "https://avatars2.githubusercontent.com/u/5318333?s=40&v=4"
                    }
                }
            }, {
                type: "text_nav",
                icon: require("@/assets/images/shop/text_nav.png"),
                title: "文本导航",
                options: null,
                data: [
                    {
                        title: "店铺首页",
                        link: {
                            action: "do_not_jump",
                            param: {}
                        }
                    }
                ]
            },
        ]
    },
];



