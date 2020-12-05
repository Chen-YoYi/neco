<template>
  <div class="order">
    <van-nav-bar
      title="提交订单"
      left-text="返回"
      left-arrow
      @click-left="back"
    />

    <div class="order_eat clearfix">
      <span class="fl eating" v-show="isEatout">外卖</span>
      <span class="fl eating" v-show="!isEatout">堂食</span>
      <van-switch
        class="fr eatChoice"
        v-model="isEatout"
        size="24"
        active-color="#f9ce0e"
        inactive-color="#333752"
      />
    </div>

    <!-- 订单地址 -->
    <div class="order_address" v-if="isEatout">
      <!-- <p class="clearfix" > <span @click="isAddress">修改地址</span></p> -->

      <p class="clearfix">
        <span class="fl">联系人</span
        ><span class="fr">{{ addressInfo.name }}</span>
      </p>

      <p class="clearfix">
        <span class="fl"> 联系电话</span>
        <span class="fr">{{ addressInfo.tel }}</span>
      </p>

      <p class="clearfix">
        <span class="fl">收货地址</span>
        <span class="fr">
          {{ addressInfo.address }}
        </span>
      </p>

      <p class="clearfix">
        <span @click="onChangeAdd" class="fr">修改地址</span>
      </p>
    </div>

    <!-- 下单商品 -->
    <div class="order_info">
      <p>【订单信息】</p>
      <div class="order_goods">
        <van-card
          v-for="(item, index) in orderProduct"
          :key="index"
          :num="item.count"
          :price="item.price"
          :desc="item.rule"
          :title="item.name"
          :thumb="item.small_img"
        />
      </div>

      <!-- 订单备注 -->
      <!-- <div class="order_note">
        <div class="clearfix">
          <span class="fl">备注：</span>
          <div class="note_inp fr">
            <input type="text" />
          </div>
        </div>
      </div> -->
    </div>

    <!-- 收货地址选择 -->
    <van-popup
      v-model="isAddress"
      position="bottom"
      round
      :style="{ height: '60%' }"
    >
      <div class="address_box">
        <div class="address_head">
          <!-- <span class="fr" >X</span> -->
        </div>
        <van-address-list
          v-model="addressID"
          :list="list"
          default-tag-text="默认"
          add-button-text="确认修改"
          @add="onsure"
        >
        </van-address-list>
      </div>
    </van-popup>

    <van-popup
      v-model="isAddresso"
      position="bottom"
      round
      :style="{ height: '60%' }"
    >
      <div class="address_box">
        <div class="address_head">
          <span class="fr" @click="onsure">确认</span>
        </div>
        <van-address-list
          v-model="addressID"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        >
        </van-address-list>
      </div>
    </van-popup>

    <!-- 支付金额 -->
    <div class="order_total">
      <div class="price fl">
        <span>合计</span>
        <span>￥</span>
        <span>{{ total }}</span>
      </div>
      <div class="buy fr" @click="onPay">立即支付</div>
    </div>
  </div>
</template>
<script>
import "../assets/css/order.less";
export default {
  name: "Order",
  data() {
    return {
      isEatout: true,
      orderProduct: [],
      addressInfo: {},
      isAddress: false,
      isAddresso: false,
      addressID: "",
      addressList: false,
      list: [],
      total: 0,
      sids: "",
    };
  },
  created() {
    // 路由参数
    let eat = this.$route.params.eat;
    let aid = this.$route.params.aid;
    let sid = this.$route.params.sid;
    if(sid != undefined){
      localStorage.setItem("sid",sid);
    }
    this.sids = localStorage.getItem("sid").split(",");
    this.isEatout = eat;
    this.getAddress(aid);
    this.getOrder(this.sids);
    this.getAllAddress();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    // 获取地址信息
    getAddress(aid) {
      let tokenString = localStorage.getItem("__tk");
      this.axios({
        url: "/findAddressByAid",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
          aid: aid,
        },
      })
        .then((res) => {
          if (res.data.code == 40000) {
            //   数据整理
            let addressDate = {};
            res.data.result.forEach((item) => {
              addressDate.name = item.name;
              addressDate.address = `${item.province}${item.city}${item.county}${item.addressDetail} `;
              addressDate.tel = item.tel;
            });
            this.addressInfo = addressDate;
          }
        })
        .catch((err) => {});
    },

    // 获取订单信息
    getOrder(arr) {
      let tokenString = localStorage.getItem("__tk");
      this.axios({
        url: "/commitShopcart",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
          sids: JSON.stringify(arr),
        },
      })
        .then((res) => {
          let total = 0;
          this.orderProduct = res.data.result;
          this.orderProduct.forEach((item) => {
            total += item.price * item.count;
          });
          this.total = total;
        })
        .catch((err) => {});
    },

    // 新增地址
    onAdd() {
      this.$router.push({ name: "AddAddress" });
    },
    // 编辑地址
    onEdit(item, index) {
      this.$router.push({
        name: "EditAddress",
        params: {
          id: item.id,
        },
      });
    },

    //修改地址
    onChangeAdd() {
      if (this.addressList) {
        this.isAddress = true;
        this.getAllAddress();
      } else {
        this.$router.push({name : "AddAddress"});
      }
    },

    // 收货地址
    getAllAddress() {
      let tokenString = localStorage.getItem("__tk");
      let list = [];
      this.axios({
        url: "/findAddress",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          if (res.data.code == 20000) {
            res.data.result.map((item) => {
              item.isDefault = Boolean(item.isDefault);
              item.id = item.aid;
              if (item.isDefault) {
                this.addressID = item.id;
              }
              item.address = `${item.province}${item.city}${item.county}${item.addressDetail} `;
            });
            this.list = res.data.result;
          }

          this.addressList = Boolean(res.data.result.length);
        })
        .catch((err) => {});
    },

    // 确认修改地址
    onsure() {
      this.getAddress(this.addressID);
      this.isAddress = false;
    },

    // 立即结算
    onPay() {
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
        url: "/pay",
        method: "POST",
        data: {
          appkey: this.appkey,
          tokenString: tokenString,
          sids: JSON.stringify(this.sids),
          phone: this.addressInfo.tel,
          address: this.addressInfo.address,
          receiver: this.addressInfo.name,
        },
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code == 60000) {
            this.$router.push({
              name: "Pay",
            });
          }
          localStorage.removeItem("sid");
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
};
</script>