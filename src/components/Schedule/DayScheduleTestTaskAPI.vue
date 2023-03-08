<!-- this component is for each day block & the tasks in it  -->
<template>
  <div 
    class="day-block-container" 
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent>
        <p class="day-header-text" v-if="this.bionicReaderStatus" v-html="bionicReading(dayName)"></p>
        <p class="day-header-text" v-else>{{dayName}}</p>

        <div class="tasks-container">
          <div v-for="taskInfoObject in taskList[dayName.toLowerCase() + 'Tasks']">
            <TestTaskAPITask :taskInfoObject=taskInfoObject></TestTaskAPITask>
          </div>
          <div v-if="renderDraggedTask">          
            <TestTaskAPITask :taskInfoObject=this.draggedTaskInfoObject></TestTaskAPITask>
          </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import TestTaskAPITask from '../TaskManagement/TestTaskAPITask.vue';
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';

export default {
  name: 'DayScheduleTestTaskAPI',
  props: {
      dayName: String,
      taskList: Object
  },
  components: {
    TestTaskAPITask
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
  /* @import "../../assets/global.css"; */
  .tasks-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .day-header-text {
    padding-top: 2%;
    font-size: 27px;
  }
  .day-block-container {
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    width: 35%;
    height: 98%;
    flex-shrink: 0;
    align-content: center;
    flex-direction: column;
    text-align: center;
  }
</style>