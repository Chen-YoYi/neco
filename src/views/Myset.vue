<template>
  <div class="mySet">
    <van-nav-bar
      title="我的设置"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <Bgc></Bgc>
    <div class="set_box">
      <p @click="resetPassWord">修改密码</p>
      <p @click="relogin">切换账号</p>
      <p @click="delUser">账号注销</p>
      <p @click="exit">退出登陆</p>
    </div>
  </div>
</template>
<script>
import Bgc from "../components/Bgc.vue";
export default {
  name: "Myset",
  components: {
    Bgc,
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 退出登陆
    exit() {
      let tokenString = localStorage.getItem("__tk");

      this.$dialog
        .confirm({
          title: "退出登陆",
          message: "是否确认退出登陆页面？",
        })
        .then(() => {
          // on confirm

          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0,
          });

          this.axios({
            url: "/logout",
            method: "POST",
            data: {
              appkey: this.appkey,
              tokenString: tokenString,
            },
          })
            .then((res) => {
              this.$toast.clear();
              localStorage.removeItem("__tk");
              this.$toast(res.data.msg);
              // 返回登陆页面
              this.$router.push({ name: "login" });
            })
            .catch((err) => {
              this.$toast.clear();
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    //注销账号
    delUser() {
      let tokenString = localStorage.getItem("__tk");

      this.$dialog
        .confirm({
          title: "账号注销",
          message: "注销后将永久删除，是否确认注销？",
        })
        .then(() => {
          // on confirm
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0,
          });

          this.axios({
            url: "/destroyAccount",
            method: "POST",
            data: {
              appkey: this.appkey,
              tokenString: tokenString,
            },
          })
            .then((res) => {
              this.$toast.clear();
              localStorage.removeItem("__tk");
              this.$toast(res.data.msg);
              // 返回登陆页面
              this.$router.push({ name: "login" });
            })
            .catch((err) => {
              this.$toast.clear();
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 重新登陆
    relogin() {
      this.$dialog
        .confirm({
          title: "切换账号",
          message: "是否切换账号？",
        })
        .then(() => {
          localStorage.removeItem("__tk");
          this.$router.push({ name: "Login" });
        })
        .catch(() => {});
      // this.exit();
    },
    //修改密码
    resetPassWord() {
      this.$router.push({ name: "NewPass" });
    },
  },
};
</script>
<style lang="less" scoped>
@stylecolor: #333752;
.mySet {
  .set_box {
    margin: 0px 36px;
    p {
      padding: 14px 0px;
      border: 2px solid @stylecolor;
      font-size: 16px;
      background-color: #fff;
      border-radius: 4px;
    }
  }
}
</style>