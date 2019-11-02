<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" />
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <span class="detail">
            <span class="sell-count">月售{{ food.count }}份</span>
            <span class="rating">好评率{{ food.rating }}</span>
          </span>
          <div class="price">
            <span class="now">￥{{ food.price }}</span
            ><span class="old" v-show="food.oldPrice"
              >￥{{ food.oldPrice }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "food",
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    }
  },

  watch: {}
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
</style>
