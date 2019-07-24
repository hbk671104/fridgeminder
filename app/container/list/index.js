import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import R from 'ramda'

import ReminderItem from './component/item'
import ReminderHiddenItem, {
    itemWidth as hiddenItemWidth
} from './component/hidden-item'
import styles from './style'

@connect(({ reminder }) => ({
    list: R.pathOr([], ['data'])(reminder)
}))
class List extends PureComponent {
    static navigationOptions = {
        title: '冰备宝'
    }

    componentDidMount() {}

    handleHiddenItemPress = id => () => {
        this.props.dispatch({
            type: 'reminder/delete',
            payload: { id }
        })
    }

    render() {
        const { list } = this.props
        return (
            <View style={styles.container}>
                <SwipeListView
                    data={list}
                    renderItem={({ item }) => <ReminderItem data={item} />}
                    renderHiddenItem={({ item }) => (
                        <ReminderHiddenItem
                            onPress={this.handleHiddenItemPress(item.id)}
                        />
                    )}
                    rightOpenValue={-hiddenItemWidth}
                />
            </View>
        )
    }
}

export default List
