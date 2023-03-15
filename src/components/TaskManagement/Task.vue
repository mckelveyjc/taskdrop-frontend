<template>
    <div
      id="task-container"
      class="task-container-template"
      draggable="true"
      @dragstart="startDrag($event)">
      <span 
        class="standard-text"
        contenteditable
        @input="updateContent($event, this.taskInfoArray[0])">
          <!-- displays bionic text only if global bionic state variable is set to True -->
          <!-- taskInfoArray[2] == the name of the task -->
          <span v-if="this.bionicReaderStatus" v-html="bionicReading(this.taskInfoArray[2])"></span>
          <span v-else v-html="this.taskInfoArray[2]"></span>
      </span>
    </div>
  </template>
  
  <script>
  import store from '../../store'
  import { computed } from '@vue/runtime-core'
  import { bionicReading } from 'bionic-reading'
  import debounce from 'lodash.debounce'
  import axios from 'axios'

  export default {
    name: 'Task',
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
        // this method takes the object of Tasks (passed in by parent) & extracts the data by
        //   creating an array, which is used to display the task names
        logTasks() {
            if (this.taskInfoObject != undefined){
                 this.taskInfoArray = Object.values(this.taskInfoObject)
            }
        },
        // when a task is dragged, the data from the task must be recorded so that it can be updated in the database
        startDrag(evt) {
            evt.dataTransfer.setData('text/plain', evt.target.id);
            evt.dataTransfer.setData('task-name', this.taskInfoArray[2]);
            evt.dataTransfer.setData('task-id', this.taskInfoArray[0]);
            evt.dataTransfer.setData('task-info-object', this.taskInfoObject);
            setTimeout(() => { 
                evt.target.style.display = "none";
            }, 0);
        },
        // this method updates the task name if it is changed
        // debounce used here to make sure we don't send too many requests to the server
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
    @import "../../assets/global.css";
    #task-container {
      background-color: #F06AF3;
      height: 5.5em;
      width: 25em;
    }
  </style>