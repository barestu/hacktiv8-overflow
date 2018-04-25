<template>
  <div id="app">
    <!-- Navbar -->
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-1 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-bold text-primary">
        <router-link to="/">
          <img src="./assets/img/hacktiv8-logo.png" class="mx-3" style="width: 55px;">
          Hacktiv8 Overflow
        </router-link>
      </h5>
      <div v-if="!isLogin">
        <button data-toggle="modal" data-target="#modalRegister" class="btn btn-primary btn-square m-1">
          Register
        </button>
        <button data-toggle="modal" data-target="#modalLogin" class="btn btn-outline-primary btn-square m-1">
          Login
        </button>
      </div>
      <div v-if="isLogin">
        <button @click="logout" class="btn btn-outline-dark btn-square m-1">Logout</button>
      </div>
    </div>

    <!-- Modal Register-->
    <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <RegisterForm />
        </div>
      </div>
    </div>
    <!-- Modal Login -->
    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <LoginForm />
        </div>
      </div>
    </div>

    <div class="container pt-4">
      <div class="row">
        <!-- Content -->
        <div class="col-md-8 col-sm-12">
          <router-view class="ml-3" />
        </div>
        <!-- Sidebar -->
        <div class="col-md-4 col-sm-12">
          <div v-if="isLogin" class="ask-question text-center">
            <h4 class="border-bottom border-gray py-1 px-2 mb-0">
              Logged in as
              <span class="font-weight-bold">{{ user.username }}</span>
            </h4>
            <button data-toggle="modal" data-target="#modalAsk" class="btn btn-sm btn-primary btn-square my-3">
              Ask Question
            </button>
          </div>
        </div>

        <!-- Modal Add Question -->
        <div class="modal fade" id="modalAsk" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <AddQuestionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'
import LoginForm from '@/components/LoginForm'
import AddQuestionForm from '@/components/AddQuestionForm'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    RegisterForm,
    LoginForm,
    AddQuestionForm
  },
  methods: {
    ...mapMutations([
      'setLogin',
      'setLogout'
    ]),
    ...mapActions([
      'getAllQuestions'
    ]),
    logout () {
      localStorage.removeItem('token')
      this.setLogout()
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'user'
    ])
  },
  created () {
    let token = localStorage.getItem('token')

    if (token) {
      this.setLogin()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-color: #F89406;
}

.container {
  background-color: white;
}

.border-top { border-top: 1px solid #e5e5e5; }
.border-bottom { border-bottom: 1px solid #e5e5e5; }

.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }

.btn.btn-square {
  border-radius: 0;
}

.btn-primary {
  background-color: #F89406;
  border-color: #F89406;
}

.btn-outline-primary {
  color: #F89406;
  background-color: transparent;
  background-image: none;
  border-color: #F89406;
}

a {
  color: #F89406
}

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid coral; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
