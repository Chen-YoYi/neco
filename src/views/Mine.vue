<template>
  <div class="mine">
    <div class="bgimage" @touchstart="tstart()" @touchend="longPress(upData)">
      <img class="auto-img" :src="userBg" alt="" />
    </div>
    <!-- 我的资料 -->
    <div class="userInfo">
      <!-- 我的头像 -->
      <div class="userImg" @touchstart="tstart()" @touchend="longPress(upimg)">
        <img class="auto-img" :src="userImg" alt="" />
      </div>
      <div class="userName">
        <h3>{{ userName }}</h3>
        <div class="introduction">{{ userDesc }}</div>
      </div>

      <!-- 列表 -->
      <div class="base_app">
        <van-grid>
          <van-grid-item
            v-for="(item, index) in gridItem"
            :key="index"
            :icon="item.src"
            :text="item.title"
            @click="goPage(item.name)"
          />
        </van-grid>
      </div>
    </div>

    <!-- 弹出层 -->
    <van-popup v-model="isUpdata">
      <van-uploader :after-read="changeBgimage" accept="image/jpg,png,jpeg" />
    </van-popup>

    <van-popup v-model="isUpimg">
      <van-uploader :after-read="changePhoto" accept="image/jpg,png,jpeg" />
    </van-popup>
  </div>
</template>

<script>
import "../assets/css/mine.less";
import imgbg from "../assets/images/bgi.png";
import imgtx from "../assets/images/tx.jpg";
export default {
  name: "Mine",
  created() {
    
    this.getInfo();
    // this.userBg = localStorage.getItem("bg") || imgbg;
  },
  data() {
    return {
      //功能列表数据
      gridItem: [
        {
          title: "我的资料",
          name: "UserInfo",
          src: require("../assets/images/mine_people.png"),
        },

        {
          title: "地址管理",
          name: "AddressInfo",
          src: require("../assets/images/mine_address.png"),
        },
        {
          title: "我的收藏",
          name: "CollectList",
          src: require("../assets/images/mine_collect.png"),
        },
        {
          title: "安全中心",
          name: "Myset",
          src: require("../assets/images/mine_set.png"),
        },
      ],
      isUpdata: false,
      isUpimg: false,
      // 背景图
      userBg: imgbg,
      userImg: imgtx,
      userName: "MilkCoffee",
      userDesc: "请快快登陆！",
    };
  },

  methods: {
    // 长按逻辑
    tstart() {
      let date = new Date();
      this.passTime = date.getTime();
    },
    // 长按逻辑
    longPress(callback) {
      let date = new Date();
      let nowTime = date.getTime();
      let differenceTime = nowTime - this.passTime;
      if (differenceTime > 500) {
        // 长按逻辑执行成功后回调函数
        if (callback instanceof Function) {
          callback();
        }
      } else {
        return;
      }
    },

    // 弹出层事件
    upData() {
      this.isUpdata = true;
    },
    upimg() {
      this.isUpimg = true;
    },
    // 我的接口
    getInfo() {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        this.$router.push({ name: "Login" });
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        url: "/findMy",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code == "A001") {
            this.userBg = res.data.result[0].userBg;
            this.userImg = res.data.result[0].userImg;
            if (res.data.result[0].nickName != "") {
              this.userName = res.data.result[0].nickName;
            } else {
              this.userName = "MikeCoffee";
            }

            if (res.data.result[0].desc != "") {
              this.userDesc = res.data.result[0].desc;
            } else {
              this.userDesc = "这个人很懒惰什么都没留下";
            }
            if (
              res.data.result[0].userImg ==
              "http://www.kangliuyong.com:10002/assets/default.png"
            ) {
              this.userImg = require("../assets/images/tx.jpg");
            } else {
              this.userImg = res.data.result[0].userImg;
            }
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 背景图片
    changeBgimage(file) {
      // 允许文件类型
      let type = ["gif", "png", "jpg", "jpeg"];
      //允许最大文件大小
      let size = 1;
      //判断文件类型
      let fileType = file.file.type.split("/")[1];
      if (type.indexOf(fileType) === -1) {
        this.$toast(`文件类型只支持${type.join(",")}`);
        return;
      }

      //判断文件大小
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > size) {
        this.$toast(`文件允许最大不能超过${size}MB`);
        return;
      }

      // base64
      let base64 = file.content.replace(/^data:image\/[A-za-z]+;base64,/, "");

      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        url: "/updateUserBg",
        method: "POST",
        data: {
          appkey: this.appkey,
          tokenString: tokenString,
          imgType: fileType,
          serverBase64Img: base64,
        },
      })
        .then((res) => {
          this.$toast.clear();
          console.log(res);

          if (res.data.code == "I001") {
            // localStorage.setItem("bg", res.data.userBg);
            // this.userBg = localStorage.getItem("bg");
            this.$toast(res.data.msg);
            this.isUpdata = false;
            this.getMy();
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 头像
    changePhoto(file) {
      // 允许文件类型
      let type = ["gif", "png", "jpg", "jpeg"];
      //允许最大文件大小
      let size = 1;
      //判断文件类型
      let fileType = file.file.type.split("/")[1];
      if (type.indexOf(fileType) === -1) {
        this.$toast(`文件类型只支持${type.join(",")}`);
        return;
      }

      //判断文件大小
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > size) {
        this.$toast(`文件允许最大不能超过${size}MB`);
        return;
      }

      // base64
      let base64 = file.content.replace(/^data:image\/[A-za-z]+;base64,/, "");

      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        url: "/updateAvatar",
        method: "POST",
        data: {
          appkey: this.appkey,
          tokenString: tokenString,
          imgType: fileType,
          serverBase64Img: base64,
        },
      })
        .then((res) => {
          this.$toast.clear();

          if (res.data.code == "H001") {
            this.userImg = res.data.userImg;
            this.$toast(res.data.msg);
            this.isUpimg = false;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //页面跳转
    goPage(name) {
      this.$router.push({ name });
    },
  },
};
</script>