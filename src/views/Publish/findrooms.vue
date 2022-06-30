<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-cell-group>
      <van-cell
        :title="item.communityName"
        v-for="(item, index) in resultlist"
        :key="index"
        @click="getname(index)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { gethousename } from '@/api/house'
import { mapState } from 'vuex'
export default {
  created () {

  },
  data () {
    return {
      value: '',
      resultlist: []
    }
  },
  methods: {
    async onSearch (val) {
      //* 这里发送请求
      try {
        const { data } = await gethousename({ name: val, id: this.currentcity.value })
        console.log(data)
        // data.body.forEach(item => {
        //   this.resultlist.push(item.communityName)
        // })
        this.resultlist = data.body
      } catch (err) {
        console.log(err)
      }
    },
    onCancel () {
      //* 这里退回到原路由
      this.$router.back()
    },
    getname (index) {
      this.$store.commit('sethousename', this.resultlist[index])
      this.$router.back()
    }
  },
  computed: {
    ...mapState(['currentcity'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
