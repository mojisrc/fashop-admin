
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget } from 'react-dnd'
import Card from './cardChild'
import ItemTypes from './itemTypes'

const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}

const cardTarget = {
    drop() {
    },
}

@DropTarget(ItemTypes.CARD_CHILD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class ContainerChild extends Component<{
    changeState: Function,
    connectDropTarget: Function,
    cards: Array<{
        id: number,
        name: string
    }>,
    list: Array<{
        sub_button: Array<{}>
    }>,
    dragChild: any
}, {}> {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
    }

    moveCard(id: number, atIndex: number) {
        const { card, index } = this.findCard(id)
        const { list, dragChild } = this.props
        let new_sub_button = update(this.props, {
            cards: {
                $splice: [[index, 1], [atIndex, 0, card]],
            },
        }).cards
        let newCard = [...list]
        newCard[dragChild].sub_button = new_sub_button
        this.props.changeState({ cards: newCard })
    }

    findCard(id: number) {
        const { cards } = this.props
        const card = cards.filter(c => c.id === id)[0]
        return {
            card,
            index: cards.indexOf(card),
        }
    }

    render() {
        const { connectDropTarget } = this.props
        const { cards } = this.props
        return connectDropTarget(
            <div style={{ ...style }}>
                {
                    cards.map(item => (
                        <Card
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            moveCard={this.moveCard.bind(this)}
                            findCard={this.findCard.bind(this)}
                            connectDragSource={() => {
                            }}
                            connectDropTarget={() => {
                            }}
                            isDragging={false}
                        />
                    ))
                }
            </div>,
        )
    }
}
