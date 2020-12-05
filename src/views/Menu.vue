<template>
  <div class="menu">
    <!-- 标题 -->
    <div class="menu_title">
      <div class="menu_title_address fl">
        <p>
          {{ storeName }}<van-icon name="arrow" color="#333572" size="16" />
        </p>
        <p>{{ storeLoation }}</p>
      </div>

      <div class="menu_search fr">
        <!-- <div :class="[search_box {active:searchData.length != 0}]"> -->
        <div
          :class="[
            searchData.length != 0
              ? valSearch.length != 0
                ? 'search_box active'
                : 'search_box'
              : 'search_box',
          ]"
        >
          <input
            v-model="valSearch"
            class="fl"
            type="text"
            @keyup="mySearch"
            placeholder="拿铁"
          />
          <span @click="onSearch"></span>
          <div
            class="search_list"
            v-if="searchData.length != 0 && valSearch.length != 0"
          >
            <ul>
              <li
                v-for="(item, index) in searchData"
                :key="index"
                @click="searchDetail(item.pid)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <!-- 菜单选择 -->
    <div
      class="menu_box"
      @touchstart="ontouchstart($event)"
      @touchend="ontouchend"
    >
      <div class="menu_list fl" ref="menuList">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item, index) in productlist"
            :key="index"
            :class="{ active: activeKey == index }"
            :title="item.title"
            @click="onScroll(item.ttop)"
          />
        </van-sidebar>
      </div>

      <!-- 商品列表 -->
      <div class="menu_goods fr" ref="goodsList">
        <div class="goods_box">
          <div class="goods_ad">
            <img
              class="auto-img"
              src="../assets/images/IMG_0389_02.jpg"
              alt=""
            />
          </div>
          <!-- 品种 -->

          <div class="goods_detail">
            <div class="goods_title">热门系列</div>
            <!-- 商品 -->
            <div
              class="goods"
              v-for="(item, index) in coffeeList.hotCoffee"
              :key="index"
            >
              <div class="goods_img fl">
                <img class="auto-img" :src="item.smallImg" alt="" />
              </div>
              <div class="goods_context fl">
                <div class="goods_name">{{ item.name }}</div>
                <div class="goods_info">
                  {{ item.desc }}
                </div>
                <div class="goods_price clearfix">
                  <span class="currentPrice fl">￥{{ item.price }}</span>
                  <!-- <span class="cutPrice fl">9.9折</span> -->
                  <span class="add fr" @click="detailShow(item.pid)">+</span>
                </div>
              </div>
            </div>

            <!--========== -->

            <div class="goods_title">经典系列</div>
            <!-- 商品 -->
            <div
              class="goods"
              v-for="(item, index) in coffeeList.coffee"
              :key="'hot' + index"
            >
              <div class="goods_img fl">
                <img class="auto-img" :src="item.smallImg" alt="" />
              </div>
              <div class="goods_context fl">
                <div class="goods_name">{{ item.name }}</div>
                <div class="goods_info">
                  {{ item.desc }}
                </div>
                <div class="goods_price clearfix">
                  <span class="currentPrice fl">￥{{ item.price }}</span>
                  <!-- <span class="cutPrice fl">9.9折</span> -->
                  <span class="add fr" @click="detailShow(item.pid)">+</span>
                </div>
              </div>
            </div>
          </div>

          <div class="goods_empty">正在努力研发中...</div>
        </div>
      </div>
    </div>
    <!-- 购物总价 -->
    <!-- <div class="menu_showbag" ref="menuShowbag"> -->
    <div class="menu_showbag" ref="menuBox">
      <div class="menu_showbag_icon" @click="shopBag">
        <span class="icon"></span>
        <span class="showbag_count" v-if="bagCount != 0">{{ bagCount }}</span>
      </div>
      <div class="menu_showbag_total"><sub>￥</sub> {{ productTotal }}</div>
      <div class="menu_showbag_buy" @click="goOrder">去结算</div>
      <!-- <div class="menu_showbag_buy" @click="onsure">去结算</div> -->
    </div>

    <!-- 商品展示 -->
    <van-popup
      v-model="isGoodsShow"
      position="bottom"
      round
      :style="{ height: '80%' }"
      @close="shopBagCount"
    >
      <div>
        <!-- 背景 -->
        <div class="detail_bgi">
          <img class="auto-img" :src="detailProduct.large_img" alt="" />
          <!-- 点击收藏 -->
          <div class="mylove">
            <img
              class="auto-img"
              :src="[isLove ? mylove : myhate]"
              @click="onCollect(detailProduct.pid)"
              alt=""
            />
          </div>
        </div>
        <!-- 商品详情 -->
        <div class="detail">
          <div class="detail_img">
            <img class="auto-img" :src="detailProduct.small_img" alt="" />
          </div>
          <!-- 关闭按钮 -->
          <div class="detail_close" @click="closeDetail"></div>
          <!-- 商品资料-->
          <div class="detail_info">
            <p class="info_name">{{ detailProduct.name }}</p>
            <div class="info_context">
              【商品简介】
              <p
                v-for="(item, index) in detailProduct.desc"
                :key="'desc' + index"
              >
                {{ index + 1 }}、{{ item }}
              </p>
            </div>
          </div>
          <div class="detail_choice">
            <div class="choice">
              <p>加料区</p>
              <div class="detail_opt">
                <span :class="{ active: ruleOpt.isMike }" @click="miikOpt">{{
                  detailProduct.milk_desc
                }}</span>
                <span :class="{ active: ruleOpt.isCream }" @click="creamOpt">{{
                  detailProduct.cream_desc
                }}</span>
              </div>
            </div>
            <div class="choice">
              <p>甜度</p>
              <div class="detail_opt">
                <span
                  v-for="(item, index) in detailProduct.sugar"
                  :key="'sugar' + index"
                  :class="{ active: ruleOpt.sugarIndex == index }"
                  @click="sugarOpt(index)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="choice">
              <p>温度</p>
              <div class="detail_opt">
                <span
                  v-for="(item, index) in detailProduct.tem"
                  :key="'tem' + index"
                  :class="{ active: ruleOpt.temIndex == index }"
                  @click="temOpt(index)"
                  >{{ item }}</span
                >
                <!-- <span>不加奶油</span> -->
              </div>
            </div>
          </div>
          <!-- 商品价格 -->
          <div class="detail_total">
            <div class="clearfix">
              <div class="total fl">
                <p>￥{{ detailPrice }}</p>
                <p>{{ rule }}</p>
              </div>

              <!-- 数量 -->
              <div class="count fr">
                <van-stepper
                  v-model="ruleOpt.count"
                  theme="round"
                  button-size="22"
                  disable-input
                />
              </div>
            </div>
            <div class="addbag" @click="addbag(detailProduct.pid)">
              加入购物袋
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 购物清单 -->
    <van-popup
      v-model="isShopBag"
      position="bottom"
      round
      :style="{ height: '60%' }"
    >
      <div class="showBag">
        <!-- 全选与清空 -->
        <div class="bag_control">
          <div class="allBag fl">
            <van-checkbox v-model="isallChecked" shape="round" @click="checkAll"
              >全选</van-checkbox
            >
          </div>

          <div class="clearBag fr" @click="clearCart">清空购物袋</div>
        </div>

        <div v-if="(isEmpty = bagCount == 0 ? true : false)">
          <van-empty description="空空如也"> </van-empty>
        </div>

        <!-- 订单 -->
        <div class="bag_order" v-else>
          <van-checkbox-group v-model="shoppingList" ref="checkboxGroup">
            <van-swipe-cell v-for="(item, index) in bagList" :key="index">
              <template #right>
                <div class="cartColse fl" @click="deleteProduct(item.sid)">
                  删除
                </div>
              </template>
              <template>
                <!-- <van-checkbox :name ="index"> </van-checkbox> -->
                <div class="clearfix cartBox">
                  <!-- 是否选中改商品 -->
                  <van-checkbox
                    :name="item.sid"
                    class="fl"
                    v-model="item.checked"
                    @click="isbuy"
                  >
                  </van-checkbox>
                  <div class="cart fr">
                    <div class="cart_img fl">
                      <img class="auto-img" :src="item.small_img" alt="" />
                    </div>
                    <div class="cart_context fl">
                      <div class="cart_name">{{ item.name }}</div>
                      <div class="cart_rule">{{ item.rule }}</div>
                      <div class="cart_price clearfix">
                        <span class="price fl">￥{{ item.price }}</span>
                        <span class="cart_count fr">
                          <van-stepper
                            v-model="item.count"
                            theme="round"
                            button-size="22"
                            disable-input
                            @change="changeproductCount(item.sid, item.count)"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </van-swipe-cell>
            <!-- ===================== -->

            <div class="menu_showbag" style="bottom: 20px" ref="menuShowbag">
              <div class="menu_showbag_icon" @click="shopBag">
                <span class="icon"></span>
                <span class="showbag_count" v-if="bagCount != 0">{{
                  bagCount
                }}</span>
              </div>
              <div class="menu_showbag_total">
                <sub>￥</sub>{{ productTotal }}
              </div>
              <div class="menu_showbag_buy" @click="goOrder">去结算</div>
            </div>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>

    <!-- 收货地址选择 -->
    <van-popup
      v-model="isAddress"
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
  </div>
