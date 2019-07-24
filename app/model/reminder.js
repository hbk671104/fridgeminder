import R from 'ramda'

export default {
    namespace: 'reminder',
    state: {
        data: {}
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state
            }
        }
    },
    effects: {
        *fetch({}, { call, put }) {
            try {
                const result = yield call(() =>
                    fetch('https://api.coingecko.com/api/v3/exchanges').then(
                        res => res.json()
                    )
                )
                yield put({ type: 'save', payload: result })
            } catch (error) {
                console.log(error)
            }
        }
    },
    subscriptions: {}
}
