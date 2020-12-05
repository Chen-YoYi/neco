<template>
  <div class="address">
    <!-- 头部返回 -->
    <van-nav-bar
      title="地址管理"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <Bgc></Bgc>
    <!-- 地址信息管理 -->
    <div class="address_box">
      <div></div>
      <div class="">
        <van-address-list
          v-model="addressID"
          :list="list"
          :switchable="false"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        >
        </van-address-list>
      </div>
    </div>
  </div>
</template>
<script>
import Bgc from "../components/Bgc.vue";
export default {
  name: "AddressInfo",
  data() {
    return {
      addressID: "",
      list: [],
    };
  },
  components: {
    Bgc,
  },
  created() {
    this.onAddress();
  },
  methods: {
    // 返回上一级
    back() {
      this.$router.go(-1);
    },
    // 新增地址
    onAdd() {
      //  this.$toast('新增地址');
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

    // 地址查询
    onAddress() {
      let tokenString = localStorage.getItem("__tk");
      let list = [];
          this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        url: "/findAddress",
        method: "GET",
        params: {
          appkey: this.appkey,
          tokenString: tokenString,
        },
      })
        .then((res) => {
          this.$toast.clear();
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
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
    // 选中地址
    onSelect(item, index) {
      this.addressID = item.id;
    },
  },
};
</script>
<style lang="less" scoped>
@stylecolor : #333752;
.address {
  .van-address-list__bottom {
    bottom: 10px;
    background-color: transparent;
  }
  .van-address-item {
    border: 1px solid #f5f5f5;
  }
  .van-button--danger {
    background-color: @stylecolor;
    border: 1px solid @stylecolor;
  }
}
</style>