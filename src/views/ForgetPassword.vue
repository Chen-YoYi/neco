<template>
  <div class="forgetPass">
    <van-nav-bar
      title="忘记密码"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <Bgc></Bgc>
    <div class="newBox">
      <div class="clearfix" v-for="(item, index) in forgetData" :key="index">
        <span class="fl">{{ item.title }}</span>
        <input
          class="fr"
          type="text"
          v-model="item.valC"
          :placeholder="item.tis"
        />
      </div>
      <!-- <div class="clearfix"><span class="fl"> 新密码 </span> <input class="fr" type="text " v-model="nowPass" placeholder="请输入新密码" /></div>
      <div class="clearfix"><span class="fl"> 新密码 </span> <input class="fr" type="text" v-model="reNowPass" placeholder="再次输入密码" /></div> -->
      <div class="getCode" @click="getVerify" ref="code">
        {{ msg }}
      </div>
      <div class="submit" @click="findPassword">提交</div>
    </div>
  </div>
</template>
<script>
// import "../assets/css/forgetPassword.less";
import { validForm } from "../assets/js/validForm";
import Bgc from "../components/Bgc.vue";
export default {
  name: "ForgetPassword",
  components: {
    Bgc,
  },
  created() {
    this.msg = "获取验证码";
    this.isgetVerify = true;
  },
  data() {
    return {
      forgetData: [
        {
          title: "账号",
          tis: "手机号码",
          valC: "",
        },
        {
          title: "新密码",
          tis: "请输入数字、字母或_",
          valC: "",
        },
        {
          title: "确认密码",
          tis: "请输入数字、字母或_",
          valC: "",
        },
        {
          title: "邮箱",
          tis: "请输入邮箱号",
          valC: "",
        },
        {
          title: "验证码",
          tis: "验证码",
          valC: "",
        },
      ],
      isgetVerify: true,
      count: 60,
      msg: "获取验证码",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 获取验证码
    getVerify() {
      let email = this.forgetData[3].valC;
      
      let emailChecked = {
        email: {
          val: email,
          errmsg: "邮箱格式不正确",
          reg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        },
      };
      let pass = validForm.valid(emailChecked);
      if (pass && this.isgetVerify) {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 0,
        });

        this.axios({
          method: "POST",
          url: "/emailValidCode",
          data: {
            appkey: this.appkey,
            email: email,
          },
        })
          .then((res) => {
            this.$toast.clear();
            if (res.data.code == "J001") {
              clearInterval(timer);
              this.$toast(res.data.msg);
              this.isgetVerify = false;
              let ele = this.$refs["code"];
              ele.style.backgroundColor = "#ccc";
              // 倒计时
              let count = 120;
              var timer = setInterval(() => {
                count--;
                this.msg = `${count}s`;
                // 
                if (count <= 0) {
                  clearInterval(timer);
                  this.isgetVerify = true;
                  this.msg = "重新发送";
                  ele.style.backgroundColor = "#333752";
                  return;
                }
              }, 800);
            }
          })
          .catch((err) => {
            this.$toast.clear();
            
          });
      }
    },
    //找回密码
    findPassword() {
      let phone = this.forgetData[0].valC;
      let newpass = this.forgetData[1].valC;
      let againpass = this.forgetData[2].valC;
      let valinfo = {
        phone: {
          val: phone,
          errmsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          val: newpass,
          errmsg: "密码格式不正确",
          reg: /^[\d\w]{6,11}$/,
        },
        againPass: {
          val: againpass,
          errmsg: "密码格式不正确",
          reg: /^[\d\w]{6,11}$/,
        },
      };

      if (newpass != againpass) {
        this.$toast("密码不一致");
        return;
      }

      let pass = validForm.valid(valinfo);

      if (pass) {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 0,
        });


        // 验证码
        this.axios({
        url: "/checkValidCode",
        method: "POST",
        data: {
          appkey: this.appkey,
          validCode: this.forgetData[4].valC,
        },
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code == "K001") {

            //   密码重置
            this.axios({
              method: "POST",
              url: "/retrievePassword",
              data: {
                appkey: this.appkey,
                phone: phone,
                password: newpass,
              },
            })
              .then((res) => {
                this.$toast.clear();
                
                if(res.data.code == "L001"){
                    this.$toast(res.data.msg);
                    this.$router.push({name:"Login"});
                }else{
                    this.$toast(res.data.msg);
                }
              })
              .catch((err) => {
                this.$toast.clear();
              });
          } else {
            this.$toast(res.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
      }
    },
  },
};
</script>
<style lang="less">
@stylecolor: #333752;
.forgetPass {
  .newBox {
    margin: 30px 30px 0px;
    border: 2px solid #f5f5f5;
    padding: 40px 0px 0px;
    box-shadow: 0px 0px 3px 2px #efe6ef;
    border-radius: 10px;
    background-color: #fff;
    position: relative;

    div {
      margin-bottom: 20px;
      height: 40px;
      padding: 0 16px;

      span {
        font-size: 16px;
        line-height: 40px;
      }

      input {
        //   border: none;
        width: 200px;
        height: 30px;
        margin: 5px 0;
        border: 1px solid #333;
        border-radius: 5px;
        background-color: transparent;
        text-indent: 14px;
      }
    }
  }

  .getCode {
    height: 24px !important;
    //   margin: 0;
    line-height: 30px;
    position: absolute;
    right: 20px;
    line-height: 24px;
    padding: 0px 10px !important;
    bottom: 76px;
    border-radius: 3px;
    background: @stylecolor;
    color: #fff;
  }

  .submit {
    margin: 30px 10px 0px;
    border-radius: 20px;
    height: 40px;
    color: #fff;
    line-height: 40px;
    background-color: @stylecolor;
  }
}
</style>