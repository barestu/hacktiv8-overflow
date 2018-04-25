<template>
  <div class="row">
    <div class="col-1 text-center py-3">
      <a @click="upvoteAnswers({questionId: questionId, answerId: answer._id})"
        class="fa fa-sort-up fa-2x" data-toggle="tooltip" data-placement="bottom"
        title="Delete this answer?">
      </a>
      <h3>{{ answer.voters.length }}</h3>
      <a @click="downvoteAnswers({questionId: questionId, answerId: answer._id})"
      class="fa fa-sort-down fa-2x" data-toggle="tooltip" data-placement="bottom"
      title="Delete this answer?">
    </a>
    </div>
    <div class="col-11">
      <p>{{ answer.answer }}</p>
      <div class="row px-3 mr-1 mt-4">
        <div class="col-6 offset-6 text-right">
          <small>Posted by <span class="font-weight-bold">{{ answer.poster.username }}</span></small>
          <div>{{ dateFormat }}</div>
          <a href="#" @click.prevent="deleteAnswerEvent(answer._id)" class="px-1"
            data-toggle="tooltip" data-placement="bottom"
            title="Delete this answer?">
            <span class="fa fa-trash"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'answer',
  props: [
    'answer',
    'questionId'
  ],
  methods: {
    ...mapActions([
      'upvoteAnswers',
      'downvoteAnswers',
      'deleteAnswers'
    ]),
    deleteAnswerEvent (id) {
      console.log(this.questionId)
      let data = {
        id: id,
        question_id: this.questionId
      }
      swal({
        title: 'Delete?',
        text: 'Are you sure want to delete this answer?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteAnswers(data)
          }
        })
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ]),
    dateFormat: function () {
      let newDate = new Date(this.answer.createdAt)
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
