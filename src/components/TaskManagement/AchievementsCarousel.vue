<template>
    <div>
        <!-- <p>CAT</p> -->
      <vueper-slides class="img-carousel">
          <vueper-slide v-for="i in 5" :key="i" :title="i.toString()" />
      </vueper-slides>
    </div>
  </template>
  
  <script>
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'

  export default {
    name: 'Achievements',
    props: {},
    components: {
      VueperSlides, 
      VueperSlide},
    methods: {}
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .img-carousel {
    /* position: "absolute";
    border: 2px solid red;
    height: 100vh;
    width: 100vh */
  }
  </style>