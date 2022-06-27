<template>
  <div class="my-container">
    <!-- 顶部背景图片 -->
    <div>
      <img
        class="pic"
        :src="
          user
            ? `http://liufusong.top:8080${userinfo.avatar}`
            : `http://liufusong.top:8080/img/profile/bg.png`
        "
        alt=""
      />
    </div>
    <!-- 这是中间显示个人信息的区域 -->
    <!-- 这里分为两个状态 一个是未登录状态的时候，显示一个页面 -->
    <!-- 登录状态 -->
    <div class="user" v-if="user">
      <!-- 游客头像 -->
      <van-image
        round
        width="60"
        height="60"
        :src="`http://liufusong.top:8080${userinfo.avatar}`"
        class="user-img"
      />
      <div class="user-name">{{ userinfo.nickname }}</div>
      <!-- 当点击退出按钮的时候，我们需要触发vuex的事件，将user清空 -->
      <van-button
        type="primary"
        class="login-btn"
        @click="$store.commit('deluser')"
        >退出</van-button
      >
    </div>

    <!-- 未登录状态 -->
    <div class="visitor" v-else>
      <!-- 游客头像 -->
      <van-image
        round
        width="60"
        height="60"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        class="user-img"
      />
      <div class="user-name">游客</div>
      <van-button
        type="primary"
        class="login-btn"
        @click="$router.push('/login')"
        >去登录</van-button
      >
    </div>
    <!-- /未登录状态 -->

    <!-- 我的一些操作按钮 -->
    <van-grid :column-num="3" :border="false" class="grid-btn">
      <van-grid-item icon="star-o" text="我的收藏" to="/mycollect" />
      <van-grid-item icon="wap-home-o" text="我的出租" to="/myrent" />
      <van-grid-item icon="underway-o" text="看房记录" to="/myrecord" />
      <van-grid-item icon="photo-o" text="成为房主" to="/homeowner" />
      <van-grid-item icon="credit-pay" text="个人资料" to="/mydata" />
      <van-grid-item icon="service-o" text="联系我们" to="/contactus" />
    </van-grid>
    <!-- 我的一些操作按钮 -->

    <!-- 加入我们 -->
    <div>
      <img src="@/assets/join.png" alt="" class="join-me" />
    </div>
    <!-- /加入我们 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
//* 导入请求用户信息的接口
import { getuserinfo } from '@/api/my'
export default {
  created () {
    this.getuserinfo()
  },
  data () {
    return {
      userinfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getuserinfo () {
      try {
        const { data } = await getuserinfo()
        this.userinfo = data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my-container {
  .pic {
    width: 375px;
    height: 191px;
  }
  .visitor,
  .user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 130px;
    transform: translateX(-50%);
    width: 320px;
    height: 165px;
    background-color: #fff;
    box-shadow: 1px 1px 6px #ccc;
    .user-img {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -125%);
      border: 5px solid #f5f5f5;
      box-shadow: 1px 1px #bdbdbd;
    }
    .user-name {
      font-size: 14px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .login-btn {
      width: 69px;
      height: 30px;
      font-size: 12px;
      border-radius: 5px;
      background-color: #21b97a;
    }
  }

  /deep/ .van-grid {
    margin-top: 120px !important;
    .van-icon {
      font-size: 20px;
      color: #333;
    }
    .van-grid-item__text {
      font-size: 13px;
    }
  }

  .join-me {
    width: 345px;
    height: 85px;
    margin-left: 15px;
    margin-top: 20px;
  }
}
</style>
