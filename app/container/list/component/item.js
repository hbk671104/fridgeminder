import React from 'react'
import { View, Text } from 'react-native'
import R from 'ramda'
import { human } from 'react-native-typography'

const item = ({ data }) => {
    const name = R.path(['name'])(data)
    const expired_at = R.path(['expired_at'])(data)
    return (
        <View style={styles.container}>
            <Text style={human.title2Object}>{name}</Text>
            <View style={styles.bottom.container}>
                <Text>{expired_at}</Text>
                <Text>{expired_at}</Text>
            </View>
        </View>
    )
}

const styles = {
    container: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: 'white'
    },
    bottom: {
        container: {
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    }
}

export default item
