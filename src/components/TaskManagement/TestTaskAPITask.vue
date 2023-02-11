<template>
    <div
      class="task-container"
      draggable="true"
      @dragstart="startDrag($event)">
      <h1
        contenteditable
        @input="updateContent($event)">
          {{ taskInfoArray[2] }} 
      </h1>
    </div>
  </template>
  
  <script>
  // const msgText = "Task #1";
  
  export default {
    name: 'TestTaskAPITask',
    props: {
      msg: String,
      completed: Boolean,
      id: Number,
      taskInfoObject: Object
    },
    created() {
        this.logTasks()
    },
    data() {
      return {
        taskInfoArray: Array
      };
    },
    methods: {
        // testing
        logTasks() {
            if (this.taskInfoObject != undefined){
                // this.taskInfoArray = Object.values(this.taskInfoArray)
                this.taskInfoArray = Object.values(this.taskInfoObject)
                // console.log("test task api task log: " + Object.values(this.taskInfoArray))
                // console.log("test task api task log: " + Object.values(this.taskInfoArray)[2])
            }
        },
        startDrag(evt) {
            console.log("drag started");
            evt.dataTransfer.setData('text/plain', evt.target.id);
            evt.dataTransfer.setData('task-name', this.msg);
            evt.dataTransfer.setData('task-id', this.id);
            setTimeout(() => { 
                evt.target.style.display = "none";
            }, 0);
        },
        updateContent(evt) {
        // this works:
        // const inputText = evt.target.innerText;
        // localStorage.setItem("lsTaskName", inputText);
        // this.msg = inputText;
  
        // so what we need to do here is change the msg and the data in the dict
        const inputText = evt.target.innerText;
        let storedTasks = JSON.parse(localStorage.getItem("tasks"));
        let editedTaskID = this.id;
        storedTasks[editedTaskID][0] = inputText;
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
  
        let storedTasksTest = JSON.parse(localStorage.getItem("tasks"));
        console.log("stored task test:");
        console.log(storedTasksTest);
        },
    },
  }
  </script>
  
  <style scoped>
    .task-container {
      font-size: 10px;
      color: black;
      border-radius: 5px;
      background-color: #F06AF3;
      /* height: 10%; */
      height: 50px;
      /* width: 70%; */
      width: 250px;
      /* margin-left: 46px; */
      margin-left: 12%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5px;
    }
  </style>