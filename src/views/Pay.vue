<template>
  <div class="payPage">
    <Bgc></Bgc>
    <canvas ref="canvas"></canvas>
    <div class="title" v-if="showFont">支付成功</div>
    <div class="goPage"  v-if="showFont" @click="goPage">返回订单页</div>
  </div>
</template>
<script>
import Bgc from "../components/Bgc.vue";
export default {
  name: "Pay",
  components: {
    Bgc,
  },
  data() {
      return {
          showFont : false
      }
  },
  created() {
    this.onCanvas();
  },
  methods: {
    goPage() {
      this.$router.push({ name: "Cart", params: { index: 2} });
    },
    // 画布
    onCanvas() {
      this.$nextTick(() => {
        let element = this.$refs["canvas"];
        element.width = 200;
        element.height = 200;
        let ctx = element.getContext("2d");
        let count = 1.5;
        let timer = setInterval(() => {
          ctx.beginPath();
          count -= 0.03;
          ctx.lineWidth = 20;
          ctx.lineCap = "round";
          ctx.arc(100, 100, 70, count * Math.PI, 1.5 * Math.PI, false);
          ctx.stroke();
          ctx.strokeStyle = "#333752";
          ctx.closePath();

          if (count <= 0) {
            ctx.beginPath();
            ctx.moveTo(90, 80);
            ctx.lineTo(120, 100);
            ctx.lineTo(170, 40);
            ctx.lineCap = "round";
            ctx.lineWidth = 20;
            ctx.strokeStyle = "#f9ce0e";
            ctx.stroke();
            this.showFont =true;
            clearInterval(timer);
          }
        }, 30);
      });
    },
  },
};
</script>
<style lang="less" scoped>
@stylecolor: #333752;
.payPage {
    .title{
        font-size: 20px;
        font-weight: bold;
        color: #f9ce0e; 
        height: 60px;
        line-height: 60px;
        letter-spacing: 8px;
    }

  .goPage {
    width: 200px;
    margin: 0 auto;
    height: 40px;
    color: #fff;
    border-radius: 10px;
    line-height: 40px;
    background: @stylecolor;
  }


}
</style>