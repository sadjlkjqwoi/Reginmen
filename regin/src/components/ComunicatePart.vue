<template>
    <div class="backCom">
        <div class="box">
      <div class="header1">
        <li><div class="topic1"></div><a href="#">热门话题</a></li>
        </div>
        <div class="header1">
        <li><a href="#"><div class="topic2"></div>猜你想看</a></li>
        </div>
        <div class="header1 ">
        <li><a href="#"><div class="topic3"></div>打卡聚榜</a></li>
        </div>
        <div class="header1">
          <buttonUse buttonText="发表话题" @click="toggleTopicBox" class="butmar"></buttonUse>
          <!-- //浮窗 -->
          <div class="overlay2"></div>
          
     <div v-show="show1" class="show3 popup3">
       <!-- <p>{{ selectedCard.acticle }}</p> -->
       <!-- 这是显示输入评论的地方 -->
       <!-- //话题和评论的提交都没有审核！！！！ -->
        <div>话题名称</div>
        <!-- //显示提交话题的文本框  -->
        <textarea v-if="showTopicBox" v-model="TopicName"></textarea>
        <div>话题内容</div>
        <textarea v-if="showTopicBox" v-model="TopicText"></textarea>  
        <buttonUse v-if="showTopicBox" @click="sendTopic" buttonText="发送"></buttonUse>
        <!-- //混乱盒子聚集地 -->
        <!-- //不要问那个倒霉前端，她自己都已经恸哭啦 -->
        <buttonUse @click="closeTopicPopup" class="btn" buttonText="关闭">Close</buttonUse>
     </div>
     </div>
     </div>
      
      <!-- 这是提交话题的 -->
        
    <div class="box2">
        <!-- 这个选择方法没写啊 -->
      <div class="content11 " v-for="(item, index) in data1" :key="index">
        <li >
          <div class="container11"  @click="showPopup(index)">
            <div class="left" :style="getRedColor(index)">&nbsp;{{ index+1 }}</div>
            <h2 class="center h211"><a class="center h211 a2" >{{ item.name }}</a></h2>
                 <div class="right">{{ item.count }}</div>
          </div>
        </li>
      </div>
      <div class="overlay"></div>

      <!-- //显示评论 -->
     <div v-show="show2" class="popup show2">
     <div class="split">

       <div class="left1" >
        <h211 class="top1">{{ selectedCard.name }}</h211><br>
         <div class="middle1">
         <p>{{ selectedCard.content }}</p>
         </div>
         
         <div class="bottom1">
          <div v-for="(item,index) in data2" :key="index">
          <div >
            <span>{{ item.user_id }}</span>
          <br>
          <p>{{ item.content }}</p>
          <hr class="hr1">
          </div>
      </div>
         </div>
         <div v-show2 = show2>
        <buttonUse buttonText="发表评论" @click="toggleCommentBox"></buttonUse>
        <textarea v-if="showCommentBox" v-model="commentText"></textarea>
          <button v-if="showCommentBox" @click="sendComment">发送</button>
          <buttonUse @click="closePopup" class="btn" buttonText="关闭">Close</buttonUse>
       </div>
       
     </div>
       </div>
       
          <!-- 弹窗用户发表评论显示评论 -->
        

        </div>
       <!-- <p>{{ selectedCard.acticle }}</p> -->
       <!-- 这是显示输入评论的地方 -->
       

      
     </div>
     <div class="box3">
        <div class="header2">
        </div> 
      <div class="footer1" v-for="(item, index) in data1" :key="index">
        <li >
          <div class="topic5"></div>
          <a>{{ item.name}}</a>
        </li>
      </div>
    </div>
   </div>
    
</template>
<script>
import axios from 'axios';
import buttonUse from '../style/buttonUse.vue';

