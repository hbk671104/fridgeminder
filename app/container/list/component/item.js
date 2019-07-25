import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import R from 'ramda'
import { human, iOSColors } from 'react-native-typography'
import moment from 'moment'

const item = ({ data, onPress }) => {
    const name = R.path(['name'])(data)
    const created_at = moment.unix(R.path(['created_at'])(data))
    const expired_at = moment.unix(R.path(['expired_at'])(data))
    const diff = expired_at.diff(created_at, 'days')
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={human.title3Object}>{name}</Text>
            <View style={styles.diff.container}>
                <View>
                    <Text
                        style={[
                            styles.diff.text,
                            { color: styles.diff.text.color(diff) }
                        ]}
                    >
                        {diff}
                    </Text>
                    <View
                        style={{
                            position: 'absolute',
                            right: -15,
                            bottom: 4
                        }}
                    >
                        <Text
                            style={{
                                ...human.footnoteObject
                            }}
                        >
                            天
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom.container}>
                <Text style={styles.bottom.text}>
                    {created_at.format('LL')}
                </Text>
                <View style={styles.bottom.connector} />
                <Text style={styles.bottom.text}>
                    {expired_at.format('LL')}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    container: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: 'white'
    },
    diff: {
        container: {
            marginVertical: 12,
            alignItems: 'center'
        },
        text: {
            ...human.title1Object,
            color: diff => {
                if (diff < 10) {
                    return iOSColors.red
                } else if (diff < 20) {
                    return iOSColors.orange
                }
                return iOSColors.green
            }
        }
    },
    bottom: {
        container: {
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        connector: {
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: iOSColors.gray,
            marginHorizontal: 12
        },
        text: {
            ...human.footnoteObject,
            color: iOSColors.gray
        }
    }
}

export default item
