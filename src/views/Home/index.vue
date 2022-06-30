<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="slideshow">
      <van-swipe-item v-for="image in images" :key="image.id">
        <img v-lazy="`http://liufusong.top:8080${image.imgSrc}`" class="pic" />
      </van-swipe-item>
    </van-swipe>
    <!-- /轮播图 -->

    <!-- 顶部下拉搜索地图模块 -->
    <div class="top">
      <van-search
        v-model="value"
        placeholder="请输入小区或地址"
        class="search-btn"
      >
        <template #label>
          <div class="area" @click="$router.push('/city')">
            <span>{{ currentcity.label }}</span>
            <van-icon name="location" />
          </div>
        </template>
      </van-search>
      <van-icon
        name="map-marked"
        color="#fff"
        size="0.6667rem"
        @click="$router.push('/map')"
      />
    </div>
    <!-- /顶部下拉搜索地图模块 -->

    <!-- 宫格导航 -->
    <van-grid :border="false" :clickable="true">
      <van-grid-item @click="$router.push({ name: 'room' })">
        <template #icon>
          <div class="icon-btn"><van-icon name="wap-home-o" /></div>
        </template>
        <template #text> <span class="txt">整租</span> </template>
      </van-grid-item>
      <van-grid-item @click="$router.push({ name: 'room' })">
        <template #icon>
          <div class="icon-btn"><van-icon name="friends-o" /></div>
        </template>
        <template #text> <span class="txt">合租</span> </template>
      </van-grid-item>
      <van-grid-item @click="$router.push({ name: 'map' })">
        <template #icon>
          <div class="icon-btn"><van-icon name="guide-o" /></div>
        </template>
        <template #text> <span class="txt">地图找房</span> </template>
      </van-grid-item>
      <!-- 当登录的时候，我们需要先进行一次登录测试，如果在有uer的情况下，我们直接跳转到发布页面 -->
      <!-- 如果没有登录，我们需要跳转到登录页面 -->
      <van-grid-item @click="gotopublish">
        <template #icon>
          <div class="icon-btn"><van-icon name="wap-home-o" /></div>
        </template>
        <template #text> <span class="txt">去出租</span> </template>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->

    <!-- 租房小组 -->
    <div class="particulars">
      <div class="title">
        <span class="left">租房小组</span>
        <span>更多</span>
      </div>
      <!-- 宫格 -->
      <van-grid :gutter="10" :column-num="2" :clickable="true">
        <van-grid-item class="nav-btn" v-for="item in groups" :key="item.id">
          <img
            :src="`http://liufusong.top:8080${item.imgSrc}`"
            alt=""
            class="grid-pic"
          />
          <div class="nav-txt">
            <span>{{ item.title }}</span>
            <span>{{ item.desc }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 租房小组 -->
  </div>
</template>

<script>
import { getpic, getgroups } from '@/api/home.js'
import { mapState } from 'vuex'

export default {
  created () {
    this.getimg()
    this.getgroup()
  },
  data () {
    return {
      images: [],
      value: '',
      groups: []

    }
  },
  methods: {
    async getimg () {
      try {
        const { data } = await getpic()
        this.images = data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getgroup () {
      try {
        const res = await getgroups(this.currentcity.value)
        this.groups = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    gotopublish () {
      if (this.user === null) {
        this.$router.push({ name: 'login' })
      } else {
        this.$router.push({ name: 'publish' })
        //* 把小区数据再还原
        this.$store.commit('sethousename', { communityName: '请输入小区名字' })
      }
    }
  },
  computed: {
    ...mapState(['currentcity', 'user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.slideshow {
  width: 375px;
  height: 212px;
}
.pic {
  width: 375px;
  height: 212px;
}
.top {
  position: absolute;
  top: 25px;
  display: flex;
  align-items: center;

  padding-left: 15px;
  padding-right: 10px;
  .search-btn {
    width: 310px;
    height: 34px;
    border-radius: 3px;
    background-color: unset;
    .area {
      border-right: 1px solid #ccc;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      margin-top: 6px;
      padding-right: 5px;
    }
  }
}
.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #f2fbf7;
  border-radius: 50%;
  font-size: 30px;
  color: #10b270;
}
/deep/.txt {
  font-size: 12px;
  margin-top: 15px;
}

.particulars {
  width: 375px;
  height: 190px;
  background-color: #f6f5f6;
  padding: 15px 10px;
  .title {
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      font-size: 16px;
      height: 16px;
      font-weight: 700;
    }
    span {
      font-size: 14px;
    }
  }
}
* {
  box-sizing: border-box;
}
.nav-btn {
  height: 60px;
  /deep/.van-grid-item__content {
    display: flex;
    flex-direction: row;
    .grid-pic {
      width: 50px;
      height: 50px;
      // margin-left: 10px;
      margin-right: 20px;
    }
    .nav-txt {
      font-size: 12px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
