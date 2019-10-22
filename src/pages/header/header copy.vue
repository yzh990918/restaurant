<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <div class="icon"></div>
          <div class="s-description">{{ seller.supports[0].description }}</div>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    seller: Object
  },
  data() {
    return {
      sellers: this.seller
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
@import '~@/assets/styles/varibles.styl'
.header
  color: #fff
  background: #000
  .content-wrapper
    padding: 24px 12px 18px 24px
    font-size: 0px
    .avatar
      // vertical-align: top
      display: inline-block
      img
        border-radius: 2px
    .content
      vertical-align: top
      display: inline-block
      margin-left: 16px
      .title
        margin: 2px 0 8px 0
        .brand
          vertical-align: top
          // 顶部对齐
          display: inline-block
          // sapn标签没内容不占据空间
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold
      .description
        font-size: 12px
        line-height: 12px
        margin-bottom: 10px
      .support
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-img('descrease_1')
          &.discount
            bg-img('discount_1')
          &.guarantee
            bg-img('guarantee_1')
          &.invoice
            bg-img('invoice_1')
</style>
