<template>
  <div class="tasks-todo-container section-block-border"
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent
    id="tasks-todo-container-id">
    <p class="section-block-header" v-if="this.bionicReaderStatus" v-html="bionicReading(headerMsg)"></p>
    <p class="section-block-header" v-else>{{headerMsg}}</p>

    <div class="section-block-display">
      <div v-for="taskInfoObject in taskList['toDoListTasks']">
        <Task :taskInfoObject=taskInfoObject></Task>
      </div>
      <div v-if="displayCreatedTaskBoolean" v-for="taskInfoObject in this.createdTaskInfoBigList">
        <Task :taskInfoObject=taskInfoObject></Task>
      </div>

      <AddTask @newTaskInfo="displayCreatedTaskFunction($event)" msg="Add Task" completed=False id="add-task-btn"></AddTask>
    </div>
  </div>
</template>

<script>
import AddTask from './AddTask.vue';
import Task from './Task.vue';
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
    Task
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
  @import "../../assets/global.css";
  .tasks-todo-container {
    margin-top: 10px; /* this needs to be globally consistent */
    height: 67%;
    display: flex;
    flex-direction: column;
  }
</style>