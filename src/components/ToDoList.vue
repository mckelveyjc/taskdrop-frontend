<template>
  <div class="todo-list-container">
    <TaskManagementContainer :taskList="taskList"/> 
    <ScheduleContainer :taskList="taskList"/>
  </div>
</template>

<script>
import TaskManagementContainer from './TaskManagement/TaskManagementContainer.vue';
import ScheduleContainer from './Schedule/ScheduleContainer.vue';
import AchievementsCarousel from './TaskManagement/AchievementsCarousel.vue';
import axios from 'axios'

export default {
  name: 'ToDoList',
  components: {
    TaskManagementContainer,
    ScheduleContainer,
    AchievementsCarousel,
  },
  created() {
    this.getTasks();
  },
  data() {
    return {
      achievementsClicked: Boolean,
      taskList: {
        testdayTasks: [],
        mondayTasks: [],
        tuesdayTasks: [],
        wednesdayTasks: [],
        thursdayTasks: [],
        fridayTasks: [],
        saturdayTasks: [],
        sundayTasks: [],
        toDoListTasks: []
      },
    }
  },
  methods:{
      // gets an object of all the tasks from the database
      // pushes information for each task to the location corresponding to its location in taskList
      async getTasks(){
        const path = 'http://157.230.93.52/get-tasks'
        await axios.post(path, {})
        .then(response => {
          for (let index = 0; index < response.data.length; index++){
            switch(response.data[index][3]) { // the day is at response.data[index][3]
              case "monday":
                this.taskList['mondayTasks'].push(response.data[index])
                break;
              case "tuesday":
                this.taskList['tuesdayTasks'].push(response.data[index])
                break;
              case "wednesday":
                this.taskList['wednesdayTasks'].push(response.data[index])
                break;
              case "thursday":
                this.taskList['thursdayTasks'].push(response.data[index])
                break;
              case "friday":
                this.taskList['fridayTasks'].push(response.data[index])
                break;
              case "saturday":
                this.taskList['saturdayTasks'].push(response.data[index])
                break;
              case "sunday":
                this.taskList['sundayTasks'].push(response.data[index])
                break;
              case "to-do-list":
                this.taskList['toDoListTasks'].push(response.data[index])
                break;
            }
          }
        })
        .catch(err =>{
          console.log(err);
        });
      },
  },
}
</script>

<style scoped>
  .todo-list-container {
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
  }
</style>
