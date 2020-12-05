<template>
  <div class="edmitAddress">
            <van-nav-bar
                  title="修改地址"
                  left-text="返回"
                  left-arrow
                  @click-left="back"
                />
    <!-- 地址信息 -->
            <van-address-edit
                :area-list="areaList"
                show-set-default
                show-search-result 
                show-delete
                :address-info="addressInfo"
                :area-columns-placeholder="['省份', '城市', '区/县']"
                @save="onSave"
                @delete="onDelete(aid)"
              
              />
   </div>
</template>
<script>
import areaList from '../assets/js/area'
export default {
  name : "EmitAddress",
   data() {
    return {
      areaList,
      aid:"",
      addressInfo:{},
    };
  },
  created() {
   let aid = this.$route.params;
   this.aid = aid.id;
   this.onfindAddress();
  },
  methods: {
      back(){
         this.$router.go(-1);
     },
    //  保存修改
     onSave(info){
      let tokenString = localStorage.getItem('__tk');
      
      this.$toast.loading({
             message: "加载中...",
             forbidClick: true,
             duration: 0,
         });
       
      //数据处理 
        let dataString = Object.assign({}, info);
        dataString.appkey = this.appkey;
        dataString.tokenString = tokenString;
        dataString.isDefault  = dataString.isDefault-0;
        //删除对象中的属性
        delete dataString.country;
        

      this.axios({
         url: "/editAddress",
         method:"POST",
         data :dataString
      }).then((res)=>{
        this.$toast.clear();
        // 
         if(res.data.code ==30000){
           this.$toast("修改成功！");
           this.$router.go(-1);
         }
      }).catch((err)=>{
        this.$toast.clear();
        
        this.$toast("修改失败！");
      })


     },
    //  删除地址
     onDelete(id){

     let   tokenString = localStorage.getItem('__tk');
     if(!tokenString){
       return
     }

       this.$toast.loading({
         message: "加载中...",
         forbidClick: true,
         duration: 0,
     });

     this.axios({
          url:"/deleteAddress",
          method :"POST",
          data : {
            appkey : this.appkey,
            tokenString :tokenString,
            aid : id,
          }
        }).then((res)=>{
          
            this.$toast.clear();
          if(res.data.code =10000){
             this.$toast(res.data.msg);
             this.$router.go(-1);
          }
        }).catch((err)=>{
          this.$toast.clear();
        })

     },


    //查询地址接口
    onfindAddress(){
      

      let tokenString = localStorage.getItem("__tk");
      
    this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

        this.axios({
          url :"/findAddressByAid",
          method :"GET",
          params:{
             appkey:this.appkey ,
             tokenString :tokenString ,
             aid :this.aid
          }
        }).then((res)=>{
          this.$toast.clear();
          

         this.addressInfo = res.data.result[0];
         if(this.addressInfo.isDefault ==1) this.addressInfo.isDefault = true;
        }).catch((err)=>{
          this.$toast.clear();
          
        })

    }



  },
}
</script>
<style lang="less" scoped>
    @stylecolor : #333752; 
    @styleassist :#f9ce0e;
    .edmitAddress{
         /deep/ .van-button--danger{
        background-color: @stylecolor;
        border: 1px solid @stylecolor;

          }

        /deep/ .van-switch--on{
              background-color: @styleassist;
          }

    }
</style>