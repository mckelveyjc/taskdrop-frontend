<template>
    <div
      class="task-container"
      draggable="true"
      @dragstart="startDrag($event)">
      <!-- @input => this.taskInfoArray[0] = taskID => couldn't just enter it in from data() because of the debounce -->
      <span class="task-text"
        contenteditable
        @input="updateContent($event, this.taskInfoArray[0])"
        >
          <span v-if="this.bionicReaderStatus" v-html="bionicReading(this.taskInfoArray[2])"></span>
          <span v-else v-html="this.taskInfoArray[2]"></span>
      </span>
    </div>
  </template>
  
  <script>
  import { bionicReading } from 'bionic-reading';
  import debounce from 'lodash.debounce'
  import axios from 'axios'
  import store from '../../store'
  import { computed } from '@vue/runtime-core'

  // var text = "asdf"
  // const bionicText = bionicReading(text);
  
  export default {
    name: 'TestTaskAPITask',
    props: {
      // msg: String,
      // completed: Boolean,
      // id: Number,
      taskInfoObject: Object | Array
      // above looks like this: [ 4, 1, "task #1", "testday", "10:00", "11:30" ]
    },
    created() {
        this.logTasks()
    },
    data() {
      return {
        taskInfoArray: Array,
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
        // testing
        logTasks() {
            if (this.taskInfoObject != undefined){
                // this.taskInfoArray = Object.values(this.taskInfoArray)
                this.taskInfoArray = Object.values(this.taskInfoObject)
                // console.log("test task api task log: " + Object.values(this.taskInfoArray))
                // console.log("test task api task log: " + Object.values(this.taskInfoArray)[2])
            }
            // let catSound = this.bionicReaderActive;
            // console.log("catsound:", catSound);
        },
        startDrag(evt) {
            console.log("drag started");
            evt.dataTransfer.setData('text/plain', evt.target.id);
            // evt.dataTransfer.setData('task-name', this.msg);
            // evt.dataTransfer.setData('task-id', this.id);
            evt.dataTransfer.setData('task-name', this.taskInfoArray[2]);

            console.log("task name: " + this.taskInfoArray[2]);

            evt.dataTransfer.setData('task-id', this.taskInfoArray[0]);
            evt.dataTransfer.setData('task-info-object', this.taskInfoObject);
            setTimeout(() => { 
                evt.target.style.display = "none";
            }, 0);
        },
        // I'll use debounce here to make sure we don't send too many requests to the server!
        // I'm super proud of this part of the code because it's a higher-level concept
        updateContent: debounce((evt, taskID) => {
          // now set an internal variable to this:
          // console.log(evt.target.innerHTML);

          // then throw that + this.id into the following post request:
          // we'll put this code here once I write the code to update the tasks name in the DB
          const path = 'http://157.230.93.52/update-task/update-name'
          axios.post(path, {
            "taskID": taskID,
            // "taskID": "134",
            // "newName": evt.target.innerHTML
            "newName": evt.target.textContent // this gets us the innerHTML but w/out the tags (which render weird w/ the bionic reader)
          })
          .then(response => {
            console.log(response);
          })
          .catch(err =>{
            console.log(err);
          });
        }, 500)
    },
  }
  </script>
  
  <style scoped>
    .task-text {
      /* font-size: 20px; */
      font-size: 25px;
    }
    .task-container {
      font-size: 10px;
      color: black;
      border-radius: 5px;
      background-color: #F06AF3;
      /* height: 6em; */
      /* height: 8em;
      width: 35em; */
      height: 5.5em;
      width: 25em;

      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5px;
    }
  </style>