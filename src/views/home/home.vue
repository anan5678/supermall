<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
       ref="tabControl1"
        :titles="[`流行`, `新款`, `精选`]"
        @tabClick="tabClick"
        class="tab-control"
        v-show="isTabFixed"
      />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="LoadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature-view></home-feature-view>
      <tab-control
       ref="tabControl2"
        :titles="[`流行`, `新款`, `精选`]"
        @tabClick="tabClick"
        
      />

      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeatureView from "./childComps/HomeFeatureView";

import NavBar from "components/common/navbar/NavBar";
import tabControl from "components/content/tabControl/tabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";


import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "../../common/utils";
import { backTopMixin} from "../../common/mixin";

export default {
  name: "home",
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFeatureView,
    NavBar,
    tabControl,
    GoodList,
    Scroll,
   
  },
   mixins:[backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
     
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },

  deactivated(){
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局监听
    this.$bus.$off("itemImageLoad",this.itemImgListener)
},

  created() {
    // 获取多个请求数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // 赋值
    
  },

  mounted() {

//     // 这个地方IMG标签确实被挂载，但是其中的图片还没有占据高度
//     // 图片加载完成的事件监听
//     const refresh = debounce(this.$refs.scroll.refresh,50);
//     // 对监听事件进行保存
//     this.itemImgListener =  () => {
//       refresh();
//     }

//     this.$bus.$on("itemImageLoad",this.itemImgListener);
// // 获取tabControl的tabOffsetTop
//     // 所有的组件都有一个属性$el:用于获取组件中的元素
    
  },
  methods: {
    // 事件监听方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
  
    contentScroll(position) {
      // console.log(position);
      // 判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop
    },

    LoadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },

    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },

    // 防抖动函数
    
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  /* padding-top: 44px; */
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: white;
  font-size: 24px;


  /* position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 9px; */
}

.tab-control {
  position: relative;
  z-index: 9;
}



.content {
  
  overflow: hidden;
  /* margin-top: 44px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
}
</style>