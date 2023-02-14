<!-- this component will hold the days & a list of times on the left  -->
<template>
  <div 
    class="day-block-container" 
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent>
        <h1>{{ dayName }}</h1>
        <!-- <Task v-bind="updatedProps" v-if="onThisDay"></Task> -->
        <div v-for="taskInfoObject in taskList[dayName.toLowerCase() + 'Tasks']">
            <TestTaskAPITask :taskInfoObject=taskInfoObject></TestTaskAPITask>
        </div>
        <div v-if="renderThis">
          <!-- <h1>Wawa Weewoo WAYNE!</h1> -->
            <TestTaskAPITask :taskInfoObject=this.draggedTaskInfoObject></TestTaskAPITask>
        </div>
        <!-- <TestTaskAPITask v-bind="updatedProps" v-if="onThisDay"></TestTaskAPITask> -->
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
import { createApp } from "vue"

// what do we need to load in two tasks at once? 
// let's put rendered: true or false into the task local storage data structure
export default {
  name: 'DayScheduleTestTaskAPI',
  // below is testing
//   created() {
//     this.logTasks()
//   },
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
        this.renderThis = false;
        this.draggedTaskInfoObject = {};
    },
  data() {
      return {
        renderThis: Boolean,
        draggedTaskInfoObject: Object
      };
    },
  methods: {
    // testing
    // logTasks() {
    //     console.log("day schedule test task api tasks: " + this.taskList["mondayTasks"])
    // },
    // this one works:
    // onDrop(evt) {
    //   const taskName = evt.dataTransfer.getData('task-name');     
    //   let NewTask = createApp(Task, {msg: taskName});
    //   const wrapper = document.createElement("div");
    //   NewTask.mount(wrapper);
    //   evt.target.appendChild(wrapper);
    //   localStorage.setItem("lsDayName", this.dayName);
    //   let lsTaskName = localStorage.getItem('lsTaskName');
    //   let lsDayName = localStorage.getItem('lsDayName');

    //   console.log("Task: " + lsTaskName);
    //   console.log("Day: " + lsDayName);
    // },
    onDrop(evt) {
        this.renderThis = true;
        // get task name and id number
        // const data = evt.dataTransfer.getData("text");
        // console.log("data: " + data);

        const taskName = evt.dataTransfer.getData('task-name');  
        const taskID = evt.dataTransfer.getData('task-id');
        const taskInfoObject = evt.dataTransfer.getData('task-info-object');
        const lowerCaseDayName = this.dayName.toLowerCase();
        this.draggedTaskInfoObject = taskInfoObject.split(",");
        console.log("type of taskInfoObject: " + typeof(taskInfoObject));
        console.log("type of draggedTaskInfoObject: " + typeof(this.draggedTaskInfoObject));

        // console.log("name of dropped task: " + taskName);
        // console.log("ID from dropped task: " + taskID);
        // console.log("day name: " + this.dayName);
        console.log("task info object as a string: " + taskInfoObject);
        console.log("task info object as an array: " + taskInfoObject.split(","));
        console.log("type of task info object as an array: " + typeof(taskInfoObject.split(",")));

        // var NewTask = createApp(Task, {msg: taskName, id: parseInt(taskID)});
        // const wrapper2 = document.createElement("div");
        // NewTask.mount(wrapper2);
        // evt.target.appendChild(wrapper2);

        // need to pass :taskInfoObject=taskInfoObject into the task
        // var testTaskInfoObject = [ 4, 1, "task #1", "testday", "10:00", "11:30" ]
        // var TestTaskAPITask = createApp(TestTaskAPITask, {taskInfoObject: taskInfoObject});
        // var TestTaskAPITask = createApp(TestTaskAPITask, {msg: taskName, id: parseInt(taskID)});
        // const wrapper3 = document.createElement("div");
        // TestTaskAPITask.mount(wrapper3);
        // evt.target.appendChild(wrapper3);
        
        // CHANGE DB AND RE RENDER WHEN A TASK IS MOVED? OR WOULD THAT BE TOO SLOW
        // MAYBE JUST CHANGE ITS LOCATION FOR WHEN THE PAGE AUTOMATICALLY RE RENDERS
        // test if we can send a fetch request from inside onDrop (I don't see why we wouldn't be able to)
        // let's use get-tasks for fun
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