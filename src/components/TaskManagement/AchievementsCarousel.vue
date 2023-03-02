<template>
  <div>
    <!-- <button @click="showSingle">Show single picture.</button> -->
    <!-- <button @click="showMultiple">Show a group of pictures.</button> -->
    <!-- <vue-easy-lightbox v-if="showAchievementsClicked"
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox> -->
    <vue-easy-lightbox v-if="showAchievementsClicked"
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
// If VueApp is already registered with VueEasyLightbox, there is no need to register it here.
import VueEasyLightbox from 'vue-easy-lightbox'
import { ref, defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  props: {
    showAchievementsClicked: Boolean,
    // imgUrlArray: Object
  },
  // created() {
  //   this.printShit()
  // },
  components: {
    VueEasyLightbox
  },
  setup() {
    // imgUrlArray = Object.values(imgUrlArray);
    const visibleRef = ref(false)
    const indexRef = ref(0) // default 0
    const imgsRef = ref([])
    var imgUrlArray = []

    const loadAchievements = async () =>{
        const path = 'http://157.230.93.52/get-images'
        await axios.post(path, {
          "taskUserID": "1" // make this usable for more than one user eventually
        })
        .then(response => {
          // console.log(response["data"]["data"]) // don't know why there are two "datas" lmao
          // for (let i = 0; i < response["data"]["data"].length; i++){
            // imgUrlArray.push(response["data"]["data"][i])
          // }
          // console.log("imgUrlArray: " + imgUrlArray[0])
          imgUrlArray.push("https://nationaltoday.com/wp-content/uploads/2021/12/Annoy-Squidward-Day-640x514.jpg");
          imgUrlArray.push("https://modernfarmer.com/wp-content/uploads/2014/12/shrekfeature.jpg");
          return imgUrlArray
        })
        .catch(err =>{
          console.log(err);
        });
        // const path = 'http://157.230.93.52/get-tasks'
        // axios.post(path, {})
        // .then(response => {
        //   console.log(response);
        // })
        // .catch(err =>{
        //   console.log(err);
        // });
      };
      // loadAchievements();
    // Img Url , string or Array of string
    // ImgObj { src: '', title: '', alt: '' }
    // 'src' is required
    // allow mixing

    const onShow = () => {
      visibleRef.value = true
    }
    const showSingle = () => {
      imgsRef.value = 'http://via.placeholder.com/350x150'
      // or
      // imgsRef.value  = {
      //   title: 'this is a placeholder',
      //   src: 'http://via.placeholder.com/350x150'
      // }
      onShow()
    }
    const showMultiple = async () => {
      // definitely a better way to do this rather than putting a whole fetch request in here
      const path = 'http://157.230.93.52/get-images'
        await axios.post(path, {
          "taskUserID": "1" // make this usable for more than one user eventually
        })
        .then(response => {
          // console.log(response["data"]["data"]) // don't know why there are two "datas" lmao
          for (let i = 0; i < response["data"]["data"].length; i++){
            imgUrlArray.push(response["data"]["data"][i])
          }
          // *** testing *** 
          // console.log("imgUrlArray: " + imgUrlArray[0])
          // imgUrlArray.push("https://nationaltoday.com/wp-content/uploads/2021/12/Annoy-Squidward-Day-640x514.jpg");
          // imgUrlArray.push("https://modernfarmer.com/wp-content/uploads/2014/12/shrekfeature.jpg");
          console.log(imgUrlArray);
        })
        .catch(err =>{
          console.log(err);
        });
      imgsRef.value = [
        imgUrlArray[0],
        imgUrlArray[1]
      ]
      // or
      // imgsRef.value = [
      //   { title: 'test img', src: 'http://via.placeholder.com/350x150' },
      //   'http://via.placeholder.com/350x150'
      // ]
      indexRef.value = 0 // index of imgList
      onShow()
    }
    // console.log(showAchievementsClicked)
    // if (showAchievementsClicked){showMultiple()}
    showMultiple()
    const onHide = () => (visibleRef.value = false)

    return {
      visibleRef,
      indexRef,
      imgsRef,
      showSingle,
      showMultiple,
      onHide
    }
  },
  // methods: {
  //   printShit() {
  //     console.log("!!!: " + this.imgUrlArray)
  //   }
  // }
})
</script>