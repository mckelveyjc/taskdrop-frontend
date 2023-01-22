// this component will hold the days & a list of times on the left 
<template>
  <div class="left-toolbar-container" id="left-tool-bar">
  </div>
</template>

<script>
export default {
  name: 'LeftToolBar',
  components: {}
}
</script>

<style scoped>
  .left-toolbar-container {
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    width: 3%;
    /* fix this later you lil bitch */
    margin-right: 4px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>