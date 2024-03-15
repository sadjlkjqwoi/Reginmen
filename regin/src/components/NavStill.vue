<template>
  <div>
    <div :class="selectedStyle1">
  
</div>
<div :class="selectedStyle2" >
    <div class="box logo-box">
      <h1>
        <img src="https://source.unsplash.com/featured/?nature">
        <span>Reginmen</span>
      </h1>
      <nav :class="selectedStyle3">
        <router-link active-class="active" to="/HomePage">主页推荐</router-link>
        <router-link active-class="active" to="/food">食疗百科</router-link>
        <router-link active-class="active" to="/active">食膳推荐</router-link>
        <router-link active-class="active" to="/comunicate">交流平台</router-link>
        <router-link active-class="active" to="/Institution">机构推荐</router-link>
        <router-link active-class="active" to="/selfpart">个人页面</router-link>
      </nav>
    </div>
    <div class="box search-box">
      <div class="search-wrapper">
        <input class="text" type="text" placeholder="请输入关键词">
        <button :class="selectedStyle4">搜索</button>
      </div>
      <div class="user-box">
        <img src="https://source.unsplash.com/featured/?nature">
        <router-link active-class="active" to="/login">登录</router-link>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      theme: 'light',
      user_id:'',
      age:'',
    }
  },
  methods: {
    getSelectedStyle() {
      if (sessionStorage.getItem('session_id') === '') {
        this.user_id = '20210011';
      }

      axios.get('/findUser', { params: { id: sessionStorage.getItem('session_id') } }).then(response => {
        this.age = response.data.age;
      });
    },
  },
  computed: {
    selectedStyle1() {
      if (this.age < 45) {
        return "h11";
      } else if (this.age < 61) {
        return "h12";
      } else {
        return "h13";
      }
    },
    selectedStyle2() {
      if (this.age < 45) {
        return "header1";
      } else if (this.age < 61) {
        return "header2";
      } else {
        return "header3";
      }
    },
    selectedStyle3() {
      if (this.age < 45) {
        return "nav1";
      } else if (this.age < 61) {
        return "nav2";
      } else {
        return "nav3";
      }
    },
    selectedStyle4() {
      if (this.age < 45) {
        return "button1";
      } else if (this.age < 61) {
        return "button2";
      } else {
        return "button3";
      }
    },
  },
  mounted() {
    this.getSelectedStyle();
  },
}
</script>

<style scoped lang="scss">

// #components-layout-demo-top-side-2 .logo {
//   float: left;
//   width: 120px;
//   height: 31px;
//   margin: 16px 24px 16px 0;
//   background: rgba(255, 255, 255, 0.3);
// }

// .ant-row-rtl #components-layout-demo-top-side-2 .logo {
//   float: right;
//   margin: 16px 0 16px 24px;
// }

// .site-layout-background {
//   background: #fff;
// }
.header3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border: rgb(85,95,77) solid 1px;
  background-color: rgb(85,95,77);
  color: #ffffff;
  box-shadow: -2px -2px 5px rgb(85,95,77),
    1px 1px 2px rgb(85,95,77);
}
.h13{
  color: #ced2ce;
  height: 200px;
  background-image: url(../assets/head.jpg);
  text-align: right;
  
}
.sticky-box {
    position: sticky;
    top: 10px; /* 距离顶部的位置，根据需要进行调整 */
    z-index: 999; /* 可选，用于设置盒子的层级 */
  }
.nav3 a {
  padding: 2px 0;
  width: 88px;
  text-decoration: none;
  color: #ffffff;
  font-size: 20px;
  font-weight: normal;
  opacity: 0.9;
}

.nav3 a:hover {
  opacity: 1;
  color: #ee8309c8;
}

