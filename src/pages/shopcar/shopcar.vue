<template>
  <div>
    <div class="shopcar">
      <div class="content " @click="toggleList">
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
        <div @click.stop.prevent="pay" class="content-right">
          <div :class="payClass" class="pay">{{ paydesc }}</div>
        </div>
      </div>
      <div class="ball-container">
        <!-- 便遍历小球 -->
        <div v-for="ball in balls" :key="ball.id">
          <transition
            name="drop"
            @before-enter="beforeDrop"
            @enter="Droping"
            @after-enter="afterDrop"
          >
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcar-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listcontent">
            <ul>
              <li
                class="food border-bottom"
                v-for="food of selectfoods"
                :key="food.name"
              >
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price * food.count }}</span>
                </div>
                <div class="carcontrol-wrapper">
                  <carcontrol :food="food"></carcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mark" v-show="listShow" @click="hidelist"></div>
    </transition>
  </div>
</template>

<script>
import carcontrol from "../carcontrol/carcontrol";
import BScroll from "better-scroll";
export default {
  name: "shopcar",
  props: {
    selectfoods: {
      // 每个元素是food
      type: Array,
      default() {
        return [
          {
            price: 10,
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
      mprice: this.minprice,
      count: this.selectfoods.count,
      price: this.selectfoods.price,

      balls: [
        {
          show: false,
          id: 1
        },
        {
          show: false,
          id: 2
        },
        {
          show: false,
          id: 3
        },
        {
          show: false,
          id: 4
        },
        {
          show: false,
          id: 5
        }
      ],
      dropBall: [],
      fold: true
    };
  },

  components: {
    carcontrol
  },

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
      // 监控购物车商品总价是否达到起送 然后更改样式 购物车右侧样式
      if (this.totalPrice < this.minprice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      if (this.totalCount < 0) {
        // this.fold = true;
        return false;
      }
      if (this.totalcount > 0 && !this.fold) {
        return true;
      }
      return false;
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    pay() {
      if (this.totalPrice < this.minprice) {
        return;
      }
      window.alert(`支付${this.totalPrice}元`);
    },
    hidelist() {
      this.fold = true;
    },
    drop(el) {
      //找到隐藏的小球 show置为true 然后保存element 再将它添加到dropBall数组中
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          // 后面需要对droBall进行处理
          this.dropBall.push(ball);
          return;
        }
      }
    },
    // js钩子来实现动画
    beforeDrop(el) {
      // 拿到设为show的小球
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          // 获取carcontrol对应的位置 视口的位置可以通过rect.left..获取
          let rect = ball.el.getBoundingClientRect();
          // x轴偏移量 y轴偏移量
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          // 显示元素  v-show display会显示为空
          el.style.display = "";
          // 外层做y轴平移动画 内层做y轴动画
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    Droping(el, done) {
      // 防止eslint 检验未使用变量报错  手动重绘浏览器
      /*eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      // 将动画置为初始状态
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        // 过渡完成 结束 否则无法完成动画
        el.addEventListener("transitionend", done);
      });
    },
    afterDrop(el) {
      // 完成一个动画删除掉dropBall的一个球
      let ball = this.dropBall.shift();
      // 取出来的小球状态重置
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    },
    toggleList() {
      // window.console.log(this.totalcount);
      // setTimeout(() => {
      //   window.console.log(this.selectfoods);
      // }, 1000);

      if (!this.totalcount) {
        return;
      }
      this.fold = !this.fold;
      if (!this.fold) {
        this.scroll = new BScroll(this.$refs.listcontent, {
          click: true
        });
      }
    },
    empty() {
      this.selectfoods.forEach(food => {
        food.count = 0;
      });
    }
  },

  watch: {
    selectedfoods(newFoods, oldFoods) {
      if (newFoods.length === 0) {
        this.fold = true;
      }
    }
  }
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
          // 当购物车有东西时显示此图标
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
  .ball-container
    .ball
      position: fixed
      // 相对于视口动画
      left: 32px
      bottom: 22px
      z-index: 200
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
        transition: all 0.4s linear
  .shopcar-list
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    transition: all 0.5s
    // 相对shocar 向上偏移100% 定义最终状态
    transform: translate3d(0, -100%, 0)
    &.fold-enter, &.fold-leave-active
      transform: translate3d(0, 0, 0)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      padding: 0 18px
      max-height: 217px
      background: #fff
      overflow: hidden
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          color: rgb(240, 20, 20)
          font-weight: 700
        .carcontrol-wrapper
          position: absolute
          right: 0
          bottom: 6px
.list-mark
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 40
  opacity: 1
  background: rgba(7, 17, 27, 0.6)
  transition: all 0.5s
  &.fade-enter, &.fade-leave-active
    opacity: 0
    background: rgba(7, 17, 27, 0)
</style>
