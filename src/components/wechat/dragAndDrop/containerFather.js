
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './cardFather'
import ItemTypes from './itemTypes'

const style = {
    display: 'flex',
    flex: 1,
}

const cardTarget = {
    drop() {
    },
}

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD_FATHER, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class ContainerFather extends Component<{
    connectDropTarget: Function,
    changeState: Function,
    cards:Array<{
        id:number,
        name:string
    }>
}, {}> {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
    }

    moveCard(id: number, atIndex: number) {
        const { card, index } = this.findCard(id)
        this.props.changeState(
            update(this.props, {
                cards: {
                    $splice: [[index, 1], [atIndex, 0, card]],
                },
            }),
        )
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
        const { cards, changeState } = this.props
        return connectDropTarget(
            <div style={style}>
                {
                    cards.map((card) => (
                        <Card
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            moveCard={this.moveCard.bind(this)}
                            findCard={this.findCard.bind(this)}
                            changeState={changeState}
                            cards={cards}
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
