<!-- since acct creation / login will be first, I'll make ToDoList into a separate template for now-->
<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* figure out google font's dumbass website later so you can add Inter*/
@import url('https://fonts.googleapis.com/css?family=Inter&display=swap');

* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* fix font-size later */
  font-size: .6em; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #F5F5F5;
  background-color: #2E2E2E;
}
</style>

<!-- since acct creation / login will be first, I'll make ToDoList into a separate template for now -->
<!-- <template>
  <ToDoList />
</template>

<script>
import ToDoList from './components/ToDoList.vue'

export default {
  name: 'App',
  components: {
    ToDoList
  }
}
</script>

<style>
/* figure out google font's dumbass website later so you can add Inter*/
@import url('https://fonts.googleapis.com/css?family=Inter&display=swap');

* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* fix font-size later */
  font-size: .6em; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #F5F5F5;
  background-color: #2E2E2E;
}
</style> -->
