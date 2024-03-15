<template>
  <!-- <buttonUse class="pos" buttonText="换一换" @click="getNew"> -->
  <!-- </buttonUse> -->
  <div class="container s">
    
    <div v-for="(item, index) in data" :key="index" class="card1-wrap">
      <div class="card1" ref="card1" @click="showPopup(index)">
        <div class="card1-bg" :style="{ backgroundImage: `url(${item.vp})` }"></div>
        <div class="card1-info">
          <h2 >{{ item.name }}</h2>
        </div>
      </div>
      </div>
      <div class="overlay"></div>
      <div v-show="show1" class="popup show1">
      <div class="split">
        <div class="left" :style="{ backgroundImage: `url(${selectedCard.vp})` }">
          
        </div>
        
        <div class="right">
          <div class="top1">
          <h2>{{ selectedCard.name }}</h2><br>
        </div>

        <div class="middle1">
        <!-- style="white-space: pre-wrap;"可以实现\n、\r的换行实现 -->
        <p class="p2" style="white-space: pre-wrap;">{{ selectedCard.acticle }}</p>
        </div>
        
        <div class="bottom1" v-for="(item,index) in data2" :key="index">
        <span>{{ item.user_id }}</span>
        <p class="p2" style="white-space: pre-wrap;">{{ item.content }}</p>
      </div>
        
      </div>
      <buttonUse @click="closePopup" class="btn" buttonText="关闭">Close</buttonUse>
      </div>
      
    </div>
      <!-- <div class="ab">
      <div v-if="showPopup[index]" class="popup">
        <h2>弹出框标题</h2>
        <p>弹出框内容</p>
        <button @click="togglePopup(index)">关闭</button>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { ref } from 'vue';
import axios from 'axios';
import buttonUse from './buttonUse.vue';
export default {
  name: 'CardGallery',
  components:{
    buttonUse,
  },
  data() {
      return {
        data: [],
        data2:[],
        selectedCard:{},
        show1:false,
        user_id:'',
        data_id:'',
        d_user_id:'',
        hoverEasing: 'cubic-bezier(0.23, 0.8, 0.32, 1)',
        returnEasing: 'cubic-bezier(0.445, 0.05, 0.45, 0.95)',

        };
      },
      mounted() {
  var age = 0;
  if (sessionStorage.getItem('session_id') === '') {
    this.user_id = '20210011';
  }

  axios.get('/findUser', { params: { id: sessionStorage.getItem('session_id') } }).then(response => {
    age = response.data.age;
    console.log(response.data.age);

    if (age < 45) {
      console.log(age);
      axios.get('/findYoung').then(response => {
        this.data = response.data;
      }).catch(error => {
        console.log(error);
      });
    } else if (age < 61) {
      console.log(age);
      axios.get('/findMiddle').then(response => {
        this.data = response.data;
      }).catch(error => {
        console.log(error);
      });
    } else if (age > 60) {
      console.log(age);
      axios.get('/findOld').then(response => {
        this.data = response.data;
      }).catch(error => {
        console.log(error);
      });
    }
  }).catch(error => {
    console.log(error);
  });
  },
      methods:{
        
      showPopup(index){
        this.selectedCard = this.data[index];
        this.show1 = true;
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.popup').style.display = 'block';
        this.data_id = this.data[index].id;
        axios.get('/findAllReviews',{params:{data_id:this.data_id}}).then(response => {
        this.data2 = response.data;
        let id = this.data_id;
        this.d_user_id = response.data.user_id;
        console.log(id);
        //发送put需要默认设置
        axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

        axios.put('/click',{id:parseInt(id)}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(response => {
        console.log(response.data);
        }).catch(error => {
          console.log(error);
        });
        }).catch(error => {
          console.log(error);
        });

      },
      closePopup(){
        this.show1 = false;
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.popup').style.display = 'none';

      },
  //     getNew(){
  //       var age = 0;
  // if (sessionStorage.getItem('session_id') === '') {
  //   this.user_id = '20210011';
  // }

  // axios.get('/findUser', { params: { id: sessionStorage.getItem('session_id') } }).then(response => {
  //   age = response.data.age;
  //   console.log(response.data.age);

  //   if (age < 45) {
  //     console.log(age);
  //     axios.get('/findYoung').then(response => {
  //       this.data = response.data;
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   } else if (age < 61) {
  //     console.log(age);
  //     axios.get('/findMiddle').then(response => {
  //       this.data = response.data;
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   } else if (age > 60) {
  //     console.log(age);
  //     axios.get('/findOld').then(response => {
  //       this.data = response.data;
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   }
  //   console.log
  // }).catch(error => {
  //   console.log(error);
  // });
  //     }
    },
  };
