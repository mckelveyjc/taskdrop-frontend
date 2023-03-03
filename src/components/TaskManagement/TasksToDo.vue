<template>
  <div class="tasks-todo-container"
    @drop.prevent="onDrop($event)" 
    @dragenter.prevent 
    @dragover.prevent
    id="tasks-todo-container-id">
    <!-- <h1 id="tasks-todo-header">{{ headerMsg }}</h1> -->
    <p class="header-text" v-if="this.bionicReaderStatus" v-html="bionicReading(headerMsg)"></p>
    <p class="header-text" v-else>{{headerMsg}}</p>

    <div class="tasks-container">
      <!-- <Task msg="Task #1" completed=False id="1"></Task> -->
      <!-- <Task msg="Task #2" completed=False id="2"></Task> -->
      <!-- <Task v-bind="updatedProps" v-if="onThisDay"></Task> -->
      <div v-for="taskInfoObject in taskList['toDoListTasks']">
        <TestTaskAPITask :taskInfoObject=taskInfoObject></TestTaskAPITask>
      </div>
      <!-- to make the below work for multiple tasks, we'll need to make a list of task objects -->
      <!-- the below works (for now lmao) -->
      <!-- <div v-if="displayCreatedTaskBoolean">
          <TestTaskAPITask :taskInfoObject=this.createdTaskInfoArray></TestTaskAPITask>
      </div> -->
      <div v-if="displayCreatedTaskBoolean" v-for="taskInfoObject in this.createdTaskInfoBigList">
        <TestTaskAPITask :taskInfoObject=taskInfoObject></TestTaskAPITask>
      </div>

      <AddTask @newTaskInfo="displayCreatedTaskFunction($event)" msg="Add Task" completed=False id="add-task-btn"></AddTask>
    </div>
    <!-- added the below to test router -->
    <!-- <router-link
      to="/fetch-test"
      custom
      v-slot="{ navigate }">
      <button
        @click="navigate"
        role="link">
        Fetch Test
      </button>
    </router-link> -->
    <!-- added below to test openai request -->
    <!-- <router-link
      to="/openai-test"
      custom
      v-slot="{ navigate }">
      <button
        @click="navigate"
        role="link">
        OpenAI Test
      </button>
    </router-link> -->
  </div>
</template>

<script>
import Task from './Task.vue';
import AddTask from './AddTask.vue';
import TestTaskAPITask from './TestTaskAPITask.vue';
import { createApp } from "vue"
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';

