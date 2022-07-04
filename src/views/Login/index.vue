<template>
  <div>
    <!-- 登录页面顶部的标题 -->
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" />
    <!-- /登录页面顶部的标题 -->

    <!-- 登录表单模块 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
        :rules="[
          { required: true, message: '请输入账号' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '请输入正确的账号',
          },
        ]"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" color="#1cb676"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /登录表单模块 -->
    <!-- 跳转到注册页面 -->
    <van-button type="primary" block color="#fff">
      <template #default>
        <span class="goregister">还没有账号，去注册~</span>
      </template>
    </van-button>
  </div>
</template>

<script>
// * 导入登录接口
import { login } from '@/api/login'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onClickLeft () {
      //* 我的  路由页面会有按钮跳转到等登录页面，这里点击返回，可以不登录，回到原来的页面
      this.$router.back()
    },
    async onSubmit (values) {
      //* 当点击登录的时候，我们需要验证整个表单的内容，当内容符合规定时，我们才将这个数据发送登录请求
      try {
        await this.$refs.form.validate(['username', 'password'])
        // console.log(values)
        try {
          this.$toast.loading({
            message: '登录中...',
            forbidClick: true,
            duration: 0
          })
          const res = await login(values)
          //* 登录成功后，我们需要将这个返回的token保存到vuex中
          console.log(res)
          this.$store.commit('setuser', res.data.body)
          this.$toast.success('登录成功')
          this.$toast.success({
            message: '登录成功'
          })
          //* 成功后跳转到首页页面
          this.$router.back()
        } catch (err) {
          this.$toast.fail('登录失败')
        }
        //* 发送请求
      } catch (err) {
        this.$toast.fail('请正确填写账号密码')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.goregister {
  color: #666;
  font-size: 16px;
}
</style>
