<template>
  <div class="collectList">
    <van-nav-bar
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <Bgc></Bgc>

    <div class="loveProduct" v-if="loveDate.length > 0">
      <div class="loveBox clearfix">
        <div
          class="loveItem fl"
          v-for="(item, index) in loveDate"
          :key="index"
          @click="lookDetail(item.pid)"
        >
          <div class="img">
            <img class="auto-img" :src="item.smallImg" alt="" />
          </div>
          <div class="text">
            <p class="title">{{ item.name }}</p>
            <p>{{ item.enname }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <van-empty description="快去逛逛吧" />
    </div>
  </div>
</template>
<script>
import Bgc from "../components/Bgc.vue";

export default {
  name: "CollectList",
  components: {
    Bgc,
  },
  data() {
    return {
      loveDate: [],
      //是否收藏
    };
  },
  created() {
    this.allLove();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    allLove() {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        this.$router.push({
          name: "Login",
        });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        url: "/findAllLike",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code == 2000) {
            
            this.loveDate = res.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },


    lookDetail(pid) {
      this.$router.push({
        name: "Menu",
        params: {
          pid: pid,
          getDetail: true,
          index:1
  
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.collectList {
  .loveProduct {
    width: 340px;
    margin: 20px auto;
    overflow: hidden;

    .loveBox {
      width: 360px;
      padding: 1px;
      .loveItem {
        width: 165px;
        // background-color: yellow;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px;
        box-shadow: 0px 0px 3px 1px #ccc;
        position: relative;

        .img {
          border-radius: 10px;
          overflow: hidden;
        }

        .text {
          .title {
            font-weight: bold;
          }
        }

        .icon {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0px;
          left: 0px;
          //   background-color: aqua;
        }
      }
    }
  }
}
</style>