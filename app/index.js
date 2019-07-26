import React from 'react'
import {
    AppRegistry,
    AsyncStorage,
    UIManager,
    Platform,
    PushNotificationIOS
} from 'react-native'
import { create } from 'dva-core'
import { Provider } from 'react-redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import PushNotification from 'react-native-push-notification'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
}

const dvaInit = options => {
    const app = create(options)

    // HMR workaround
    if (!global.registered) options.models.forEach(model => app.model(model))
    global.registered = true

    app.start()
    // eslint-disable-next-line no-underscore-dangle
    const store = app._store

    app.start = container => () => (
        <Provider store={store}>{container}</Provider>
    )
    app.getStore = () => store

    return app
}

import Router from './router'
import reminderModel from 'model/reminder'
import { name as appName } from '../app.json'

const app = dvaInit({
    initialState: {},
    models: [reminderModel],
    extraEnhancers: [autoRehydrate()],
    onError(e) {
        console.log('onError', e)
    }
})

export const persist = callback => {
    persistStore(
        app.getStore(),
        {
            storage: AsyncStorage,
            whitelist: ['reminder']
        },
        callback
    )
}

PushNotification.configure({
    onNotification: function(notification) {
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData)
    }
})
AppRegistry.registerComponent(appName, () =>
    app.start(
        <ActionSheetProvider>
            <Router />
        </ActionSheetProvider>
    )
)
