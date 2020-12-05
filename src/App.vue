<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px;
  color: #2c3e50;

}
body{
    background-color: #f5f5f5 ;
    // overflow: scroll;

}
// 公共样式
.fl {
  float: left;
}
.fr{
  float: right;;
}

.clearfix::after{
  content: "";
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
  opacity: 0;
}
.clearfix{
  zoom: 1;
}

.auto-img{
  width: 100%;
  display: block;
}



</style>
