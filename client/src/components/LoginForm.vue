<template>
  <div class="modal-body">
    <h2 class="text-center py-3">Login</h2>
    <form @submit.prevent="login">
      <div class="form-signin mt-3">
        <div class="form-group">
          <label class="ml-2">Email</label>
          <input type="email" class="form-control" v-model="email" :class="{ error: wrongEmail }" name="email" value="" placeholder="example@email.com">
        </div>
        <div class="form-group">
          <label class="ml-2">Password</label>
          <input type="password" class="form-control" v-model="password" :class="{ error: wrongPassword }" name="password" value="" placeholder="Your password">
        </div>
        <div v-if="errorMsg" class="alert alert-danger mt-3" role="alert">
          {{ errorMsg }}
        </div>
        <!-- Button Submit/Cancel -->
        <div class="text-center py-3 mt-2">
          <button type="submit" class="btn btn-primary px-5 mx-1">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: '',
      wrongEmail: false,
      wrongPassword: false,
      errorMsg: ''
    }
  },
  methods: {
    ...mapMutations([
      'setLogin'
    ]),
    login () {
      this.$http.post(`/api/user/login`, {
        email: this.email,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.email = ''
          this.password = ''
          this.errorMsg = ''
          this.setLogin()
          swal('Loging Success!', '', 'success')
          // eslint-disable-next-line
          $('#modalLogin').modal('toggle')
        })
        .catch(error => {
          console.log('Login failed', error.message)
          this.errorMsg = 'Invalid email/password!'
        })
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  }
}
</script>

<style>

</style>