//样式年轻人
.header1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border:  rgb(236,211,128) solid 1px;
  background-color:  rgba(236, 211, 128,0.284);
  color: #080808;
  box-shadow: -2px -2px 5px  rgb(236,211,128),
    1px 1px 2px  rgb(236,211,128);
}
.h11{
  color: #ced2ce;
  height: 200px;
  background-image: url(../assets/head6.png);
  text-align: right;
  
}
.nav1 a {
  padding: 2px 0;
  width: 88px;
  text-decoration: none;
  color: #392003;
  font-size: 20px;
  font-weight: normal;
  opacity: 0.9;
}

.nav1 a:hover {
  opacity: 1;
  color: #33a363;
}

.header2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border:  rgb(233, 39, 39) solid 1px;
  background-color:  rgba(192, 17, 17, 0.864);
  color: #080808;
  box-shadow: -2px -2px 5px  rgb(139, 6, 6),
    1px 1px 2px  rgb(189, 13, 13);
}
.h12{
  color: #ced2ce;
  height: 200px;
  background-image: url(../assets/head7.png);
  text-align: right;
  
}
.nav2 a {
  padding: 2px 0;
  width: 88px;
  text-decoration: none;
  color: #fffdfa;
  font-size: 20px;
  font-weight: normal;
  opacity: 0.9;
}

.nav2 a:hover {
  opacity: 1;
  color: #33a363;
}



.useh1{
  font-size: 150px;
  margin-left: 45%;
}
.box {
  height: 20px;
  display: flex;
  align-items: center;
}

.logo-box {
  width: 200px;
  padding: 0 20px;
}

h1 {
  display: flex;
  align-items: center;
  font: normal 28px sans-serif;
  margin: 0;
}

img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

nav {
  height: 20px;
  display: flex;
  align-items: center;
  border: none;
  margin: 5px 10px 0px 10px;
  font: 16px Garamond, Georgia;
  border-radius: 5px;
  // background: linear-gradient(315deg, #73b57b, #3e8745);
  // box-shadow: -2px -2px 4px #437d4a,
  //   2px 2px 4px #68a770;
}


.search-box {
  width: 400px;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 4px 8px;
  width: 100%;
  margin-right: 20px;
}

//搜索框样式
.text {
  border: none;
  outline: none;
  font-size: 16px;
  padding: 8px;
  flex-grow: 1;
  border: 2px solid white;
}

.text:focus {
  color: rgb(3, 18, 11);
  background-color: #ced2ce;
  outline-color: rgb(4, 17, 8);
  box-shadow: -1px -1px 5px rgb(15, 103, 75);
  transition: .1s;
  transition-property: box-shadow;
}

.button3 {
  background-color: #179060;
  color: #ffffff;
  box-sizing: border-box;
  border: none;
  outline: none;
  display: inline-block;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.button2 {
  background-color: #7c180bf1;
  color: #ffffff;
  box-sizing: border-box;
  border: none;
  outline: none;
  display: inline-block;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.button1 {
  background-color: #b8a618b6;
  color: #280606;
  box-sizing: border-box;
  border: none;
  outline: none;
  display: inline-block;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.button3:disabled {
  pointer-events: none;
}

.button3:hover {
  color: #fff;
  background-color: #074d31;
  box-shadow: rgba(6, 58, 30, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button3:active {
  box-shadow: none;
  transform: translateY(0);
}
//2
.button2:disabled {
  pointer-events: none;
}

.button2:hover {
  color: #fff;
  background-color: #a5200ee8;
  box-shadow: rgba(6, 58, 30, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button2:active {
  box-shadow: none;
  transform: translateY(0);
}
//3
.button1:disabled {
  pointer-events: none;
}

.button1:hover {
  color: #fff;
  background-color: #bdc61458;
  box-shadow: rgba(107, 94, 7, 0.668) 0 8px 15px;
  transform: translateY(-2px);
}

.button1:active {
  box-shadow: none;
  transform: translateY(0);
}
.user-box {
  display: flex;
  align-items: center;
}

.user-box img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-box a {
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
}
</style>



