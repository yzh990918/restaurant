<template>
  <div class="comment">
    <cube-scroll>
      <div class="comment-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{ seller.score }}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star class="star" :size="36" :score="seller.serviceScore"></star>
              <span class="title">{{ seller.serviceScore }}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="title">{{ seller.foodScore }}</span>
            </div>
            <span class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{ seller.deliveryTime }}分钟</span>
            </span>
          </div>
        </div>
        <split></split>
        <ratingselect
          @ratingtypeselect="handlerating"
          @contenttoggle="handlecontent"
          :selectType="selectType"
          :onlyContent="onlyContent"
          :ratings="ratings"
        ></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li
              v-for="(rating, index) of ratings"
              v-show="needShow(rating.rateType, rating.text)"
              :key="index"
              class="rating-item border-bottom"
            >
              <div class="avatar">
                <img width="12" height="12" :src="rating.avatar" alt="" />
              </div>
              <div class="content">
                <h1 class="name">{{ rating.username }}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime"
                    >{{ rating.deliveryTime }}分钟送达</span
                  >
                </div>

                <p class="text">{{ rating.text }}</p>
                <div
                  class="recommend"
                  v-show="rating.recommend && rating.recommend.length"
                >
                  <span class="icon-thumb_up"></span>
                  <span
                    class="item"
                    v-for="(recommend, index) of rating.recommend"
                    :key="index"
                    >{{ recommend }}</span
                  >
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
const All = 2;
import star from "../star/star.vue";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";
import axios from "axios";
import { formatDate } from "../../common/js/date";
export default {
  name: "Comment",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      selectType: All,
      onlyContent: true,
      ratings: []
    };
  },

  components: {
    star,
    split,
    ratingselect
  },

  computed: {},
  filters: {
    formatDate(time) {
      let date = new Date(time);
      // 转化格式 模块化书写formatDate
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  beforeMount() {},

  mounted() {
    this.getratingsinfo();
    // window.console.log(this.ratings);
  },

  methods: {
    getratingsinfo() {
      axios.get("/api/ratings").then(this.getinfo);
    },
    getinfo(res) {
      res = res.data.data;
      this.ratings = res;
    },
    handlerating(type) {
      this.selectType = type;
    },
    handlecontent(onlycontent) {
      this.onlyContent = onlycontent;
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        // 判断是否显示内容 如果没有文本或者字显示内容 就不显示
        return false;
      }
      if (this.selectType === All) {
        // 如果selectType为All
        return true;
      } else {
        // 选择类型和这条list的type相同才显示
        return type === this.selectType;
      }
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
.comment
  position: absolute
  top: 174px
  left: 0
  bottom: 0
  overflow: hidden
  width: 100%
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      padding: 6px 0
      flex: 0 0 137px
      width: 137px
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      // 适配iphone5
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        margin-bottom: 6px
        line-height: 28px
        font-size: 24px
        color: rgb(255, 153, 0)
      .title
        line-height: 12px
        font-size: 12px
        color: rgb(7, 17, 27)
        margin-bottom: 8px
      .rank
        font-size: 10px
        line-height: 10px
        color: rgb(147, 153, 159)
        // padding-bottom: 6px
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        margin-bottom: 8px
        font-size: 0
        .title
          line-height: 18px
          display: inline-block
          vertical-align: top
          font-size: 12px
          color: rbg(7, 17, 27)
        .star
          display: inline-block
          margin: 0 12px
          vertical-align: top
        .score
          display: inline-block
          vertical-align: top
          line-height: 18px
          font-size: 12px
          color: rgb(255, 153, 0)
      .delivery-wrapper
        font-size: 0
        .title
          line-height: 18px
          font-size: 12px
          color: rbg(7, 17, 27)
        .delivery
          font-size: 12px
          color: rgb(147, 153, 159)
          margin-left: 12px
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)
          margin-bottom: 4px
        .star-wrapper
          font-size: 0
          margin-bottom: 6px
          .star
            display: inline-block
            vertical-align: top
            margin-right: 6px
          .delivery
            display: inline-block
            vertical-align: top
            font-size: 10px
            line-height: 12px
            color: rgb(147, 159, 153)
        .text
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
          margin-bottom: 8px
        .recommend
          line-height: 16px
          .icon-thumb_up, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 12px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          // .icon-thump-up
          // color: rgb(0, 160, 220)
          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .time
          position: absolute
          right: 0
          top: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
