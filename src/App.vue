<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-topbottom">
      <div class="tab-item ">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item ">
        <router-link to="/comment">评论</router-link>
      </div>
      <div class="tab-item ">
        <router-link to="/seller">商家</router-link>
      </div>

      <keep-alive>
        <!-- 显示的是当前路由地址所对应的内容 keep-alive 如果路由重新加载 就不会重新渲染(放入缓存) 就不会重新调用钩子函数 -->
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import header from "./pages/header/header";
export default {
  name: "App",
  components: {
    "v-header": header
  }
};
</script>

<style lang="stylus" scoped>
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  // & > a 代表父级元素下面的a标签
  .tab-item
    flex: 1
    text-align: center
    & > a
      display: block
      fontsize: 14px
      color: rgb(77, 85, 93)
      &.active
        color: rgb(240, 20, 20)
</style>
