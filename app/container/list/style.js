import { StyleSheet } from 'react-native'
import { human, iOSColors } from 'react-native-typography'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export default {
    container: {
        flex: 1
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: iOSColors.lightGray,
        marginLeft: 20
    },
    bar: {
        wrapper: {
            backgroundColor: iOSColors.white,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: iOSColors.midGray
        },
        container: {
            height: 44,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: getBottomSpace()
        },
        title: {
            ...human.footnoteObject
        },
        add: {
            ...human.largeTitleObject,
            color: iOSColors.blue
        }
    },
    modal: {}
}
