<template>
    <div 
      @click="toggleBionicReaderFunction"
      class="utilities-button-container">
      <p class="standard-text" v-html="bionicReading(msg)"></p>
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
    methods: {
      toggleBionicReader() {
        config.globalProperties.$bionicReaderActive = false;
      }
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
  }
</script>
  
<style>
  @import "../../assets/global.css";
</style>