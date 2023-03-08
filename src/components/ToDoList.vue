<template>
  <div class="todo-list-container">
    <h1>{{ msg }}</h1>
    <TaskManagementContainer :taskList="taskList"/> 
    <ScheduleContainer :taskList="taskList"/>
  </div>
</template>

<script>
import axios from 'axios'
import TaskManagementContainer from './TaskManagement/TaskManagementContainer.vue';
import ScheduleContainer from './Schedule/ScheduleContainer.vue';
import AchievementsCarousel from './TaskManagement/AchievementsCarousel.vue';

export default {
  name: 'ToDoList',
  created() {
    this.getTasks();
    this.achievementsClicked = true
  },
  data() {
    return {
      opened: false,
      visible: false,
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
      erroMsg: "",
    }
  },
  methods:{
      async getTasks(){
        const path = 'http://157.230.93.52/get-tasks'
        await axios.post(path, {})
        .then(response => {
          for (let index = 0; index < response.data.length; index++){
            switch(response.data[index][3]) { // the day is at response.data[index][3]
              case "testday":
                this.taskList['testdayTasks'].push(response.data[index])
                break;
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
  components: {
    TaskManagementContainer,
    ScheduleContainer,
    AchievementsCarousel,
  }
}
</script>

<style scoped>
  .todo-list-container {
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
  }
</style>
