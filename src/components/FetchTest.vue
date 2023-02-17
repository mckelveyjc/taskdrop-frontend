<template>
  <div>
    <!-- <form @submit="submitForm" v-if="!formSubmitted"> -->
    <!-- <form @submit="submit"> -->
    <form v-on:submit.prevent="onSubmit">
      <span>username</span><br>
      <input 
        v-model="dataentry.userName"
        type="text"
        placeholder="userName" 
      /><br>
      <span>email</span><br>
      <input 
        v-model="dataentry.email"
        type="email"
        placeholder="email" 
      /><br>
      <span>password</span><br>
      <input 
        v-model="dataentry.password"
        type="password"
        placeholder="password" 
      /><br>
      <input 
        class="submit" 
        type="submit" 
        value="Submit"
      >
    </form>
    <!-- <div v-if="formSubmitted">
      <h3>Form Submitted</h3>
      <p>Name: {{ name }}</p>
      <p>Password: {{ password }}</p>
      <small>Click on run to launch the app again.</small>
    </div> -->
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        dataentry: {
          "userName": "",
          "email": "",
          "password": ""
        }
      };
    },
    methods:{
      onSubmit:function(){
        const path = 'http://157.230.93.52/register-user'
        axios.post(path, {
          userName:this.dataentry.userName,
          email:this.dataentry.email,
          password:this.dataentry.password,
        })
        .then(response => {
          console.log(response);
        })
        .catch(err =>{
          console.log(err);
        });
      },
    }
  };
</script>
<style>
  form {
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
  }

  input {
    padding: 4px 8px;
    margin: 4px;
  }

  span {
    font-size: 18px;
    margin: 4px;
    font-weight: 500;
  }

  .submit {
    font-size: 15px;
    color: #fff;
    background: #222;
    padding: 6px 12px;
    border: none;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 5px;
  }

</style>