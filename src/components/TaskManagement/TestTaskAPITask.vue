<template>
    <div
      class="task-container"
      draggable="true"
      @dragstart="startDrag($event)">
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

  export default {
    name: 'TestTaskAPITask',
    props: {
      taskInfoObject: Object | Array
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
                 this.taskInfoArray = Object.values(this.taskInfoObject)
            }
        },
        startDrag(evt) {
            console.log("drag started");
            evt.dataTransfer.setData('text/plain', evt.target.id);
            evt.dataTransfer.setData('task-name', this.taskInfoArray[2]);

            console.log("task name: " + this.taskInfoArray[2]);

            evt.dataTransfer.setData('task-id', this.taskInfoArray[0]);
            evt.dataTransfer.setData('task-info-object', this.taskInfoObject);
            setTimeout(() => { 
                evt.target.style.display = "none";
            }, 0);
        },
        // Debounce used here to make sure we don't send too many requests to the server
        updateContent: debounce((evt, taskID) => {
          const path = 'http://157.230.93.52/update-task/update-name'
          axios.post(path, {
            "taskID": taskID,
            // the below line gets us the innerHTML but w/out the tags (which render weird w/ the bionic reader)
            "newName": evt.target.textContent
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
    /* globalize */
    .task-text {
      font-size: 25px;
    }
    .task-container {
      font-size: 10px;
      color: black;
      border-radius: 5px;
      background-color: #F06AF3;
      height: 5.5em;
      width: 25em;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5px;
    }
  </style>