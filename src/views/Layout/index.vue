<template>
  <div>
    <router-view />
    <!-- 这个是共有的路由页面  -->
    <van-tabbar route active-color="#17b574">
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/room" icon="search">找房</van-tabbar-item>
      <van-tabbar-item replace to="/consult" icon="newspaper-o"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
