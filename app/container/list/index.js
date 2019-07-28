import React, { PureComponent } from 'react'
import { View, Text, Button, FlatList, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import R from 'ramda'

import ReminderItem from './component/item'
import styles from './style'

@connect(({ reminder }) => ({
	list: R.pathOr([], ['data'])(reminder)
}))
@connectActionSheet
class List extends PureComponent {
	componentDidMount() {}

	handleItemPress = item => () => {
		const options = ['编辑', '删除', '取消']
		const destructiveButtonIndex = 1
		const cancelButtonIndex = 2

		this.props.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
				destructiveButtonIndex
			},
			buttonIndex => {
				// Do something here depending on the button index selected
				if (buttonIndex === 0) {
					this.handleEditItemPress(item)
				} else if (buttonIndex === 1) {
					this.handleDeleteItemPress(item.id)
				}
			}
		)
	}

	handleDeleteItemPress = id => {
		LayoutAnimation.easeInEaseOut()
		this.props.dispatch({
			type: 'reminder/delete',
			payload: { id }
		})
	}

	handleEditItemPress = item => {
		this.props.navigation.navigate('Add', { item })
	}

	handleAddPress = () => {
		this.props.navigation.navigate('Add')
	}

	render() {
		const { list } = this.props
		return (
			<View style={styles.container}>
				<FlatList
					data={list}
					renderItem={({ item }) => (
						<ReminderItem
							data={item}
							onPress={this.handleItemPress(item)}
						/>
					)}
					ItemSeparatorComponent={() => (
						<View style={styles.separator} />
					)}
				/>
				<View style={styles.bar.wrapper}>
					<View style={styles.bar.container}>
						<View style={{ opacity: 0 }}>
							<Button
								title="添加"
								onPress={this.toggleAddPress}
							/>
						</View>
						<View style={{ flex: 1, alignItems: 'center' }}>
							<Text style={styles.bar.title}>
								备忘 ({R.length(list)})
							</Text>
						</View>
						<Button title="添加" onPress={this.handleAddPress} />
					</View>
				</View>
			</View>
		)
	}
}

export default List
