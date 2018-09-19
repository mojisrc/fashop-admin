//@flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget, DragDropContext, DragSource } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import styles from './index.css'

const cardTargetContainer = {
    drop() {
    },
}

@DragDropContext(HTML5Backend)
@DropTarget('CARD', cardTargetContainer, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class Container extends Component<{
    connectDropTarget: Function
}, {
    cards: Array<{
        id: number,
        text: string
    }>
}> {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
    }
    state = {
        cards: [
            {
                id: 1,
                text: 'Write a',
            },
            {
                id: 2,
                text: 'Make it',
            },
            {
                id: 3,
                text: 'Write README',
            },
            {
                id: 4,
                text: 'Create',
            },
        ],
    }


    moveCard = (id: number, atIndex: number) => {
        const { card, index } = this.findCard(id)
        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[index, 1], [atIndex, 0, card]],
                },
            }),
        )
    }

    findCard = (id: number) => {
        const { cards } = this.state
        const card = cards.filter(c => c.id === id)[0]

        return {
            card,
            index: cards.indexOf(card),
        }
    }

    render() {
        const { connectDropTarget } = this.props
        const { cards } = this.state

        return connectDropTarget(
            <div
                style={{
                    display: 'flex',
                }}
            >
                {cards.map(card => (
                    <Card
                        key={card.id}
                        id={card.id}
                        text={card.text}
                        moveCard={this.moveCard}
                        findCard={this.findCard}
                        connectDragSource={() => {
                        }}
                        connectDropTarget={() => {
                        }}
                        isDragging={false}
                    />
                ))}
            </div>,
        )
    }
}

const style = {
    border: '1px dashed #ececec',
    padding: '.5rem',
    marginRight: '.5rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    width: 102,
    height: 102,
    borderRadius: 4,
    cursor: 'move',
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

@DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class Card extends Component<{
    connectDragSource: Function,
    connectDropTarget: Function,
    isDragging: boolean,
    id: any,
    text: string,
    moveCard: Function,
    findCard: Function,
}, {}> {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
        findCard: PropTypes.func.isRequired,
    }

    render() {
        const {
            text,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props
        const opacity = isDragging ? 0 : 1

        return connectDragSource(
            connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
        )
    }
}
