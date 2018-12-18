import React,{ Component } from 'react'
import {
    Table ,
    Tag ,
} from 'antd';
import { View } from '@/components/flexView'
import styles from './index.css'
import AvatarPopover from '../public/avatarPopover'
import { data } from './testData'

export default class MessageManagementTable extends Component {
    render() {
        const tagList = [
            {
                id:1,
                title:'标签一',
                num:3,
            }, {
                id:2,
                title:'标签二',
                num:4,
            }
        ]
        const columns = [
            {
                title: '用户信息',
                dataIndex: 'avatar',
                className: styles.column2,
                render: (text, record, index) => <AvatarPopover record={record} tagList={tagList}/>
            }, {
                title: '消息内容',
                dataIndex: 'message',
                className: styles.colmun,
                render: (text, record, index) =>
                <View className={styles.message}>
                    <strong className={styles.messageBox}>
                        {text}
                    </strong>
                    {
                        record.status ? <Tag color="volcano">已回复</Tag> : null
                    }
                </View>
            }, {
                title: '时间',
                dataIndex: 'follow_time',
                className: styles.column,
            }, {
                title: '操作',
                className: styles.column,
                render: (text, record, index) =>
                <View className={styles.operation}>
                    <a>加星</a>
                    <a>回复</a>
                </View>
            }
        ]
        return (
            <Table
                bordered
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true
                }}
            />
        )
    }
}
