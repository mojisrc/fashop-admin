
import React, { Component } from 'react'
import ContainerFather from './containerFather'
import { View } from '@/components/flexView'

export default class DragAndDrop extends Component {
	state = {
		cards: [],
	}
	render() {
		const { list } = this.props
		const { cards } = this.state
		return (
			<View>
				<ContainerFather
					cards={cards.length ? cards : list}
					changeState={({cards})=>{
						this.setState({cards})
					}}
				/>
			</View>
		)
	}
	emptyStateCards = () => {
		this.setState({
			cards:[]
		})
	}
}
