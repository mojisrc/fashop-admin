import React from 'react'
import Page from '@/components/public/page'
import { View } from 'react-web-dom'
import styles from '../../../src/styles/wechat/wechatIndex.css'
import { Button, Table,Icon } from 'antd'

export default class NotBindPublicAccounts extends React.Component {
    render() {
        const columns = [
            {
                title: "",
                dataIndex: 'title',
                className: styles.columns,
            }, {
                title:'未认证订阅号',
                dataIndex: 'subscripe_uncertified',
                className: styles.columns,
                render:(text)=> text ? <Icon type="check" /> : null
            }, {
                title:'认证订阅号',
                dataIndex: 'subscripe_certified',
                className: styles.columns,
                render:(text)=> text ? <Icon type="check" /> : null
            }, {
                title:'未认证服务号',
                dataIndex: 'service_uncertified',
                className: styles.columns,
                render:(text)=> text ? <Icon type="check" /> : null
            },
            {
                title:'认证服务号',
                dataIndex: 'service_certified',
                className: styles.columns,
                render:(text)=> text ? <Icon type="check" /> : null
            }
        ]
        const data = [
            {
                key: "1",
                title: "自动回复",
                subscripe_uncertified:1,
                subscripe_certified:1,
                service_uncertified:1,
                service_certified:1,
            },
            {
                key:"2",
                title:"自定义菜单",
                subscripe_uncertified:0,
                subscripe_certified:1,
                service_uncertified:1,
                service_certified:1,
            },
            {
                key:"3",
                title:"消息群发",
                subscripe_uncertified:0,
                subscripe_certified:1,
                service_uncertified:0,
                service_certified:1,
            },
            {
                key:"4",
                title:"客户管理",
                subscripe_uncertified:0,
                subscripe_certified:0,
                service_uncertified:0,
                service_certified:1,
            },{
                key:"5",
                title:"微信支付",
                subscripe_uncertified:0,
                subscripe_certified:0,
                service_uncertified:0,
                service_certified:1,
            }
        ]
        return (
            <Page >
                <div className={styles.container}>
                    <h2 className={styles.title}>
                        绑定微信号公众号，即时管理
                    </h2>
                    <Button
                        type="primary"
                        className={styles.bindBtn}
                        onClick={()=>{
                            this.props.history.push('/wechat/bindPublicAccounts')
                        }}
                    >
                        绑定微信公众号
                    </Button>
                </div>
                <div className={styles.tableContainer}>
                    <View className={styles.tableHeader}>
                        <p>
                            <span>● </span>
                            手动绑定需同步微信接口，在微信后台，基本设置可以获取appid和appsecret，绑定成功后，将获取的服务器配置接口绑定到微信后台
                        </p>
                        <p>
                            <span>● </span>
                            切记：绑定过程中，一定要注意保持接口参数一致
                        </p>
                        <p>
                            <span>● </span>
                            微信给不同类型的公众号提供不同的接口，因此，我们为您提供的功能也会有所不同
                            <a>了解更多</a>
                        </p>
                    </View>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        className={styles.table}
                        pagination={false}
                    />
                </div>
            </Page>
        )
    }
}
