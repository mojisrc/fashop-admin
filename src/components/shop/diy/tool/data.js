export const defaultData = [
    {
        type: 'goods',
        icon: require('@/assets/images/shop/goods.png'),
        title: '商品',
        data: [],
        options: {
            layout_direction: 1 //小图 1、大图 2、一大两小 3、列表 4
        }
    }, {
        type: 'goods_list',
        icon: require('@/assets/images/shop/goods_list.png'),
        title: '商品列表',
        options: {
            goods_sort: 1,
            goods_display_num: 6,
            goods_display_field: ['title', 'price', 'market_price'],
            layout_style: 1,
        },
        data: []
    }, {
        type: 'goods_search',
        icon: require('@/assets/images/shop/goods_search.png'),
        title: '商品搜索',
        options: {
            background_color: '#fff'
        }
    }, {
        type: 'separator',
        icon: require('@/assets/images/shop/separator.png'),
        title: '分割线',
        options: {
            color: '#e8e8e8',
            style: 'solid' // 'dashed' or 'solid'
        }
    }, {
        type: 'auxiliary_blank',
        icon: require('@/assets/images/shop/auxiliary_blank.png'),
        title: '辅助空白',
        options: {
            height: 5
        }
    }, {
        type: 'image_ads',
        icon: require('@/assets/images/shop/image_ads.png'),
        title: '图片广告',
        options: {
            layout_style: 1,//折叠轮播1、上下平铺2
        },
        data: [
            {
                img: {
                    url: require('@/assets/images/page/view/image-ads-default.png')
                },
                title: '',
                link: {
                    action: 'portal',
                    param: {}
                }
            }
        ]
    }, {
        type: 'image_nav',
        icon: require('@/assets/images/shop/image_nav.png'),
        title: '图片导航',
        options: {
            rows: 1,
            each_row_display: 4,
        },
        data: [
            {
                img: {
                    url: require('@/assets/images/page/view/image-nav-default.png')
                },
                title: '导航一',
                link: {
                    action: 'portal',
                    param: {}
                }
            }, {
                img: {
                    url: require('@/assets/images/page/view/image-nav-default.png')
                },
                title: '导航二',
                link: {
                    action: 'portal',
                    param: {}
                }
            }, {
                img: {
                    url: require('@/assets/images/page/view/image-nav-default.png')
                },
                title: '导航三',
                link: {
                    action: 'portal',
                    param: {}
                }
            }, {
                img: {
                    url: require('@/assets/images/page/view/image-nav-default.png')
                },
                title: '导航四',
                link: {
                    action: 'portal',
                    param: {}
                }
            }
        ]
    }, {
        type: 'shop_window',
        icon: require('@/assets/images/shop/shop_window.png'),
        title: '橱窗',
        options: {
            layout_style: 1,
        },
        data: [
            {
                img: {
                    url: require('@/assets/images/page/view/shop-window-1-default.png')
                },
                link: {
                    action: 'portal',
                    param: {}
                }
            }, {
                img: {
                    url: require('@/assets/images/page/view/shop-window-2-default.png')
                },
                link: {
                    action: 'portal',
                    param: {}
                }
            }, {
                img: {
                    url: require('@/assets/images/page/view/shop-window-3-default.png')
                },
                link: {
                    action: 'portal',
                    param: {}
                }
            }
        ]
    }, {
        type: 'video',
        icon: require('@/assets/images/shop/video.png'),
        title: '视频',
        options: null,
        data: {
            url: 'http://220.194.79.149/vlive.qqvideo.tc.qq.com/A44f-7Bd5gEvD4wYTtCGBOEFPrcIWRFdfQsr8BDJWOWI/q0165pxycze.p702.1.mp4?sdtfrom=v1010&guid=224fe29557094643a3b5c045c75fa598&vkey=ADE1E90A794A80EF494CA002FD512294CD5552FA16A31B753DB404AF4898902228AA0B105EA8211A4E8205DB1C5605FD5413F744FDD8845A998D012FC84AC908ACD0761136BC6F015252E71AB2161D11D569E4D4F0EE86A61B5464CA365ED752950731DFD7F6DA2890CB74FFFF6E312FC98F301E630E60D4'
        }
    }, {
        type: 'top_menu',
        icon: require('@/assets/images/shop/top_menu.png'),
        title: '顶部菜单',
        options: {
            menu_format: 1,
            menu_space: 1,
        },
        data: [
            {
                title: '首页',
                img: {
                    url: 'https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/PublicMob/images/ind3_1.png'
                },
                link: {
                    action: 'portal',
                    param: {}
                },
                background_color: '#07a0e7',
                font_color: '#fff'
            }, {
                title: '新品',
                img: {
                    url: 'https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/PublicMob/images/ind3_2.png'
                },
                link: {
                    action: 'portal',
                    param: {}
                },
                background_color: '#71c201',
                font_color: '#fff'
            }, {
                title: '热卖',
                img: {
                    url: 'https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/PublicMob/images/ind3_3.png'
                },
                link: {
                    action: 'portal',
                    param: {}
                },
                background_color: '#ffaa00',
                font_color: '#fff'
            }, {
                title: '推荐',
                img: {
                    url: 'https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/PublicMob/images/ind3_4.png'
                },
                link: {
                    action: 'portal',
                    param: {}
                },
                background_color: '#d50303',
                font_color: '#fff'
            }
        ]
    }, {
        type: 'title',
        icon: require('@/assets/images/shop/title.png'),
        title: '标题',
        options: {
            title: '猜你喜欢',
            align: 'left',
            background_color: '#fff',
            font_color: '#999',
            leading_image: {
                url: 'https://avatars2.githubusercontent.com/u/5318333?s=40&v=4'
            }
        }
    }, {
        type: 'text_nav',
        icon: require('@/assets/images/shop/text_nav.png'),
        title: '文本导航',
        options: null,
        data: [
            {
                title: '店铺首页',
                link: {
                    action: 'portal',
                    param: {}
                }
            }
        ]
    }
]

export const marketingData = [
    {
        type: 'goods_group',
        icon: require('@/assets/images/shop/group.png'),
        title: '拼团',
        data: [],
        options: {
            source_type: 'auto', // 自动 auto 、 选择 choose
            goods_sort: 1, // 销量多到少 1、价格高到低 2、价格低到高 3
            goods_display_num: 3, // 最多12件，最少1件
            layout_type: 1 //大图 1、小图 2、一大两小 3、列表 4、轮播 5
        }
    }
]
