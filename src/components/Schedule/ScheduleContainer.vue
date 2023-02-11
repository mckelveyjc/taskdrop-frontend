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
    <DayScheduleTestTaskAPI dayName="Testday"/>
    <DaySchedule dayName="Monday"/>
    <DaySchedule dayName="Tuesday"/>
    <DaySchedule dayName="Wednesday"/>
    <DaySchedule dayName="Thursday"/>
    <DaySchedule dayName="Friday"/>
    <DaySchedule dayName="Saturday"/>
    <DaySchedule dayName="Sunday"/>
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
  components: {
    DaySchedule,
    // below added for testing
    DayScheduleTestTaskAPI
  },
  props: [
    "taskList"
  ],
  methods:{
      logTasks() {
        console.log(this.taskList)
      }
  },
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