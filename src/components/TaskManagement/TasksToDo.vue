<template>
  <div class="tasks-todo-container"
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent
    id="tasks-todo-container-id">
    <p class="header-text" v-if="this.bionicReaderStatus" v-html="bionicReading(headerMsg)"></p>
    <p class="header-text" v-else>{{headerMsg}}</p>

    <div class="tasks-container">
      <div v-for="taskInfoObject in taskList['toDoListTasks']">
        <TestTaskAPITask :taskInfoObject=taskInfoObject></TestTaskAPITask>
      </div>
      <div v-if="displayCreatedTaskBoolean" v-for="taskInfoObject in this.createdTaskInfoBigList">
        <TestTaskAPITask :taskInfoObject=taskInfoObject></TestTaskAPITask>
      </div>

      <AddTask @newTaskInfo="displayCreatedTaskFunction($event)" msg="Add Task" completed=False id="add-task-btn"></AddTask>
    </div>
  </div>
</template>

<script>
import AddTask from './AddTask.vue';
import TestTaskAPITask from './TestTaskAPITask.vue';
import { createApp } from "vue"
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';

export default {
  name: 'TasksToDo',
  props: {
    headerMsg: String,
    taskList: Object
  },
  components: {
    AddTask,
    TestTaskAPITask
  },
  created() {
        this.displayCreatedTaskBoolean = false,
        this.createdTaskInfoArray = [], // needs to be renamed (this is just for one task)
        this.createdTaskInfoBigList = [] // needs to be renamed (this holds a list of the above)
    },
  data() {
      return {
        displayCreatedTaskBoolean: Boolean,
        createdTaskInfoArray: Array,
        createdTaskInfoBigList: Array
      };
    },
  setup() {
    const bionicReaderStatus = computed(() => store.getters.getBionicReaderStatus())
    return {
      bionicReaderStatus,
      bionicReading
    }
  },
  methods: {
    displayCreatedTaskFunction(newTaskInfoObject) {
      this.displayCreatedTaskBoolean = true;
      console.log("new task info: " + Object.values(newTaskInfoObject));
      let createdTaskID = Object.values(newTaskInfoObject)[1];
      let createdTaskUserID = Object.values(newTaskInfoObject)[0];
      // below probably shouldn't be hardcoded in but whatevs
      this.createdTaskInfoArray = [createdTaskID, createdTaskUserID, "(new task)", "to-do-list", "new-task", "new-task"];
      this.createdTaskInfoBigList.push(this.createdTaskInfoArray)
    },
  },
}
</script>

<style scoped>
  .tasks-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .header-text {
    padding-top: 2%;
    font-size: 27px;
  }
  .tasks-todo-container {
    margin-top: 10px; /* this needs to be globally consistent */
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    height: 67%;
    display: flex;
    flex-direction: column;
  }
</style>