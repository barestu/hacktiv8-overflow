<template>
  <div class="modal-body">
    <h2 class="text-center py-3">Ask Question</h2>
    <form @submit.prevent="addQuestionEvent">
      <div class="form-signin mt-3">
        <div class="form-group">
          <label class="ml-2">Title</label>
          <input type="text" class="form-control" v-model="question.title" name="title" placeholder="What is your question?">
        </div>
        <div class="form-group">
          <textarea class="form-control" v-model="question.content" rows="8"></textarea>
        </div>
        <!-- Button Submit/Cancel -->
        <div class="text-center py-3 mt-2">
          <button type="submit" class="btn btn-primary px-5 mx-1">Add Post</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddQuestionForm',
  data () {
    return {
      question: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'addQuestions'
    ]),
    addQuestionEvent () {
      this.addQuestions(this.question)
      setTimeout(() => {
        this.clearForm()
        // eslint-disable-next-line
        $('#modalAdd').modal('toggle')
      }, 500)
    },
    clearForm () {
      this.question.title = ''
      this.question.content = ''
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style>

</style>
