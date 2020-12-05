<template>
  <div class="home">
    <!-- 搜索栏 -->
    <!-- <div class="home_search">
      <div class="search_box">    
        <input v-model="valSearch" class="fl" type="text"  @keyup = "mySearch"/>
      </div>

      <div>

      </div>
    </div> -->
    <!-- 广告栏 -->
    <Bgc content=""></Bgc>
    <!-- <Bgc></Bgc> -->
    <div class="home_banner">
      <!-- <div class="home_banner_bgc"></div> -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in bansData"
          :key="index"
          :style="{ background: `url(${item.bannerImg}) `}"
          @click="goDetail(item.pid)"
        >
          <p class="home_banner_name">【{{ item.name }}】</p>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 选项框 -->
    <div class="home_option clearfix">
      <!-- 堂食 -->
      <div class="eatin fl" @click="goMenu(false)">
        <h1>堂食</h1>
        <p>eat-in</p>
      </div>
      <div class="eatin_shadow"></div>
      <!-- 外带 -->
      <div class="eatout fr" @click="goMenu(true)">
        <p>eat-out</p>
        <h1>外带</h1>
      </div>
      <div class="eatout_shadow"></div>
    </div>

    <!-- 今日推荐 -->
    <div class="home_recommend">
      <h3 class="home_recommend_title">即将上线</h3>

      <div class="home_recommend_product">
        <div class="fl home_recommend_left"></div>
        <div class="fr home_recommend_right">
          <div>
            <img src="../assets/images/staff_1025.jpg" alt="" />
            <p><span class="forward_icon"></span></p>
          </div>

          <div>
              <!-- <h1 class="title">咖啡商城</h1> -->
            <img src="../assets/images/staff_1024.jpg" alt="" />
            <p><span class="forward_icon"></span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/home.less";
import Bgc from '../components/Bgc.vue'
export default {
  name: "Home",
  data() {
    return {
      bansData: [],
      prosData: [],
      valSearch :"",
    };
  },
  components:{
    Bgc
  },
  created() {
    // 轮播图广告数据
    this.axios({
      method: "GET",
      params: { appkey: this.appkey },
      url: "/banner",
    })
      .then((res) => {
        this.bansData = res.data.result;
        
      })
      .catch((err) => {
        
      });

    // 推荐商品数据
    this.axios({
      method: "GET",
      params: { appkey: this.appkey, key: "isHot", value: 1 },
      url: "typeProducts",
    })
      .then((res) => {
        
        this.prosData = res.data.result;
      })
      .catch((err) => {
        
      });
  },
  methods: {
      // 点击跳转详情页查看具体商品
      goDetail(pid){
        this.$router.push({
          name:"Menu",
          params:{
            pid : pid,
            getDetail :true, 
            index : 1
          }
        });
      },

      // 是否堂食并跳转点餐
      goMenu(bool){
        this.$router.push({
          name :"Menu",
          params : {
            //是否外卖点餐
            iseatOut : bool,
            index : 1
          }

        })
      }
  },
};
</script>