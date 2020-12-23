<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar"

import CartList from "./CartList/CartList"
import CartBottomBar from "./CartList/CartBottomBar"

import { mapGetters } from "vuex"



export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
    
  },

  computed:{
    ...mapGetters(["cartLength"])

    // ...mapGetters({
    //   length:"cartLength"
    // }) DOM里可以直接写length
  }
};
</script>

<style scoped>
.nav-bar{
  background-color:var(--color-tint);
  color:#fff;
  font-weight:1000px;
  font-size: 20px;
  z-index: 9;
}


</style>