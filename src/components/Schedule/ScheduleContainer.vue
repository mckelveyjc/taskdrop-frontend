<template>
  <div class="schedule-container">
    <DaySchedule dayName="Monday" :taskList="taskList"/>
    <DaySchedule dayName="Tuesday" :taskList="taskList"/>
    <DaySchedule dayName="Wednesday" :taskList="taskList"/>
    <DaySchedule dayName="Thursday" :taskList="taskList"/>
    <DaySchedule dayName="Friday" :taskList="taskList"/>
    <DaySchedule dayName="Saturday" :taskList="taskList"/>
    <DaySchedule dayName="Sunday" :taskList="taskList"/>
  </div>
</template>

<script>
import DaySchedule from './DaySchedule.vue';

export default {
  name: 'ScheduleContainer',
  props: [
    "taskList"
  ],
  components: {
    DaySchedule
  },
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