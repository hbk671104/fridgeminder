import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { human, iOSColors } from 'react-native-typography'

const hiddenItem = ({ onPress }) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.item.container} onPress={onPress}>
            <Text style={styles.item.text}>删</Text>
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
