<!-- this component is for each day block & the tasks in it  -->
<template>
  <div 
    class="day-block-container section-block-border" 
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent>

      <!-- displays bionic text only if global bionic state variable is set to True -->
      <p class="section-block-header" v-if="this.bionicReaderStatus" v-html="bionicReading(dayName)"></p>
      <p class="section-block-header " v-else>{{dayName}}</p>

      <!-- renders each task from the taskList object (from database)-->
      <div class="section-block-display">
        <div v-for="taskInfoObject in taskList[dayName.toLowerCase() + 'Tasks']">
          <Task :taskInfoObject=taskInfoObject></Task>
        </div>
        <!-- renders any tasks that are dragged into the block -->
        <div v-if="renderDraggedTask">          
          <Task :taskInfoObject=this.draggedTaskInfoObject></Task>
        </div>
      </div>
  </div>
</template>

<script>
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';

import axios from 'axios'
import Task from '../TaskManagement/Task.vue';

export default {
  name: 'DaySchedule',
  props: {
      dayName: String,
      taskList: Object
  },
  components: {
    Task
  },
  created() {
        this.renderDraggedTask = false;
        this.draggedTaskInfoObject = {};
        this.numDroppedTasks = 0;
    },
  data() {
      return {
        renderDraggedTask: Boolean,
        draggedTaskInfoObject: Object,
        numDroppedTasks: Number
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
    onDrop(evt) {
        this.renderDraggedTask = true;
        const taskID = evt.dataTransfer.getData('task-id');
        this.draggedTaskInfoObject = evt.dataTransfer.getData('task-info-object').split(",");
        const lowerCaseDayName = this.dayName.toLowerCase();

        // call an api that sets the day of the dropped task to this day
        const path = 'http://157.230.93.52/update-task/update-day'
        axios.post(path, {
          "taskID": taskID,
          "newDay": lowerCaseDayName
        })
        .then(response => {
            console.log(response);
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
  .day-block-container {
    width: 35%;
    height: 98%;
    flex-shrink: 0;
    align-content: center;
    flex-direction: column;
    text-align: center;
  }
</style>