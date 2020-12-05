<template>
  <div class="newPass">
    <van-nav-bar
      title="修改密码"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
   <Bgc> </Bgc>
    <!-- 密码修改 -->
    <div class="newBox">
      <div class="clearfix"><span class="fl">旧密码  </span> <input class="fr" type="text" v-model="sincePass" placeholder="请输入数字、字母、_" /></div>
      <div class="clearfix"><span class="fl"> 新密码 </span> <input class="fr" type="text " v-model="nowPass" placeholder="请输入新密码" /></div>
      <div class="clearfix"><span class="fl"> 新密码 </span> <input class="fr" type="text" v-model="reNowPass" placeholder="再次输入密码" /></div>
      <div class="submit" @click="changePass">确认修改</div>
    </div>
  </div>
</template>
<script>
import Bgc from '../components/Bgc.vue'
export default {
  name: "NewPass",
  data() {
    return {
      sincePass: "",
      nowPass: "",
      reNowPass: "",
    };
  },
  components:{
    Bgc
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    // 判断新密码格式是否正确
    isTrue(val) {
      let reg = /^[\d\w]{6,11}$/;
      if (!reg.test(val)) {
        
        return;
      }
    },

    changePass() {
      let tokenString = localStorage.getItem("__tk");

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      // 密码 222222
      this.isTrue(this.sincePass);
      this.isTrue(this.nowPass);
      this.isTrue(this.reNowPass);

      if (this.nowPass == this.reNowPass) {
        
        this.axios({
          url: "/updatePassword",
          method: "POST",
          data: {
            appkey: this.appkey,
            tokenString: tokenString,
            password: this.nowPass,
            oldPassword: this.sincePass,
          },
        })
          .then((res) => {
            this.$toast.clear();
            
            if (res.data.code == "E003") {
              return;
            } else {
              // 返回登陆页面
              this.$router.push({ name: "Login" });
              return;
            }
            this.$toast(res.data.msg);
          })
          .catch((err) => {
            this.$toast.clear();
            
          });
      } else {
        this.$toast.clear();
        this.$toast("新密码不一致！");
        return;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@stylecolor: #333752;
.newPass {
  .newBox {
    margin: 30px 30px 0px;
    border: 2px solid #f5f5f5;
    padding: 40px 0px;
    box-shadow:  0px 0px 3px 2px #efe6ef;
    border-radius: 10px;
    background-color: #fff;

    div {
      margin-bottom: 20px;
      height: 40px;
      padding: 0 16px;



      span{
          font-size: 16px;
         line-height: 40px;
          
      }

      input{
        //   border: none;
        width: 200px;
        height: 30px;
        margin: 5px 0;
        border: 1px solid #333;
        border-radius : 5px ;
          background-color: transparent;
          text-indent: 14px;
      }
    }
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