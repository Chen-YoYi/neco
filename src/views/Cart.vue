<template>
  <div class="cartBag">
    <div class="bag">
      <div class="bgc"></div>
      <div class="title">MilkCoffee</div>
    </div>

    <section class="cart_process">
      <div v-if="isEmpty">
        <van-empty description="暂无订单信息" />
      </div>
      <van-tabs v-model="active" @change="changeTab" v-else>
        <van-tab title="全部">
          <div>
            <div
              class="cart_order"
              v-if="!(JSON.stringify(orderData) === '{}')"
            >
              <div
                class="order_info"
                v-for="(item, index) in orderData"
                :key="index"
              >
                <div class="order_title clearfix">
                  <div class="fl">{{ item.oid }}</div>
                  <div
                    class="fr"
                    v-if="item.status == 1"
                    @click="onConfirm(item.oid)"
                  >
                    确认收货
                  </div>
                  <div class="fr" v-else @click="onDelete(item.oid)">
                    删除订单
                  </div>
                </div>
                <div
                  class="order_products"
                  v-for="(val, i) in item.data"
                  :key="i"
                >
                  <div class="order_product">
                    <div class="cart_img fl">
                      <img
                        class="auto-img"
                        :src="val.smallImg || val.small_img"
                        alt=""
                      />
                    </div>
                    <div class="cart_context fl">
                      <div class="cart_name">{{ val.name }}</div>
                      <div class="cart_rule">{{ val.rule }}</div>
                      <div class="cart_price clearfix">
                        <span class="price fl">￥ {{ val.price }} </span>
                        <span class="cart_count fr"> x {{ val.count }} </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order_total">
                  <p>{{ item.date | formatDate("yyyy-MM-dd-hh:mm:ss") }}</p>
                  <p class="clearfix">
                    <span class="fl">共计 {{ item.count }} 件商品</span>
                    <span class="fr">
                      合计￥<span class="order_price">{{
                        item.total
                      }}</span></span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div v-else>
              <van-empty description="暂无订单信息" />
            </div>
          </div>
        </van-tab>

        <van-tab title="进行中">
          <div>
            <div
              class="cart_order"
              v-if="!(JSON.stringify(orderData) === '{}')"
            >
              <div
                class="order_info"
                v-for="(item, index) in orderData"
                :key="index"
              >
                <div class="order_title clearfix">
                  <div class="fl">{{ item.oid }}</div>
                  <div
                    class="fr"
                    v-if="item.status == 1"
                    @click="onConfirm(item.oid)"
                  >
                    确认收货
                  </div>
                  <div class="fr" v-else @click="onDelete(item.oid)">
                    删除订单
                  </div>
                </div>
                <div
                  class="order_products"
                  v-for="(val, i) in item.data"
                  :key="i"
                >
                  <div class="order_product">
                    <div class="cart_img fl">
                      <img
                        class="auto-img"
                        :src="val.smallImg || val.small_img"
                        alt=""
                      />
                    </div>
                    <div class="cart_context fl">
                      <div class="cart_name">{{ val.name }}</div>
                      <div class="cart_rule">{{ val.rule }}</div>
                      <div class="cart_price clearfix">
                        <span class="price fl">￥ {{ val.price }} </span>
                        <span class="cart_count fr"> x {{ val.count }} </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order_total">
                  <p>{{ item.date | formatDate("yyyy-MM-dd-hh:mm:ss") }}</p>
                  <p class="clearfix">
                    <span class="fl">共计 {{ item.count }} 件商品</span>
                    <span class="fr">
                      合计￥<span class="order_price">{{
                        item.total
                      }}</span></span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div v-else>
              <van-empty description="暂无订单信息" />
            </div>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div>
            <div
              class="cart_order"
              v-if="!(JSON.stringify(orderData) === '{}')"
            >
              <div
                class="order_info"
                v-for="(item, index) in orderData"
                :key="index"
              >
                <div class="order_title clearfix">
                  <div class="fl">{{ item.oid }}</div>
                  <div
                    class="fr"
                    v-if="item.status == 1"
                    @click="onConfirm(item.oid)"
                  >
                    确认收货
                  </div>
                  <div class="fr" v-else @click="onDelete(item.oid)">
                    删除订单
                  </div>
                </div>
                <div
                  class="order_products"
                  v-for="(val, i) in item.data"
                  :key="i"
                >
                  <div class="order_product">
                    <div class="cart_img fl">
                      <img
                        class="auto-img"
                        :src="val.smallImg || val.small_img"
                        alt=""
                      />
                    </div>
                    <div class="cart_context fl">
                      <div class="cart_name">{{ val.name }}</div>
                      <div class="cart_rule">{{ val.rule }}</div>
                      <div class="cart_price clearfix">
                        <span class="price fl">￥ {{ val.price }} </span>
                        <span class="cart_count fr"> x {{ val.count }} </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order_total">
                  <p>{{ item.date | formatDate("yyyy-MM-dd-hh:mm:ss") }}</p>
                  <p class="clearfix">
                    <span class="fl">共计 {{ item.count }} 件商品</span>
                    <span class="fr">
                      合计￥<span class="order_price">{{
                        item.total
                      }}</span></span
                    >
                  </p>
                </div>
              </div>
            </div>

            <div v-else>
              <van-empty description="暂无订单信息" />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<script>
