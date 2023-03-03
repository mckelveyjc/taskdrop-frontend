<!-- this component will hold the days & a list of times on the left  -->
<template>
  <div 
    class="day-block-container" 
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent>
        <!-- <h1>{{ dayName }}</h1> -->
        <p class="day-header-text" v-if="this.bionicReaderStatus" v-html="bionicReading(dayName)"></p>
        <p class="day-header-text" v-else>{{dayName}}</p>

        <div class="tasks-container">
          <div v-for="taskInfoObject in taskList[dayName.toLowerCase() + 'Tasks']">
            <TestTaskAPITask :taskInfoObject=taskInfoObject></TestTaskAPITask>
          </div>
          <div v-if="renderDraggedTask">          
            <TestTaskAPITask :taskInfoObject=this.draggedTaskInfoObject></TestTaskAPITask>
          </div>
        </div>
        <!-- takin these out because I threw time divisions into the backlog -->
        <!-- <div class="timings-container">
          <div class="time-division">
            <p class="time-marker">10AM</p><span class="time-division-line"></span>
          </div>
          <br>
          <div class="time-division">
            <p class="time-marker">11AM</p><span class="time-division-line"></span>
          </div>
          <br>
          <div class="time-division">
            <p class="time-marker">12PM</p><span class="time-division-line"></span>
          </div>
          <br>
        </div> -->
          <!-- fix the below if enough time -->
        <!-- <div>
          <hr class="day-schedule-division" id="first-division">
        </div>
        <hr 
          class="day-schedule-division"
          @drop.prevent="onDrop($event)" 
          @dragenter.prevent 
          @dragover.prevent>
        <hr 
          class="day-schedule-division"
          @drop.prevent="onDrop($event)" 
          @dragenter.prevent 
          @dragover.prevent> -->
  </div>
</template>

<script>
import axios from 'axios'
import Task from '../TaskManagement/Task.vue';
import TestTaskAPITask from '../TaskManagement/TestTaskAPITask.vue';
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';

