<template>
  <div class="task-management-container">
    <TasksToDo headerMsg="Tasks To Do" :taskList="taskList"/>
    <CompletedTasks msg="Complete Task" :taskList="taskList"/>
    <BionicReader msg="Bionic Reader"/>
    <Notes msg="View Achievements"/>
  </div>
</template>

<script>
import TasksToDo from './TasksToDo.vue';
import CompletedTasks from './CompletedTasks.vue';
import Notes from './Notes.vue';
import BionicReader from '../Accessibility/BionicReader.vue';

export default {
  name: 'TaskManagementContainer',
  props: {
    taskList: Object
  },
  components: {
    TasksToDo,
    CompletedTasks,
    Notes,
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