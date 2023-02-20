<!-- this component will hold the days & a list of times on the left  -->
<template>
  <div class="schedule-container">
    <!-- <div class="timings-container"> -->
      <!-- <p>6AM</p> <br>
      <p>7AM</p> <br>
      <p>8AM</p> <br>
      <p>9AM</p> <br>
      <p>10AM</p> <br>
      <p>11AM</p> <br>
      <p>12PM</p> <br>
      <p>1PM</p> <br>
      <p>2PM</p> <br>
      <p>3PM</p> <br>
      <p>4PM</p> <br>
      <p>5PM</p> <br> -->
      <!-- <p>6PM</p> <br> -->
    <!-- </div> -->
    <!-- added the below day for testing -->
    <!-- <div v-for="task in taskList">
      {{ task }}
    </div> -->
    <!-- <DayScheduleTestTaskAPI dayName="Testday" :taskList="taskList"/> -->
    <DayScheduleTestTaskAPI dayName="Monday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Tuesday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Wednesday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Thursday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Friday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Saturday" :taskList="taskList"/>
    <DayScheduleTestTaskAPI dayName="Sunday" :taskList="taskList"/>

    <!-- <DaySchedule dayName="Monday" :taskList="taskList"/>
    <DaySchedule dayName="Tuesday" :taskList="taskList"/>
    <DaySchedule dayName="Wednesday" :taskList="taskList"/>
    <DaySchedule dayName="Thursday" :taskList="taskList"/>
    <DaySchedule dayName="Friday" :taskList="taskList"/>
    <DaySchedule dayName="Saturday" :taskList="taskList"/>
    <DaySchedule dayName="Sunday" :taskList="taskList"/> -->
  </div>
</template>

<script>
import DaySchedule from './DaySchedule.vue';
// imported the below for testing
import DayScheduleTestTaskAPI from './DayScheduleTestTaskAPI.vue';

export default {
  name: 'ScheduleContainer',
  created() {
    this.logTasks()
  },
  methods:{
      logTasks() {
        // console.log("taskList: " + this.taskList)
      }
  },
  components: {
    DaySchedule,
    // below added for testing
    DayScheduleTestTaskAPI
  },
  props: [
    "taskList"
  ],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .timings-container {
    /* border: .001px solid #F5F5F5; */
    height: 130%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 14px;
    /* margin-top: 270px; */
  }

  .schedule-container {
    /* border: .001px solid #F5F5F5; */
    border-radius: 15px;
    /* width: 71%; */
    width: 80%;
    height: 100%;
    /* take out the scrollbar here */
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>