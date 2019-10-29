<template>
  <div class="shopcar">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <!-- 设置高亮样式 -->
          <div class="logo" :class="{ highLight: totalcount > 0 }">
            <span
              class="icon-shopping_cart"
              :class="{ highLight: totalcount > 0 }"
            ></span>
          </div>
          <!-- 购物数量图标样式 如果购物车无货 则默认样式为不显示 -->
          <div v-show="totalcount > 0" class="num">{{ totalcount }}</div>
        </div>
        <div class="price" :class="{ highLight: totalcount > 0 }">
          ￥{{ totalPrice }}元
        </div>
        <div class="desc">另需配送费￥{{ deliveryprice }}元</div>
      </div>
      <div class="content-right">
        <div :class="payClass" class="pay">{{ paydesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopcar",
  props: {
    selectfoods: {
      // 每个元素是food
      type: Array,
      default() {
        return [
          {
            price: 22,
            count: 1
          }
        ];
      }
    },
    deliveryprice: Number,
    minprice: Number
  },
  data() {
    return {
      deprice: this.deliveryprice,
      mprice: this.minprice
    };
  },

  components: {},

  computed: {
    totalPrice() {
      // 总价
      let total = 0;
      this.selectfoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalcount() {
      // 总数量
      let count = 0;
      this.selectfoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    paydesc() {
      // 计算是否到达起送价格返回相应的数据字符串  这里用到了反引号字符串 ${} 代表一个变量
      if (this.totalPrice === 0) {
        return `￥${this.minprice}元起送`;
      } else if (this.totalPrice < this.minprice) {
        let diff = this.minprice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },

    payClass() {
      // 监控购物车商品总价是否达到起送 然后更改样式
      if (this.totalPrice < this.minprice) {
        return "not-enough";
      } else {
        return "enough";
      }
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang="stylus" scoped>
.shopcar
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px
  background: #666666
  .content
    display: flex
    background: #141d27
    font-size: 0
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        // ie盒 宽度已经包括padding border
        box-sizing: border-box
        border-radius: 50%
        vertical-align: top
        background: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          background: #333333
          text-align: center
          &.highLight
            background: rgb(0, 160, 220)
          .icon-shopping_cart
            font-size: 24px
            color: #999999
            line-height: 44px
            &.highLight
              color: #fff
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 16px
          font-size: 9px
          color: #fff
          font-weight: 700
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        font-size: 16px
        line-height: 24px
        vertical-align: top
        margin-top: 12px
        box-sizing: border-box
        padding-right: 12px
        // 不用line-height为高度的原因 是因为border-right不能撑满 所以用盒模型 margin-top去调位置 然后设置line-height为24px设置高度
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-weight: 700
        color: rgba(255, 255, 255, 0.4)
        &.highLight
          color: #fff
      .desc
        display: inline-block
        vertical-align: top
        line-height: 24px
        margin: 12px 0 0 12px
        font-size: 10px
        font-weight: 700
        color: rgba(255, 255, 255, 0.4)
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        font-size: 12px
        line-height: 48px
        height: 48px
        text-align: center
        color: rgba(255, 255, 255, 0.4)
        font-weight: 700
        background: #2b333b
        &.not-enough
          background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
</style>
