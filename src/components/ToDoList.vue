<template>
  <div class="todo-list-container">
    <h1>{{ msg }}</h1>
    <!-- don't need to push the entire dictionary of data to the below two containers
    will fix this eventually -->
    <TaskManagementContainer :taskList="taskList"/> 
    <ScheduleContainer :taskList="taskList"/>
    <!-- use the below in a min! -->
    <!-- <div v-for="task in taskList">
      {{ task }}
    </div> -->
    <!-- <LeftToolBar /> -->
  </div>
</template>

<script>
import axios from 'axios'
import TaskManagementContainer from './TaskManagement/TaskManagementContainer.vue';
import ScheduleContainer from './Schedule/ScheduleContainer.vue';
// import LeftToolBar from './ToolBar/LeftToolBar.vue';

export default {
  name: 'ToDoList',
  created() {
    this.getTasks()
  },
  data() {
    return {
      // taskList: [],
      // taskList should look something like this:
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
          // console.log(response);
          for (let index = 0; index < response.data.length; index++){
            // this.taskList.push(response.data[index])
            // console.log("task: " + response.data[index])
            // console.log("task: " + response.data[index][3])
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
        
        // const path = 'http://157.230.93.52/get-tasks'
        // axios.post(path, {})
        // .then(response => {
        //   console.log(response);
        // })
        // .catch(err =>{
        //   console.log(err);
        // });
      },
  },
  components: {
    TaskManagementContainer,
    ScheduleContainer,
    // LeftToolBar,
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
