<template>
  <div class="login" ref="LoginBox">
    <div class="bgi" ref="bgi"></div>
    <span class="coming" @click="goPage">先逛一逛</span>
    <div class="login-box" ref="loginBox">
      <!-- 头像 -->
      <div class="">
        <div class="login-pic">
          <img class="auto-img" src="../assets/images/tx.jpg" alt="" />
        </div>
        <p class="login-tit">Mike Coffee</p>
        <!-- <p class="login-tit">小屁孩</p> -->
      </div>
      <!-- 登陆表单 -->
      <div class="login-form">
        <div class="loginInp">
          <svg
            t="1604562206903"
            class="icon fl"
            @click="showPopup"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="11575"
            width="32"
            height="32"
          >
            <path
              d="M515.1 513.6m-429 0a429 429 0 1 0 858 0 429 429 0 1 0-858 0Z"
              fill="#333752"
              p-id="11576"
              data-spm-anchor-id="a313x.7781069.0.i13"
              class=""
            ></path>
            <path
              d="M794.8 773.8C745.7 674.6 670.7 562.3 581 556.7c64.7-25.5 110.5-88.5 110.5-162.3 0-96.3-78.1-174.4-174.4-174.4s-174.4 78.1-174.4 174.4c0 73.7 45.8 136.8 110.5 162.3-90.6 5.7-166.1 120-215.2 220 69.6 73.3 168 119 277 119 110.5-0.1 210-46.9 279.8-121.9z"
              fill="rgba(255,255,255,0.8)"
              p-id="11577"
              data-spm-anchor-id="a313x.7781069.0.i16"
              class=""
            ></path>
          </svg>
          <input
            class="fr"
            type="text"
            v-model="userInfo.phone"
            placeholder="账号（注册请点击左侧图标）"
          />
        </div>
        <div class="loginInp last-login-inp">
          <svg
            t="1604573950999"
            class="icon fl"
            @click="showPass"
            v-if="isActive"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7135"
            width="28"
            height="28"
          >
            <path
              d="M512.08105239 544.87311151c-20.03273828 0-36.22358161 16.19084331-36.22358386 35.949162 0 13.17221171 7.40936807 24.69789666 18.11179193 31.00958178v40.88874219c0 9.87915819 8.23263148 17.83737005 18.11179193 17.83737005 9.87915819 0 18.11179195-7.95821186 18.11179195-17.83737005v-40.88874219c10.70242159-6.3116851 18.11179195-17.56294816 18.11178967-31.00958178 0.27442189-20.03273828-16.19084331-35.94916201-36.22358162-35.949162z"
              p-id="7136"
              fill="#333752"
            ></path>
            <path
              d="M512.08105239 3.16590047c-279.36065998 0-505.7580513 226.39739129-505.7580513 505.75805129s226.39739129 505.7580513 505.7580513 505.75805131c279.36065998 0 505.7580513-226.39739129 505.75805127-505.75805131s-226.39739129-505.7580513-505.75805127-505.75805129z m-127.05696094 414.37583049c0-86.44264058 49.94463708-142.15011897 127.05696094-142.15011896 77.11232385 0 127.05696093 55.70747842 127.05696093 142.15011896v19.4838968h-54.33537582v-19.4838968c0-32.93053041-9.33031675-88.36358693-72.72158511-88.36358692-65.5866389 0-72.72158737 61.7447439-72.72158735 88.36358692v19.4838968h-54.33537359v-19.4838968z m308.72371504 270.85360666c0 29.6374769-24.42347702 53.78653204-54.33537356 53.78653206h-254.1139196c-29.91189878 0-54.33537355-24.14905519-54.33537352-53.78653206V508.92395176c0-29.6374769 24.42347702-53.78653204 54.33537352-53.78653206h254.1139196c29.91189878 0 54.33537355 24.14905519 54.33537356 53.78653206v179.47138586z"
              p-id="7137"
              fill="#333752"
            ></path>
          </svg>
          <svg
            t="1604573993419"
            class="icon fl"
            @click="showPass"
            v-else
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7387"
            width="28"
            height="28"
          >
            <path
              d="M512 533.504c-19.968 0-37.376 17.408-37.376 37.376 0 14.336 8.704 26.112 23.04 31.744v49.152s0 3.072 3.072 3.072h26.112s3.072 0 3.072-3.072v-49.152c11.264-5.632 19.968-17.408 19.968-31.744-0.512-19.968-17.92-37.376-37.888-37.376z"
              p-id="7388"
              fill="#333752"
            ></path>
            <path
              d="M512 0c-282.624 0-512 229.376-512 512s229.376 512 512 512S1024 794.624 1024 512s-229.376-512-512-512z m183.808 706.048c0 14.336-11.264 28.672-28.672 28.672h-310.784c-14.336 0-28.672-11.264-28.672-28.672v-218.624c0-14.336 11.264-28.672 28.672-28.672h34.304v-60.416c0-66.048 54.784-112.128 120.832-112.128 57.344 0 103.424 31.744 117.76 83.456h-49.152c-11.264-23.04-37.376-40.448-69.12-40.448-40.448 0-74.752 28.672-74.752 63.488v66.048h236.032c14.336 3.072 23.04 14.336 23.04 28.672v218.624z"
              p-id="7389"
              fill="#333752"
            ></path>
          </svg>
          <input
            class="fr"
            :type="[isActive ? 'password' : 'text']"
            v-model="userInfo.password"
            placeholder="密码"
          />
        </div>
        <div class="passForget" @click="forgetPass">忘记密码</div>
        <div class="subBtn" @click="loading">立即登陆</div>
      </div>
    </div>

    <!-- 注册组件 -->
    <van-popup v-model="isShow" round closeable @close="closePopup">
      <div class="login-cover">
        <div class="register_box">
          <h3 class="register_title">注册</h3>
          <div>
            <div class="register_item">
              <span
                class="register_name fl"
                :style="{ backgroundImage: 'url(' + icon.people + ')' }"
              ></span>
              <input
                v-model="userRegisterInfo.username"
                type="text"
                placeholder="昵称"
              />
            </div>
            <div class="register_item">
              <span
                class="register_phone fl"
                :style="{ backgroundImage: 'url(' + icon.phone + ')' }"
              >
              </span>
              <input
                v-model="userRegisterInfo.phone"
                type="text"
                placeholder="手机号"
              />
            </div>
            <div class="register_item">
              <span
                class="register_password fl"
                @click="registerPass"
                :style="{
                  backgroundImage:
                    'url(' +
                    [isPick ? icon.password.dark : icon.password.lighter] +
                    ')',
                }"
              ></span>
              <input
                v-model="userRegisterInfo.password"
                :type="[isPick ? 'password' : 'text']"
                placeholder="密码"
              />
            </div>
            <div class="register_item">
              <span
                @click="registerPass"
                class="register_password fl"
                :style="{
                  backgroundImage:
                    'url(' +
                    [isPick ? icon.password.dark : icon.password.lighter] +
                    ')',
                }"
              ></span>
              <input
                v-model="checkPass"
                :type="[isPick ? 'password' : 'text']"
                placeholder="再次确认密码"
              />
            </div>
            <div class="zcBtn" @click="register">立即注册</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
