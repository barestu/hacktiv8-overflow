<template>
  <div class="home">
    <h4 class="border-bottom border-gray pb-2 mb-0">All Questions</h4>
    <QuestionList />
  </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    QuestionList
  },
  methods: {
    ...mapActions([
      'getAllQuestions'
    ])
  },
  computed: {
    ...mapActions([
      'questions'
    ])
  },
  created () {
    this.getAllQuestions()
  }
}
</script>
