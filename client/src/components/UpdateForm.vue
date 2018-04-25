<template>
  <div class="modal-body">
    <h2 class="text-center py-3">Update Question</h2>
    <form @submit.prevent="addQuestionEvent">
      <div class="form-signin mt-3">
        <div class="form-group">
          <label class="ml-2">Title</label>
          <input type="text" class="form-control" v-model="updateData.title" name="title" placeholder="What is your question?">
        </div>
        <div class="form-group">
          <textarea class="form-control" v-model="updateData.content" rows="8"></textarea>
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
import { mapActions } from 'vuex'

export default {
  name: 'update-question',
  props: [
    'question'
  ],
  data () {
    return {
      updateData: {
        title: this.question.title,
        content: this.question.content
      }
    }
  },
  methods: {
    ...mapActions([
      'updateQuestions'
    ]),
    addQuestionEvent () {
      let data = {
        questionId: this.question._id,
        updateData: this.updateData
      }
      this.updateQuestions(data)
    }
  }
}
</script>

<style>

</style>