export default {
  name: 'DayScheduleTestTaskAPI',
  props: {
      dayName: String,
      taskList: Object
  },
  components: {
    Task,
    // below added for testing
    TestTaskAPITask
  },
  created() {
        this.renderDraggedTask = false;
        this.draggedTaskInfoObject = {};
        this.numDroppedTasks = 0;
    },
  data() {
      return {
        renderDraggedTask: Boolean,
        draggedTaskInfoObject: Object,
        numDroppedTasks: Number
      };
    },
  setup() {
    const bionicReaderStatus = computed(() => store.getters.getBionicReaderStatus())
    return {
      bionicReaderStatus,
      bionicReading
    }
  },
  methods: {
    onDrop(evt) {
        this.renderDraggedTask = true;
        // in the future- get this straight from the draggedTaskInfoObject object because it's in there 
        const taskID = evt.dataTransfer.getData('task-id');
        this.draggedTaskInfoObject = evt.dataTransfer.getData('task-info-object').split(",");
        const lowerCaseDayName = this.dayName.toLowerCase();

        const path = 'http://157.230.93.52/update-task/update-day'
        axios.post(path, {
          "taskID": taskID,
          "newDay": lowerCaseDayName
        })
        .then(response => {
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        });
        // this.renderThis = false;
    },
  },
  computed: {
    // this works:
    // onThisDay() {
    //   let lsDayName = localStorage.getItem('lsDayName');
    //   if (lsDayName == this.dayName){
    //     return true
    //   }},
    onThisDay() {
      // ok, here we want to check the localStorage dictionary to see which tasks,
      //   if any, go into this selected day.
      //   remember, localStorage looks like this: 
      //     tasks: {
      //       task-id: [taskName, taskLocation],
      //       task-id: [taskName, taskLocation]
      //     }

      // first, get the dictionary out of localStorage (if it exists):
      let storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks != null){
        // just testing shit:
        // let storedTasksTest = JSON.parse(localStorage.getItem("tasks"));
        // console.log("task test: ");
        // console.log(storedTasksTest);

        // now, check if any tasks in the given day have this.dayName as their day
        //   first, loop through the dictionary and return true if there are tasks
        //   on this day
        // console.log("loopin through our task values:")
        for (const [value] of Object.entries(storedTasks)) {
          if (storedTasks[value][1] == this.dayName){
          // if (storedTasks[value][1] == this.dayName && storedTasks[value][2] == true){
            // let storedTasks3 = JSON.parse(localStorage.getItem("tasks"));
            // storedTasks3[value][2] = false;
            // localStorage.setItem("tasks", JSON.stringify(storedTasks3));
            // console.log(storedTasks[value][1]);
            // var renderedTaskName = storedTasks[value][0];
            // console.log("rendered task name: " + renderedTaskName);
            // console.log("rendered task day: " + storedTasks[value][1]);
            return true;
          }
        }
        let storedTasksTest = JSON.parse(localStorage.getItem("tasks"));
        console.log("task test: ");
        console.log(storedTasksTest);
      }
    },
    // this works:
    // updatedProps() {
    //   let lsTaskName = localStorage.getItem('lsTaskName');
    //   return {
    //     msg: lsTaskName,
    //     completed: "False"
    //   }
    // }
    updatedProps() {
      // make this into a helper function eventually
      // need to get the id here too
      let storedTasks = JSON.parse(localStorage.getItem("tasks"));
      
      // const keys = Object.keys(storedTasks);
      // console.log("keys: " + keys);

      // for (const [value] of Object.entries(storedTasks)) {
      for (let key in storedTasks) {
        // console.log("here come the keys!");
        // console.log(key);
        // console.log("here come the values!");
        // console.log(storedTasks[key][1]);
        if (storedTasks[key][1] == this.dayName){
          var renderedTaskID = key;
          var renderedTaskName = storedTasks[key][0];
        }
        // if (storedTasks[value][1] == this.dayName){
          // console.log(storedTasks[value][1]);
          // var renderedTaskID = key;
          // console.log("rendered key: " + renderedTaskID);
          // var renderedTaskName = storedTasks[value][0];
        // }
      }
      // console.log("rendered task name: " + renderedTaskName);
      // not sure what went wrong here... let's move on for now 
      let storedTasksTest = JSON.parse(localStorage.getItem("tasks"));
      console.log("(final) task test: ");
      console.log(storedTasksTest);
      return {
        msg: renderedTaskName,
        // msg: "cat",
        id: renderedTaskID,
        // id: 2,
        completed: "False"
      }
    },
    updatedProps() {
      // make this into a helper function eventually
      // need to get the id here too
      let storedTasks = JSON.parse(localStorage.getItem("tasks"));
      
      // const keys = Object.keys(storedTasks);
      // console.log("keys: " + keys);

      // for (const [value] of Object.entries(storedTasks)) {
      for (let key in storedTasks) {
        // console.log("here come the keys!");
        // console.log(key);
        // console.log("here come the values!");
        // console.log(storedTasks[key][1]);
        if (storedTasks[key][1] == this.dayName){
          var renderedTaskID = key;
          var renderedTaskName = storedTasks[key][0];
        }
        // if (storedTasks[value][1] == this.dayName){
          // console.log(storedTasks[value][1]);
          // var renderedTaskID = key;
          // console.log("rendered key: " + renderedTaskID);
          // var renderedTaskName = storedTasks[value][0];
        // }
      }
      // console.log("rendered task name: " + renderedTaskName);
      // not sure what went wrong here... let's move on for now 
      let storedTasksTest = JSON.parse(localStorage.getItem("tasks"));
      console.log("(final) task test: ");
      console.log(storedTasksTest);
      return {
        msg: renderedTaskName,
        // msg: "cat",
        id: renderedTaskID,
        // id: 2,
        completed: "False"
      }
    }
  }   
}
</script>

<style scoped>
  /* @import "../../assets/global.css"; */
  .tasks-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* border: 2px solid red; */
  }
  .day-header-text {
    /* font-size: 25px; */
    font-size: 27px;
  }
  .time-division {
    margin-right: auto;
    width: 100%;
    display: flex;
  }
  /* .time-marker {}  */
  .time-division-line {
    /* display: inline-block; */
    background: #F5F5F5;
    /* padding: 1%; */ 
    justify-self: center;
    align-self: center;
    height: .1em;
    width: 100%;
    margin-left: .1em;
  }
  .timings-container {
    /* border: .001px solid #F5F5F5; */
    /* height: 130%; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 14px;
    /* margin-top: 270px; */
  }
  #first-division {
    margin-top: 30px;
  }
  .day-block-container {
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    width: 35%;
    height: 98%;
    flex-shrink: 0;
    /* display: flex; */
    align-content: center;
    flex-direction: column;
    text-align: center;
  }
  .day-schedule-division {
    width: 90%;
    margin-top: 55px;
    margin-left: 5%;
  }
</style>