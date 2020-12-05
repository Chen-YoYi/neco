<template>
  <div class="main">
    <router-view></router-view>

    <van-tabbar v-model="isTab" active-color="#f9ce0e" inactive-color="#333752">
      <van-tabbar-item
        v-for="(item, index) in tabbarsData"
        :key="index"
        :icon="item.icon"
        @click="goPage(item.name, item.tab)"
      >
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "Main",
  mounted() {
    
    if (this.$route.params.getDetail) {
      
      this.goPath();
    }
  },
  data() {
    return {
      tabbarsData: [
        {
          title: "首页",
          name: "Home",
          icon: "home-o",
          tab: 0,
          // path:'/main/home',
        },
        {
          title: "菜单",
          name: "Menu",
          icon: "shop-o",
          tab: 1,
          // path:'/main/menu'
        },
        {
          title: "订单",
          name: "Cart",
          icon: "bag-o",
          tab: 2,
          // path:'/main/cart'
        },
        {
          title: "我的",
          name: "Mine",
          icon: "user-o",
          tab: 3,
          // path:'/main/mine'
        },
      ],
      isTab: 0,
    };
  },
  methods: {
    // 页面跳转
    goPage(name, tab) {
      this.isTab = tab;
      this.$router.push({name});
    },
    goPath() {
      this.tab = this.$route.params.index;
      this.$router.push({
        name: this.$route.params.name,
        params: {
          pid: this.$route.params.pid,
          getDetail: true,
          index: 1,
        },
      });
    },
  },
  watch: {
    $route: {
      handler(val) {
        let tab = 0;
        switch (val.name) {
          case "Home":
            tab = 0;
            break;
          case "Menu":
            tab = 1;
            break;
          case "Cart":
            tab = 2;
            break;
          case "Mine":
            tab = 3;
            break;
        }
        this.goPage(val.name,tab);
      },
      // deep: true,
            immediate: true
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  .van-tabbar-item {
    font-weight: bold;
    letter-spacing: 6px;
  }
}
</style>