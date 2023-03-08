<template>
  <div 
    class="task-container" 
    @click="createTask($event)">  
    <p v-if="this.bionicReaderStatus" class="task-text" v-html="bionicReading(msg)"></p>
    <p v-else class="task-text" v-html="msg"></p>
  </div>
</template>

<script>
import { bionicReading } from 'bionic-reading';
import axios from 'axios'
import TestTaskAPITask from './TestTaskAPITask.vue';
import store from '../../store'
import { computed } from '@vue/runtime-core'

export default {
  name: 'AddTask',
  props: {
    msg: String,
    completed: Boolean,
  },
  components: {
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
    async createTask() {
      const path = 'http://157.230.93.52/update-task/create-task'
      await axios.post(path, {
        "taskUser": "1" // when we have multiple user's we'll need a way to change this value
      })
      .then(response => {
        this.$emit('newTaskInfo', {"taskUser": "1", "taskID": response.data})
      })
      .catch(err =>{
        console.log(err);
      });
    },
  }
}
</script>

<style scoped>
  /* make the below a global style eventually */
  .task-text {
    font-size: 25px;
  }
  .task-container {
    color: black;
    border-radius: 5px;
    background-color:#7DF36A;
    height: 6.5em;
    width: 23em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }
</style>