<template>
    <Button 
    class="task-container" 
    @click="testOpenAI()">
    <h1>TEST OPEN AI</h1>
    </Button>
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
        testOpenAI(){
            const options = {
                method: 'POST',
                // url: 'https://openai37.p.rapidapi.com/generate-image',
                url: 'https://api.openai.com/v1/images/generations',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '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',
                    'X-RapidAPI-Host': 'openai37.p.rapidapi.com'
                },
            data: '{"prompt":"hyper realistic utopian overcrowded city with flying cars","size":"small"}'
            };
            axios.request(options).then(function (response) {
	            console.log(response.data);
            }).catch(function (error) {
	            console.error(error);
            });
        }
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