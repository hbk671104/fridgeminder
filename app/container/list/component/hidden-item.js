import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { human, iOSColors } from 'react-native-typography'

const hiddenItem = ({ onEditPress, onDeletePress }) => (
    <View style={styles.container}>
        <TouchableOpacity
            style={[styles.item.container, { backgroundColor: iOSColors.blue }]}
            onPress={onEditPress}
        >
            <Text style={styles.item.text}>编辑</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item.container} onPress={onDeletePress}>
            <Text style={styles.item.text}>删除</Text>
        </TouchableOpacity>
    </View>
)

export const itemWidth = 72
const styles = {
    container: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    item: {
        container: {
            width: itemWidth,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: iOSColors.red
        },
        text: {
            ...human.headlineObject,
            color: 'white'
        }
    }
}

export default hiddenItem
