<template>
  <div class="comment">
    <div class="comment-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="title">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="title">{{ seller.foodScore }}</span>
          </div>
          <span class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from "../star/star.vue";
export default {
  name: "Comment",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {};
  },

  components: {
    star
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang="stylus" scoped>
.comment
  position: absolute
  top: 174px
  left: 0
  bottom: 0
  overflow: hidden
  width: 100%
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      padding: 6px 0
      flex: 0 0 137px
      width: 137px
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      // 适配iphone5
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        margin-bottom: 6px
        line-height: 28px
        font-size: 24px
        color: rgb(255, 153, 0)
      .title
        line-height: 12px
        font-size: 12px
        color: rgb(7, 17, 27)
        margin-bottom: 8px
      .rank
        font-size: 10px
        line-height: 10px
        color: rgb(147, 153, 159)
        // padding-bottom: 6px
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        margin-bottom: 8px
        font-size: 0
        .title
          line-height: 18px
          display: inline-block
          vertical-align: top
          font-size: 12px
          color: rbg(7, 17, 27)
        .star
          display: inline-block
          margin: 0 12px
          vertical-align: top
        .score
          display: inline-block
          vertical-align: top
          line-height: 18px
          font-size: 12px
          color: rgb(255, 153, 0)
      .delivery-wrapper
        font-size: 0
        .title
          line-height: 18px
          font-size: 12px
          color: rbg(7, 17, 27)
        .delivery
          font-size: 12px
          color: rgb(147, 153, 159)
          margin-left: 12px
</style>
