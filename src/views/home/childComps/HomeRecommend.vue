<template>
<div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="" />
            <div>{{item.title}}</div>
        </a>
    </div>
</div>
 
</template>

<script>

import { Swiper, SwiperItem } from "components/common/swiper";

export default {
        name: "HomeRecommend",
        props:{
            recommends:{
                type:Array,
                default(){
                    return[]
                }
            }
        },
        components:{
            Swiper,
            SwiperItem
        }
	}



</script>

<style scoped>
.recommend {
    display: flex;
    text-align: center;
    font-size: 14px;

    padding: 10px 0px 30px;
    border-bottom: 8px solid #eee;
}

.recommend-item{
    flex: 1;
}

.recommend-item img {
    width: 80px;
    height:80px;
    margin-bottom:10px;
}


</style>