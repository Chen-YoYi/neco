<template>
  <div class="userInfo">
    <van-nav-bar
      title="我的资料"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <Bgc></Bgc>

    <div class="photo_box">
      <div class="photo">
        <img class="auto-img" :src="photo" alt="" />
      </div>
      <div class="info">
        <p class="clearfix" @click="setInfo('修改昵称', '昵称', changeName)">
          <span class="fl">{{ info.nickName }}</span>
          <span class="fr icon"></span>
        </p>
        <p class="clearfix">
          <span class="fl">
            {{ info.phone }}
          </span>
        </p>
        <p class="clearfix">
          <span class="fl">{{ info.photo }}</span>
          <van-uploader class="fr" :after-read="changePhoto">
            <span class="fr icon"></span>
          </van-uploader>
        </p>
        <p class="clearfix">
          <span class="fl">{{ info.bgimage }}</span>
          <van-uploader class="fr" :after-read="changeBgimage">
            <span class="fr icon"></span>
          </van-uploader>
        </p>

        <p class="clearfix" @click="setInfo('修改简介', '简介', changeDesc)">
          <span class="fl">
            {{ info.desc }}
          </span>
          <span class="fr icon"></span>
        </p>
      </div>
    </div>
    <van-popup
      v-model="isShow"
      position="bottom"
      round
      :style="{ height: '40%' }"
    >
      <div class="popup_title">{{ my_title }}</div>
      <div class="popup_val">
        <div class="clearfix">
          <span class="fl valTis">{{ my_tis }}</span>
          <input class="valBox fr" v-model="val" type="text" />
        </div>
      </div>
      <div class="submit" @click="submitEvent(my_event)">确认</div>
    </van-popup>
  </div>
</template>
<script>
import Bgc from "../components/Bgc.vue";
export default {
  name: "UserInfo",
  components: {
    Bgc,
  },
  data() {
    return {
      info: [],
      photo: "",
      vip: 0,
      isShow: false,
      my_title: "",
      my_tis: "",
      my_event: "",
      val: "",
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    // 个人资料获取
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
        url: "/findAccountInfo",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code == "B001") {
            let info = {};
            res.data.result.map((item) => {
              info.nickName =
                item.nickName != "" ? item.nickName : "MikeCoffee";
              (info.phone = item.phone),
                (info.photo = "我的头像"),
                (info.bgimage = "我的背景图"),
                (info.desc = "我的简介");
            });
            if (
              res.data.result[0].userImg ==
              "http://www.kangliuyong.com:10002/assets/default.png"
            ) {
              this.photo = require("../assets/images/tx.jpg");
            } else {
              this.photo = res.data.result[0].userImg;
            }
            this.info;

            this.info = info;
          }

          
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //
    setInfo(my_title, my_tis, my_event) {
      this.isShow = true;
      this.my_title = my_title;
      this.my_tis = my_tis;
      this.my_event = my_event;
    },

    // 修改简介
    changeDesc() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      let tokenString = localStorage.getItem("__tk");
      this.axios({
        url: "/updateDesc",
        method: "POST",
        data: {
          appkey: this.appkey,
          tokenString: tokenString,
          desc: this.val,
        },
      })
        .then((res) => {
          
          this.$toast.clear();
          if (res.data.code == "D001") {
            this.$toast(res.data.msg);
            this.isShow = false;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });

      this.val = "";
    },
    // 修改背景图
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
          
          if (res.data.code == "I001") {
            this.$toast(res.data.msg);
          }
        })
        .catch((err) => {
          
        });
    },
    // 修改头像
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
          
          if (res.data.code == "H001") {
            this.photo = res.data.userImg;
            
          }
        })
        .catch((err) => {
          
        });
    },
    // 修改昵称
    changeName() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      let tokenString = localStorage.getItem("__tk");
      let reg = /[A-Za-z0-9_\u4e00-\u9fa5]{2,11}/;

      if (reg.test(this.val)) {
        this.axios({
          url: "/updateNickName",
          method: "POST",
          data: {
            appkey: this.appkey,
            tokenString: tokenString,
            nickName: this.val,
          },
        })
          .then((res) => {
            
            this.$toast.clear();
            if (res.data.code == "C001") {
              this.getInfo();
              this.isShow = false;
            }
          })
          .catch((err) => {
            this.$toast.clear();
            
          });
      } else {
        this.$toast("昵称格式不正确");
      }

      this.val = "";
    },

    submitEvent(callback) {
      if (callback instanceof Function) {
        callback();
      } else {
        return;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@stylecolor: #333752;
.userInfo {
  .photo_box {
    margin: 10px 25px;
    position: relative;
  }
  .photo {
    box-shadow: 0px 0px 3px 2px #ccc;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    left: 10px;
    z-index: 10;
  }

  .info {
    background: #fff;
    position: absolute;
    width: 100%;
    top: 50px;
    border-radius: 10px;
    padding: 50px 25px 10px;
    text-align: left;
    font-weight: bold;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px #ccc;
    p {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #ccc;
    }
  }

  .icon {
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    margin-top: 7px;
    background-size: 100%;
    background-image: url("../assets/images/edmit.png");
  }

  .popup_title {
    height: 50px;
    line-height: 50px;
    background-color: #f5f5f5;
  }

  .popup_val {
    border: 2px solid @stylecolor;
    border-radius: 10px;
    // height: 50px;
    margin: 40px 36px 20px;
    padding: 10px;
    // box-sizing: border-box;

    .valTis {
      border-right: 2px solid @stylecolor;
      padding-right: 10px;
    }

    .valBox {
      border: none;
      background: transparent;
      width: 230px;
    }
  }

  .submit {
    background-color: @stylecolor;
    border-radius: 10px;
    margin: 0px 36px;
    padding: 10px;
    color: #fff;
  }
}
</style>