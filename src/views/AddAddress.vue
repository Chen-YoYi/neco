<template>
    <div class="addAddress">
        <!-- 新增收货地址 -->
        <van-nav-bar
            title="新增收货地址"
            left-text="返回"
            left-arrow

            @click-left="back"
          />
   
      <!-- 新的收货地址信息 -->
      <div class="newAddress">
        <van-address-edit
            :area-list="areaList"
            show-set-default
            show-search-result 
            :area-columns-placeholder="['省份', '城市', '区/县']"
          @save="onSave"
        />
      </div>
    </div>
</template>
<script>
// import '../assets/css/addAddres.less'
import areaList from '../assets/js/area'
export default {
    name : "AddAddress",
      data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
     back(){
         this.$router.go(-1);
     }, 
    onSave(AddressInfo) {
      let tokenString = localStorage.getItem('__tk');
      
      this.$toast.loading({
             message: "加载中...",
             forbidClick: true,
             duration: 0,
         });
       
      //数据处理 
        let dataString = Object.assign({}, AddressInfo);
        dataString.appkey = this.appkey;
        dataString.tokenString = tokenString;
        dataString.isDefault  = dataString.isDefault-0;
        //删除对象中的属性
        delete dataString.country;

      this.axios({
         url: "/addAddress",
         method:"POST",
         data :dataString
      }).then((res)=>{
        this.$toast.clear();
        
         if(res.data.code ==9000){
           this.$router.go(-1);
         }
      }).catch((err)=>{
        this.$toast.clear();
        
      })
    },

  },
}
</script>
<style lang="less" scoped>
  @stylecolor : #333752; 
@styleassist :#f9ce0e;

.addAddress{
    // background-color: #f5f5f5;
   /deep/ .van-button--danger{
        background-color: @stylecolor;
        border: 1px solid @stylecolor;

    }

   /deep/ .van-switch--on{
        background-color: @styleassist;
    }

    .newAddress{
        // margin-top:50px;
        margin: 60px 20px 0px;
        background-color: #fff;
        // border: 4px solid rgb(148, 148, 148);
        // border: 2px solid #f5f5f5;
        box-shadow:  0px 0px 3px 2px #ddd;
        border-radius: 10px;
    }
}
</style>