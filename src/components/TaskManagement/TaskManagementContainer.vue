<template>
  <div class="task-management-container">
    <TasksToDo headerMsg="Tasks To Do" :taskList="taskList"/>
    <CompletedTasks msg="Complete Task" :taskList="taskList"/>
    <ViewAchievements msg="View Achievements"/>
    <BionicReader msg="Bionic Reader"/>
  </div>
</template>

<script>
import TasksToDo from './TasksToDo.vue';
import CompletedTasks from './CompletedTasks.vue';
// import Notes from './Notes.vue';
import ViewAchievements from './ViewAchievements.vue';
import BionicReader from '../Accessibility/BionicReader.vue';

export default {
  name: 'TaskManagementContainer',
  props: {
    taskList: Object
  },
  components: {
    TasksToDo,
    CompletedTasks,
    // Notes,
    ViewAchievements,
    BionicReader
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