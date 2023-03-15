<template>
  <div 
    class="add-task-container task-container-template"
    @click="createTask($event)">  
    <!-- displays bionic text only if global bionic state variable is set to True -->
    <p v-if="this.bionicReaderStatus" class="standard-text" v-html="bionicReading(msg)"></p>
    <p v-else class="standard-text" v-html="msg"></p>
  </div>
</template>

<script>
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';
import axios from 'axios'
import Task from './Task.vue';

export default {
  name: 'AddTask',
  props: {
    msg: String,
    completed: Boolean,
  },
  components: {
    Task
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
  @import "../../assets/global.css";
  /* below should be an ID, not sure why it wasn't working */
  .add-task-container {
    background-color:#7DF36A;
    height: 6.5em;
    width: 23em;
  }
</style>