<template>
  <div class="todo-list-container">
    <h1>{{ msg }}</h1>
    <TaskManagementContainer />
    <ScheduleContainer />
    <LeftToolBar />
  </div>
</template>

<script>
import TaskManagementContainer from './TaskManagement/TaskManagementContainer.vue';
import ScheduleContainer from './Schedule/ScheduleContainer.vue';
import LeftToolBar from './ToolBar/LeftToolBar.vue';

export default {
  name: 'ToDoList',
  components: {
    TaskManagementContainer,
    ScheduleContainer,
    LeftToolBar,
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
