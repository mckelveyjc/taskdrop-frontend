<template>
  <div 
    class="completed-tasks-container" 
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent>
    <!-- <h1 id="completed-tasks-header">{{ msg }}</h1> -->
    <p class="task-management-btn-header" v-if="this.bionicReaderStatus" v-html="bionicReading(msg)"></p>
    <p class="task-management-btn-header" v-else>{{msg}}</p>
    <p class="task-completion-counter">{{this.taskCompletionCounter}}/5</p>
  </div>
</template>

<script>
import axios from 'axios'
import DayScheduleTestTaskAPI from '../Schedule/DayScheduleTestTaskAPI.vue';
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';

export default {
  name: 'CompletedTasks',
  props: {
    msg: String
  },
  components: {
    DayScheduleTestTaskAPI
  },
  async created() {
    this.draggedTaskInfoObject = {};
    // this.taskCompletionCounter = 0; // should get the # from the database here instead
    this.taskCompletionCounter = 1; // should get the # from the database here instead
    this.getNumCompletedTasks()
  },
  data() {
    return {
      draggedTaskInfoObject: Object,
      taskCompletionCounter: Number
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
    onDrop(evt) {
        // I have no idea why the below line isn't working even though it works in DayScheduleTestTaskAPI
        // this.draggedTaskInfoObject = evt.dataTransfer.getData('task-info-object').split(",");
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
              alert("A New Achievement is Ready!");
              this.taskCompletionCounter = 0;
            } 
        })
        .catch(err =>{
            console.log(err);
        });
        this.renderThis = false;
    },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task-completion-counter {
    font-size: 30px;
    margin-left: 5%;
  }
.task-management-btn-header {
    font-size: 30px;
  }

  #completed-tasks-header {
    font-size: x-large;
  }
  .completed-tasks-container {
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 4px; */
  }
</style>