<template>
  <div class="notes-container" @click="showAchievementsClicked = true">
    <p v-if="this.bionicReaderStatus" class="task-management-btn-header" v-html="bionicReading(msg)"></p>
    <p v-else class="task-management-btn-header">{{msg}}</p>

    <AchievementsCarousel :showAchievementsClicked=showAchievementsClicked></AchievementsCarousel>
  </div>
</template>

<script>
import AchievementsCarousel from './AchievementsCarousel.vue';
import store from '../../store'
import { computed } from '@vue/runtime-core'
import { bionicReading } from 'bionic-reading';

export default {
  name: 'Notes',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task-management-btn-header {
    font-size: 25px;
  }
  .notes-container {
    border: .001px solid #F5F5F5;
    border-radius: 15px;
    height: 10%;
    /* height: 20%; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 4px; */
  }
</style>