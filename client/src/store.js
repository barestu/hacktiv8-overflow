import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import swal from 'sweetalert'

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'http://35.187.249.89'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      id: '',
      email: '',
      username: '',
      role: ''
    },
    questions: [],
    question: []
  },

  mutations: {
    setLogin (state) {
      let token = localStorage.getItem('token')
      let decoded = jwt.decode(token)

      if (decoded) {
        state.isLogin = true
        state.user.id = decoded.id
        state.user.email = decoded.email
        state.user.username = decoded.username
        state.user.role = decoded.role
      }
    },

    setLogout (state) {
      state.isLogin = false
      state.user.id = ''
      state.user.email = ''
      state.user.username = ''
      state.user.role = ''
    },

    fetchQuestions (state, data) {
      state.questions = data
    },

    fetchOneQuestion (state, data) {
      state.question = data
    },

    upvoteQuestion (state, data) {
      let status = true
      let voters = state.question.voters

      voters.map(voter => {
        if (voter === data) {
          status = false
        }
      })

      if (status) {
        voters.push(data)
      }
    },

    downvoteQuestion (state, data) {
      let voters = state.question.voters

      voters.map((voter, index) => {
        if (voter === data) {
          voters.splice(index, 1)
        }
      })
    },

    upvoteAnswer (state, data) {
      let answers = state.question.answers
      let status = true

      answers.map((answer, index) => {
        answer.voters.map(voter => {
          if (voter === state.user.id) {
            status = false
          }
        })

        if (answer._id === data.answerId && status) {
          answers[index].voters.push(state.user.id)
        }
      })
    },

    downvoteAnswer (state, data) {
      state.question.answers.map((answer, index1) => {
        if (answer._id === data.answerId) {
          state.question.answers[index1].voters.map((voter, index2) => {
            if (voter === state.user.id) {
              state.question.answers[index1].voters.splice(index2, 1)
            }
          })
        }
      })
    }
  },

  actions: {
    getAllQuestions: ({ commit }) => {
      axios.get(`${baseUrl}/api/question`)
        .then(response => {
          commit('fetchQuestions', response.data.questions)
        })
        .catch(error => {
          console.log('get data questions failed', error.message)
        })
    },

    getOneQuestion: ({ commit }, id) => {
      axios.get(`${baseUrl}/api/question/${id}`)
        .then(response => {
          commit('fetchOneQuestion', response.data.question)
        })
        .catch(error => {
          console.log('get data question failed', error.message)
        })
    },

    addQuestions: ({ commit, dispatch }, question) => {
      let token = localStorage.getItem('token')

      axios.post(`${baseUrl}/api/question/add`, question, {
        headers: { token }
      })
        .then(response => {
          dispatch('getAllQuestions')
          swal('Add question success!', ``, 'success')
        })
        .catch(error => {
          console.log('add question failed', error.message)
        })
    },

    updateQuestions: ({ commit, dispatch }, data) => {
      let token = localStorage.getItem('token')

      axios.put(`${baseUrl}/api/question/update/${data.questionId}`, data.updateData, {
        headers: { token }
      })
        .then(response => {
          dispatch('getOneQuestion', data.questionId)
          swal('Update question success!', ``, 'success')
        })
        .catch(error => {
          console.log('update data failed', error.message)
        })
    },

    deleteQuestions: ({ commit, dispatch }, id) => {
      let token = localStorage.getItem('token')

      axios.delete(`${baseUrl}/api/question/delete/${id}`, {
        headers: { token }
      })
        .then(response => {
          dispatch('getAllQuestions')
          swal('Delete question success!', ``, 'success')
        })
        .catch(error => {
          console.log('delete question failed', error.message)
        })
    },

    upvoteQuestions: ({ state, commit }, id) => {
      let token = localStorage.getItem('token')

      axios.patch(`${baseUrl}/api/question/upvote/${id}`, {}, {
        headers: { token }
      })
        .then(response => {
          commit('upvoteQuestion', state.user.id)
        })
        .catch(error => {
          console.log('upvote failed', error.message)
        })
    },

    downvoteQuestions: ({ state, commit }, id) => {
      let token = localStorage.getItem('token')

      axios.patch(`${baseUrl}/api/question/downvote/${id}`, {}, {
        headers: { token }
      })
        .then(response => {
          commit('downvoteQuestion', state.user.id)
        })
        .catch(error => {
          console.log('downvote failed', error.message)
        })
    },

    upvoteAnswers: ({ state, commit, dispatch }, data) => {
      let token = localStorage.getItem('token')

      axios.patch(`${baseUrl}/api/answer/upvote/${data.answerId}`, {}, {
        headers: { token }
      })
        .then(response => {
          commit('upvoteAnswer', data)
        })
        .catch(error => {
          console.log('upvote failed', error.message)
        })
    },

    downvoteAnswers: ({ state, commit, dispatch }, data) => {
      let token = localStorage.getItem('token')

      axios.patch(`${baseUrl}/api/answer/downvote/${data.answerId}`, {}, {
        headers: { token }
      })
        .then(response => {
          commit('downvoteAnswer', data)
        })
        .catch(error => {
          console.log('downvote failed', error.message)
        })
    },

    addAnswers: ({ commit, dispatch }, data) => {
      let token = localStorage.getItem('token')

      axios.post(`${baseUrl}/api/answer/add`, data, {
        headers: { token }
      })
        .then(response => {
          let questionId = response.data.answer.question
          dispatch('getOneQuestion', questionId)
          swal('Add answer success!', ``, 'success')
        })
        .catch(error => {
          console.log('add answer failed', error.message)
        })
    },

    deleteAnswers: ({ commit, dispatch }, data) => {
      let token = localStorage.getItem('token')
      console.log('here', data)

      axios.delete(`${baseUrl}/api/answer/delete/${data.id}`, {
        headers: { token }
      })
        .then(response => {
          dispatch('getOneQuestion', data.question_id)
          swal('Delete answer success!', ``, 'success')
        })
        .catch(error => {
          console.log('delete question failed', error.message)
        })
    }
  }
})
