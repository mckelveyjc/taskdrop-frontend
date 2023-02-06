<template>
  <div>
    <!-- <form @submit="submitForm" v-if="!formSubmitted"> -->
    <!-- <form @submit="submit"> -->
    <form v-on:submit.prevent="onSubmit">
      <span>username</span><br>
      <input 
        v-model="userName"
        type="text"
        placeholder="userName" 
      /><br>
      <span>email</span><br>
      <input 
        v-model="email"
        type="email"
        placeholder="email" 
      /><br>
      <span>password</span><br>
      <input 
        v-model="password"
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
          email:this.dataentry.email,
          username:this.dataentry.username,
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

<!-- <template>
<div class="field">
  <form @submit="submit">
<form-group id="input-group-1" label="Name" label-for="input-1">
<form-textarea
id="input-1"
type="text"
v-model="dataentry.name"
placeholder="Enter the Name"
></form-textarea>
</form-group>
<form-group id="input-group-2" label="Department" label-for="input-2">
<form-textarea
id="input-2"
type="text"
v-model="dataentry.department"
placeholder="Type your Department here">
</form-textarea>
</form-group>
<button pill v-on:Click="submit" id="button-1" type="submit" variant="dark">Submit</button>
</form>
</div>
  </template>
  <script>
  import axios from 'axios';
  export default {
    data(){
      return {
        dataentry:{
        name:"",
        department:"",
        },
      };
    },
    methods:{
      submit:function(){
        const path = 'http://127.0.0.1:5000/dataentry'
        axios.post(path, {
          name:this.dataentry.name,
          department:this.dataentry.department,
        })
        .then(response => {
          console.log(response);
        })
        .catch(err =>{
          console.log(err);
        });
      },
    }
  }
  </script>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Castoro&display=swap');
  #app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  }
  #input-group-1 {
  margin-left:25%;
  margin-bottom: 20px;
  width: 50%;
  padding-left: 80px;
  margin-top: 50px;
  font-weight:bold;
  }
  h3{
  margin-left:40%;
  margin-top:20px;
  font-family: 'Castoro', serif;
  }
  #input-group-2{
  margin-left:25%;
  margin-bottom: 20px;
  width:50%;
  padding-left:80px;
  font-weight:bold;
  }
  #button-1{
  margin-left:50%;
  }
  .nav-bar{
  padding-left: 50px;;
  }
  .link{
  padding-right:100px;
  font-size: 20px;
  color:white;
  }
  </style> -->