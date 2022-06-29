<template>
  <div>
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    <p>房源信息</p>
    <!-- 房屋的信息 -->
    <van-cell-group>
      <van-cell title="小区名称" is-link />
      <van-field
        v-model="price"
        type="number"
        label="租金"
        placeholder="请输入租金/月"
      />
      <van-field
        v-model="price"
        type="number"
        label="建筑面积"
        placeholder="请输入建筑面积"
      />
      <!-- 户型 -->
      <van-cell title="户型" is-link @click="show = true" />
      <!-- 弹出层 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }" />
      <!-- /户型 -->

      <!-- 所在楼层 -->
      <van-cell title="所在楼层" is-link @click="showtwo = true" />
      <!-- 弹出层 -->
      <van-popup
        v-model="showtwo"
        position="bottom"
        :style="{ height: '40%' }"
      />
      <!-- /所在楼层 -->

      <!-- 朝向 -->
      <van-cell title="朝向" is-link @click="showthree = true" />
      <!-- 弹出层 -->
      <van-popup
        v-model="showthree"
        position="bottom"
        :style="{ height: '40%' }"
      />
      <!-- /朝向 -->
    </van-cell-group>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      price: '', //* 输入框内的内容，
      show: false,
      showtwo: false,
      showthree: false
    }
  },
  methods: {

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
