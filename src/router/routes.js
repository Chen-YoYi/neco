export const routes = [
    //登陆路由
    {
        path :'/',
        name :'Login',
        component:()=>import('../views/Login.vue')
        
    },
    //增加地址
    {
        path : '/addAddress',
        name:"AddAddress",
        component:()=>import('../views/AddAddress.vue')
    },
    //修改地址
    {
        path :"/editAddress",
        name:"EditAddress",
        component:()=>import('../views/EditAddress.vue')
    },
    //提交订单
    {
        path:"/order",
        name : 'Order',
        component:()=>import('../views/Order.vue')
    },
    //忘记密码
    {
        path :"/forgetPassword",
        name :"ForgetPassword",
        component:()=>import('../views/ForgetPassword.vue')
    },
    //我的设置
    {
        path :"/myset",
        name : "Myset",
        component:()=>import('../views/Myset.vue')
    },
    //地址管理
    {
        path : "/addressInfo",
        name:'AddressInfo',
        component:()=>import('../views/AddressInfo.vue')
    },
    //修改密码
    {
        path :"/newPass",
        name:"NewPass",
        component:()=>import('../views/NewPass.vue')
    },
    //我的收藏
    {
        path : "/collectList",
        name:"CollectList",
        component:()=>import('../views/CollectList.vue')
    },
    //我的资料
    {
        path :"/userInfo",
        name :"UserInfo",
        component:()=>import('../views/UserInfo.vue')
    },
    //支付页面
    {
        path :"/pay",
        name :"Pay",
        component:()=>import('../views/Pay.vue')
    },

    
    

    // 首页路由
    {
        path:"/Main",
        name:"Main",
        component:()=>import('../views/Main.vue'),
        children :[
            {
                path : 'home',
                name : "Home",
                component : ()=>import('../views/Home.vue')
            },
            {
                path : 'menu',
                name : "Menu",
                component : ()=>import('../views/Menu.vue')
            },
            {
                path : 'cart',
                name : "Cart",
                component : ()=>import('../views/Cart.vue')
            },
            {
                path : 'mine',
                name : "Mine",
                component : ()=>import('../views/Mine.vue')
            }

        ]
    },
    {
            path:'*',
            redirect : {
                name : "Home"
            }
        }



  
]