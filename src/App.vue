<template>
  <ToDoList></ToDoList>
</template>

<script>
import ToDoList from './components/ToDoList.vue';

export default {
  name: 'App',
  components: {
    ToDoList
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Inter&display=swap');
* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: .6em; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #F5F5F5;
  background-color: #2E2E2E;
}
</style>