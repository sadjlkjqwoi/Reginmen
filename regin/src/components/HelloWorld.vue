<template>
  
  <div   class="container-fluid square">
    <div class="row">
      <div class="row">

        <div id="myCarousel" class="carousel slide">
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            </ol>
          <div class="carousel-inner">
            
            <div class="item active">
              <img src="../assets/back7.jpg" alt="First slide">
              
              <div class="carousel-caption carouselHeadPosition">
                <div class="name"><img src="../assets/name.png" /></div>
                <div class="DaoYing">
                  <h2>椿生</h2>
                  <hr>
                  <p>
                    本站将为每一位注册用户提供个性化服务，选择登录开始养生之道。
                    <br>
                    We will weave a tapestry of personalized services for each registered user, painting a picture of enchantment and delight.
                  </p>
                  <hr>
                  <p style="font-size: 16px;">
                    或者选择进入页面先对我们进行了解。
                  </p>
                </div>
                <button class="c-button c-button--gooey" @click="home">进入页面
                  <div class="c-button__blobs">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </button>
              </div>
            </div>
            <div class="item">
              <img src="../assets/tryback.jpg" alt="Second slide">
              <div class="carousel-caption carouselHeadPosition">
                <div class="name"><img src="../assets/name.png" /></div>
                <div class="DaoYing">
                  <h2>椿生</h2>
                  <hr>
                  <p>
                    本站将为每一位注册用户提供个性化服务，选择登录开始养生之道。
                    <br>
                    We'll craft bespoke experiences for every registered user, adding a touch of whimsy and wonder.
                  </p>
                  <hr>
                  <p style="font-size: 16px;">
                    或者选择进入页面先对我们进行了解。
                  </p></div>
                <button class="c-button c-button--gooey" @click="home">进入页面
                  <div class="c-button__blobs">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </button>
              </div>
              
            </div>

            <div class="row square1">
    <a  class="scroll-down">
      <span> <i class="glyphicon glyphicon-chevron-down"></i> </span>
    </a>
    <div class="raw">
      <button class="cssbuttons-io-button" @click="register"> &nbsp;&nbsp;登陆/注册&nbsp;
        <div class="icon" @click="register">
          <svg height="24" width="24" viewBox="0 0 24 24" fill="none">
          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor">

          </path>
        </svg>
        </div>
      </button>
    </div>
    <footer id="rawtwo"></footer>
  </div>
    </div>


          </div>
          <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

          


        </div>
      </div>
       
      
  </div>
  <!-- <div>
      <router-view v-if="showRigesterOrHome"/>
    </div>
   -->
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  // data() {
  //   return {
  //     showHello: true,
  //     showRigesterOrHome:false,
  //   }
  // },
  setup() {
    onMounted(() => {
      // 加载外部资源
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js';
      document.head.appendChild(script);

      const bootstrapScript = document.createElement('script');
      bootstrapScript.src = 'https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js';
      document.head.appendChild(bootstrapScript);
    });

    // 组件的其他逻辑
    // ...

    return {
      // 组件的数据和方法
      // ...
    };
  },
  methods:{
    register(){
      // window.location.href = 'http://localhost:8080/#/Register';
      this.$router.push('/login')
      this.showHello = false;
      this.showRigesterOrHome = true;
    },
    home(){
      // window.location.href = 'http://localhost:8080/#/';
      this.$router.push('/homePage')
      this.showHello = false;
      this.showRigesterOrHome = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.square {
  background-color: #2b2d2b7d;
  height: 840px;
  border: solid #000000 2px;
}

#myCarousel .carousel-inner > .item > img {
  display: block;
  width: 100%;
  height: 700px;
}

.carouselHeadPosition {
  border: solid 1px beige;
  position: absolute;
  top: 50px;
  left: 175px;
  width: 350px;
  bottom: 50px;
  border-radius: 50px;
  background-color: rgba(99, 99, 99, 0.3);
  box-shadow: 15px 15px 34px #282828, -15px -15px 34px #9e9e9e;
}

.DaoYing {
  text-align: center;
  margin: 20px;
  font-size: 25px;
}

.c-button {
  color: #000;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  padding: 0.8em 1.6em;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  margin-top: 3em;
}

.c-button--gooey {
  color: #69d264bc;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #1e944d8b;
  border-radius: 0;
  position: relative;
  transition: all 700ms ease;
}

.c-button--gooey .c-button__blobs {
  height: 100%;
  filter: url(#goo);
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: -3px;
  right: -1px;
  z-index: -1;
}

.c-button--gooey .c-button__blobs div {
  background-color: #77e56fae;
  width: 38%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  transform: scale(1.4) translateY(125%) translateZ(0);
  transition: all 700ms ease;
}

.c-button--gooey .c-button__blobs div:nth-child(1) {
  left: -5%;
}

.c-button--gooey .c-button__blobs div:nth-child(2) {
  left: 30%;
  transition-delay: 60ms;
}

.c-button--gooey .c-button__blobs div:nth-child(3) {
  left: 66%;
  transition-delay: 25ms;
}

.c-button--gooey:hover {
  color: #fff;
}

.c-button--gooey:hover .c-button__blobs div {
  transform: scale(1.4) translateY(0) translateZ(0);
}

footer {
  position: absolute;
  bottom: 0px;
  height: 50px;
}

@-webkit-keyframes drop {
  0%   { top:0px;  opacity: 0;}
  30%  { top:10px; opacity: 1;}
  100% { top:25px; opacity: 0;}
}
@keyframes drop {
  0%   { top:0px;  opacity: 0;}
  30%  { top:10px; opacity: 1;}
  100% { top:25px; opacity: 0;}
}
/*应用动画，添加按钮效果*/
.scroll-down {
    margin: 0px auto;
    height: 50px;
    width: 100px;
    display: block;
    text-align: center;
    z-index: 20;
    -webkit-transition: all 0.125s ease-in-out 0s;
    -moz-transition: all 0.125s ease-in-out 0s;
    -ms-transition: all 0.125s ease-in-out 0s;
    -o-transition: all 0.125s ease-in-out 0s;
    transition: all 0.125s ease-in-out 0s;
}
.scroll-down span {
    position: relative;
    color: #bbb;
    font-size: 50px;
    -webkit-animation-name: drop;
    -webkit-animation-duration: 1s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-delay: 0s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-play-state: running;
    animation-name: drop;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-play-state: running;
}
/* 进入按钮 */
.cssbuttons-io-button {
 background: #ffffff;
 color: blcak;
 font-family: inherit;
 padding: 0.35em;
 padding-left: 1.2em;
 font-size: 17px;
 font-weight: 1000;
 border-radius: 0.9em;
 border: none;
 letter-spacing: 0.5em;
 display: flex;
 align-items: center;
 box-shadow: inset 0 0 1.6em -0.6em #fdffe5;
 overflow: hidden;
 position: relative;
 height: 2.8em;
 padding-right: 3.3em;
 margin: 1.4em auto;
}

.cssbuttons-io-button .icon {
 background: rgba(255, 255, 255, 0.049);
 margin-left: 1em;
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 height: 2.2em;
 width: 2.2em;
 border-radius: 0.7em;
 box-shadow: 0.1em 0.1em 0.6em 0.2em #1bb903;
 right: 0.3em;
 transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
 width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
 width: 1em;
 transition: transform 0.3s;
 color: #630f0f;
}

.cssbuttons-io-button:hover .icon svg {
 transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
 transform: scale(0.95);
}

.name{
  position: absolute;
  top: -50px;
  z-index: 9;
  left: 500px;
}
</style>

