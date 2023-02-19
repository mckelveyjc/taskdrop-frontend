<template>
    <div 
      class="completed-tasks-container"    
      @dragenter.prevent 
      @dragover.prevent>
      <h1 id="completed-tasks-header">{{ msg }}</h1>
    </div>
  </template>
  
  <script>  
  export default {
    name: 'BionicReader',
    props: {
      msg: String
    },
    components: {},
    methods: {},
    computed: {}   
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