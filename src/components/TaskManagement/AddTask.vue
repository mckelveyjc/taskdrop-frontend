<template>
  <div 
    class="task-container" 
    @click="createTask($event)">
    <!-- <h1 >{{ msg }}</h1> -->
    <!-- <p class="task-text" v-html="bionicReading(msg)"></p> -->    
    <p v-if="this.bionicReaderStatus" class="task-text" v-html="bionicReading(msg)"></p>
    <p v-else class="task-text" v-html="msg"></p>
  </div>
</template>

<script>
import { bionicReading } from 'bionic-reading';
import axios from 'axios'
import Task from './Task.vue';
import TestTaskAPITask from './TestTaskAPITask.vue';
import store from '../../store'
import { computed } from '@vue/runtime-core'

export default {
  name: 'Task',
  props: {
    msg: String,
    completed: Boolean,
  },
  components: {
    Task,
    TestTaskAPITask
  },
  setup() {
    const bionicReaderStatus = computed(() => store.getters.getBionicReaderStatus())
    return {
      bionicReaderStatus,
      bionicReading
    }
  },
  methods: {
    // yee yee ! 
    async createTask() {
      // this.$emit('clicked', 'someValue')
      const path = 'http://157.230.93.52/update-task/create-task'
      await axios.post(path, {
        "taskUser": "1" // when we have multiple user's we'll need a way to change this value
      })
      .then(response => {
        this.$emit('newTaskInfo', {"taskUser": "1", "taskID": response.data})
        // console.log(response);
        // console.log("response data: " + response.data);
      })
      .catch(err =>{
        console.log(err);
      });

      // for now, each task is given a random id

      // console.log("NEW TASK! (yee yeeeeee)");
      // let NewTask = createApp(Task, {msg: "(new task)", id: Math.floor(Math.random() * 1000)});
      // const wrapper = document.createElement("div");
      // NewTask.mount(wrapper);
      // // document.body.appendChild(wrapper);

      // let tasksToDoHeader = document.getElementById("tasks-todo-header");
      // tasksToDoHeader.insertBefore(wrapper, tasksToDoHeader.firstElementChild);
      // // have a list of tasks in localstorage that looks like this
      // // [[msg, day], [msg, day], [msg, day]]
    },
  }
}
</script>

<style scoped>
  /* make the below a global style eventually */
  .task-text {
    font-size: 20px;
  }
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