import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'

// vant 组件的导入方式
// import { Form } from 'vant';
// import { Popup } from 'vant';
// import { Cell } from 'vant';
import axios from 'axios'
import VueAxios from 'vue-axios'

import {
  Form,
  Popup,
  Cell,
  Toast,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Icon,
  Sku,
  Button,
  CheckboxGroup,
  Checkbox,
  Grid,
  GridItem,
  AddressEdit,
  NavBar,
  Card,
  AddressList,
  Stepper,
  Empty,
  SwipeCell,
  Dialog,
  Sidebar,
  SidebarItem,
  Uploader,
  Switch,
  Tabs,
  Tab

} from 'vant';


Vue.use(Form)
  .use(Popup)
  .use(Icon)
  .use(Cell)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Sku)
  .use(Button)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Grid)
  .use(GridItem)
  .use(AddressEdit)
  .use(NavBar)
  .use(AddressList)
  .use(Card)
  .use(Stepper)
  .use(Empty)
  .use(SwipeCell)
  .use(Dialog)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Uploader)
  .use(Switch)
  .use(Tabs)
  .use(Tab);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

// appkey 密钥设置成全局属性
Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="

// 配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002/'

//拦截器 --- 用于post请求前 执行的代码
axios.interceptors.request.use(config => {

  if (config.method == 'post') {

    
    // 序列化
    let dataString = ''
    for (let key in config.data) {
      dataString += `${key}=${config.data[key]}&`;
    }


    config.data = dataString.slice(0, -1);
    



  }




  //必须返回
  return config;
})

// 全局过滤器

// 保留小数
Vue.filter('decimal', (v, n = 2) => {
  return v.toFixed(n);
})


Vue.filter('formatDate', (v, format) => {


  //创建日期对象
  let date = new Date(v);

  //格式化年份
  let year = date.getFullYear().toString();

  if (/(y+)/.test(format)){
    //获取匹配组的内容
    var content = RegExp.$1;
 
    format = format.replace(content, year.slice(year.length - content.length));
  }

 

  //格式化月份、日份、时、分、秒
  let o = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };



  for (let key in o) {
    //创建动态正则表达式
    let reg = new RegExp(`(${key}+)`);
  

    if (reg.test(format)) {
      //获取组匹配的内容
      let groupContent = RegExp.$1;
    
      format = format.replace(groupContent, o[key] >= 10 ? o[key] : groupContent.length == 2 ? '0' + o[key] : o[key]);
     
    }
    
  }

  return format;
})




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
