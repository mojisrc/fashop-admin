import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './itemTypes'

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

@DropTarget(ItemTypes.CARD_CHILD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD_CHILD, cardSource, (connect, monitor) => ({
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
}, {}> {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
        findCard: PropTypes.func.isRequired,
    }

    render() {
        const {
            name,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props
        const opacity = isDragging ? 0 : 1

        return connectDragSource(
            connectDropTarget(
                <div style={{ ...style, opacity }}>
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
            ),
        )
    }
}
