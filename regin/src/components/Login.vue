<template>
    <div class="field-wrap form tab-content">
      <h1>登录</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="id">用户名<span class="req">*</span></label>
          <input type="text" v-model="user.id" id="id" required>
        </div>
        <div class="form-group">
          <label for="password">密码<span class="req">*</span></label>
          <input type="password" v-model="user.password" id="password" required>
          <p class="forgot"><a href="#">Forgot Password?</a></p>
        </div>
        <button type="submit" class="button button-block">登录</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { reactive } from 'vue';
  
  export default {
    name: 'LoginView',
    setup() {
      const router = useRouter();
      const user = reactive({
        id: '',
        password: ''
      });
      const login = async () => {
        try {
          const response = await axios.post('/login', user);
          console.log(user);
        if (response.data === "登录成功，欢迎您！") {
          // ElMessage.success('注册成功');
          console.log("登陆成功");
          window.sessionStorage.setItem('session_id', user.id);
          router.push('/homePage');

        }else if(response.data === "登录失败，密码错误"){
          alert("登录失败，用户名密码不匹配");
        }else if(response.data === "登录失败，该用户不存在"){
          alert("用户名不存在,请先注册");
        }
          // this.$router.push('/homePage')
          // do something after successful login
        } catch (error) {
          console.error(error);
          // handle login error
        }
      };
  
      return {
        user,
        login
      };
    }
  };
  </script>
  
<style scoped lang="scss">
$body-bg: #c1bdba;
$form-bg: #14653d1f;
$white: #ffffff;

$main: #1ab188;
$main-light: lighten($main,5%);
$main-dark: darken($main,5%);

$gray-light: #a0b3b0;
$gray: #ddd;

$thin: 300;
$normal: 400;
$bold: 600;
$br: 4px;
  
html {
	overflow-y: scroll; 
}

body {
  background:$body-bg;
  font-family: 'Titillium Web', sans-serif;
}
h1 {
  text-align:center;
  color:$white;
  font-weight:$thin;
  margin:0 0 40px;
}
.form {
  background:rgba($form-bg,.9);
  padding: 40px;
  max-width:600px;
  margin:40px auto;
  border-radius:$br;
  box-shadow:0 4px 10px 4px rgba($form-bg,.3);
}
  
label {
  position:absolute;
  transform:translateY(6px);
  left:50px;
  color:rgba($white,0.1);
  transition:all 0.25s ease;
  -webkit-backface-visibility: hidden;
  pointer-events: none;
  font-size:20px;
  .req{
    margin: 2px;
    color: $main;
  }
}
label.active {
  transform:translateY(50px);
  left:2px;
  font-size:14px;
  .req {
    opacity:0;
  }
}

label.highlight {
	color:$white;
}

input, textarea {
  font-size:22px;
  display:block;
  width:100%;
  height:100%;
  padding:5px 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  background:none;
  background-image:none;
  border:1px solid $gray-light;
  color:$white;
  border-radius:0;
  transition:border-color 0.25s ease, box-shadow 0.25s ease;
  &:focus {
		outline:0;
		border-color:$main;
  }
}

textarea {
  border:2px solid $gray-light;
  resize: vertical;
}
.tab-content > div:last-child {
  display:none;
}
  .field-wrap {
  position:relative;
  margin-bottom:40px;
}
.forgot {
  margin-top:-10px;
  text-align:right;
}
.button {
  border:0;
  outline:none;
  border-radius:0;
  padding:15px 0;
  font-size:2rem;
  font-weight:$bold;
  text-transform:uppercase;
  letter-spacing:.1em;
  background:$main;
  color:$white;
  transition:all 0.5s ease;
  -webkit-appearance: none;
  &:hover, &:focus {
    background:$main-dark;
  }
}
.button-block {
  display:block;
  width:100%;
}
  
  </style>
  
  
  
  
  