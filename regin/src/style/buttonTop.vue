<template>
    <div>
      <!-- 页面内容 -->
      
      <!-- 回到顶部按钮 -->
      <buttonUse class="back-to-top" buttonText="回到顶端" @click="scrollToTop">
        Back to Top
      </buttonUse>
    </div>
  </template>
  
  <script>
  import buttonUse from './buttonUse.vue';
  export default {
    components:{
        buttonUse,
    },
    methods: {
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  
        if (scrollTop > 300) { // 当滚动超过300px时显示回到顶部按钮
          this.$refs.backToTop.classList.add('show');
        } else {
          this.$refs.backToTop.classList.remove('show');
        }
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // 平滑滚动到顶部
        });
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
  </script>
  
  <style scoped>
  /* 样式 */
  </style>
  