//评论，计算热度点击，发表话题
export default {
  components:{
     buttonUse,
   },
    data(){
        return{
            data1:[],
            data2:[],
           //label
           selectedCard:{},
           show2:false,
           show1: false, 
           t_user_id:'',
           topic_id:0,//当前话题的id
           //一个topics_users用来添加数据库的
           t_u:{
            id:0,
            user_id: sessionStorage.getItem('session_id'),
            topics_id:0,
            content:'',
           },

           showCommentBox: false,//初始不显示写入评论框哈
           commentText: "",

           showTopicBox: false,//初始不显示写入评论框哈
           TopicName: "",
           TopicText: "",
           

           hoverEasing: 'cubic-bezier(0.23, 0.8, 0.32, 1)',
           returnEasing: 'cubic-bezier(0.445, 0.05, 0.45, 0.95)',
         }
    },
    mounted() {
    axios.get('/TopicSort').then(response => {
      this.data1 = response.data;
    }).catch(error => {
      console.log(error);
    });
    //获得用户id
    this.id = sessionStorage.getItem('session_id');
     console.log(this.id);

   
    
  },
  methods:{
    getRedColor(index) {
  if (index == 0) {
    return { color: 'rgba(249, 12, 7, 0.727)' };
  } else if(index == 1){
    return{ color:'rgba(247, 127, 8,0.801)' };
  }
  else if(index == 2){
    return {color:'rgba(241, 175, 9, 0.774)'};
  }
  else if(index > 2){
    return { color: 'rgba(1, 32, 12, 0.862)' };
  }
  },
showPopup(index){
       this.selectedCard = this.data1[index];
       this.show2 = true;
       document.querySelector('.overlay').style.display = 'block';
       document.querySelector('.popup').style.display = 'block';
       this.topic_id = this.data1[index].id;
       axios.get('/AllReviews_topics',{params:{id:this.topic_id}}).then(response => {
       this.data2 = response.data;
       this.t_user_id = response.data.user_id;
   }).catch(error => {
     console.log(error);
   });
   //点击就加一次热度count
   axios.get('/IncreaseHot',{params:{id:this.topic_id}}).catch(error => {
     console.log(error);
   });

     },
     closePopup(){
       this.show2 = false;
       document.querySelector('.overlay').style.display = 'none';
       document.querySelector('.popup').style.display = 'none';

     },
     closeTopicPopup(){
       this.showTopicBox = false;
       document.querySelector('.overlay2').style.display = 'none';
       document.querySelector('.popup3').style.display = 'none';

     },
     change(){
        //忘记是要写什么的方法了
     },
    //显示评论框
    toggleCommentBox() {
      if(this.id === '20210011'){
        alert("非注册用户不能发表评论哦!请先注册登录!")
      }else{
        this.showCommentBox = !this.showCommentBox;
      }
    },
      toggleTopicBox() {
      if(this.id === '20210011'){
        alert("非注册用户不能发表话题哦!请先注册登录!")
      }else{
        this.showTopicBox = true;
        document.querySelector('.overlay2').style.display = 'block';
       document.querySelector('.popup3').style.display = 'block';
      }
    },
    sendComment() {
     if(this.commentText != null){
      this.t_u = {};
      // 执行发送操作
      console.log(this.t_u.user_id);
      this.t_u.id = null;
      this.t_u.user_id = sessionStorage.getItem('session_id');
      
      this.t_u.topics_id = this.topic_id;
      this.t_u.content = this.commentText;
      console.log(this.t_u);
      console.log(this.commentText);

// 执行评论数据的 POST 请求
// Reviews_topics: this.t_u 
      axios
      .post('/addReviews_topics', {id:this.t_u.id,user_id:this.t_u.user_id,topics_id:this.t_u.topics_id,content:this.t_u.content })
      .then(response => {
        // 在这里处理服务器响应
        console.log(response.data);
      })
      .catch(error => {
      console.log(error);
  });
      this.showCommentBox = !this.showCommentBox;
     }else{
      alert("请先输入内容，评论不可以为空哦")
     }

    },
    

    sendTopic() {
     if(this.TopicText != null){
      let id = null;
      let name = this.TopicName;
      let user_id = sessionStorage.getItem('session_id');
      let content = this.TopicText;
      console.log(id,name,user_id,content)
// 执行评论数据的 POST 请求
// Reviews_topics: this.t_u 
      axios
      .post('/addTopic', {id:id,name:name,user_id:user_id,content:content})
      .then(response => {
        // 在这里处理服务器响应
        console.log(response.data);
      })
      .catch(error => {
      console.log(error);
      this.show2 = false;
       document.querySelector('.overlay').style.display = 'none';
       document.querySelector('.popup').style.display = 'none';
  });
      this.showTopicBox = !this.showTopicBox;
     }else{
      alert("请先输入内容，评论不可以为空哦")
     }

    },
    
    // vue不支持
    // showCommentBox() {
    //     // 创建评论文本框
    //     const commentBox = document.createElement('textarea');
    //     commentBox.id = 'commentBox';
    //     document.body.appendChild(commentBox);

    //     // 创建发送按钮
    //     const sendButton = document.createElement('button');
    //     sendButton.textContent = '发送';
    //     sendButton.onclick = this.sendComment;
    //     document.body.appendChild(sendButton);
    //   },


  }
}
    
</script>
<style scoped lang="scss">

