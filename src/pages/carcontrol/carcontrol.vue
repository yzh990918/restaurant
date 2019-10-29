<template>
  <div class="carcontrol">
    <div
      class="car-decrease icon-remove_circle_outline"
      v-show="food.count > 0"
      @click="decreassecount"
    ></div>
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
  .car-decrease, .car-add
    display: inline-block
    padding: 6px
    font-size: 24px
    line-height: 24px
    color: rgb(0, 160, 220)
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
</style>
