<template>
  <!-- 不明白我个智障为什么想用v-card，反正没能排版出来，有空再改一下吧 -->
  <!-- Col用起也失败了 -->
  <div>
  <div>
      
    
      <div class="title1">
        <div class="pos1">热度推荐</div>
        
        <!-- <i class="ivu-icon ivu-icon-ios-checkmark"></i> -->
        <!-- <Icon type="md-refresh" /> -->
        <div class="margin1"><CardGallery>这是热度推荐卡片</CardGallery></div>
        
      </div>
    </div>
    
    
    <div>
      <div class="title1">
        <div class="pos">个人推荐</div>
        
        <div>
          <SelfPushCard>这是热度推荐卡片</SelfPushCard>
        </div>
      </div>
  </div>
  <!-- 日期推荐DatePush的组件 -->
  <div>
  <div class="title1">
    <div class="pos">日期推荐</div>
    <div>
      <DatePush class="Date">这就是根据日期推荐的地方</DatePush>
    </div>
  </div>
</div>
  
  <!-- <div class="show">
    </div> -->
</div>
</template>
  
<script >
import CardGallery from "../style/homePageCard.vue";
import DatePush from "../components/DatePush.vue";
// import SelfPart from "./SelfPart.vue";
import SelfPushCard from "@/style/SelfPushCard.vue";

export default {
  components: {
    // Guidance,
    CardGallery,
    DatePush,
    // SelfPart,
    SelfPushCard,
},
  data() {
    return {
      links: [
        {
          key: '帮助',
          title1: '帮助',
          href: 'https://www.iviewui.com',
          blankTarget: true
        },
        {
          key: 'github',
          icon: 'logo-github',
          href: 'https://github.com/view-design/ViewUIPlus',
          blankTarget: true
        },
        {
          key: '条款',
          title1: '条款',
          href: '',
          blankTarget: true
        }
      ],
      copyright: 'Copyright © 2022 View Design All Rights Reserved'
    }
  },
  methods: {

  }

}
</script>

<style scoped>

/* 设置 ViewUIPlus 的样式优先级最高 */
/* .view-ui-plus * {
  all: unset !important; */
  /* 添加更高的优先级 */
  /* font-size: 16px !important;
  line-height: 1.5 !important;
  color: #333 !important; */
  /* 更多样式属性 */
/* } */

body {
  background-color: #f5f5f5;
}
.margin1{
  width: 100px !important
}
.title1{
  margin-left: 200px;
  margin-top: 50px;
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
}
.Date{
  margin-right: 80px;
  margin-top: 25px;
}
.SelfPushing{
  margin-top: 100px;
}
/* .show{
  position: absolute;
  width: 500px;
  height: 500px;
  background-color: white;
  margin: 200px;
} */
</style>
  