<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" />
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{ food.name }}</h1>
            <div class="detail">
              <span class="sell-count">月售{{ food.count }}份</span>
              <span class="rating">好评率{{ food.rating }}</span>
            </div>
            <div class="price">
              <span class="now">￥{{ food.price }}</span
              ><span class="old" v-show="food.oldPrice"
                >￥{{ food.oldPrice }}</span
              >
            </div>
            <div class="carcontrol-wrapper">
              <carcontrol :food="food"></carcontrol>
            </div>
            <transition name="fade">
              <div
                @click="addFirst"
                class="buy"
                v-show="!food.count || food.count == 0"
              >
                加入购物车
              </div>
            </transition>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{ food.info }}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商家评价</h1>
          <ratingselect
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
          ></ratingselect>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
// const POSITIVE = 0;
// const NEGATIVE = 1;
const All = 2;
import carcontrol from "../carcontrol/carcontrol";
import split from "../split/split";
import Vue from "vue";
import ratingselect from "../ratingselect/ratingselect";
export default {
  name: "food",
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: All,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },

  components: {
    carcontrol,
    split,
    ratingselect
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.$on("show", () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    });
  },

  methods: {
    show() {
      this.showFlag = true;
      // 初始化状态 默认样式
      this.selectType = All;
      this.onlyContent = true;
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(e) {
      window.console.log("click");
      // 设置count为1
      Vue.set(this.food, "count", 1);
      this.$emit("addcar", e.target);
    }
  }

  // watch: {
  //   food() {
  //     this.scroll = new BScroll(this.$refs.food, {
  //       click: true
  //     });
  //   }
  // }
};
</script>
<style lang="stylus" scoped>
.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  // 小于购物车层 和弹窗层
  z-index: 30
  width: 100%
  // overflow: hidden
  background: #fff
  transform: translate3d(0, 0, 0)
  transition: all 0.2s linear
  &.move-enter, &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .image-header
    position: relative
    width: 100%
    height: 0
    // 撑开当前盒子的高度 防止抖动 向下拉一个高度
    padding-bottom: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0px
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: 20px
        color: #fff
  .content
    position: relative
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 8px
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
    .detail
      margin-bottom: 18px
      line-height: 10px
      height: 10px
      font-size: 0
      .sell-count, .rating
        font-size: 10px
        color: rgb(147, 153, 159)
      .sell-count
        margin-right: 12px
    .price
      font-weight: 700
      line-height: 24px
      .now
        margin-right: 8px
        font-size: 14px
        color: rgb(240, 20, 20)
      .old
        text-decoration: line-through
        font-size: 10px
        color: rgb(147, 153, 159)
    .carcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      // 购物车蓝色区域 默认是盖住carcontrol
      right: 18px
      bottom: 18px
      z-index: 10
      height: 24px
      line-height: 24px
      padding: 0 12px
      box-sizing: border-box
      font-size: 10px
      border-radius: 12px
      color: #fff
      background-color: rgb(0, 160, 220)
      opacity: 1
      transition: all 0.2s
      &.fade-enter, &.fade-leave-active
        opacity: 0
  .info
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 16px
      font-size: 14px
      color: rgb(7, 17, 27)
      font-weight: 700
    .text
      line-height: 24px
      font-size: 12px
      padding: 0 8px
      color: rgb(77, 85, 93)
  .rating
    padding-top: 18px
    .title
      line-height: 14px
      margin-left: 18px
      font-size: 14px
      color: rgb(7, 17, 27)
      font-weight: 700
</style>
