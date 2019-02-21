
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { Popover } from 'antd'
import ItemTypes from './itemTypes'
import ContainerChild from './containerChild'

const style = {
    border: '1px dashed #ececec',
    cursor: 'move',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
}

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.findCard(props.id).index,
        }
    },

    endDrag(props, monitor) {

        const { id: droppedId, originalIndex } = monitor.getItem()
        const didDrop = monitor.didDrop()

        if (!didDrop) {
            props.moveCard(droppedId, originalIndex)
        }
    },
}

const cardTarget = {
    canDrop() {
        return false
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem()
        const { id: overId } = props

        if (draggedId !== overId) {
            const { index: overIndex } = props.findCard(overId)
            props.moveCard(draggedId, overIndex)
        }
    },
}

@DropTarget(ItemTypes.CARD_FATHER, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD_FATHER, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class Card extends Component<{
    connectDragSource: Function,
    connectDropTarget: Function,
    isDragging: boolean,
    id: any,
    name: string,
    moveCard: Function,
    findCard: Function,
    cards: Array<{
        id: number,
        name: string
    }>,
    changeState: Function
}, {
    dragChild: number
}> {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
        findCard: PropTypes.func.isRequired,
        cards: PropTypes.array.isRequired,
        changeState: PropTypes.func.isRequired,
    }
    state = {
        dragChild: -1
    }

    render() {
        const {
            id,
            name,
            cards,
            isDragging,
            connectDragSource,
            connectDropTarget,
            changeState,
        } = this.props
        const {
            dragChild,
        } = this.state
        const opacity = isDragging ? 0 : 1
        let currentIndex = cards.findIndex((item) => item.id === id)
        return connectDragSource(
            connectDropTarget(
                <div style={{ ...style, opacity }}>
                    <Popover
                        placement='top'
                        overlayClassName='menuListPopover'
                        visible={dragChild !== -1}
                        content={(
                            <div style={{ width: 252 / (cards.length) }}>
                                <ContainerChild
                                    list={cards}
                                    cards={dragChild !== -1 && cards[dragChild].sub_button ? cards[dragChild].sub_button : []}
                                    dragChild={dragChild}
                                    changeState={({ cards }) => {
                                        changeState({ cards })
                                    }}
                                    connectDropTarget={()=>{}}

                                />
                            </div>
                        )}
                    >
                        <div
                            onClick={() => {
                                if (cards[currentIndex].sub_button) {
                                    this.setState({
                                        dragChild: currentIndex
                                    })
                                }
                            }}
                        >
                            <img
                                alt='drag'
                                src={require('@/assets/images/wechat/drag.png')}
                                style={{
                                    width: '14px',
                                    marginRight: '5px',
                                }}
                            />
                            {name}
                        </div>
                    </Popover>
                </div>
            ),
        )
    }
}
