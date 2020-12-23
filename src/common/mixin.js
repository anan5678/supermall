
import {debounce} from  "./utils"
import BackTop from "components/content/backtop/backTop";

export const itemListenerMixin = {

    data(){
        return{
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted(){
        this.newRefresh = debounce(this.$refs.scroll.refresh,100)

        this.itemImgListener = () => {
          this.newRefresh()
        }
        this.$bus.$on("itemImageLoad",this.itemImgListener)
    }
}

export const backTopMixin = {
    data(){
        return {
            isShowBackTop:false
        }
    },
    components:{
        BackTop
    },

    methods:{
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
          },
    }
}