</template>

<script>
import "../assets/css/menu.less";
import mylove from "../assets/images/love.png";
import myhate from "../assets/images/hate.png";
export default {
  name: "Menu",
  created() {
    if (this.$route.params.getDetail) {
      this.getDetail();
    }
  },
  mounted() {
    this.istakeout = this.$route.params.iseatOut;

    // window.addEventListener("scroll", this.handleScroll,true);
    this.shopBagCount();

    // 数据
    this.axios({
      url: "/typeProducts",
      method: "GET",
      params: {
        appkey: this.appkey,
        key: "type",
        value: "coffee",
      },
    })
      .then((res) => {
        //
        this.coffeeList.coffee = res.data.result;
      })
      .catch((err) => {});

    // 数据2
    this.axios({
      url: "/typeProducts",
      method: "GET",
      params: {
        appkey: this.appkey,
        key: "isHot",
        value: 1,
      },
    })
      .then((res) => {
        this.coffeeList.hotCoffee = res.data.result;
      })
      .catch((err) => {});
  },
  data() {
    return {
      istakeout: true,
      addressID: "",
      list: [],
      isAddress: false,
      // 图片
      mylove,
      myhate,
      //位置信息
      storeName: "MikeCoffee",
      storeLoation: "快来搜索丫",
      // 窗口高度
      height: 0,
      minHeight: 0,
      // 搜索引擎
      valSearch: "",
      // 搜索列表
      searchData: [],
      // 菜单列表
      menulistEle: [],
      //购物列表
      shoppingList: [],
      //
      isCheckedAll: false,
      // 全选
      isallChecked: false,
      //是否收藏
      isLove: false,
      //商品规格选项处理
      ruleOpt: {
        isMike: false,
        isCream: false,
        temIndex: 0,
        sugarIndex: 0,
        count: 1,
      },
      // 商品规格
      rule: "",
      // 显示商品页面
      isGoodsShow: false,
      //显示购物袋页面
      isShopBag: false,
      // 下单商品的数量
      product: {
        count: 1,
      },
      //滚动条数据
      scollDate: {
        startY: 0,
        moveY: 0,
        curY: 0,
        istouched: false,
      },

      goodsScoll: {
        startY: 0,
        moveY: 0,
        curY: 0,
        istouched: false,
      },
      coffeeList: {
        hotCoffee: [],
        coffee: [],
      },
      detailProduct: {},
      //购物车数量
      bagCount: 0,
      // 购物车商品列表
      bagList: [],
      // 商品唯一id 集合
      sids: [],
      //购物车是否为空
      isEmpty: false,
      //总价格
      productTotal: 0,
      //所有菜单列表
      productlist: [
        {
          title: "COFFEE",
          ttop: 0,
        },
        {
          title: "热门推荐",
          ttop: 200,
        },
        {
          title: "经典系列",
          ttop: 1010,
        },
        {
          title: "拿铁",
          ttop: 370,
        },
        {
          title: "摩卡",
          ttop: 1300,
        },
        {
          title: "瑞纳冰",
          ttop: 630,
        },

        {
          title: "关于我们",
          ttop: 1600,
        },
      ],
      //根据索引高亮选项
      activeKey: 0,
      //
    };
  },
  methods: {
    // 首页跳转详情
    getDetail() {
      let pid = this.$route.params.pid;

      this.detailShow(pid);
    },

    //   搜索框
    mySearch() {
      if (this.valSearch.length != 0) {
        this.axios({
          url: "/search",
          method: "GET",
          params: {
            appkey: this.appkey,
            name: this.valSearch,
          },
        })
          .then((res) => {
            if (res.data.code == "Q001") {
              this.searchData = res.data.result;
            }
          })
          .catch((err) => {});
      }
    },
    // 商品收索
    searchDetail(pid) {
      this.valSearch = "";
      this.detailShow(pid);
    },

    onSearch() {
      if (this.searchDate.length == 0) {
        this.$toast("查无此商品!");
      }
    },

    // 滚动条位置
    onScroll(ttop) {
      this.$refs["goodsList"].style.transform = "translateY(" + -ttop + "px)";
    },
    ontouchstart(event) {
      this.goodsScoll.istouched = true;
      let startY = event.changedTouches[0].clientY;
      this.goodsScoll.startY = startY;

      document.ontouchmove = (event) => {
        this.goodsScoll.istouched = false;
        this.goodsScoll.moveY =
          event.changedTouches[0].clientY -
          this.goodsScoll.startY +
          this.goodsScoll.curY;
        if (this.goodsScoll.moveY > 10) {
          this.goodsScoll.moveY = 0;
        } else if (this.goodsScoll.moveY < -1700) {
          this.goodsScoll.moveY = -1600;
        }

        this.productlist.forEach((item, index) => {
          if (item.ttop > Math.abs(this.goodsScoll.moveY ) - 50 && item.ttop <  Math.abs(this.goodsScoll.moveY )   + 50) {
            this.activeKey = index;
          }
        });

        this.$refs["goodsList"].style.transform =
          "translateY(" + this.goodsScoll.moveY + "px)";
      };
    },
    ontouchend() {
      document.ontouchmove = null;
      this.goodsScoll.curY = this.goodsScoll.moveY;
    },

    // 查看商品详情
    detailShow(id) {
      this.isGoodsShow = true;

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      // 获取详情信息
      this.axios({
        url: "/productDetail",
        method: "GET",
        params: {
          pid: id,
          appkey: this.appkey,
        },
      })
        .then((res) => {
          //
          this.$toast.clear();
          this.findCollect(res.data.result[0].pid);
          if (res.data.code == 600) {
            this.detailProduct = res.data.result[0];
            let desc = [];
            desc = this.detailProduct.desc.split("\n");
            this.detailProduct.desc = desc;

            let sugar = [];
            if (this.detailProduct.sugar == "") {
              sugar.push("默认甜度");
            } else {
              sugar = this.detailProduct.sugar.split("/");
            }
            this.detailProduct.sugar = sugar;
            let tem = [];
            if (this.detailProduct.tem == "") {
              tem.push("默认温度");
            } else {
              tem = this.detailProduct.tem.split("/");
            }
            this.detailProduct.tem = tem;
            // 商品初始化
            this.productRule(this.ruleOpt.temIndex, this.ruleOpt.sugarIndex);
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    // 收藏与取消收藏
    onCollect(id) {
      //

      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        // 跳转登陆页面
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      let url = this.isLove ? "/notlike" : "/like";

      //  发起收藏商品请求
      this.axios({
        method: "POST",
        url: url,
        data: {
          appkey: this.appkey,
          pid: id,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          this.$toast.clear();
          // 检测无效 —— 700
          // 收藏成功 —— 800
          // 其他情况
          if (res.data.code == 700) {
            this.$router.push({ name: "Login" });
          } else if (res.data.code == 800) {
            this.isLove = true;
          } else if (res.data.code == 900) {
            this.isLove = false;
          }

          this.$toast(res.data.msg);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //查询是否收藏
    findCollect(id) {
      let tokenString = localStorage.getItem("__tk");
      // 若是没有登陆不进行任何操作
      if (!tokenString) {
        return;
      }
      // 查询是否已经收藏
      this.axios({
        method: "GET",
        url: "/findlike",
        params: {
          appkey: this.appkey,
          pid: id,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          //
          if (res.data.code == 1000) {
            if (res.data.result.length > 0) {
              this.isLove = true;
            } else {
              this.isLove = false;
            }
          }
        })
        .catch((err) => {});
    },

    //咖啡选项
    temOpt(index) {
      this.ruleOpt.temIndex = index;
      this.productRule(this.ruleOpt.temIndex, this.ruleOpt.sugarIndex);
    },
    sugarOpt(index) {
      this.ruleOpt.sugarIndex = index;
      this.productRule(this.ruleOpt.temIndex, this.ruleOpt.sugarIndex);
    },
    miikOpt() {
      this.ruleOpt.isMike = !this.ruleOpt.isMike;
      this.productRule(this.ruleOpt.temIndex, this.ruleOpt.sugarIndex);
    },
    creamOpt() {
      this.ruleOpt.isCream = !this.ruleOpt.isCream;
      this.productRule(this.ruleOpt.temIndex, this.ruleOpt.sugarIndex);
    },

    //列表选项

    // 商品规格处理函数
    productRule(i, j) {
      //

      let myRule = {
        mike: this.ruleOpt.isMike ? "奶" : "",
        cream: this.ruleOpt.isCream ? "奶油" : "",
        tem: this.detailProduct.tem[i],
        sugar: this.detailProduct.sugar[j],
      };
      let str = "";
      for (var key in myRule) {
        //
        if (myRule[key].length != 0) {
          str += myRule[key] + "/";
        }
      }
      this.rule = str.slice(0, -1);
    },

    isbuy() {
      this.shopBagCount(() => {
        if (this.shoppingList.length == this.sids.length) {
          this.isallChecked = true;
        } else {
          this.isallChecked = false;
        }
      });
    },

    // 加入购物袋
    addbag(id) {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        // 跳转登陆页面
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      let dataString = {
        appkey: this.appkey,
        tokenString: localStorage.getItem("__tk"),
        rule: this.rule,
        pid: id,
        count: this.ruleOpt.count,
      };

      this.axios({
        url: "/addShopcart",
        method: "POST",
        data: dataString,
      })
        .then((res) => {
          this.$toast.clear();

          if (res.data.code == 700) {
            this.$router.push({ name: "Login" });
          } else if (res.data.code == 3000) {
            this.shoppingList.push(res.data.sid);
            this.isGoodsShow = false;
          }

          this.$toast(res.data.msg);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //关闭详情页
    closeDetail() {
      this.isGoodsShow = false;
    },
    // 购物车 总价格
    shopBagCount(callback) {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        // 跳转登陆页面
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        url: "/shopcartCount",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code == 4000) {
            if (res.data.result == null) {
              this.bagCount = 0;
            } else {
              this.bagCount = res.data.result;
            }
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });

      // 总价
      this.axios({
        url: "/findAllShopcart",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code == 5000) {
            let productTotal = 0;
            res.data.result.forEach((element, index) => {
              if (
                element.is_remove == 0 &&
                this.shoppingList.indexOf(element.sid) > -1
              ) {
                productTotal += element.price * element.count;
              }
            });
            this.productTotal = productTotal;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });

      if (callback instanceof Function) callback();
    },

    //修改商品数量
    changeproductCount(sid, count) {
      let tokenString = localStorage.getItem("__tk");
      let dataString = {
        appkey: this.appkey,
        tokenString: tokenString,
        sid: sid,
        count: count,
      };
      this.axios({
        url: "/modifyShopcartCount",
        method: "POST",
        data: dataString,
      })
        .then((res) => {
          if (res.data.code == 6000) {
            this.shopBagCount();
          }
        })
        .catch((err) => {});
    },

    // 查看购物袋商品信息
    shopBag() {
      this.isShopBag = true;
      this.shopBagList();
    },

    // 购物清单
    shopBagList(callback) {
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
        url: "/findAllShopcart",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          this.$toast.clear();

          let sids = [];
          if (res.data.code == 5000) {
            this.bagList = res.data.result;
            // 把购物车的商品sid 存起来
            this.bagList.forEach((item) => {
              sids.push(item.sid);
            });
          }
          this.sids = sids;
          // this.shoppingList = sids;

          if (callback instanceof Function) callback();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    // 全选与全不选
    checkAll() {
      this.isCheckedAll = !this.isCheckedAll;
      if (this.isallChecked) {
        this.shoppingList = this.sids;
      } else {
        this.shoppingList = [];
      }

      this.shopBagCount();
    },

    // 清空购物车
    clearCart() {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        return;
      }
      //

      let dataString = {
        appkey: this.appkey,
        tokenString: tokenString,
        sids: JSON.stringify(this.sids),
      };

      // this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   duration: 0,
      // });

      // 确认清空
      this.$dialog
        .confirm({
          title: "清空购物袋",
          message: "删除后不可恢复，是否确认清空？",
        })
        .then(() => {
          // 真删除
          this.axios({
            url: "/deleteShopcart",
            method: "POST",
            data: dataString,
          })
            .then((res) => {
              this.$toast.clear();

              if (res.data.code == 7000) {
                this.shopBag();
                this.shopBagCount();
              }
              this.$toast(res.data.msg);
            })
            .catch((err) => {
              this.$toast.clear();
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 删除商品
    deleteProduct(id) {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        return;
      }
      let sids = [];
      sids.push(id);

      let dataString = {
        appkey: this.appkey,
        tokenString: tokenString,
        sids: JSON.stringify(sids),
      };

      this.$dialog
        .confirm({
          title: "删除商品",
          message: "删除后不可恢复，是否确认删除？",
        })
        .then(() => {
          // 真删除
          this.axios({
            url: "/deleteShopcart",
            method: "POST",
            data: dataString,
          })
            .then((res) => {
              this.$toast.clear();

              if (res.data.code == 7000) {
                this.shopBag();
                this.shopBagCount();
              }
              this.$toast(res.data.msg);
            })
            .catch((err) => {
              this.$toast.clear();
            });
        })
        .catch(() => {});
    },

    //下单
    goOrder() {
      // 选择地址
      this.shopBagList(() => {
        if (this.shoppingList.length == 0) {
          this.$toast("快去看看,把咖啡带回家！");
          return;
        }
        // 测试
        if (this.istakeout) {
          this.isAddress = true;
          this.getAddress();
        } else {
          this.onsure();
        }
      });
    },

    // 收货地址
    getAddress() {
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

    // 确定地址
    onsure() {
      this.$router.push({
        name: "Order",
        params: {
          eat: this.istakeout,
          aid: this.addressID,
          sid: this.shoppingList,
          index: 1,
        },
      });
    },
  },
  computed: {
    detailPrice() {
      let price = (
        (this.detailProduct.price * 100 * this.ruleOpt.count) /
        100
      ).toFixed(2);
      return price;
    },
  },
};
</script>