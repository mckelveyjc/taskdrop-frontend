<template>
  <div class="schedule-container">
    <DayScheduleTestTaskAPI dayName="Monday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Tuesday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Wednesday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Thursday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Friday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Saturday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Sunday" :taskList="taskList"/>
  </div>
</template>

<script>
import DayScheduleTestTaskAPI from './DayScheduleTestTaskAPI.vue';

export default {
  name: 'ScheduleContainer',
  components: {
    // below added for testing
    DayScheduleTestTaskAPI
  },
  props: [
    "taskList"
  ],
}
</script>

<style scoped>
  .schedule-container {
    border-radius: 15px;
    width: 80%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>