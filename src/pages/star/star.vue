<template>
  <div class="star" :class="starType">
    <span
      v-for="(itemClass, index) of itemClasses"
      :key="index"
      :class="itemClass"
      class="star-item"
    ></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_off = "off";
export default {
  name: "star",
  props: {
    size: Number,
    score: Number
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      // 向下去0.5倍数的值
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_off);
      }
      return result;
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
.star
  font-size: 0
  .star-item
    // 通用样式
    display: inline-block
    background-repeat: no-repeat
  // 传过来的star类
  &.star-48
    .star-item
      width: 20px
      height: 20px
      margin-right: 22px
      background-size: 20px 20px
      &:last-child
        // 设置最后一个子元素右边距0
        margin-right: 0
      &.on
        // 全星
        bg-image('star48_on')
      &.half
        // 半星
        bg-image('star48_half')
      &.off
        // 没星
        bg-image('star48_off')
  &.star-36
    .star-item
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      &:last-child
        // 设置最后一个子元素右边距0
        margin-right: 0
      &.on
        // 全星
        bg-image('star36_on')
      &.half
        // 半星
        bg-image('star36_half')
      &.off
        // 没星
        bg-image('star36_off')
  &.star-24
    .star-item
      width: 10px
      height: 10px
      margin-right: 3px
      background-size: 10px 10px
      &:last-child
        // 设置最后一个子元素右边距0
        margin-right: 0
      &.on
        // 全星
        bg-image('star24_on')
      &.half
        // 半星
        bg-image('star24_half')
      &.off
        // 没星
        bg-image('star24_off')
</style>
