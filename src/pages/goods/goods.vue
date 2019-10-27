<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li
          v-for="item of goods"
          :key="item.name"
          class="menu-item border-bottom"
        >
          <span
            v-show="item.type > 0"
            class="icon"
            :class="classMap[item.type]"
          ></span>
          <span class="text"> {{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="item of goods" :key="item.name" class="food-list">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li
              v-for="food in item.foods"
              :key="food.name"
              class="food-item border-bottom"
            >
              <div class="icon">
                <img width="57px" height="57px" :src="food.icon" alt="" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月销售{{ food.sellCount }}份</span
                  ><span>好评率{{ food.rating }}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice"
                    >￥{{ food.oldPrice }}</span
                  >
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import axios from "axios";
export default {
  name: "goods",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: {}
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.getfoodsinfo();
    this.scroll = new BScroll(this.$refs.foods);
    this.scroll = new BScroll(this.$refs.menu);
  },

  methods: {
    getfoodsinfo() {
      axios.get("/api/goods").then(this.getinfo);
    },
    getinfo(res) {
      res = res.data.data;
      this.goods = res;
      // window.console.log(this.goods)
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
.header, .goods
  position: absolute
  top: 174px
  width: 100%
  bottom: 46px
  display: flex
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    // 因兼容性 一定要设置width
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      line-height: 14px
      padding: 0 12px
      .icon
        // vertical-align: middle
        margin-top: 14px
        display: inline-block
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display: table-cell
        width: 56px
        // table布局 垂直居中
        vertical-align: middle
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      &:last-child
        margin-bottom: 0
        border: none
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rab(7, 17, 27)
        .desc, .extra
          margin-bottom: 8px
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
        .desc
          margin-bottom: 8px
          line-height: 12px
        .extra span
          &.count
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
</style>
