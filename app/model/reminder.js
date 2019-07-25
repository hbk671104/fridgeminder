import R from 'ramda'
import PushNotification from 'react-native-push-notification'
import moment from 'moment'

export default {
    namespace: 'reminder',
    state: {
        data: []
    },
    reducers: {
        addItem(state, { payload }) {
            return {
                ...state,
                data: R.pipe(
                    R.path(['data']),
                    R.prepend(payload)
                )(state)
            }
        },
        deleteItem(state, { payload }) {
            return {
                ...state,
                data: R.pipe(
                    R.path(['data']),
                    R.filter(i => i.id !== payload.id)
                )(state)
            }
        }
    },
    effects: {
        *add({ payload }, { put }) {
            try {
                const { id, name, expired_at } = payload
                // schedule local notification
                PushNotification.localNotificationSchedule({
                    id,
                    title: '过期提醒',
                    message: `「${name}」即将在3天之后过期`,
                    date: moment
                        .unix(expired_at)
                        .subtract(3, 'days')
                        .toDate()
                })
                yield put({ type: 'addItem', payload })
            } catch (error) {
                console.log(error)
            }
        },
        *delete({ payload }, { put }) {
            try {
                const { id } = payload
                // remove scheduled local notification
                PushNotification.cancelLocalNotifications({ id })
                yield put({ type: 'deleteItem', payload })
            } catch (error) {
                console.log(error)
            }
        }
    },
    subscriptions: {}
}
