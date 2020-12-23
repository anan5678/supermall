<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
    >
    
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <good-list :goods="recommends" ref="recommends"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from "./childdetail/DetailNavBar";
import DetailSwiper from "./childdetail/DetailSwiper";
import DetailBaseInfo from "./childdetail/DetailBaseInfo";
import DetailShopInfo from "./childdetail/DateilShopInfo";
import DetailGoodsInfo from "./childdetail/DetailIGoodsInfo";
import DetailParamInfo from "./childdetail/DetailParamInfo";
import DetailCommentInfo from "./childdetail/DetailCommentInfo";
import DetailBottomBar from "./childdetail/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goods/GoodList";
import BackTop from "components/content/backtop/backTop";
import Toast from "components/common/toast/Toast";

import { getDetail, Goods, Shop, GoodsParam, getCommend } from "network/detail";
import { debounce } from "../../common/utils";
import { itemListenerMixin, backTopMixin } from "../../common/mixin";

import { mapActions } from "vuex"


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    Toast
    
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message:"",
      show:false
    };
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;

    //  根据id请求详细数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 获取轮播图图片信息
      this.topImages = data.itemInfo.topImages;

      // console.log(res)
      // 获取商品信息

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详细数据
      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求推荐数据
    getCommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(res)
    });

    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      const positionY = -position.y;

      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && this.themeTopYs[i+1]) ||
        // (i === length - 1 && positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        this.isShowBackTop = -position.y > 1000;
      }
    },
    addToCart(){
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      
      // this.$store.commit("addCart",product)
      // this.$store.dispatch("addCart",product).then(res => {
      //   console.log(res)
      // })

      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ""
        // },1000)
        this.$toast.show(res,1000)
    })
      
    },

    // 映射actions
    ...mapActions(["addCart"])
    

  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 93px);
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>