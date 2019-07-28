import {
	createAppContainer,
	createSwitchNavigator,
	createStackNavigator
} from 'react-navigation'

import Landing from 'container/landing'
import List from 'container/list'
import Add from 'container/list/add'

import { displayName } from '../app.json'

const MainNavigator = createStackNavigator({
	List: {
		screen: List,
		navigationOptions: {
			title: displayName
		}
	},
	Add
})

const AppNavigator = createSwitchNavigator({
	Landing,
	Main: MainNavigator
})

export default createAppContainer(AppNavigator)
