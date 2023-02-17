import { login, logout } from '@/api/https'
import { getToken, setToken, removeToken, getUid, setUid, removeUid } from '@/util'

const user = {
    state: {
        token: getToken(),
        userId: getUid(),
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_UID: (state, userId) => {
            state.userId = userId
        },
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo)
                    .then(res => {
                        setToken(res.data.token)
                        setUid(res.data.userId)
                        commit('SET_TOKEN', res.data.token)
                        commit('SET_UID', res.data.userId)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                // logout(state.token)
                //     .then(() => {
                //         commit('SET_TOKEN', '')
                //         commit('SET_UID', '')
                //         removeToken()
                //         removeUid()
                //         resolve()
                //     })
                //     .catch(error => {
                //         reject(error)
                //     })
                commit('SET_TOKEN', '')
                removeToken()
            })
        },

    },
}

export default user
