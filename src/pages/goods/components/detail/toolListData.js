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
                            action: "portal",
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
                            action: "portal",
                            param: {}
                        }
                    }, {
                        img: {
                            url: require("@/assets/images/page/view/shop-window-2-default.png")
                        },
                        link: {
                            action: "portal",
                            param: {}
                        }
                    }, {
                        img: {
                            url: require("@/assets/images/page/view/shop-window-3-default.png")
                        },
                        link: {
                            action: "portal",
                            param: {}
                        }
                    }
                ]
            }
            // {
            //     type: "video",
            //     icon: require("@/assets/images/shop/video.png"),
            //     title: "视频",
            //     options: null,
            //     data: {
            //         url: "http://220.194.79.149/vlive.qqvideo.tc.qq.com/A44f-7Bd5gEvD4wYTtCGBOEFPrcIWRFdfQsr8BDJWOWI/q0165pxycze.p702.1.mp4?sdtfrom=v1010&guid=224fe29557094643a3b5c045c75fa598&vkey=ADE1E90A794A80EF494CA002FD512294CD5552FA16A31B753DB404AF4898902228AA0B105EA8211A4E8205DB1C5605FD5413F744FDD8845A998D012FC84AC908ACD0761136BC6F015252E71AB2161D11D569E4D4F0EE86A61B5464CA365ED752950731DFD7F6DA2890CB74FFFF6E312FC98F301E630E60D4"
            //     }
            // },
        ]
    }
];



