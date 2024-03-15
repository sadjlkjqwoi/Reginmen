<template>
  <div  :class="selectedStyle" >
    <div class="home">
      <NavStill></NavStill>
    </div>
    <div class="contents1">
      <div class="content1">
        <!-- <buttonTop style="position: fixed;"></buttonTop> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div>
    <GlobalFooter :links="links" :copyright="copyright"/>
  </div>
</template>

<script>
import axios from 'axios';
import NavStill from "../components/NavStill.vue";
// import buttonTop from '@/style/buttonTop.vue';

export default {
  components: {
    NavStill,
    // buttonTop,
  },
  data() {
    return {
      user_id: '',
      age: 0,
    };
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
    selectedStyle() {
      if (this.age < 45) {
        return "back1";
      } else if (this.age < 61) {
        return "back2";
      } else {
        return "back3";
      }
    },
  },
  mounted() {
    this.getSelectedStyle();
  },
};
</script>

<style scoped lang="scss">
.home {
  
  background-attachment: fixed;
  margin-top: 10px;
  background-image: url(../assets/cool-background.png);
}

.contents1 {
  display: flex;
  justify-content1: center;
  height: calc(100vh - 300px); /* 通过减去其他元素的高度来计算内容区域的高度 */
  overflow: auto;
}

.content1 {
  display: flex;
  height: 1400px;
}

.back1 {
  background-image: url(../static/back6.jpg);
  margin-bottom: 0;
  border: black solid 1px;
  background-size: 100% 100%;
  display: flexbox;
  height: 100vh; /* 设置容器高度为视口高度，可以根据实际需求调整 */
  overflow: hidden;
}

.back2 {
  background-image: url(../assets/back8.jpg);
  margin-bottom: 0;
  border: black solid 1px;
  background-size: 100% 100%;
  display: flexbox;
  height: 100vh; /* 设置容器高度为视口高度，可以根据实际需求调整 */
  overflow: hidden;
}

.back3 {
  background-image: url(../assets/back.jpg);
  margin-bottom: 0;
  border: black solid 1px;
  background-size: 100% 100%;
  display: flexbox;
  height: 100vh; /* 设置容器高度为视口高度，可以根据实际需求调整 */
  overflow: hidden;
}

</style>
