<template>
  <div class="ratingselect">
    <div class="rating-type border-bottom">
      <span class="block positive" :class="{ active: selectType === 2 }"
        >{{ desc.all }}<span class="count">47</span></span
      >
      <span class="block positive" :class="{ active: selectType === 0 }"
        >{{ desc.positive }}<span class="count">40</span></span
      >
      <span class="block negative" :class="{ active: selectType === 1 }"
        >{{ desc.negative }}<span class="count">7</span></span
      >
    </div>
    <div class="switch">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// const POSITIVE = 0;
// const NEGATIVE = 1;
const All = 2;
export default {
  name: "ratingselect",
  props: {
    ratings: {
      type: Array,
      default() {
        //数组默认函数返回
        return [];
      }
    },
    selectType: {
      //选择的类型 全部 满意 不满意
      type: Number,
      default: All
    },
    onlyContent: {
      //定义是否只显示内容
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang="stylus" scoped>
.ratingselect
  .rating-type
    padding: 18px 0
    margin: 0 18px
    font-size: 0
    .block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      border-radius: 1px
      color: rgb(77, 85, 93)
      font-size: 12px
      line-height: 16px
      &.active
        color: #fff
      .count
        font-size: 8px
        margin-left: 2px
      &.positive
        background: rgba(0, 160, 220, 0.2)
        &.active
          background: rgb(0, 160, 220)
      &.negative
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: rgb(77, 85, 93)
</style>
