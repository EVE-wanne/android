<template>
  <div>
    <van-nav-bar title="我的收藏" left-arrow @click-left="$router.back()" />

    <van-cell v-for="(item, index) in list" :key="index" class="roomlist">
      <!-- 左边的内容 -->
      <template #title>
        <div class="pic">
          <img :src="`http://liufusong.top:8080${item.houseImg}`" />
        </div>
      </template>
      <!-- 右边的内容 -->
      <template #default>
        <div class="txt">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <span v-for="(item, index) in item.tags" :key="index">{{
            item
          }}</span>
          <p class="price">{{ item.price }}<i>元/月</i></p>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mylove } from '@/api/my'
export default {
  created () {
    this.onLoad()
  },
  data () {
    return {
      list: [],
      loading: false, //* 控制是否加载完毕
      finished: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await mylove()
        this.list = data.body
        this.loading = false
        //* 如果请求的数据为0
        if (data.body.length <= 0) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
      // 数据全部加载完成
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.pic {
  width: 106px;
  height: 80px;
  background-color: pink;
  img {
    width: 100%;
    height: 100%;
  }
}
.roomlist {
  height: 120px;
}
.van-cell__title {
  flex: 0;
}
/deep/.van-cell__value {
  text-align: left;
  padding-left: 10px;
}
.txt {
  font-size: 12px;
  height: 22px;
  h3 {
    font-size: 15px;
  }
  span {
    height: 20px;
    background-color: #e1f5f8;
    border-radius: 2px;
    color: #39becd;
    margin-right: 5px;
  }
  .price {
    font-size: 16px;
    color: #fa5741;
    i {
      font-size: 12px;
    }
  }
}
</style>
