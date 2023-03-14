<template>
  <div 
    class="utilities-button-container" 
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent>
    <!-- displays bionic text only if global bionic state variable is set to True -->
    <p class="standard-text" v-if="this.bionicReaderStatus" v-html="bionicReading(msg)"></p>
    <p class="standard-text" v-else>{{msg}}</p>
    <p class="standard-text" id="task-completion-counter">{{this.taskCompletionCounter}}/5</p>
  </div>
</template>

<script>
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';
import axios from 'axios'
import DayScheduleTestTaskAPI from '../Schedule/DayScheduleTestTaskAPI.vue';

export default {
  name: 'CompletedTasks',
  props: {
    msg: String
  },
  components: {
    DayScheduleTestTaskAPI
  },
  data() {
    return {
      draggedTaskInfoObject: Object,
      taskCompletionCounter: Number
    };
  },
  async created() {
    this.draggedTaskInfoObject = {};
    this.getNumCompletedTasks()
  },
  setup() {
    const bionicReaderStatus = computed(() => store.getters.getBionicReaderStatus())
    return {
      bionicReaderStatus,
      bionicReading
    }
  },
  methods: {
    // gets number of completed tasks to populate counter
    async getNumCompletedTasks() {
      const path = 'http://157.230.93.52/get-tasks/get-num-completed'
        await axios.post(path, {})
        .then(response => {
            let numCompletedTasks = response["data"]["numCompletedTasks"];
            this.taskCompletionCounter = numCompletedTasks
        })
        .catch(err =>{
            console.log(err);
        });
    },
    // gets data from dropped task and actives the "complete-task" service
    // if an achievement has been generated, alerts the user
    onDrop(evt) {
        var draggedTaskInfoArray = evt.dataTransfer.getData('task-info-object').split(",");
        var taskID = draggedTaskInfoArray[0];
        var taskUser = draggedTaskInfoArray[1];
        var taskName = draggedTaskInfoArray[2];
        var taskDay = draggedTaskInfoArray[3];
        var taskStart = draggedTaskInfoArray[4];
        var taskEnd = draggedTaskInfoArray[5];

        const path = 'http://157.230.93.52/update-task/complete-task'
        axios.post(path, {
          "taskID": taskID,
          "taskUser": taskUser,
          "taskName": taskName,
          "taskDay": taskDay,
          "taskStart": taskStart,
          "taskEnd": taskEnd
        })
        .then(response => {
            let artReady = response["data"]["artReady"];
            this.taskCompletionCounter++;
            if (artReady){
              location.reload();
              alert("New Achievement Unlocked!");
              this.taskCompletionCounter = 0;
            } 
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
  #task-completion-counter {
    margin-left: 5%;
  }
</style>