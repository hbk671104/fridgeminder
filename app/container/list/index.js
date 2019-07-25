import React, { PureComponent } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import R from 'ramda'

import Add from './add'

import ReminderItem from './component/item'
import ReminderHiddenItem, {
    itemWidth as hiddenItemWidth
} from './component/hidden-item'
import styles from './style'

@connect(({ reminder }) => ({
    list: R.pathOr([], ['data'])(reminder)
}))
@compose(withState('addVisible', 'setAddVisible', false))
class List extends PureComponent {
    componentDidMount() {}

    handleHiddenItemPress = id => () => {
        this.props.dispatch({
            type: 'reminder/delete',
            payload: { id }
        })
    }

    toggleAddPress = () => {
        this.props.setAddVisible(!this.props.addVisible)
    }

    render() {
        const { list, addVisible } = this.props
        return (
            <View style={styles.container}>
                <SwipeListView
                    data={list}
                    renderItem={({ item }) => <ReminderItem data={item} />}
                    renderHiddenItem={({ item }) => (
                        <ReminderHiddenItem
                            onDeletePress={this.handleHiddenItemPress(item.id)}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                    rightOpenValue={-hiddenItemWidth * 2}
                />
                <View style={styles.bar.container}>
                    <View style={{ opacity: 0 }}>
                        <Button title="添加+" onPress={this.toggleAddPress} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.bar.title}>
                            备忘 ({R.length(list)})
                        </Text>
                    </View>
                    <Button title="添加+" onPress={this.toggleAddPress} />
                </View>
                <Modal
                    style={styles.modal}
                    avoidKeyboard
                    useNativeDriver
                    hideModalContentWhileAnimating
                    isVisible={addVisible}
                    onBackdropPress={this.toggleAddPress}
                >
                    <Add onCancelPress={this.toggleAddPress} />
                </Modal>
            </View>
        )
    }
}

export default List
