import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import R from 'ramda'

import styles from './style'

class List extends PureComponent {
    static navigationOptions = {
        title: 'Reminders'
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.container}>
                <Text>哈哈哈</Text>
            </View>
        )
    }
}

export default connect()(List)
