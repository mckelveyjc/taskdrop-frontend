<template>
  <div 
    class="completed-tasks-container"    
    @dragenter.prevent 
    @dragover.prevent>
    <h1 id="completed-tasks-header">{{ msg }}</h1>
    <!-- <Task v-bind="updatedProps" v-if="onThisDay"></Task> -->
  </div>
</template>

<script>
import Task from '../TaskManagement/Task.vue';
import { createApp } from "vue"

export default {
  name: 'CompletedTasks',
  props: {
    msg: String
  },
  components: {
    Task
  },
  methods: {
    // this works
    // onDrop(evt) {
    //   const taskName = evt.dataTransfer.getData('task-name');      
    //   let NewTask = createApp(Task, {msg: taskName});
    //   const wrapper = document.createElement("div");
    //   NewTask.mount(wrapper);
    //   evt.target.appendChild(wrapper);
    // },
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
      evt.target.appendChild(wrapper);

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
      storedTasks[taskID] = [taskName, "completedTasks"];
      localStorage.setItem("tasks", JSON.stringify(storedTasks));

      // let storedTasksTest = JSON.parse(localStorage.getItem("tasks"));
      // console.log("task test: ");
      // console.log(storedTasksTest);

      // perfect! we've got our localStorage set up nicely to update on drop
      // now lets make our days render tasks using localStorage 
      // after that, we'll set up localStorage to work with tasks-todo and completed tasks
      // (eventually) if the task is already in the structure, let's update it 
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
          if (storedTasks[value][1] == "completedTasks"){
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
        if (storedTasks[key][1] == "completedTasks"){
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
  #completed-tasks-header {
    font-size: xx-large;
  }
  .completed-tasks-container {
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 4px; */
  }
</style>