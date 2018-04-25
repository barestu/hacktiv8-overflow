<template>
  <div class="discussions">
    <div v-if="question.length === 0">
      <div class="loader my-5 mx-auto"></div>
    </div>
    <div v-else>
      <!-- Discussions -->
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
              <div>{{ dateFormat(question.createdAt) }}</div>
              <!-- Delete & Update -->
              <a href="#" @click.prevent="deleteQuestionEvent" class="px-1"
                data-toggle="tooltip" data-placement="bottom"
                title="Delete this question?">
                <span class="fa fa-trash"></span>
              </a>
              <a href="#" @click.prevent="updateQuestions(question._id)" class="px-1"
                data-toggle="tooltip" data-placement="bottom"
                title="Update this question?">
                <span class="fa fa-pencil"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="border-bottom border-gray pb-2 mb-0"></div>
      <!-- Write Answer -->
      <div v-if="isLogin" class="write-answer my-4">
        <h5>Write your answer</h5>
        <form @submit.prevent="addAnswerEvent">
          <div class="form-group mt-3">
            <textarea class="form-control" v-model="answer" cols="70" rows="6"></textarea>
          </div>
          <div class="text-right">
            <button type="submit" class="btn btn-sm btn-primary btn-square mx-3">Post Answer</button>
          </div>
        </form>
      </div>
      <!-- Answers -->
      <div class="answers my-4">
        <h5>{{ question.answers.length }} Answer(s)</h5>
        <div class="border-bottom border-gray pb-2 mb-0"></div>
        <div class="mt-3" v-for="(answer, index) in question.answers" :key="index">
          <div class="row">
            <div class="col-1 text-center py-3">
              <a @click="upvoteAnswers({questionId: question._id, answerId: answer._id})"
                class="fa fa-sort-up fa-2x" data-toggle="tooltip" data-placement="bottom"
                title="Delete this answer?">
              </a>
              <h3>{{ answer.voters.length }}</h3>
              <a @click="downvoteAnswers({questionId: question._id, answerId: answer._id})"
              class="fa fa-sort-down fa-2x" data-toggle="tooltip" data-placement="bottom"
              title="Delete this answer?">
            </a>
            </div>
            <div class="col-11">
              <p>{{ answer.answer }}</p>
              <div class="row px-3 mr-1 mt-4">
                <div class="col-6 offset-6 text-right">
                  <small>Posted by <span class="font-weight-bold">{{ answer.poster.username }}</span></small>
                  <div>{{ dateFormat(answer.createdAt) }}</div>
                  <a href="#" @click.prevent="deleteAnswerEvent(answer._id)" class="px-1"
                    data-toggle="tooltip" data-placement="bottom"
                    title="Delete this answer?">
                    <span class="fa fa-trash"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="border-bottom border-gray pb-2 mb-0"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Discussion',
  components: {
  },
  data () {
    return {
      answer: ''
    }
  },
  props: ['id'],
  methods: {
    ...mapActions([
      // Question
      'getOneQuestion',
      'updateQuestions',
      'upvoteQuestions',
      'downvoteQuestions',
      'deleteQuestions',
      // Answer
      'addAnswers',
      'upvoteAnswers',
      'downvoteAnswers',
      'deleteAnswers'
    ]),
    addAnswerEvent () {
      let data = {
        question_id: this.question._id,
        answer: this.answer
      }
      this.addAnswers(data)
      this.answer = ''
    },
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
    },
    deleteAnswerEvent (id) {
      let data = {
        id: id,
        question_id: this.question._id
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
    },
    dateFormat (date) {
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
      'isLogin',
      'question'
    ])
  },
  watch: {
    id () {
      this.getOneQuestion(this.id)
    }
  },
  created () {
    this.getOneQuestion(this.id)
  }
}
</script>

<style>
</style>
