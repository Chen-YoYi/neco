import Vue from 'vue'
import { Toast } from  'vant'
Vue.use( Toast )

class ValidForm{

    constructor(){}

    valid( data ){
        console.log("验证表单")
        for(var key in data){
            if( ! (data[key].reg.test(data[key].val))){
                Toast(data[key].errmsg);
                return false
            }

            return  true
        }
    }
}

export const validForm = new ValidForm();

// export  default  new ValidForm();