.active{
  color: red;
}
.backCom{
  margin: 10px 230px;
  width: 1150px;
  height: 1500px;
  display: flex;
}
.box {
  background-color: white;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  width: 30%;
  
}
.box2{
  display: flex;
  flex-direction: column;
  width: 50%;
  border-radius: 8px;
  margin-left: 10px;
}
.box3{
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-left: 10px;
  border-radius: 8px;
  text-align: left;
}
.header1{
  height: 50px;
  color: hsla(0, 3%, 18%, 0.764);
}
.header1 li a{
  margin-left: 65px;
}
.header1 .butmar{
  margin-left: 40px;
}
.header2{
  border-radius: 8px;
  width: 100%;
  height: 300px;
  background-size: 100% 100%;
  background-image: url('../assets/back2.jpg');
  opacity: 0.8;
}
a{
    font-size: 16px;
    text-align: left;
    color: rgba(107, 103, 103, 0.755);
}
a:hover{
    color: rgba(10, 82, 58, 0.8);
}
.footer1{
    height: 50px;
    margin-left: 30px;
}
.content11 {
  height: 65px;
  width: 100%;
  background-color: white;
  margin-bottom: 5px;
  border-radius: 8px;
  display: flex;
  font-family: 'Times New Roman', Times, serif;
  justify-content: space-between;
}
// .content11 li h211{
//   margin-left: 45px;
// }
.h211{
    width: 90%;
    margin-left: 20px;
    border-radius: 5px;
    color: rgba(1, 32, 12, 0.862);
}
li {
  width: 100%;
  list-style: none;
  padding: 11px 0px 5px 0px;
  position: relative;
}
.topic1{
  width: 25px;
  height: 25px;
  background-image: url('../img/1.png');
  position: absolute;
  left: 40px;
}
.topic2{
  width: 25px;
  height: 25px;
  background-image: url('../img/2.png');
  position: absolute;
  left: 40px;
}
.topic3{
  width: 25px;
  height: 25px;
  background-image: url('../img/3.png');
  position: absolute;
  left: 40px;
  
}
.topic4{
  width: 25px;
  height: 25px;
  background-image: url('../img/4.png');
  position: absolute;
  left: 40px;
  top: 12px;
}
.t_count{
  margin: auto 10px;
}
.container11 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content:left;
  padding-left: 60px;
}

.left {
  position: absolute;
  font-size: 30px;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: rgba(10, 131, 10, 0.279);
  order: 1;
  left: 5px;
  top: 10px;
  justify-content:left;
}

.center {
  font-size: 23px;
  order: 2;
  margin-top: 2.5px;
  display: inline-block;
  justify-content:left;
  margin-left: 0px;
  font-weight: 800;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.right {
  margin-right: 0px;
  order: 3;
  color: rgba(111, 111, 111, 0.601);
  justify-content:left;
}
.popup{
   // margin: auto;
   border-radius: 30px;
   position: fixed;
   z-index: 9;
   top:100px;
   border:  #3333337e solid 1px;
   width: 500px;
   height: 700px;
   background-color: #fff;
   display: none;
   transition: background-color 2s;
 }
 .popup3{
   // margin: auto;
   border-radius: 30px;
   position: fixed;
   z-index: 9;
   top:100px;
   border:  #3333337e solid 1px;
   width: 400px;
   height: 400px;
   background-color: #fff;
   display: none;
   transition: background-color 2s;
 }
 .split{
  padding: 20px;
  display: flex;
   flex-direction: column;
   border-radius: 20px;
 }
 .left1{
   width: 100%;
   height: 700px;
   opacity: 1;
   border-radius: 20px 0 0 20px;
   background-size: 100% 100%;
 }
 .right2{
   width: 55%;
   height: 600px;
   margin: 20px 10px;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   overflow-y: scroll;
 }
 .show2 {
 display: flex;
 justify-content: center;
 align-items: center;
 animation: popup-show2-animation 2s forwards;
 background-color: rgb(255, 248, 248);
 z-index: 50;
}
.show3 {
 display: flex;
 justify-content: center;
 padding: 50px;
 align-items: center;
 animation: popup-show-animation 2s forwards;
 background-color: rgba(46, 44, 44, 0.625);
 z-index: 50;
}
.topic5{
  width: 25px;
  height: 25px;
  background-image: url('../img/5.png');
  position: absolute;
  margin-top: -5px;
  margin-left: -27px;
}
.a2:hover{
    color: rgba(10, 82, 58, 0.8) !important;
}

.color-red {
  color: #FF0000;
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
.top1{
  margin-top: 20px;
  height: 5%;
}
.middle1{
  height: 30%;
  overflow-y: scroll;
  margin-top: 0px;
}
.middle1 p{
  font-size: 16px;
}
.bottom1{
  height: 40%;
  margin-bottom: 20px;
  overflow-y: scroll;
  border-top: #a9eb8089 solid 2px;
  
}
.bottom1 p{
  font-size: 18px;
}
.hr1{
  color: rgba(123, 125, 124, 0.41);
  width: 90%;
}
</style>