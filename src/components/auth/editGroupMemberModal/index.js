//@flow
import React, { Component } from "react";
import {
    Button,
    Modal,
    Avatar,
    Transfer
} from "antd";
import { connect } from "react-redux";
import styles from "./index.css";
import { startGetMemberList } from "../../../actions/auth/member";
import { View } from "react-web-dom";
import { ThemeStyle } from "../../../utils/style";
import {
    groupMemberEdit,
    groupMemberList
} from "../../../actions/auth/role";


type Props = {
    visible: boolean,
    dispatch: Function,
    onCancel: Function,
    id: number,
    memberList: {
        list: Array<{ id: number, nickname: string }>
    },
    groupMemberList: Array<{id: number}>
};

type State = {
    confirmDirty: boolean,
    targetKeys: Array<number>,
};

@connect(
    ({ auth: { member: { memberList }, group: { groupMemberList } } }) => ({
        memberList,
        groupMemberList
    })
)
export default class EditGroupMemberModal extends Component<Props, State> {
    static defaultProps = {
        dispatch: () => {},
        groupMemberList: [],
        memberList: {
            list: [],
        },
    };
    state = {
        confirmDirty: false,
        mockData: [],
        targetKeys: []
    };
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.groupMemberList !== this.props.groupMemberList || nextProps.memberList!== this.props.memberList) {
            const targetKeys = [];
            const dataSource = nextProps.memberList.list.map(e => {
                return {
                    ...e,
                    ...{ key: e.id }
                };
            });
            dataSource.map(e => {
                const index = nextProps.groupMemberList.findIndex(
                    c => c.id === e.id
                );
                if (index !== -1) {
                    targetKeys.push(e.key);
                }
            });
            this.setState({
                targetKeys
            })
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(startGetMemberList())
    }
    filterOption = (inputValue: string, option:{nickname: string}) => {
        return option.nickname.indexOf(inputValue) > -1;
    };
    handleChange = (targetKeys: Array<number>) => {
        this.setState({ targetKeys });
    };
    onCancel = () => {
        const { onCancel } = this.props;
        onCancel();
    };
    onSave = ()=>{
        const {
            targetKeys
        } = this.state
        const {
            dispatch,
            id,
        } = this.props
        dispatch(groupMemberEdit({
            id,
            member_ids: targetKeys,
            func: ()=>{
                this.onCancel()
                dispatch(groupMemberList({
                    params: {id}
                }))
            }
        }))
    }
    render() {
        const { visible, memberList } = this.props;
        const { targetKeys } = this.state;
        const { list } = memberList;
        const dataSource = list.map(e => {
            return {
                ...e,
                ...{ key: e.id }
            };
        });
        return (
            <Modal
                title={"选择成员"}
                visible={visible}
                footer={null}
                onCancel={this.onCancel}
                width={600}
            >
                <Transfer
                    dataSource={dataSource}
                    showSearch
                    filterOption={this.filterOption}
                    targetKeys={targetKeys}
                    onChange={this.handleChange}
                    titles={['全部成员','已选成员']}
                    render={item => (
                        <span>
                            <Avatar
                                src={item.avatar}
                                size={'small'}
                                style={{
                                    verticalAlign: 'middle',
                                    margin:'0 8px 0 2px',
                                    backgroundColor: ThemeStyle.themeColor,
                                }}
                            >
                                {item.nickname}
                            </Avatar>
                            {item.nickname}
                        </span>
                    )}
                    listStyle={{
                        width: 250,
                        height: 400
                    }}
                />
                <View className={styles.view1}>
                    <Button type={'primary'} style={{marginRight:15}} onClick={this.onSave}>保存</Button>
                    <Button onClick={this.onCancel}>取消</Button>
                </View>
            </Modal>
        );
    }
}
