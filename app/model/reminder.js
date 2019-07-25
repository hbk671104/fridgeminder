import R from 'ramda'

export default {
    namespace: 'reminder',
    state: {
        data: []
    },
    reducers: {
        add(state, { payload }) {
            const entry = R.path(['entry'])(payload)
            return {
                ...state,
                data: R.pipe(
                    R.path(['data']),
                    R.prepend(entry)
                )(state)
            }
        },
        delete(state, { payload }) {
            const targetId = R.path(['id'])(payload)
            return {
                ...state,
                data: R.pipe(
                    R.path(['data']),
                    R.filter(i => i.id !== targetId)
                )(state)
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
