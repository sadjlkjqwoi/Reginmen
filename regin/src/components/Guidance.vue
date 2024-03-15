<template >
  <div class="Guidance">
    <!-- 这里用theme定义样式 -->
    <div class="center0">
      <h2 class="theme">欢迎来到选择标签</h2>
    </div>
    <div class="center1">
      <h3>
      根据实际情况选择自己的标签吧！
      </h3>
    </div>

    <div class="backGuidance">
      <!-- 此处的class=bottomStyle是样式 -->
      <div class="bottomstyle ul">
           <i class="label-item"
            v-for="(item, key) of name" 
            :key="key" @click="checkboxChange(key, item);changeSpan(key) "
            :class="{'bgcolor':spanIndex.indexOf(key)>-1}">
            <p :style="{color: getRandomColor() }">{{ item.name }}</p>
           </i>
      </div>
      
    </div>
    <div>
    <buttonUse style="margin-left: 400px;" buttonText="提交" @click="submit()">提交</buttonUse>
    </div>
  </div>
 
</template>

<script>
import axios from 'axios';
import buttonUse from '@/style/buttonUse.vue';
// import { ref } from 'vue';

export default {
  name: 'GuidanceCom',
  components:{
    buttonUse,
  },

  data() {
    return {
      name: [],
      keyword: '',
      spanIndex:[],
      label_id:'',
    }
  },
  async created() {
      try {
      const data = await this.getLabel();//获取成功
      this.name = data.map(item => ({...item, selected: false}));
      // console.log(name);
       } catch (error) {
      console.log(error);
      this.name = [];
      }
  },

  methods: {
    submit() {
  let id = sessionStorage.getItem('session_id');
  const labels_ids = this.label_id.map(num => num.toString()).join(',');
  console.log(id,labels_ids)
  axios.post('/getSelectLabel', { id:id, labels_ids:labels_ids }).then(response => {
    if (response.status === 200) {
      console.log("success");
      this.$router.push('/login');
    }
  }).catch(error => {
    console.log(error);
    throw error;
  });
},

      async getLabel() {
          let params = {keyword: this.keyword,}
          
          try {
              const response = await axios.get('/showAllLabels', { params: params })
              console.log(response);
              let datas = response.data
              return datas;
          } catch (error) {
              console.log(error)
              throw error
            }
          },

      async created() {
          try {
              const data = await this.getLabel();
              this.name = data.map(item => ({...item, selected: false}));
            } catch (error) {
             console.log(error);
              this.name = [];
            }
          },


//选择标签传入label的值
checkboxChange(index, item) {
    console.log('checkboxChange e:', item.name,item.id)

    // 动态修改数组中某个值
    item.selected = !item.selected;
    let detailValue = this.name.filter(it => it.selected).map(it => it.name);
    this.label_id = this.name.filter(it => it.selected).map(it => it.id);
    console.log('所有选中的值为：', detailValue)
    console.log('所有选择的标签id为',this.label_id)

    // 获取当前用户的session id
    // let session_id = sessionStorage.getItem('session_id');

    // 传入选择的标签值和标签id以及session id
    // this.$emit('select-label', { id: session_id, label_id: label_id });

    // 发送数据到后端
    // this.sendDataToBackend({id: session_id, label_id: label_id });

},

    getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      },
    changeSpan(index){
     let arrIndex = this.spanIndex.indexOf(index);
     // console.log(arrIndex);
     
     if(arrIndex>-1){
         this.spanIndex.splice(arrIndex,1);
     }else{
         this.spanIndex.push(index);
     }
  },
},
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.backGuidance{
  display: inline-flex; /* 添加该样式 */
  width: 70%;
  background-color: #e8ebeac5;
  border-radius: 16px;
}
.theme{
  color:greenyellow;
  
}
.center0{
  padding-left: 300px;
}
.center1{
  padding-left: 250px;
}
.ul {
  
  padding: 20px;
  width: 100%;
  display: flex;
flex-wrap: wrap;
justify-content: center;
  
}
.label-item {
background-color: white;
color: #111111;
padding: 6px 20px;
margin: 5px;
border-radius: 30px;
opacity: 0.7;

// cursor: pointer;//图标
}
a {
  color: #42b983;
}
.bottomstyle{
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.064);
  padding: 3px;
  align-items: center;
}
i{
  display: inline-block;
  list-style-type: none;
  height: 40px;

}
.bgcolor{
border: 2px solid #4D90FE;
box-shadow: 0 0 10px #4D90FE;
}
.Guidance{
  padding: 20px 0px 0px 400px;
}
</style>
