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
        container: {
            height: 44,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: getBottomSpace(),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20
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
