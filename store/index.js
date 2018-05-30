import axios from 'axios'
import api, { logout } from '@/services/api'
const baseURL = 'http://localhost:4000/v1'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  GET_USER: function (state, user) {
    return state.authUser
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit ({ commit }, { req }) {
  },
  async login ({ commit }, user) {
    try {
      const { data } = await axios.post(baseURL + '/customers/login?include=user', user)
      commit('SET_USER', data)
      Object.assign(api.defaults, { headers: { Authorization: data.id } })
      localStorage.setItem('Auth', data.id)
      this.$router.replace({ path: '/' })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await logout()
    commit('SET_USER', null)
    localStorage.removeItem('Auth')
    this.$router.replace({ path: '/login' })
  }

}
