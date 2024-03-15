<template> 
<div class="tab-content form">
      <h1>注册</h1>
    <form @submit.prevent="submitForm">
    <div class="top-row">
      <div class="field-wrap">
        <label for="id" >用户名<span class="req">*</span></label>
        <input type="text" id="id"  v-model.trim="registerForm.id" required>
      </div>
      
      <div class="field-wrap">
        <label for="password">密码<span class="req">*</span></label>
        <input type="password" id="password"  v-model.trim="registerForm.password" required>
      </div>
      
      
      <div class="field-wrap">
        <label for="confirmPassword">确认密码<span class="req">*</span></label>
        <input type="password" id="confirmPassword" v-model.trim="registerForm.confirmPassword" required>
      </div>
      <div class="field-wrap">
        <label for="age">年龄<span class="req">*</span></label>
        <input type="age" id="age"  v-model.trim="registerForm.age" required>
      </div>
      <div class="field-wrap">
        <label for="sex">性别<span class="req">*</span></label>
        <input type="sex" id="sex"  v-model.trim="registerForm.sex" required>
      </div>
      <div class="field-wrap">
        <label for="phone">联系方式<span class="req">*</span></label>
        <input type="phone" id="phone"  v-model.trim="registerForm.phone" required>
      </div>
      <button type="submit" class="button button-block">注册</button>
    </div>
    </form>

  </div>
</template>


<script>
import { defineComponent, reactive} from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'RegisterView',

  setup() {
    const registerForm = reactive({
      id:'',
      password: '',
      // confirmPassword: '',
      age: '',
      sex:'',
      phone:'',
    });

    async function submitForm() {
      try {
        const response = await axios.post('/register', {id:registerForm.id,
        password:registerForm.password,sex:registerForm.sex,age:registerForm.age,
        phone:registerForm.phone});
        if (response.data === '注册成功') {
          // ElMessage.success('注册成功');
          console.log("success");
          window.sessionStorage.setItem('session_id', registerForm.id);
          this.$router.push('/label');

        }else if(response.data === "该用户已存在，注册失败"){
          alert("用户名已存在，请重新注册")
          console.log("error");
        }else if(response.data === "注册失败"){
          alert("注册失败")
        }else{
          alert("似乎遇到了未知原因，您可以联系管理员发送邮件至2269324321@qq.com进行反馈")
        }
      } catch (error) {
        // ElMessage.error('注册失败，请检查用户名或邮箱是否已被使用');
        console.log("fail")
      }
    }

    return {
      registerForm,
      submitForm,
    };
  },
});
</script>


<style scoped lang="scss">
@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    -ms-border-radius: $radius;
    border-radius: $radius;
  }
  
  .field-wrap {
    position:relative;
    margin-bottom:40px;
    @include border-radius(0);
  }


$body-bg: #c1bdba;
$form-bg: #13232f;
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

*, *:before, *:after {
  box-sizing: border-box;
}

html {
	overflow-y: scroll; 
}

body {
  background:$body-bg;
  font-family: 'Titillium Web', sans-serif;
}

.form {
  background:rgba($form-bg,.9);
  padding: 40px;
  max-width:600px;
  margin:40px auto;
  border-radius:$br;
  box-shadow:0 4px 10px 4px rgba($form-bg,.3);
}

.tab-content > div:last-child {
  display:none;
}
h1 {
  text-align:center;
  color:$white;
  font-weight:$thin;
  margin:0 0 40px;
}

label {
  position:absolute;
  transform:translateY(6px);
  left:13px;
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


.top-row {
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  > div {
    float:left;
    width:49%;
    margin-right:1%;
    &:last-child { 
      margin:0;
    }
  }
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
