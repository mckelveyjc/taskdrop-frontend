<template>
  <div class="task-management-container">
    <TasksToDo headerMsg="tasks to do"/>
    <CompletedTasks msg="completed tasks"/>
    <Notes msg="notes"/>
  </div>
</template>

<script>
import TasksToDo from './TasksToDo.vue';
import CompletedTasks from './CompletedTasks.vue';
import Notes from './Notes.vue';

export default {
  name: 'TaskManagementContainer',
  components: {
    TasksToDo,
    CompletedTasks,
    Notes,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task-management-container {
    border-radius: 15px;
    width: 25%;
    height: 100%;
  }
</style>