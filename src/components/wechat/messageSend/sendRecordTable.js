import React,{ Component } from 'react'
import { Table, Popconfirm } from 'antd'
import { View } from '@/components/flexView'
import styles from './index.css'
import { sendRecordData} from './testData'
//
// type Props = {
//     broadcastRecord:{
//         list:Array<{}>,
//         total_number:number
//     },
//     broadcastRecordLoading:boolean
// }

export default class SendRecordTable extends Component {
    render() {
        const { broadcastRecord, broadcastRecordLoading } = this.props
        const { list, total_number } = broadcastRecord
        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                className: styles.column,
            }, {
                title: '时间',
                dataIndex: 'time',
                className: styles.column,
            }, {
                title: '状态',
                dataIndex: 'status',
                className: styles.column,
            }, {
                title: '阅读',
                dataIndex: 'read',
                className: styles.column,
            },{
                title: '点赞',
                dataIndex: 'upvote',
                className: styles.column,
            },{
                title: '操作',
                className: styles.column,
                render: (text, index) =>
                <View className={styles.oprationView}>
                    <a style={{marginRight:12}}>详情</a>
                    <Popconfirm
                        trigger='hover'
                        title="确认删除？"
                        okText="确定"
                        cancelText="取消"
                    >
                        <a>删除</a>
                    </Popconfirm>
                </View>
            },
        ]
        return (
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={list}
                pagination={{
                    // showSizeChanger: true,
                    // showQuickJumper: true,
                    // pageSize: rows,
                    total: total_number,
                    // current: page,
                }}
                loading={broadcastRecordLoading}
            />
        )
    }
}
