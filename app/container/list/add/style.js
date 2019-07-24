import { StyleSheet } from 'react-native'
import { human, iOSColors } from 'react-native-typography'

export default {
    container: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4
    },
    title: {
        ...human.calloutObject
    },
    textInput: {
        container: {
            marginTop: 12
        }
    }
}
