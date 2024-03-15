<template>
    <div class="backself">
        <div class="leftshow">
          <div class="lefttop">
            
            <div class="datashow">
                    <div  id="pieChart" :style="{width: '500px', height: '400px'}">
                    </div>
                </div>

                <div class="tablelink">
                    <li><router-link active-class="active" to="/HomePage">个人资料</router-link></li>
                
                    <li><router-link active-class="active" to="/HomePage">我的话题</router-link></li>
                
                    <li><router-link active-class="active" to="/HomePage">实名认证</router-link></li>
                
                    <li><router-link active-class="active" to="/HomePage">退出登录</router-link></li>
                
            </div>
          </div>
            <!-- 数据可视化 -->
                 <div class="datapotision1" id="myChart1" :style="{width: '650px', height: '600px'}"></div>
                 
    </div>
        </div>
        <div class="rightshow">
            <div class="showuser">
                <div class="img"><img src="../assets/head.jpg"></div>
                <div class="name">
                    <h2>{{user.id}}</h2>
                    <buttonUse  buttonText="退出登录" @click="out">退出登录</buttonUse>
                </div>
            </div>
            <div class="message-label">
                <div class="message">
                    <h2 class="h2"><b>基本信息显示</b></h2>
                    <form>
                        <span>用户昵称: {{ user.id }}</span> <br>
    
                        <span>年龄: {{ user.age }}</span><br>
                        <span>性别: {{ user.sex }}</span><br>
                        <span>电话: {{ user.phone }}</span><br>
                        <h2><b> 标签显示/修改</b></h2>
                    </form>
                </div>
            </div>
            
            <div class="bottomstyle">
              <i class="label-item"
              v-for="(item, key) of labelsChoosed" 
              :key="key" >
              <p >{{ item.name }}</p>
            </i>            
            </div>
            <div>
              <buttonUse buttonText="添加标签"></buttonUse>
            <buttonUse buttonText="删除标签"></buttonUse>
            </div>
            
    </div>
      
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';
import buttonUse from '@/style/buttonUse.vue';


export default {
  
  name: 'EchartsUse',
  components:{
    buttonUse,
  },
  data() {
    return {
      data: [],
      data2: [],
      labelsChoosed:[],
      itemStyle: ["#3fb1e3","#c4ebad","#c4ebad","#6be6c1",
        "#3fb1e3","#c4ebad","#3fb1e3","#3fb1e3","#3fb1e3","#3fb1e3"],
        user:{
            id:'',
            age:'',
            sex:'',
            phone:'',
            label:[]
        },
      data3: [
        { name: '16-44岁', value: 100 },
        { name: '44-60岁', value: 100 },
        { name: '60岁以上', value: 100 },
      ],
    };
  },
  mounted() {
    let id = sessionStorage.getItem('session_id');
      if(id=='20210011'){
        this.user.id = '游客';
        this.user.age = '无';
        this.user.sex = '无';
        this.user.phone = '无';
        this.user.label = null;
        console.log(this.user.id)
    }else{
        axios.get('/findUser',{ params: { id: id } }).then(response => {
            console.log(this.user)
      this.user.id = response.data.id;
      this.user.sex = response.data.sex;
      this.user.age = response.data.age;
      this.user.phone = response.data.phone;
      this.user.label = response.data.label;
      console.log(this.user.id)
    }).catch(error => {
      console.log(error);
    });
    }

    this.fetchAgeData();

    axios.get('/findUser_label',{ params: { id: sessionStorage.getItem('session_id') } }).then(response => {
      console.log(response.data)
            this.labelsChoosed = response.data;
    }).catch(error => {
      console.log(error);
    });

    let myChart1 = echarts.init(document.getElementById('myChart1'));

    axios.get('/findTop10').then(response => {
      this.data = response.data;
      
      axios.get('/findOdds').then(response => {
        this.data2 = response.data;
        console.log(this.data2);

        // 绘制图表
        myChart1.setOption({
          title: {
            text: '网站top10标签分析',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#555555'
            }
          },
          tooltip: {},
          xAxis: {
            data: this.data.map(item => item.name),
          },
          yAxis: {},
          series: [{
            name: '热度',
            type: 'bar',
            data: this.data.map((item, index) => ({
              value: item.count,
              itemStyle: {
                color: this.itemStyle[index % this.itemStyle.length],
              },
            })),
          }]
        });
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });

    
  },
  methods:{
      fetchAgeData(){
        //获得年龄和年龄占比
        axios.get('/AgeCount').then(response => {
        console.log(response.data);
        this.data3[0].value = response.data[0];
        this.data3[1].value = response.data[1];
        this.data3[2].value = response.data[2];

        this.renderPieChart();
      }).catch(error => {
        console.log(error);
      });
    },

    //绘制饼图
    renderPieChart(){
      let chart = echarts.init(document.getElementById('pieChart'));
    const option = {
      title: {
        text: '网站用户年龄分布',
        left: 'center',
        textStyle: {
          color: '#555555'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%'
      },
      series: [
        {
          name: '年龄',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: this.data3.map(item => ({
            name: item.name,
            value: item.value
          })),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            formatter: '{b}: {d}%'
          }
        }
      ]
    };
    
      // 使用数据更新饼图的配置项
      option.series[0].data = this.data3.map(item => ({
      name: item.name,
      value: item.value
    }));


    // 使用配置项绘制图表
    chart.setOption(option);
    }
  },
  out(){
    if(sessionStorage.getItem('session_id')===''){
      alert("你还没有登录")
    }else{
      window.sessionStorage.setItem('session_id', '');
      this.$router.push('/');
    }
  }
};

</script>

    <style scoped>
    .backself{
      margin-left: 230px;
      width: 700px;
      height: 1500px;
      display: flex;
      justify-content: space-between;
      background-color: rgb(255, 255, 255);
      margin-top: 10px;
    }
    .lefttop{
      display: flex;
      justify-content: space-between;
    }
    .img{
        width: 17%;
        padding-bottom: 10px;
    }
    img {
      width: 100px;
      height: 100px;
      margin-left: 10px;
      display: block;
      margin-top: 10px;
      border-radius: 50%;
      border: rgb(11, 54, 23) solid 1px;
    }
    .leftshow{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      background-color: white;
    }
    .rightshow{
      display: flex;
      flex-direction: column;
      width: 400px;
      margin-top: 10px;
      margin-left: 5px;
      margin-right: 230px;
    }
    .datapotision1{
      margin-top: -150px;
      border-top: rgba(11, 149, 89, 0.105) solid 2px;
    }
    .tablelink li{
        list-style-type: none;
        margin: 50px 0 ;
        width: 100px;
        marker: none;
    }
    a{
      font-size: 20px;
    }
    a:hover{
        background-color: rgba(142, 234, 234, 0.541);
    }
    .message-label{
      width: 100%;
    }
    .showuser{
        background-color: white;
        display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .name{
        width: 80%;
        margin-top: 10px;
        text-align: left;
        padding-left: 50px;
    }
    .message{
        width: 100%;
        background-color: white;
        height: 200px;
        text-align: left;
        padding-left: 20px;
    }
    .datashow{
        width: 100%;
        background-color: white;
        height: 500px;
    }
    .h2{
        margin-bottom: 20px;
        width: 100%;
    }
    .bottomstyle{
        font-size: 20px;
        background-color: rgb(255, 255, 255);
        padding: 3px;
      }
      .label-item {
      background-color: #eee;
      color: #333;
      padding: 10px;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;
      float: left;
    }
    </style>