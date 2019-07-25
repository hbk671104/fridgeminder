import R from 'ramda'

export default {
    namespace: 'reminder',
    state: {
        data: [
            { id: '0', name: '鸡蛋', expired_at: 1111100 },
            { id: '1', name: '牛奶', expired_at: 1020020 },
            { id: '2', name: '酸奶', expired_at: 1020020 },
            { id: '3', name: '牛腱子', expired_at: 1020020 },
            { id: '4', name: '汤力水', expired_at: 1020020 }
        ]
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
        save(state, { payload }) {
            return {
                ...state
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
