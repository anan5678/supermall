<template>
  <!-- ref绑定在组件中。通过this.$refs.refname获取到的是一个组件对象 
     ref绑定在元素中。通过this.$refs.refname获取到的是一个元素对象 
-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Sroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },

  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      //   probeType: 3,
      //   pullUpLoad: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on("scroll",(position => {
        this.$emit("scroll",position)
      }))
    }
    // 监听上拉事件
    this.scroll.on("pullingUp",() => {
      this.$emit("pullingUp")
    })

    // 监听scorll滚动到底部

    if(!this.pullUpLoad){
      this.scroll.on("pullUpLoad", () => {
        this.$emit("pullUpLoad")
      })
    }
   
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
     refresh() {
      this.scroll && this.scroll.refresh();
  
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>

<style scoped>
</style>