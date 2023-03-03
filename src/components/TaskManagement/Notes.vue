<!-- remaking this to be gallery of badges instead (should be a button) -->
<template>
  <!-- <div class="notes-container" @click="showAchievementsClicked = !showAchievementsClicked"> -->
  <div class="notes-container" @click="showAchievementsClicked = true">
    <!-- <h1 id="achievements-header">{{ msg }}</h1> -->
    <p v-if="this.bionicReaderStatus" class="task-management-btn-header" v-html="bionicReading(msg)"></p>
    <p v-else class="task-management-btn-header">{{msg}}</p>

    <!-- <AchievementsCarousel :showAchievementsClicked=showAchievementsClicked :imgUrlArray=imgUrlArray></AchievementsCarousel> -->
    <AchievementsCarousel :showAchievementsClicked=showAchievementsClicked></AchievementsCarousel>
    <!-- <div id="image-div">
      <img :src = "imgUrl" id="achievements-image"/>
    </div> -->
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
  // created() {
  //   this.loadAchievements();
  // },
  components: {
    AchievementsCarousel
  },
  data() {
      return {
        showAchievementsClicked: false,
        imgUrlArray: []
        // imgUrl: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-832RB9EsgPJ8CyirqxINSpW6/user-HeVyMc1OoJ2irVXeTG30p10l/img-2loo93kCFM7P9xcGwGcGot4z.png?st=2023-02-17T16%3A41%3A00Z&se=2023-02-17T18%3A41%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-16T21%3A18%3A12Z&ske=2023-02-17T21%3A18%3A12Z&sks=b&skv=2021-08-06&sig=gM0/Ci9byUiZBWKuU3/ZhYU8xBrAG1ycqbCbO%2B/82Z8%3D"
      };
    },
  setup() {
    const bionicReaderStatus = computed(() => store.getters.getBionicReaderStatus())
    return {
      bionicReaderStatus,
      bionicReading
    }
  },
  //   methods:{
  //     async loadAchievements(){
  //       const path = 'http://157.230.93.52/get-images'
  //       await axios.post(path, {
  //         "taskUserID": "1" // make this usable for more than one user eventually
  //       })
  //       .then(response => {
  //         console.log(response)
  //         this.imgUrlArray.push('https://modernfarmer.com/wp-content/uploads/2014/12/shrekfeature.jpg')})
  //         // this.imgUrlArray = response["data"]})
  //       .catch(err =>{
  //         console.log(err);
  //       });
  //       // const path = 'http://157.230.93.52/get-tasks'
  //       // axios.post(path, {})
  //       // .then(response => {
  //       //   console.log(response);
  //       // })
  //       // .catch(err =>{
  //       //   console.log(err);
  //       // });
  //     },
  // },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task-management-btn-header {
    font-size: 28px;
  }

  #achievements-header {
    font-size: x-large;
    margin-top: 2%;
  }
  #achievements-image {
    width: 70%;
    border-radius: 15px;
    /* margin-top: 4%; */
  }
  #image-div {
    /* border: .001px solid red; */
    height: 83%;
    display: flex;
    align-items: center;
    justify-content: center;
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