import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'

import Landing from 'container/landing'
import List from 'container/list'

const MainNavigator = createStackNavigator({
    List
})

const AppNavigator = createSwitchNavigator({
    Landing,
    Main: MainNavigator
})

export default createAppContainer(AppNavigator)
