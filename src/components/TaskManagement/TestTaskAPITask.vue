<template>
    <div
      class="task-container"
      draggable="true"
      @dragstart="startDrag($event)">
      <h1
        contenteditable
        @input="updateContent($event)">
          {{ this.taskInfoArray[2] }} 
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
      // above looks like this: [ 4, 1, "task #1", "testday", "10:00", "11:30" ]
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
            // evt.dataTransfer.setData('task-name', this.msg);
            // evt.dataTransfer.setData('task-id', this.id);
            evt.dataTransfer.setData('task-name', this.taskInfoArray[2]);
            evt.dataTransfer.setData('task-id', this.taskInfoArray[0]);
            setTimeout(() => { 
                evt.target.style.display = "none";
            }, 0);
        },
        // I'll use debounce here to make sure we don't send too many requests to the server!
        updateContent(evt) {
          const inputText = evt.target.innerText;
          console.log(inputText);
          setTimeout(() => {
            console.log("cat");
          }, 3000)
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