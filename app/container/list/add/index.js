import React, { PureComponent } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import DatePicker from 'react-native-date-picker'
import { compose, withState } from 'recompose'
import moment from 'moment'

import styles from './style'

@connect()
@compose(
    withState('name', 'setName', ''),
    withState('expiration', 'setExpiration', moment().toDate())
)
class Add extends PureComponent {
    onCancelPress = () => this.props.onCancelPress()

    onConfirmPress = () => {
        const { name, expiration } = this.props
        if (!name || !expiration) {
            return
        }
        const current = moment().unix()
        this.props.dispatch({
            type: 'reminder/add',
            payload: {
                entry: {
                    id: `username_${current}`,
                    name,
                    created_at: current,
                    expired_at: moment(expiration).unix()
                }
            }
        })
        this.onCancelPress()
    }

    handleNameChange = text => {
        this.props.setName(text)
    }

    handleDateChange = date => {
        this.props.setExpiration(date)
    }

    render() {
        const { expiration, name } = this.props
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>食品名称</Text>
                    <View style={styles.textInput.container}>
                        <TextInput
                            value={name}
                            style={{ paddingTop: 0, paddingBottom: 0 }}
                            placeholder="请输入食品名称"
                            underlineColorAndroid="transparent"
                            onChangeText={this.handleNameChange}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 12 }}>
                    <Text style={styles.title}>过期日期</Text>
                    <DatePicker
                        date={expiration}
                        minimumDate={moment().toDate()}
                        mode="date"
                        onDateChange={this.handleDateChange}
                    />
                </View>
                <View style={styles.bottom}>
                    <View style={{ flex: 1 }}>
                        <Button
                            color={styles.cancel.color}
                            title="取消"
                            onPress={this.onCancelPress}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button title="确定" onPress={this.onConfirmPress} />
                    </View>
                </View>
            </View>
        )
    }
}

export default Add
