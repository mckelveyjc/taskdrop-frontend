<template>
  <div class="utilities-button-container" @click="showAchievementsClicked = true">
    <!-- displays bionic text only if global bionic state variable is set to True -->
    <p v-if="this.bionicReaderStatus" class="standard-text" v-html="bionicReading(msg)"></p>
    <p v-else class="standard-text">{{msg}}</p>
    <AchievementsCarousel :showAchievementsClicked=showAchievementsClicked></AchievementsCarousel>
  </div>
</template>

<script>
import AchievementsCarousel from './AchievementsCarousel.vue';
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';

export default {
  name: 'ViewAchievements',
  props: {
    msg: String
  },
  components: {
    AchievementsCarousel
  },
  data() {
      return {
        showAchievementsClicked: false,
        imgUrlArray: []
      };
  },
  setup() {
    const bionicReaderStatus = computed(() => store.getters.getBionicReaderStatus())
    return {
      bionicReaderStatus,
      bionicReading
    }
  },
}
</script>

<style>
  @import "../../assets/global.css";
</style>