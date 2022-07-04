<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.back()" />
    <van-index-bar :index-list="indexList">
      <!-- 当前选中的城市 -->
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell :title="currentcity.label" />
      <!-- 热门城市 -->
      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="item in hotcity"
        :key="item.pinyin"
        @click="change(item)"
      />
      <!-- 字母排序的城市 -->
      <div v-for="(items, index) in allname" :key="index">
        <van-index-anchor :index="items">{{ items }}</van-index-anchor>
        <van-cell
          :title="item.label"
          v-for="(item, index) in mycity[items]"
          :key="index"
          @click="change(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
//* 导入获取城市，热门城市的接口
import { getcity, gethotcity } from '@/api/city'
import { mapState } from 'vuex'
export default {
  created () {
    // this.gethotcityfn()
    this.getcityfn()
  },
  data () {
    return {
      indexList: [],
      allname: [],
      allcity: [],
      hotcity: [],
      mycity: {}
    }
  },
  methods: {
    async getcityfn () {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        const res = await gethotcity()
        // console.log(res)
        this.hotcity = res.data.body
      } catch (err) {
        console.log(err)
      }
      try {
        /* this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        }) */
        const res = await getcity('1')
        this.allcity = res.data.body
        // 我们遍历整个数组
        // 数组中的每一项的拼音的首字母取出 转成大写
        // 判断在不在数组中，不在就添加到数组中去
        // 然后我们通过数组的排序方法，将数组进行排序
        res.data.body.forEach(item => {
          const res1 = item.pinyin.charAt(0).toUpperCase()
          const res2 = this.indexList.find(item => item === res1)
          if (!res2) {
            this.indexList.push(res1)
            this.indexList.sort()
            this.allname.push(res1)
            this.allname.sort()
            //* 我们定义一个数组套对象的数据格式
            this.mycity[res1] = this.allcity.filter(item => item.pinyin.charAt(0).toUpperCase() === res1)
            //* 键为首字母  值为数组的集合  filter 的返回值
            // const res4 = { [res1]: res3 }
            // this.mycity.push(res4)
          }
        })

        this.indexList.unshift('热')
        this.indexList.unshift('#')
        this.$toast.success({
          message: '加载成功'
        })
      } catch (err) {
        console.log(err)
      }
    },
    /* async gethotcityfn () {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        const res = await gethotcity()
        // console.log(res)
        this.hotcity = res.data.body
      } catch (err) {
        console.log(err)
      }
    }, */
    change (item) {
      this.$store.commit('setcity', item)
      this.$router.push({ name: 'room' })
    },
    mounted () {

    }

  },
  computed: {
    // town (name) {
    //   return this.allcity.filter(item => {
    //     return item.pinyin.charAt(0).toUpperCase() === name
    //   })
    // }
    ...mapState(['currentcity'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
