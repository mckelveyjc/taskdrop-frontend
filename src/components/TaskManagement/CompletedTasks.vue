<template>
  <div 
    class="completed-tasks-container" 
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent>
    <h1 id="completed-tasks-header">{{ msg }}</h1>
  </div>
</template>

<script>
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
  created() {
    this.draggedTaskInfoObject = {};
  },
  data() {
    return {
      draggedTaskInfoObject: Object,
    };
  },
  methods: {
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
            console.log(response);
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