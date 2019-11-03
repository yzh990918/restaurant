<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
        <ul>
          <li
            v-for="(item, index) of goods"
            :key="item.name"
            class="menu-item border-bottom"
            :class="{ current: currentindex === index }"
            @click="selectMenu(index)"
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
          <li
            v-for="item of goods"
            :key="item.name"
            class="food-list food-list-hook"
          >
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li
                @click.stop.prevent="selectFood(food, $event)"
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
                  <div class="carcontrol-wrapper">
                    <carcontrol
                      @addcar="handleaddcar"
                      :food="food"
                    ></carcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcar
        ref="shopcar"
        :selectfoods="selectFoods"
        :deliveryprice="seller.deliveryPrice"
        :minprice="seller.minPrice"
      ></shopcar>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import shopcar from "../shopcar/shopcar";
import carcontrol from "../carcontrol/carcontrol";
import BScroll from "better-scroll";
import axios from "axios";
import food from "../food/food";
export default {
  name: "goods",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      // 对应每个区间对应的高度
      listheight: [],
      //  监控滚动的实时位置的变量
      scrollY: 0,
      selectedFood: {}
    };
  },

  components: {
    shopcar,
    carcontrol,
    food
  },

  computed: {
    // 获取当前list区间的下标
    currentindex() {
      for (let i = 0; i < this.listheight.length; i++) {
        // 获取落到区间的范围
        let height1 = this.listheight[i];
        let height2 = this.listheight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    // 定义选择的商品
    selectFoods() {
      let foods = [];
      // 先遍历goods 再遍历foods
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            //有这个count字段 就向数组中添加元素 count被carcontrol操作
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },

  beforeMount() {},

  mounted() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.getfoodsinfo();
  },

  methods: {
    handleaddcar(target) {
      //添加的时候传入dom给购物车 去做添加处理
      this.drop(target);
    },
    drop(target) {
      // 体验优化,异步执行下落动画
      // 调用shopcar里面的drop方法
      this.$nextTick(() => {
        this.$refs.shopcar.drop(target);
      });
    },
    selectMenu(index) {
      var foodList = this.$refs.foods.getElementsByClassName("food-list-hook");
      // 获取对应下标的区块dom
      let el = foodList[index];
      // 利用scrollToElement 设置点击后切换到改元素
      this.scroll1.scrollToElement(el, 300);
    },
    initscroll() {
      this.scroll1 = new BScroll(this.$refs.foods, {
        // 在滚动时 实时派发scroll事件 实现监听效果
        probeType: 3,
        // 允许添加点击事件
        click: true
      });
      //pos.y获取到滚动的实时坐标y值  取整再取绝对值获取高度
      this.scroll1.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
      this.scroll2 = new BScroll(this.$refs.menu, {
        click: true
      });
    },
    getfoodsinfo() {
      axios.get("/api/goods").then(this.getinfo);
    },
    getinfo(res) {
      res = res.data.data;
      this.goods = res;
      // 请求到数据再加载出滚动效果 异步操作
      this.$nextTick(() => {
        this.calculateheight();
        this.initscroll();
      });
      // window.console.log(this.goods)
    },

    calculateheight() {
      // 获取每个区间快的dom
      var foodList = this.$refs.foods.getElementsByClassName("food-list-hook");
      let height = 0;
      this.listheight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listheight.push(height);
      }
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      // 点击food区域将selectedfood设置为当前点击的food 然后再传入food组件
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
.goods
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
      &.current
        position: relative
        margin-top: -1px
        z-index: 10
        font-weight: 700
        background: #fff
        .text
          border-bottom: none
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
        .carcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
