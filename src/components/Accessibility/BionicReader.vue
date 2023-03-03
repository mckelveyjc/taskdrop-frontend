<!-- @click="toggleBionicReader()" -->
<template>
    <div 
      @click="toggleBionicReaderFunction"
      class="completed-tasks-container">
      <!-- <h1 id="completed-tasks-header">{{ msg }}</h1> -->
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
        // console.log("bionic reader active:", store.getters.getBionicReaderStatus())
      }
      return {
        bionicReaderStatus,
        toggleBionicReaderFunction,
        bionicReading
      }
    },
    components: {},
    methods: {
      toggleBionicReader() {
        const timer = ref(false);
        // var bionicReaderActiveLocal = this.$bionicReaderActive;
        // this.bionicReaderActive = !bionicReaderActive;
        config.globalProperties.$bionicReaderActive = false;
        console.log(this.$bionicReaderActive);
      }
    },
    computed: {}   
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .task-management-btn-header {
      font-size: 32px;
    }

    #completed-tasks-header {
      font-size: x-large;
    }
    .completed-tasks-container {
      border: .001px solid #F5F5F5;
      border-radius: 15px;
      height: 10%;
      /* height: 8.5%; */
      display: flex;
      align-items: center;
      justify-content: center;
      /* margin-top: 4px; */
    }
  </style>