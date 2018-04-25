<template>
  <div class="question">
    <h4 class="border-bottom border-gray py-1 px-2 mb-0 font-weight-bold">{{ question.title }}</h4>
    <div class="row py-2">
      <!-- Vote -->
      <div class="col-1 text-center">
        <a @click="upvoteQuestions(question._id)" class="fa fa-sort-up fa-2x"
          data-toggle="tooltip" data-placement="bottom"
          title="Upvote this question?">
        </a>
        <h3>{{ question.voters.length }}</h3>
        <a @click="downvoteQuestions(question._id)" class="fa fa-sort-down fa-2x"
        data-toggle="tooltip" data-placement="bottom"
        title="Downvote this question?">
      </a>
      </div>
      <!-- Question -->
      <div class="col-11">
        <p>{{ question.content }}</p>
        <div class="row px-3 mr-1 mt-4">
          <div class="col-6 offset-6 text-right">
            <small>Posted by <span class="font-weight-bold">{{ question.poster.username }}</span></small>
            <div>{{ dateFormat }}</div>
            <!-- Delete & Update -->
            <a href="#" @click.prevent="deleteQuestionEvent" class="px-1"
              data-toggle="tooltip" data-placement="bottom"
              title="Delete this question?" v-if="user.role === 'admin'">
              <span class="fa fa-trash"></span>
            </a>
            <a href="#" data-toggle="modal" data-target="#modalUpdate" class="px-1"
              v-if="user.role === 'admin' || user.id === question.poster._id">
              <span class="fa fa-pencil"></span>
            </a>
          </div>
        </div>
      </div>
      <!-- Modal Add Question -->
      <div class="modal fade" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <UpdateForm :question="question" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateForm from '@/components/UpdateForm'
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'question',
  components: {
    UpdateForm
  },
  props: [
    'question'
  ],
  methods: {
    ...mapActions([
      'updateQuestions',
      'upvoteQuestions',
      'downvoteQuestions',
      'deleteQuestions'
    ]),
    deleteQuestionEvent () {
      swal({
        title: 'Delete?',
        text: 'Are you sure want to delete this question?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteQuestions(this.question._id)
            this.$router.push('/')
          }
        })
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'user'
    ]),
    dateFormat: function () {
      let newDate = new Date(this.question.createdAt)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()

      return `${month} ${day}, ${year}`
    }
  }
}
</script>

<style>

</style>
