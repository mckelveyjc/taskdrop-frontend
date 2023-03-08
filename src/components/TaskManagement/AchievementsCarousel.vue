<template>
  <div>
    <vue-easy-lightbox v-if="showAchievementsClicked"
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
import { ref, defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  props: {
    showAchievementsClicked: Boolean,
  },
  components: {
    VueEasyLightbox
  },
  setup() {
    const visibleRef = ref(false)
    const indexRef = ref(0) // default 0
    const imgsRef = ref([])
    var imgUrlArray = []

    const onShow = () => {
      visibleRef.value = true
    }

    const showMultiple = async () => {
      // definitely a better way to do this rather than putting a whole fetch request in here
      const path = 'http://157.230.93.52/get-images'
        await axios.post( path, {
          "taskUserID": "1" // make this usable for more than one user eventually
        })
        .then(response => {
          // add images in reverse order
          for (let i = response["data"]["data"].length - 1; i >= 0; i--){
            imgUrlArray.push(response["data"]["data"][i])
          }
        })
        .catch(err =>{
          console.log(err);
        });
      for (let index = 0; index < imgUrlArray.length; index++){
        imgsRef.value.push(imgUrlArray[index])
      }

      indexRef.value = 0 // index of imgList
      onShow()
    }

    showMultiple()
    
    const onHide = () => {
      visibleRef.value = false;
    }

    return {
      visibleRef,
      indexRef,
      imgsRef,
      showMultiple,
      onHide
    }
  },
})
</script>