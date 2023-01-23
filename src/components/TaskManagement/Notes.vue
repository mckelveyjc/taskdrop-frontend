<template>
  <div class="notes-container">
    <h1>{{ msg }}</h1>
    <h1 class="editable-notes" contenteditable></h1>
  </div>
</template>

<script>
export default {
  name: 'Notes',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .notes-container {
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    height: 25%;
    /* margin-top: 4px; */
  }

  .editable-notes {

  }
</style>