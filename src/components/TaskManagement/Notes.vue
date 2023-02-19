<!-- remaking this to be gallery of badges instead (should be a button) -->
<template>
  <div class="notes-container">
    <h1 id="achievements-header">{{ msg }}</h1>
    <div id="image-div">
      <img :src = "imgUrl" id="achievements-image"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notes',
  props: {
    msg: String
  },
  components: {},
  data() {
      return {
        imgUrl: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-832RB9EsgPJ8CyirqxINSpW6/user-HeVyMc1OoJ2irVXeTG30p10l/img-2loo93kCFM7P9xcGwGcGot4z.png?st=2023-02-17T16%3A41%3A00Z&se=2023-02-17T18%3A41%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-16T21%3A18%3A12Z&ske=2023-02-17T21%3A18%3A12Z&sks=b&skv=2021-08-06&sig=gM0/Ci9byUiZBWKuU3/ZhYU8xBrAG1ycqbCbO%2B/82Z8%3D"
      };
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #achievements-header {
    font-size: xx-large;
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
    height: 30%;
    /* margin-top: 4px; */
  }
</style>