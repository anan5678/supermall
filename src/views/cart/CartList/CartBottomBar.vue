<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" 
            :is-checked="isSelectAll"
            @click.native="checkClick"/>
            <span>全选</span>
        </div>

        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>

import CheckButton from "components/content/CheckButton/CheckButton"

import { mapGetters } from "vuex";


export default {
    name:"CartBottomBar",
    components:{
        CheckButton
       
    },
    computed:{

        ...mapGetters(["cartList"]),
        totalPrice(){
            return "¥" + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength() {
            return this.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            if(this.cartList.length === 0) return false
        //  return !this.cartList.filter(item => !item.checked).length
         return !this.cartList.find(item => !item.checked)

        //   if(this.cartList.length === 0) return false
        //   for(let item of this.cartList){
        //       if(!ite.checked){
        //           return false
        //       }  
        //   }return trues
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){
                // 全部选中
                this.cartList.forEach(item => item.checked = false);
            } else {
                this.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick(){
            if(!this.isSelectAll) {
                this.$toast.show("请选择购买的商品",1000)
            }
        }
    }
}
</script>

<style scoped>

.bottom-bar {
    height: 40px;
    background-color: #eeeeee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    display: flex;
}

.check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
    margin-right: 5px;
}

.check-content span {
    margin-top: 8px;
    font-size: 16px;
    width: 60px;
}

.price {
  
    margin-top: 13px;
    font-size: 16px;
    flex:1
}

.calculate {
    width: 100px;
    padding-top: 8px;
    background-color: red;
    color:white;
    text-align: center;
    font-size: 18px;

}


</style>