</script>

<style scoped lang="scss">
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

.pos{
}
.hrheight{
  width: 75%;

}
.title {
  margin-left: 20px;
  margin-top: 50px;
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
}


.p{
  font-size: 22px;
}
.p2{
  text-align: left;
}
.container {
  margin-left: -50px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 1400px;
}
.card1-wrap {
  margin: 20px;
  margin-top: 20px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;
  
  &:hover {
    .card1-info {
      transform: translateY(0);
    }
    .card1-info p {
      opacity: 1;
    }
    .card1-info, .card1-info p {
      transition: 0.6s $hoverEasing;
    }
    .card1-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }
    .card1-bg {
      transition: 
        0.6s $hoverEasing,
        opacity 5s $hoverEasing;
      opacity: 0.8;
    }
    .card1 {
      margin-top: 10px;
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
      box-shadow:
        rgba(white, 0.2) 0 0 40px 5px,
        rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0,
        inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }
  }
}

.card1 {
  position: relative;
  flex: 0 0 240px;
  width: 220px;
  height: 220px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    rgba(black, 0.36) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card1-bg {
  opacity: 0.5;
  position: absolute;
  top: -20px; left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition:
    1s $returnEasing,
    opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.card1-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  
  p {
    font-size: 18px;
    line-height: 12px;
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    text-align: left;
  }
  
  
  &:after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(50%);
    transition: 3s 1s $returnEasing;
  }
}

.slide-bck-top {
  -webkit-animation: slide-bck-top 0.45s cubic-bezier(0.470, 0.000, 0.745, 0.715) alternate both;
  animation: slide-bck-top 0.45s cubic-bezier(0.470, 0.000, 0.745, 0.715) alternate both;
}
//聚焦实现热度推荐的动画效果
@keyframes slide-bck-top {
  0% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
  }

  100% {
    -webkit-transform: translateZ(-20px) translateY(-10px);
    transform: translateZ(-20px) translateY(-10px);
  }
}
.popup{
    // margin: auto;
    border-radius: 30px;
    position: fixed;
    z-index: 9;
    top:100px;
    border:  #3333337e solid 1px;
    width: 1200px;
    height: 700px;
    background-color: #fff;
    display: none;
    transition: background-color 2s;
  }
  .p1{
    font-size: 18px;
    margin-top: -50px;
    opacity: 1;
    z-index: 100;
    color: rgba(231, 245, 214, 0.864);
  }
  .split{
    display: inline-flex; /* 添加该样式 */
    border-radius: 20px;
  }
  .left{
    width: 45%;
    height: 700px;
    opacity: 1;
    border-radius: 20px 0 0 20px;
    border-right: #346f1675 solid 2px ;
    background-size: 100% 100%;
  }
  .right{
    width: 55%;
    height: 600px;
    margin: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;
  }
  .show1 {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: popup-show1-animation 2s forwards;
  background-color: rgb(255, 255, 255);
  z-index: 50;
}


@keyframes popup-show1-animation {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(27, 26, 26, 0.825); /* 半透明黑色背景 */
  z-index: 25; /* 将其放在弹窗下面 */
  display: none; /* 初始时隐藏 */
}
.btn{
  margin-top: -100px;
  margin-right: -250px;
}
.top1{
  height: 20%;
}
.middle1{
  height: 50%;
}
.bottom1{
  height: 30%;
}
</style>




