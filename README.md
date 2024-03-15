# "椿生"-个性化服务养生平台

## 项目介绍

基于Spring Boot +Vue的个性化推荐养生信息的平台，实现了根据用户选择的个性化标签来推荐养生信息，给用户推荐热点养生信息并且实现了可视化数据分析等功能。

## 功能实现

1. 根据用户选择的个性化标签来推荐养生信息。
2. 根据日期、节气推荐养生信息
3. 根据当下热度推荐相应养生信息。
4. 用户可以评论、点赞、收藏养生信息和养生话题。
5. 用户可以在论坛上相互交流自己的养生经验和查看当天热点的养生话题。
6. 推荐养老保健机构。
7. 可视化数据分析。



## 技术选型

1. 选用 MyBatis + MyBatis-Plus 进行数据访问层开发，复用大多数通用方法，并且通过继承定制了自己的 通用操作模板 ，大幅提升了项目开发效率。
2. 选用**Python爬虫技术**实现了数据采集和分析，项目的后台数据获取更加的方便和快捷。
3. 实现了多个数据库表之间的关联、复杂数据的关联分析和查询功能。
4. 结合**Echarts**深度数据可视化工具，可以实现对数据的深入挖掘和分析。

## 功能创新

相比同类型的项目，我们的“椿生”项目将用户分为了三个群体，分别为：年轻人、中年人、老年人。我们根据每个用户的年龄设置了三种符合以上年龄人群不同主题风格和推荐符合该年龄段的养生信息，更加有针对性。

 

**年轻人主题**

![img](file:///C:\Users\XUSHAO~1\AppData\Local\Temp\ksohtml14320\wps1.png) 

**中年人主题**

![img](file:///C:\Users\XUSHAO~1\AppData\Local\Temp\ksohtml14320\wps2.png) 

 

**老年人主题**

![img](file:///C:\Users\XUSHAO~1\AppData\Local\Temp\ksohtml14320\wps3.png)

## 功能展示



**个性化标签选择界面**

![image-20240315210113700](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210113700.png)



**热度推荐界面**

![image-20240315210123183](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210123183.png)

**个人兴趣推荐界面**

![image-20240315210131422](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210131422.png)

 **食物科普界面**

![image-20240315210146436](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210146436.png)

**食谱介绍界面**

![image-20240315210153537](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210153537.png)

**数据可视化分析界面**

![image-20240315210203777](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210203777.png)

![image-20240315210208070](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210208070.png)

**热度话题榜界面**

![image-20240315210216106](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210216106.png)

 **用户论坛界面**

![image-20240315210225216](C:\Users\xushaofang\AppData\Roaming\Typora\typora-user-images\image-20240315210225216.png)