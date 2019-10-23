<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="s-description">{{
            seller.supports[0].description
          }}</span>
        </div>
      </div>
      <div @click="showDetail" v-if="seller.supports" class="support-count">
        <span class="count"> {{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-wrapper">
      <span class="b-title"></span
      ><span class="b-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar" alt="" />
    </div>
    <transition name="fade">
      <div v-show="detailshow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li
                class="support-item"
                v-for="(item, index) of seller.supports"
                :key="index"
              >
                <span
                  class="icon"
                  :class="classMap[seller.supports[index].type]"
                ></span>
                <span class="text">{{
                  seller.supports[index].description
                }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div @click="hideDetail" class="detail-close">
          <div class="icon-close"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from "../star/star";
export default {
  name: "Header",
  props: {
    seller: Object
  },
  data() {
    return {
      detailshow: false
    };
  },

  components: {
    star
  },

  computed: {},

  beforeMount() {},

  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },

  methods: {
    showDetail() {
      this.detailshow = true;
    },
    hideDetail() {
      this.detailshow = false;
    }
  },

  watch: {}
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
.header
  color: #fff
  position: relative
  overflow: hidden
  // 设置样板透明度
  background: rgba(7, 17, 27, 0.5)
  .content-wrapper
    padding: 24px 12px 18px 24px
    font-size: 0px
    .avatar
      // vertical-align: top
      display: inline-block
      img
        border-radius: 2px
    .content
      vertical-align: top
      display: inline-block
      margin-left: 16px
      .title
        margin: 2px 0 8px 0
        .brand
          vertical-align: top
          // 顶部对齐
          display: inline-block
          // sapn标签没内容不占据空间
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold
      .description
        font-size: 12px
        line-height: 12px
        margin-bottom: 10px
      .support
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .s-description
          vertical-align: top
          line-height: 12px
          font-size: 12px
    .support-count
      position: absolute
      right: 12px
      bottom: 42px
      padding: 0 8px
      height: 24px
      line-height: 24px
      border-radius: 14px
      background-color: rgba(0, 0, 0, 0.2)
      text-align: center
      .count
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        margin-left: 2px
        font-size: 10px
        line-height: 24px
  .bulletin-wrapper
    // font-size: 0
    // 消除span之间的空白间隙
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    background: rgba(7, 17, 27, 0.2)
    .b-title
      vertical-align: top
      display: inline-block
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
      margin-top: 8px
    .b-text
      vertical-align: top
      margin: 0 4px
      font-size: 10px
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      top: 10px
      right: 12px
  .background
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
    // 设置高斯模糊
  .detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background: rgba(7, 17, 27, 0.8)
    opacity: 1
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
    .detail-wrapper
      min-height: 100%
      width: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        .star-wrapper
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            padding: 0 12px
            font-size: 14px
            font-weight: 700
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .icon
              display: inline-block
              width: 16px
              height: 16px
              vertical-align: top
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .text
              font-size: 12px
              line-height: 16px
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto
      clear: both
      font-size: 32px
</style>
