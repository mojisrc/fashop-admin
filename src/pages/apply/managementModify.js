import React,{ Component } from "react";
import { Button ,Table } from 'antd';
import delivePublic from '../../styles/setting/delivePublic.css';
export default class ManagementModify extends Component{
    render(){
        const dataSource = [{
              key: 1,
              name: '胡彦斌',
              time: 32,
              operating: '西湖区湖底公园1号'
            },{
              key: 2,
              name: '胡彦祖',
              time: 42,
              operating: '西湖区湖底公园1号'
            },{
              key: 2,
              name: '胡彦祖',
              time: 42,
              operating: '西湖区湖底公园1号'
            },{
              key: 2,
              name: '胡彦祖',
              time: 42,
              operating: '西湖区湖底公园1号'
            }
        ];

        const columns = [{
          title: '修改人',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: '修改时间',
          dataIndex: 'time',
          key: 'time',
        }, {
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
        }];
        return(
          <div className={delivePublic.tabPane}>
              <Table
                bordered
                dataSource={dataSource}
                columns={columns}
                size="middle"
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true
                }}
              />
          </div>
        )
    }
}
