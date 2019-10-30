<template>
  <div class="carcontrol">
    <transition name="move">
      <div
        class="car-decrease "
        v-show="food.count > 0"
        @click="decreassecount"
      >
        <span class="inner icon-remove_circle_outline "></span>
      </div>
    </transition>
    <div class="car-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="car-add icon-add_circle" @click="addcart"></div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "carcontrol",
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    addcart(e) {
      if (!e._constructed) {
        // 如果是betterscroll的原生点击就return
        return;
      }
      if (!this.food.count) {
        // 添加的不存在的属性字段 vue检测不到 必须要用到vue.set接口
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      // 派发addcar 参数为dom对象
      this.$emit("addcar", e.target);
    },
    decreassecount(e) {
      if (!e._constructed) {
        // 如果是betterscroll的原生点击就return
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
.carcontrol
  font-size: 0
  .car-decrease
    display: inline-block
    padding: 6px
    // // 最终样式
    // opacity: 1
    // // 为了让动画加载更流畅 硬件加速
    // transform: translate3d(0, 0, 0)
    opacity: 1
    transform: translate3d(0, 0, 0)
    .inner
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      transition: all 0.4s linear
      transform: rotate(0)
      // 线性过度0.4
      // transition: all 0.4s linear
      // // 最终滚动状态
      // transform: rotate(0)
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear
  .car-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    font-size: 10px
    text-align: center
    color: rgb(147, 153, 159)
  .car-add
    display: inline-block
    padding: 6px
    font-size: 24px
    line-height: 24px
    color: rgb(0, 160, 220)
</style>
