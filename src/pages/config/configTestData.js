export const data = [
    {
        id: 0,
        title: '基本配置',
        data: [
            {
                id: 0,
                title: '网站标题',
                value: '恒源祥商城',
                type: 'string',
            },{
                id: 1,
                title: '网站描述',
                value: '恒源祥',
                type: 'text',
            },{
                id: 2,
                title: '客服电话',
                value: 4000000000,
                type: 'number',
            },
        ]
    },{
        id: 1,
        title: '发票配置',
        data: [
            {
                id: 0,
                title: '消费类型',
                value: '明细,酒,食品,饮料,玩具,日用品,装修材料,化妆品,办公用品,学生用品,家居用品,饰品,服装,箱包,精品,家电,劳防用品,耗材,电脑配件',
                type: 'text',
            },{
                id: 1,
                title: '最小开发票限额',
                value: '1000',
                type: 'number',
            },{
                id: 2,
                title: '是否允许使用',
                value: [
                    {
                        key: '允许',
                        value: 1,
                        default: false,
                    },{
                        key: '不允许',
                        value: 0,
                        default: true,
                    }
                ],
                type: 'enum',
            },
        ]
    },{
        id: 2,
        title: '微信配置',
        data: [
            {
                id: 0,
                title: '预留',
                value: [
                    '预留',
                    '不预留'
                ],
                type: 'array',
            }
        ]
    }
]
