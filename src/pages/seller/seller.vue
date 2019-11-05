<template>
  <div class="seller">
    <cube-scroll>
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{ seller.name }}</h1>
          <div class="desc border-bottom">
            <star class="star" :size="36" :score="seller.score"></star>
            <span class="text">评论数:({{ seller.ratingCount }})</span>
            <span class="text">月售{{ seller.sellCount }}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{ seller.minPrice }}</span
                >元
              </div>
            </li>
            <li class="block">
              <h2>商家配送费</h2>
              <div class="content">
                <span class="stress">{{ seller.deliveryPrice }}</span
                >元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{ seller.deliveryTime }}</span
                >分钟
              </div>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper">
            <p class="content">{{ seller.bulletin }}</p>
          </div>
        </div>
        <div class="support">
          <ul v-if="seller.supports" class="supports">
            <li
              class="support-item "
              v-for="(item, index) of seller.supports"
              :key="item.type"
            >
              <span
                class="icons"
                :class="classMap[seller.supports[index].type]"
              ></span>
              <span class="text">{{ seller.supports[index].description }}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="picts">
          <h1 class="title">商家实景</h1>
          <cube-scroll class="pic-wrapper" :options="picScrolloptions">
            <ul class="pic-list" ref="list">
              <li
                class="pic-item"
                v-for="(pic, index) of seller.pics"
                :key="index"
              >
                <img :src="pic" width="120" height="90" alt="" />
              </li>
            </ul>
          </cube-scroll>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商家信息</h1>
          <ul>
            <li
              class="info-item"
              v-for="(item, index) of seller.infos"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import star from "../star/star";
import split from "../split/split";
export default {
  name: "Seller",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      picScrolloptions: {
        scrollX: true,
        stopPropagation: true,
        directionLockThreshold: 0
      }
    };
  },

  components: {
    star,
    split
  },

  computed: {},

  beforeMount() {},

  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },

  methods: {},

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
.seller
  position: absolute
  top: 174px
  left: 0
  bottom: 0
  overflow: hidden
  width: 100%
  .overview
    padding: 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .desc
      padding-bottom: 18px
      font-size: 0
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .star
        display: inline-block
        vertical-align: top
        margin-right: 8px
      .text
        display: inline-block
        line-height: 18px
        vertical-align: top
        margin-right: 12px
        font-size: 10px
        color: rgb(77, 85, 93)
    .remark
      display: flex
      padding-top: 18px
      .block
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border: none
        h2
          margin-bottom: 4px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .content
          line-height: 24px
          font-size: 10px
          color: rgb(7, 17, 27)
          .stress
            font-size: 24px
  .bulletin
    padding: 18px 18px 0 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .content-wrapper
      padding: 0 12px 16px 12px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .content
        line-height: 24px
        font-size: 12px
        color: rgb(240, 20, 20)
  .support
    .supports
      .support-item
        padding: 16px 18px
        border-bottom: 1px solid rgba(7, 17, 27, 0.05)
        font-size: 0
        &:last-child
          border: none
        .icons
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
  .picts
    padding: 18px
    .title
      margin-bottom: 12px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .pic-wrapper
      display: flex
      align-items: center
      // 超过屏幕宽度不换行
      white-space: nowrap
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 0
  .info
    padding: 18px 18px 0 18px
    .title
      padding-bottom: 12px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
      border-bottom: 1px solid rgba(7, 17, 27, 0.08)
    .info-item
      padding: 16px 12px
      line-height: 16px
      border-bottom: 1px solid rgba(7, 17, 27, 0.08)
      font-size: 12px
      &:last-child
        border: none
</style>
