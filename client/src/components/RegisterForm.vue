<template>
  <div class="modal-body">
    <h2 class="text-center py-3">Register New Account</h2>
    <form @submit.prevent="register">
      <div class="form-signin mt-3">
        <div class="form-group">
          <label class="ml-2" >Name</label>
          <input type="text" class="form-control" v-model="username" name="name" value="" placeholder="Your Name" required>
        </div>
        <div class="form-group">
          <label class="ml-2">Email</label>
          <input type="email" class="form-control" v-model="email" :class="{ error: wrongEmail }" name="email" value="" placeholder="example@email.com" required>
          <div v-if="emailErrMsg !== ''">
            <small class="px-2 text-danger">{{ emailErrMsg }}</small>
          </div>
        </div>
        <div class="form-group">
          <label class="ml-2">Password</label>
          <input type="password" class="form-control" v-model="password" :class="{ error: wrongPassword }" name="password" value="" placeholder="Your password" required>
          <div v-if="passErrMsg !== ''">
            <small class="px-2 text-danger">{{ passErrMsg }}</small>
          </div>
        </div>
        <div class="form-group">
          <label class="ml-2">Confirm Password</label>
          <input type="password" class="form-control" v-model="confirmPass" :class="{ error: wrongConfirm }" name="confirm_pass" value="" placeholder="Confirm password" required>
          <div v-if="confirmErrMsg !== ''">
            <small class="px-2 text-danger">{{ confirmErrMsg }}</small>
          </div>
        </div>
        <!-- Button Submit/Cancel -->
        <div class="text-center py-3">
          <button type="submit" class="btn btn-primary px-5 mt-3 mx-1">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'RegisterForm',
  data () {
    return {
      wrongEmail: false,
      emailErrMsg: '',
      wrongPassword: false,
      passErrMsg: '',
      wrongConfirm: false,
      confirmErrMsg: '',
      username: '',
      email: '',
      password: '',
      confirmPass: ''
    }
  },
  methods: {
    register () {
      let newUser = {
        username: this.username,
        email: this.email,
        password: this.password
      }

      this.$http.post(`/api/user/register`, newUser)
        .then(response => {
          swal('Register Success!', 'Now you can proceed to login!', 'success')
          this.wrongEmail = false
          this.wrongPassword = false
          this.username = ''
          this.email = ''
          this.password = ''
          this.confirmPass = ''
          // eslint-disable-next-line
          $('#modalRegister').modal('toggle')
        })
        .catch(error => {
          console.log('Register failed', error)
        })
    }
  },
  watch: {
    email () {
      let re = /\S+@\S+\.\S+/
      let result = re.test(this.email)

      if (!result) {
        this.wrongEmail = true
        this.emailErrMsg = 'Invalid email format (example: xxx@xxx.xxx)'
      } else {
        this.wrongEmail = false
        this.emailErrMsg = ''
      }
    },
    password () {
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
      let result = re.test(this.password)

      if (!result) {
        this.wrongPassword = true
        this.passErrMsg = 'Password length should be atleast 6 alhpa-numeric characters!'
      } else {
        this.wrongPassword = false
        this.passErrMsg = ''
      }
    },
    confirmPass () {
      if (this.confirmPass !== this.password) {
        this.wrongConfirm = true
        this.confirmErrMsg = `Your password doesn't matched`
      } else {
        this.wrongConfirm = false
        this.confirmErrMsg = ''
      }
    }
  }
}
</script>

<style>
.error {
  border: 2px solid rgb(216, 75, 75)
}
</style>
