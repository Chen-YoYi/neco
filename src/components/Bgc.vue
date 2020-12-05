<template>
    <div class="bgBox">
  
        <div class="bg">
            
            <div class="bgc">
                
            </div>
            <div class="title">
                {{content}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name :"Bgc",
    props:{
        content:{
            type :String,
            default (){
                return "MilkCoffee"
            }
        }
    }
  
}
</script>
<style lang="less">
   @stylecolor : #333752;
     .bg{    
            width: 100%;
            height: 150px;
            overflow: hidden;
            position: relative;   
            .bgc{
                width: 700px;
                height:  400px;
                border-radius: 50%;
                border: 1px solid #333;

                margin-top: -260px;
                margin-left: -160px;
                background-color: @stylecolor;
            }
    
            .title{
                color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 26px;
                transform:  translate(-50%,-50%);
                text-shadow: 0px 0px 10px #f5f5f5;
    
            
                }
    }
</style>