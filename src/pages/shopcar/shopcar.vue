<template>
  <div class="shopcar">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price">￥0</div>
        <div class="desc">另需配送费￥{{ deliveryprice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay">￥{{ minprice }}元起送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopcar",
  props: {
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

  computed: {},

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
          .icon-shopping_cart
            font-size: 24px
            color: #999999
            line-height: 44px
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
</style>