import "../assets/css/cart.less";
export default {
  name: "Cart",
  data() {
    return {
      active: 0,
      orderData: {},
      isEmpty: true,
    };
  },
  created() {
    this.getOrder(this.active);
  },

  methods: {
    // 切换选项
    changeTab() {
      this.getOrder(this.active);
    },

    // 查看订单
    getOrder(status) {
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
        url: "/findOrder",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
          status: status,
        },
      })
        .then((res) => {
          this.$toast.clear();
          
          if (res.data.code == 700) {
            this.$router.push({ name: "Login" });
          } else if (res.data.code == 70000) {
            //  this.productDate = res.data.result;
            // 数据处理
            // 
            if(status==0){
              this.isEmpty =
                JSON.stringify(res.data.result) === "[]" ||
                JSON.stringify(res.data.result) === "[{}]";

                

            }
            let orderDatas = {};
            res.data.result.map((item) => {
              if (!orderDatas[item.oid]) {
                orderDatas[item.oid] = {
                  // 订单日期
                  date: item.createdAt,
                  // 订单商品数量
                  count: item.count,
                  // 商品总价
                  total: item.count * item.price,
                  // 商品信息
                  data: [item],
                  //
                  oid: item.oid,

                  status: item.status,
                };
              } else {
                orderDatas[item.oid].count += item.count;
                orderDatas[item.oid].total += item.count * item.price;
                orderDatas[item.oid].data.push(item);
              }
              // this.orderData = orderDatas;
            });
            this.orderData = orderDatas;
         
            // return bool;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //确认收货
    onConfirm(oid) {
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
        url: "/receive",
        method: "POST",
        data: {
          appkey: this.appkey,
          tokenString: tokenString,
          oid: oid,
        },
      })
        .then((res) => {
          this.$toast.clear();
          
          if (res.data.code == 700) {
            this.$router.push({ name: "Login" });
          } else if (res.data.code == 80000) {
            this.$toast(res.data.msg);
            this.getOrder(1);
            this.getOrder(0);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    // 删除订单
    onDelete(oid) {
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
        url: "/removeOrder",
        method: "POST",
        data: {
          appkey: this.appkey,
          tokenString: tokenString,
          oid: oid,
        },
      })
        .then((res) => {
          this.$toast.clear();
          
          if (res.data.code == 700) {
            this.$router.push({ name: "Login" });
          } else if (res.data.code == 90000) {
            this.$toast(res.data.msg);
            this.getOrder(0);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
  },
};
</script>