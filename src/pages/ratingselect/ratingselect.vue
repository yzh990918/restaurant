<template>
  <div class="ratingselect">
    <div class="rating-type border-bottom">
      <span
        @click="select(2, $event)"
        class="block positive"
        :class="{ active: this.selectT === 2 }"
        >{{ desc.all }}<span class="count">{{ ratings.length }}</span></span
      >
      <span
        @click="select(0, $event)"
        class="block positive"
        :class="{ active: this.selectT === 0 }"
        >{{ desc.positive
        }}<span class="count">{{ positives.length }}</span></span
      >
      <span
        @click="select(1, $event)"
        class="block negative"
        :class="{ active: this.selectT === 1 }"
        >{{ desc.negative
        }}<span class="count">{{ negatives.length }}</span></span
      >
    </div>
    <div
      @click="togglecontent"
      class="switch border-bottom"
      :class="{ on: this.onlycontent === true }"
    >
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
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
    return {
      selectT: this.selectType,
      onlycontent: this.onlyContent
    };
  },

  components: {},

  computed: {
    positives() {
      //过滤 返回的是满意的ratings数组
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    select(type, event) {
      //点击事件改变selectType
      if (!event._constructed) {
        return;
      }
      this.selectT = type;
      this.$emit("ratingtypeselect", type);
    },
    togglecontent(event) {
      if (!event._constructed) {
        return;
      }
      this.onlycontent = !this.onlycontent;
      this.$emit("contenttoggle", this.onlycontent);
    }
  },

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
  .switch
    padding: 12px 18px
    line-height: 24px
    color: rgb(147, 153, 159)
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
      color: rgb(147, 153, 159)
    .text
      font-size: 12px
      color: rgb(147, 153, 159)
      display: inline-block
</style>
