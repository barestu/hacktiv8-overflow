<template>
  <div class="discussions">
    <div v-if="question.length === 0">
      <div class="loader my-5 mx-auto"></div>
    </div>
    <div v-else>
      <!-- Discussions -->
      <Question :question="question"/>
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
          <Answer :answer="answer" :questionId="question._id" />
          <div class="border-bottom border-gray pb-2 mb-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from '@/components/Question'
import Answer from '@/components/Answer'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Discussion',
  components: {
    Question,
    Answer
  },
  data () {
    return {
      answer: ''
    }
  },
  props: ['id'],
  methods: {
    ...mapActions([
      'getOneQuestion',
      'addAnswers'
    ]),
    addAnswerEvent () {
      let data = {
        question_id: this.question._id,
        answer: this.answer
      }
      this.addAnswers(data)
      this.answer = ''
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
