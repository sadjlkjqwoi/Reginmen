<template>
  <div class="body">
  <div class="form">
    <ul class="tab-group">
      <li :class="{ tab: true, active: $route.path === '/login' }">
        <router-link to="/login">登录</router-link>
      </li>
      <li :class="{ tab: true, active: $route.path === '/register' }">
        <router-link to="/register">注册</router-link>
      </li>
    </ul>
    <RouterView></RouterView>
    <router-link to="/homePage">先不注册/登录，游客浏览模式</router-link>
  </div>
</div>
</template>

<script>
export default {
  mounted() {
    const tabs = document.querySelectorAll('.tab-group .tab')
    const contents = document.querySelectorAll('.tab-content > div')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'))
        tab.classList.add('active')

        contents.forEach(content => {
          if (content.id === tab.firstChild.getAttribute('href').substring(1)) {
            content.style.display = 'block'
          } else {
            content.style.display = 'none'
          }
        })
      })
    })
  }
}
</script>


<style scoped lang="scss">

$body-bg: #c99d7039;
$form-bg: #3a8b5c1a;
$gray-light: #0bfbd7;
$main: #08403186;
$main-dark: darken($main,5%);
$main-light: lighten($main,5%);
$white: #fffffff0;
*, *:before, *:after {
  box-sizing: border-box;
}
$br: 4px;

html {
	overflow-y: scroll; 
}

.body {
  position : absolute;
	width : 100%;
	height : 100%;
  background:$body-bg;
  font-family: 'Titillium Web', sans-serif;
  margin : 0;
}
a {
  text-decoration:none;
  color:$main;
  transition:.5s ease;
  &:hover {
    color:$main-dark;
  }
}

.form {
  background:rgba($form-bg,.9);
  padding: 40px;
  max-width:600px;
  margin:40px auto;
  border-radius:$br;
  box-shadow:0 4px 10px 4px rgba($form-bg,.3);
}

.tab-group {
  list-style:none;
  padding:0;
  margin:0 0 40px 0;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  li a {
    display:block;
    text-decoration:none;
    padding:15px;
    background:rgba($gray-light,.25);
    color:$gray-light;
    font-size:20px;
    float:left;
    width:50%;
    text-align:center;
    cursor:pointer;
    transition:.5s ease;
    &:hover {
      background:$main-dark;
      color:$white;
    }
  }
  .active a {
    background:$main;
    color:$white;
  }
}
</style>