<template>
  <div class="question-list">
    <div v-for="(question, index) in questions" :key="index" class="row mx-0 media text-muted py-3 border-bottom border-gray">
      <!-- Vote & Answer Count -->
      <div class="col-md-3 col-sm-12 justify-content-center">
        <div class="row">
          <div class="col-6 text-center">
            <div>{{ question.voters.length }}</div>
            <small>Vote</small>
          </div>
          <div class="col-6 text-center">
            <div>{{ question.answers.length }}</div>
            <small>Answer</small>
          </div>
        </div>
      </div>
      <!-- Post Title -->
      <div class="col-md-6 col-sm-12">
        <small>Title</small>
        <div class="font-weight-bold">
          <router-link :to="{ name: 'discussions', params: { id: question._id } }">
            {{ question.title }}
          </router-link>
        </div>
      </div>
      <!-- Date Posted & Poster -->
      <div class="col-md-3 col-sm-12">
        <small>Posted by <span class="font-weight-bold">{{ question.poster.username }}</span></small>
        <div>{{ dateFormat(question.createdAt) }}</div>
        <a href="#" @click.prevent="deleteQuestionEvent(question._id)" class="px-1"
          data-toggle="tooltip" data-placement="bottom"
          title="Delete this answer?">
          <span class="fa fa-trash"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'QuestionList',
  methods: {
    ...mapActions([
      'deleteQuestions'
    ]),
    deleteQuestionEvent (id) {
      swal({
        title: 'Delete?',
        text: 'Are you sure want to delete this question?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteQuestions(id)
          }
        })
    },
    dateFormat: function (date) {
      let newDate = new Date(date)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()

      return `${month} ${day}, ${year}`
    }
  },
  computed: {
    ...mapState([
      'questions'
    ])
  }
}
</script>

<style>

</style>