// 导入样式
import "../assets/css/login.less";
// 导入js
import { validForm } from "../assets/js/validForm";
// import phone from '../assets/images/phone.png'

export default {
  name: "Login",
  data() {
    return {
      // phone,
      isActive: true,
      isShow: false,
      isPick: true,
      checkPass: "",
      // 用户信息
      userInfo: {
        phone: "",
        password: "",
      },
      //注册信息
      userRegisterInfo: {
        phone: "",
        password: "",
        nickName: "",
      },

      // 注册图标路径
      icon: {
        people: require("../assets/images/people16.png"),
        phone: require("../assets/images/phone20.png"),
        password: {
          lighter: require("../assets/images/passline.png"),
          dark: require("../assets/images/passout.png"),
        },
      },
    };
  },
  mounted() {
    //获取页面高度
    let height = window.innerHeight;
    this.$refs["bgi"].style.height = height + "px";
    this.$refs["LoginBox"].style.height = height + "px";
    this.$refs["loginBox"].style.height = height + "px";
  },
  methods: {
    // 登陆密码显示 或 隐藏
    showPass() {
      this.isActive = !this.isActive;
    },
    // 注册密码显示 或 隐藏
    registerPass() {
      this.isPick = !this.isPick;
    },
    // 显示注册页面
    showPopup() {
      this.isShow = true;
    },
    // 立即登陆
    loading() {
      
      
      let valinfo = {
        phone: {
          val: this.userInfo.phone,
          errmsg: "账号不正确或账号不存在",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          val: this.userInfo.password,
          errmsg: "密码格式不正确",
          reg: /^[\d\w]{6,11}$/,
        },
      };

      let isPass = validForm.valid(valinfo);
      if (isPass) {
        let userInfo = Object.assign({}, this.userInfo);
        userInfo.appkey = this.appkey;

        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 0,
        });

        //发起注册请求
        this.axios({
          method: "POST",
          url: "/login",
          // post 传递参数
          data: userInfo,
        })
          .then((res) => {
            this.$toast.clear();
            
            if (res.data.code == 200) {
              localStorage.setItem("__tk", res.data.token);

              // 跳转页面，如果默认为首页，如果有值则返回上一级
                this.$router.push({ name: "Home" });
              
            } else {
              
              this.$toast(res.data.msg);
              // 保存token ,便于后面验证登陆
            }
          })
          .catch((err) => {
            this.$toast.clear();
            
          });
      }
    },
    // 立即注册
    register() {
      let valinfo = {
        phone: {
          val: this.userRegisterInfo.phone,
          errmsg: "手机号格式不正确！",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          val: this.userRegisterInfo.password,
          errmsg: "密码格式不正确！",
          reg: /^[\d\w]{6,11}$/,
        },
        username: {
          val: this.userRegisterInfo.username,
          errmsg: "用户名格式不正确！",
          reg: /[A-Za-z0-9_\u4e00-\u9fa5]{2,11}/,
        },
      };

      //  
      //  验证通过true ， 验证失败 false
      let isPass = validForm.valid(valinfo);

      if (isPass) {
        // 赋值用户注册请求
        let userInfo = Object.assign({}, this.userRegisterInfo);
        // 添加参数appkey
        userInfo.appkey = this.appkey;

        

        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          icon: "https://img.yzcdn.cn/vant/logo.png",
          duration: 0,
        });

        //验证两次密码是否相同
        if (userInfo.password != this.checkPass) {
          this.$toast("密码不一致");
          this.checkPass = "";
          this.userRegisterInfo.password = "";
          return;
        }

        //发起注册请求
        this.axios({
          method: "POST",
          url: "/register",
          // post 传递参数
          data: userInfo,
        })
          .then((res) => {
            this.$toast.clear();
            
            if (res.data.code == 100) {
              
              this.isShow = false;
            } else {
              
              this.$toast(res.data.msg);
            }
           
          })
          .catch((err) => {
            this.$toast.clear();
            
          });
      }
    },
    // 关闭注册页面后逻辑
    closePopup(){
      
        this.userRegisterInfo.password = "";
        this.userRegisterInfo.username = "";
        this.userRegisterInfo.phone = "";
        this.checkPass = "";
    },
    //跳转主页（先逛逛）
    goPage() {
      this.$router.push({ name: "Home" });
    },
    //忘记密码
    forgetPass() {
      this.$router.push({ name: "ForgetPassword" });
    },
  },
};
</script>