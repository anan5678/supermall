<template>
  <div class="cart-list">
      
      <scroll class="content"
      :pull-up-load="true"
      ref="scroll">
      
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
     
      </scroll>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem"



export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem
    
  },
  computed: {
    ...mapGetters(["cartList"]),

    
  },
  activated(){
      this.$refs.scroll.refresh()
  }

};
</script>

<style scoped>

.cart-list {
    height:100vh;
     position: relative;
  
}
.content {
    height:calc(100% - 93px);
    background-color: #fff;;
    overflow: hidden;
}

</style>