<template>
    <div 
      @click="toggleBionicReaderFunction"
      class="completed-tasks-container">
      <p class="task-management-btn-header" v-html="bionicReading(msg)"></p>
    </div>
  </template>
  
  <script>  
  import store from '../../store'
  import { computed } from '@vue/runtime-core'
  import { bionicReading } from 'bionic-reading';

  export default {
    name: 'BionicReader',
    props: {
      msg: String
    },
    setup(){
      const bionicReaderStatus = computed(() => store.getters.getBionicReaderStatus())
      const toggleBionicReaderFunction = () => {
        store.mutations.toggleBionicReader()
      }
      return {
        bionicReaderStatus,
        toggleBionicReaderFunction,
        bionicReading
      }
    },
    methods: {
      toggleBionicReader() {
        config.globalProperties.$bionicReaderActive = false;
      }
    },
    computed: {}   
  }
  </script>
  
  <style scoped>
    .task-management-btn-header {
      font-size: 25px;
    }

    #completed-tasks-header {
      font-size: x-large;
    }
    .completed-tasks-container {
      border: .001px solid #F5F5F5;
      border-radius: 15px;
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>