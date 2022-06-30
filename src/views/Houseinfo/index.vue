<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="房源详情页" left-arrow @click-left="$router.back()" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="morepic">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 房屋的信息 -->
    <div class="info">
      <div class="top">
        <h3>房名</h3>
        <span>标签</span>
      </div>
      <div class="middle">
        <div>
          <span class="head">价格<span>/月</span></span>
          <span>租金</span>
        </div>
        <div>
          <span class="head">一室</span>
          <span>房型</span>
        </div>
        <div>
          <span class="head"><i>面积</i>平米</span>
          <span>面积</span>
        </div>
      </div>
      <div class="bottom">
        <span>装修: <i>精装</i></span>
        <span>朝向: <i>北</i></span>
        <span>楼层: <i>高楼层</i></span>
        <span>类型: <i>普通住宅</i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.morepic {
  width: 100%;
  height: 252px;
  img {
    width: 100%;
    height: 100%;
  }
}

.info {
  padding: 15px;
}
.top {
  border-bottom: 1px solid #000;
  h3 {
    font-size: 16px;
    margin: 16px 0;
  }
  span {
    display: block;
    width: 46px;
    height: 20px;
    color: #39becd;
    background-color: #e1f5f8;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    margin-bottom: 15px;
  }
}
.middle {
  display: flex;
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
      color: #999;
    }
    .head {
      font-size: 18px;
      color: #fa5741;
      span {
        font-size: 12px;
        color: #fa5741;
      }
    }
  }
}
</style>
