import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-type"


export default {
    addCart(context,payload){
      return new Promise((resolve,reject) => {
            // state.cartList.push(payLoad)
        // // let oldProduct = null;
        // for(let item of state.cartList){
        //     if(item.iid === payLoad.iid){
        //         oldProduct = item
        //     }
        // }

        // 查找数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 判断oldProduct
        if(oldProduct){
            context.commit(ADD_COUNTER,oldProduct)
            resolve("您已成功加入购物车")
        }else {
            // 添加新的商品
            payload.count = 1
            context.commit(ADD_TO_CART,payload)
            resolve("您已成功加入购物车")
        }
      })
    }
}