export default {
  name: 'TasksToDo',
  props: {
    headerMsg: String,
    taskList: Object
  },
  components: {
    AddTask,
    Task,
    TestTaskAPITask
  },
  created() {
        this.displayCreatedTaskBoolean = false,
        this.createdTaskInfoArray = [], // needs to be renamed (this is just for one task)
        this.createdTaskInfoBigList = [] // needs to be renamed (this holds a list of the above)
    },
  data() {
      return {
        displayCreatedTaskBoolean: Boolean,
        createdTaskInfoArray: Array,
        createdTaskInfoBigList: Array
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
    // displayCreatedTaskFunction(value) {
    //   console.log("cat")
    //   // console.log(value)
    //   this.displayCreatedTaskBoolean = true
    // },
    displayCreatedTaskFunction(newTaskInfoObject) {
      this.displayCreatedTaskBoolean = true;
      console.log("new task info: " + Object.values(newTaskInfoObject));
      let createdTaskID = Object.values(newTaskInfoObject)[1];
      let createdTaskUserID = Object.values(newTaskInfoObject)[0];
      // below probably shouldn't be hardcoded in but whatevs
      this.createdTaskInfoArray = [createdTaskID, createdTaskUserID, "(new task)", "to-do-list", "new-task", "new-task"];
      this.createdTaskInfoBigList.push(this.createdTaskInfoArray)
    },
    onDrop(evt) {
      // get task name and id number
      const taskName = evt.dataTransfer.getData('task-name');  
      const taskID = evt.dataTransfer.getData('task-id');    
      // console.log("ID from dropped task: " + taskID);

      let storedTasks2 = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks2 == null || !(taskID in storedTasks2)){
        console.log("NOT IN THERE!");
        var NewTask = createApp(Task, {msg: taskName, id: parseInt(taskID)});
      }
      else {
        let newTaskName = storedTasks2[taskID][0];
        var NewTask = createApp(Task, {msg: newTaskName, id: parseInt(taskID)});
      }
      
      // create a new task with that name and id number
      // put the task in a div wrapper and add it to the dom
      // let NewTask = createApp(Task, {msg: taskName, id: taskID});
      const wrapper = document.createElement("div");
      NewTask.mount(wrapper);
      // evt.target.appendChild(wrapper);

      // let cat = document.getElementById('left-tool-bar');
      // cat.insertBefore(wrapper, cat.firstElementChild)


      // let addTaskBtn = document.getElementById('add-task-btn');
      // addTaskBtn.insertBefore(wrapper, addTaskBtn.firstElementChild);

      let tasksToDoHeader = document.getElementById("tasks-todo-header");
      tasksToDoHeader.insertBefore(wrapper, tasksToDoHeader.firstElementChild);
      // localStorage looks like this: {
      //  tasks: {
      //    task-id: [taskName, taskLocation],
      //    task-id: [taskName, taskLocation]
      //  }
      // }

      // lets go ahead and see what's in there:
      // let storedTasks = JSON.parse(localStorage.getItem("tasks"));
      // console.log("task list that's in localStorage: " + storedTasks);
      
      // let's add the dropped task into the structure:
      //   1. if localStorage is null, create a structure:
      // localStorage.clear();
      if (localStorage.getItem("tasks") == null){
        console.log("localStorage is null!");
        let localStorageSample = {0: ["sampleTaskName", "sampleTaskLocation"]};
        localStorage.setItem("tasks", JSON.stringify(localStorageSample));
      }
      //  2. look for the task's id in local storage. if it's there, delete it!
      else {
        // could make this a global variable instead of parsing so many times
        let storedTasks = JSON.parse(localStorage.getItem("tasks"));
        // probably a better way to do this
        for (const [key, value] of Object.entries(storedTasks)) {
          if (key == taskID) {
            delete storedTasks[key];
            console.log(key, value);
          }
        }
      }

      //  3. now that you know you have a structure, add the dropped item to it
      let storedTasks = JSON.parse(localStorage.getItem("tasks"));
      console.log(storedTasks);
      storedTasks[taskID] = [taskName, "tasksToDo"];
      localStorage.setItem("tasks", JSON.stringify(storedTasks));

      // let storedTasksTest = JSON.parse(localStorage.getItem("tasks"));
      // console.log("task test: ");
      // console.log(storedTasksTest);

      // perfect! we've got our localStorage set up nicely to update on drop
      // now lets make our days render tasks using localStorage 
      // after that, we'll set up localStorage to work with tasks-todo and completed tasks
      // (eventually) if the task is already in the structure, let's update it 
    }
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
          if (storedTasks[value][1] == "tasksToDo"){
            // console.log(storedTasks[value][1]);
            // var renderedTaskName = storedTasks[value][0];
            // console.log("rendered task name: " + renderedTaskName);
            // console.log("rendered task day: " + storedTasks[value][1]);
            return true
          }
        }
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
      for (let key in storedTasks) {
        // console.log("here come the keys!");
        // console.log(key);
        // console.log("here come the values!");
        // console.log(storedTasks[key][1]);
        if (storedTasks[key][1] == "tasksToDo"){
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
      // let storedTasksTest = JSON.parse(localStorage.getItem("tasks"));
      // console.log("(final) task test: ");
      // console.log(storedTasksTest);
      return {
        msg: renderedTaskName,
        id: renderedTaskID,
        // id: 2,
        completed: "False"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tasks-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* border: 2px solid red; */
  }
.header-text {
    padding-top: 2%;
    font-size: 27px;
  }

  #tasks-todo-header {
    padding-top: 2%;
    font-size: x-large;
  }
  .tasks-todo-container {
    margin-top: 10px; /* this needs to be globally consistent */
    /* font-size: large; */
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    /* height: 82.75%; */
    /* height: 68.7%; */
    height: 67%;
    /* height: 50%; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }
</style>