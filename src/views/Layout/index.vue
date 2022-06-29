<template>
  <div>
    <router-view />
    <!-- 这个是共有的路由页面  -->
    <van-tabbar route active-color="#17b574" class="footer">
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
.van-tabbar {
  z-index: 0;
}
.footer {
  position: fixed;
  bottom: 0;
}
</style>
