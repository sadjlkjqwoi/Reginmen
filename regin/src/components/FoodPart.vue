<template>
  
    <div class="backfood">
      <h3>选择显示</h3>
      <!-- 按钮 -->
      <div>
        
        <div class="divbutton">
          
          <span><b>时令:</b></span>
          <button v-for="(item,index) in data1" 
          :key="index" 
          :class="{ 'button1': true ,'button1click':isActive1[index]}"
          @click = "changeStatus1(index),getid(item.id,'data1')"
          >
          <!-- :class="{ 'button1': true }" -->
            {{ item.name }}
          </button>
        </div>
        <hr class="hr1">
        <div class="divbutton">
          <span><b>季节:</b></span>
          <div class="button-wrapper">
            <button v-for="(item,index) in data2" 
            :key="index" 
            :class="{ 'button2': true ,'button2click':isActive2[index]}"
            @click = "changeStatus2(index),getid(item.id,'data2')"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
        <hr class="hr1">
        <div class="divbutton">
          <span><b>功效:</b></span>
          <div class="button-wrapper">
            <button v-for="(item,index) in data3" 
            :key="index" 
            :class="{ 'button2': true ,'button2click':isActive3[index]}"
            @click = "changeStatus3(index),getid(item.id,'data3')"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
        <hr class="hr1">
        <h3 class="h3_left">全部显示:</h3>
        <div class="divbutton">
          <span><b>排序</b></span>
          <div class="button-wrapper">
            <button v-for="(item,index) in data4" 
            :key="index" 
            :class="{ 'button2': true ,'button2click':isActive4[index]}"
            @click = "changeStatus4(index),getfood(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>
        <hr class="hr1">
      </div>
      <div class="content">
    <ul>
      <li class="pic" v-for="(item,index) in foodpic" :key="index">
        <a @click="showPopup(index)">
          <div class="img"  :style="{backgroundImage:`url(${item.vp})`}">
            <p class="p">{{item.name}}</p>
          <!-- <img :src="item.vp"> -->
          
        </div>
        </a>
      </li>
    </ul>
    
  </div>
    <!-- 弹窗 -->
    <div class="overlay"></div>
      <div v-show="show1" class="popup show1">
      <div class="split">
        <div class="left" :style="{ backgroundImage: `url(${selectedFood.vp})` }">
          
        </div>
        <div class="right">
        <h2>{{ selectedFood.name }}</h2><br>
        <!-- style="white-space: pre-wrap;"可以实现\n、\r的换行实现 -->
        <p class="p2" style="white-space: pre-wrap;">{{ selectedFood.acticle }}</p>
      </div>
        <buttonUse @click="closePopup" class="btn" buttonText="关闭">Close</buttonUse>
      </div>
    </div>
    </div>
    
  </template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            data:[],
            data1:[],
           //label
            data2:[],
            data3:[],
            data4:['时间','推荐'],
            foodpic:[],
            selected:[],
            selectedFood:{},
            show1:false,
            isActive1: new Array(200).fill(false),
            isActive2: new Array(200).fill(false),
            isActive3: new Array(200).fill(false),
            isActive4: new Array(200).fill(false),
        }
    },
    mounted() {
      // /selectFoodLabel
      let id = sessionStorage.getItem('session_id');
      if(id==null){
        axios.get('/selectFoodLabel',{ params: { id: id } }).then(response => {
      this.foodpic = response.data;
    }).catch(error => {
      console.log(error);
    });
      }else{
        axios.get('/RecommendedFood',{ params: { id: id } }).then(response => {
      this.foodpic = response.data;
    }).catch(error => {
      console.log(error);
    });
  }
      //显示食物标签：1.先获取 2.分段显示
      axios.get('/showAllLabels').then(response => {
        this.data = response.data;

        //分别分段啦
        this.data1 = this.data.slice(3, 9);//节气
        this.data2 = this.data.slice(9, 13);//季节
        this.data3 = this.data.slice(0, 3).concat(this.data.slice(14));//其余所有

      }).catch(error =>{
        console.log(error)
      });

  },
    methods:{
        changeStatus1(index) {
            this.isActive1 = this.isActive1.map((value, idx) => idx === index);
         },
        changeStatus2(index) {
            this.isActive2 = this.isActive2.map((value, idx) => idx === index);
        },
        changeStatus3(index) {
            this.isActive3 = this.isActive3.map((value, idx) => idx === index);
        },
        changeStatus4(index) {
            this.isActive4 = this.isActive4.map((value, idx) => idx === index);
        },
        getid(id,name){
          if (name == 'data1') {
             this.selected[0] = id;
          } else if (name == 'data2') {
             this.selected[1] = id;
          } else if (name == 'data3') {
             this.selected[2] = id;
          }
          // 转换为数组形式
          const selectedValues = Object.values(this.selected);
          console.log(selectedValues);

          // 转换为字符串形式
          const selectedString = selectedValues.join(',');
          console.log(selectedString);

          axios.get('/getFoodByLabel',{ params:{ selectLabels: selectedString } }).then(response => {
              this.foodpic = response.data;
          }).catch(error => {
          console.log(error);
          });
        },
        getfood(item){
          if(item === "时间"){
            axios.get('/selectFoodLabel').then(response => {
              this.foodpic = response.data;
          }).catch(error => {
          console.log(error);
          });
          }else if(item === "推荐"){
            axios.get('/RecommendedFood',{params:{id:sessionStorage.getItem('session_id')}}).then(response => {
              this.foodpic = response.data;
          }).catch(error => {
          console.log(error);
          });
          }
        },
        //显示弹窗
        showPopup(index){
          if (this.data.length > 0 && !this.show1) {
    this.selectedCard = this.data[index];
    this.show1 = true;
    // 其他操作...
    this.selectedFood = this.foodpic[index];
        this.show1 = true;
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.popup').style.display = 'block';
  }
        

      },
      closePopup(){
        this.show1 = false;
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.popup').style.display = 'none';

      },
        },
    computed:{
    },
}
</script>
<style scoped lang="scss">
//实现动画效果
@keyframes popup-show1-animation {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
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
.show1 {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: popup-show1-animation 2s forwards;
  background-color: rgb(255, 255, 255);
  z-index: 50;
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
  .p2{
  text-align: left;
}
.backfood {
  background-color: white;
  margin: 10px 230px;
  width: 1150px;
  height: 1500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.h3_left{
  margin-left: 0px;
  text-align: left;
}
.divbutton {
  padding: 2px;
  font-size: 16px;
  margin: 6px 5px;
  display: inline-flex; /* 添加该样式 */
  width: 100%; /* 添加该样式 */
}

.button1 {
  font-size: 16px;
  margin: 2px 6px;
  padding: 3px 7px;
  border: none;
  border-radius: 5px;
  background-color: white;
}
.button1click{
    color: white;
    background-color: rgb(239, 138, 37);
}
.hr1 {
  border-color: rgb(255, 255, 255);
  opacity: 0.2;
}
.content{
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 5px;
}
.pic{
    margin: 15px;
    width: 125px;
    height: 120px;
    display: inline-flex; /* 添加该样式 */
}
.img{
    width: 140px;
    height: 130px;
    background-size: 100% 100%;
    padding-top:100px ;
    padding-bottom: 0px;
    border-radius: 15px;
}
a{
    border-radius: 5px;
}
.p{
    width: 140px;
    height: 30px;
    background-color: rgba(248, 248, 248, 0.666);
    font-size: 20px;
    color: rgba(43, 67, 29, 0.601);
    z-index: 9;
    border-radius: 0 0 15px 15px;
}
.divbutton span {
  display: inline-block;
  text-align: left;
  font-weight: bold;
  white-space: nowrap;
  margin-top: 6px;
}

.button2 {
  font-size: 16px;
  margin: 5px 7px;
  padding: 5px 10px;
  border: none;
  color: black;
  border-radius: 5px;
  background-color: rgba(247, 243, 243, 0.973);
}
.button2click{
    color: white;
    background-color: rgb(239, 138, 37);
}
.button-wrapper {
  display: inline-flex;
  flex-wrap: wrap; /* 添加该样式 */
  width: 100%; /* 添加该样式 */
}

</style>