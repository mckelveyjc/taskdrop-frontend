<template>
  <div 
    class="task-container" 
    @click="createTask($event)">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { createApp } from "vue"
import Task from './Task.vue';

export default {
  name: 'Task',
  props: {
    msg: String,
    completed: Boolean,
  },
  components: {
    Task
  },
  methods: {
    // for now, each task is given a random id
    // yee yee ! 
    createTask() {
      console.log("NEW TASK! (yee yeeeeee)");
      let NewTask = createApp(Task, {msg: "(new task)", id: Math.floor(Math.random() * 1000)});
      const wrapper = document.createElement("div");
      NewTask.mount(wrapper);
      // document.body.appendChild(wrapper);

      let tasksToDoHeader = document.getElementById("tasks-todo-header");
      tasksToDoHeader.insertBefore(wrapper, tasksToDoHeader.firstElementChild);
      // have a list of tasks in localstorage that looks like this
      // [[msg, day], [msg, day], [msg, day]]
    },
  }
}
</script>

<style scoped>
  .task-container {
    color: black;
    border-radius: 5px;
    background-color:#7DF36A;
    /* height: 10%; */
    height: 50px;
    /* width: 70%; */
    width: 250px;
    margin-left: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }
</style>