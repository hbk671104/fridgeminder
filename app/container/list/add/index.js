import React, { PureComponent } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import R from 'ramda'

import styles from './style'

@connect()
class Add extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>食品名称</Text>
                    <View style={styles.textInput.container}>
                        <TextInput
                            style={{ paddingTop: 0, paddingBottom: 0 }}
                            placeholder="请输入食品名称"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 12 }}>
                    <Text style={styles.title}>过期日期</Text>
                    <DateTimePicker
                        value={moment.now()}
                        minimumDate={moment.now()}
                        mode="date"
                        display="calendar"
                        // onChange={this.setDate}
                    />
                </View>
            </View>
        )
    }
}

export default Add
