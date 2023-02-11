<template>
  <div class="todo-list-container">
    <h1>{{ msg }}</h1>
    <TaskManagementContainer />
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
      taskList: [],
      erroMsg: "",
    }
  },
  methods:{
      async getTasks(){
        // const getTasksPath = "http://157.230.93.52/get-tasks"
        // const initalResponse = await fetch(getTasksPath);
        // const tasksResponse = await initalResponse.json();
        // this.taskList = tasksResponse;
        // console.log(tasksResponse)

        const path = 'http://157.230.93.52/get-tasks'
        await axios.post(path, {})
        .then(response => {
          // console.log(response);
          for (let index = 0; index < response.data.length; index++){
            this.taskList.push(response.data[index])
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
