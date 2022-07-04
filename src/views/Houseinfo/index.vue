<template>
  <div class="houseinfo-container">
    <!-- 标题 -->
    <van-nav-bar
      :title="result.community"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="morepic">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 房屋的信息 -->
    <div class="info">
      <div class="top">
        <h3>{{ result.title }}</h3>
        <span v-for="(item, index) in result.tags" :key="index">{{
          item
        }}</span>
      </div>
      <div class="middle">
        <div>
          <span class="head">{{ result.price }}<span>/月</span></span>
          <span>租金</span>
        </div>
        <div>
          <span class="head">{{ result.roomType }}</span>
          <span>房型</span>
        </div>
        <div>
          <span class="head"
            ><i>{{ result.size }}</i
            >平米</span
          >
          <span>面积</span>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <span>装修: <i>精装</i></span>
          <span
            >朝向:
            <i v-for="(item, index) in result.oriented" :key="index">{{
              item
            }}</i></span
          >
        </div>
        <div class="right">
          <span
            >楼层: <i>{{ result.floor }}</i></span
          >
          <span>类型: <i>普通住宅</i></span>
        </div>
      </div>
    </div>

    <!-- 房屋的定位 -->
    <p class="titles">小区：</p>
    <div id="map"></div>
    <!-- 房屋的定位 -->

    <!-- 房屋配套 -->
    <p class="titles">房屋配置</p>
    <div class="someicon">
      <div
        v-for="(item, index) in result.supporting"
        :key="index"
        class="icon-btn"
      >
        <van-icon name="fire-o" />
        <span>{{ item }}</span>
      </div>
    </div>
    <!-- /房屋配套 -->

    <!-- 房源概况  -->
    <p class="titles">房源概况</p>
    <div class="main">
      <div class="header">
        <div class="left">
          <van-image
            width="52"
            height="52"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="middel">
            <p>王女士</p>
            <i><van-icon name="medal-o" />已认证房主</i>
          </div>
        </div>
        <van-button plain type="primary">发消息</van-button>
      </div>
    </div>
    <div class="description">{{ result.description }}</div>
    <!-- /房源概况  -->

    <!-- 猜你喜欢 -->
    <p class="titles">猜你喜欢</p>
    <van-cell v-for="(item, index) in arr" :key="index" class="roomlist">
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
    <!-- /猜你喜欢 -->

    <!-- 底部的操作按钮 -->
    <div class="btns">
      <!-- 收藏 -->
      <van-button
        type="default"
        icon="star-o"
        @click="add"
        :class="{ active: isshow }"
        :loading="isloading"
        >收藏</van-button
      >
      <!-- 在线咨询 -->
      <van-button type="default">在线咨询</van-button>
      <!-- 电话预约 -->
      <van-button type="primary">电话预约</van-button>
    </div>
  </div>
</template>

<script>
import { gethouseinfo, addrooms, decide, delrooms } from '@/api/houseinfo'
import { mapState } from 'vuex'
export default {
  created () {
    this.getthishouseinfo()
    this.getdecide() //* 获得是否收藏的数据
  },
  data () {
    return {
      images: [],
      result: [],
      arr: [{ houseImg: '/uploads/upload_655c51a7fbbf25368953629a60a72099.png', title: '1', tags: ['近地铁'], price: 1111, desc: '一室/10/东/北营房西里', houseCode: '84dac804-5318-46c9' }, { houseImg: '/uploads/upload_78ce07c03f7f2c1ab6f26f0477253c4f.jpeg', title: '整租 一栋 201', tags: ['近地铁'], price: 1500, desc: '三室/120/北/新华联家园南区', houseCode: '8165763f-bed6-2d21' }, { houseImg: '/newImg/img1', title: '整租 · 豪华小区 精装修出租 小区环境幽静', tags: ['近地铁'], price: 1234, desc: '四室/123/北/亮马水晶', houseCode: '455eb041-1eb8-574c' }],
      isshow: null,
      isloading: false
    }
  },
  methods: {
    async getdecide () {
      try {
        const { data } = await decide(this.housecode)
        this.isshow = data.body.isFavorite
      } catch (err) {
        console.log(err)
      }
    },
    async getthishouseinfo () {
      try {
        const { data } = await gethouseinfo(this.housecode)
        this.result = data.body
        this.result.houseImg.forEach(item => {
          this.images.push(`http://liufusong.top:8080${item}`)
        })
      } catch (err) {
        console.log(err)
      }
    },
    async add () {
      if (this.user) {
        //* 判断这个isshow是true吗，如果是，点击的时候是取消
        if (this.isshow) {
          try {
            this.isloading = true
            const res = await delrooms(this.housecode)
            console.log(res)
            this.isshow = false
            this.isloading = false
          } catch (err) {
            console.log(err)
          }
        } else { //* 否则是点击收藏
          try {
            this.isloading = true
            const res = await addrooms(this.housecode)
            console.log(res)
            this.isshow = true
            this.isloading = false
          } catch (err) {
            console.log(err)
          }
        }
      } else {
        this.$dialog.confirm({
          message: '您还未登录是否去登录'
        })
          .then(() => {
            // on confirm
            this.$router.push({ name: 'login' })
          })
          .catch(() => {
            // on cancel
          })
      }
    }
  },
  computed: {
    ...mapState(['housecode', 'user'])
  },
  watch: {},
  filters: {},
  components: {},
  async mounted () {
    try {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await gethouseinfo(this.housecode)
      this.result = data.body
      this.result.houseImg.forEach(item => {
        this.images.push(`http://liufusong.top:8080${item}`)
      })
      this.$toast.success({
        message: '加载成功'
      })
      //* 加载成功后再进行数据刷新
      const { BMapGL } = window
      // 创建地图实例
      const map = new BMapGL.Map('map')

      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(new BMapGL.Point(this.result.coord.longitude, this.result.coord.latitude), 18)// 初始化地图,设置中心点坐标和地图级别

      const opts = {
        position: new BMapGL.Point(this.result.coord.longitude, this.result.coord.latitude), // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(-30, -30) // 设置文本偏移量
      }
      // 创建文本标注对象
      const label = new BMapGL.Label(this.result.community, opts)
      // 自定义文本标注样式
      label.setStyle({
        // height: '26px',
        // width: '70px',
        color: '#fff',
        borderRadius: '5px',
        backgroundColor: '#ee5d5b',
        borderColor: '#ee5d5b',
        fontSize: '16px',
        lineHeight: '30px',
        fontFamily: '微软雅黑'
      })
      map.addOverlay(label)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped lang='less'>
.houseinfo-container {
  padding-bottom: 50px;
}
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
  border-bottom: 1px solid #000;
  padding: 10px 0;
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

.bottom {
  padding-top: 15px;
  display: flex;
  .left,
  .right {
    flex: 1;
    width: 168px;
    height: 50px;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    color: #999;
    i {
      color: #000;
      margin-left: 8px;
    }
  }
}

.btns {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 222;
  .van-button {
    width: 100%;
    height: 100%;
    flex: 1;
  }
}
.someicon {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .icon-btn {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin: 10px 0;
  }
}
.titles {
  height: 50px;
  width: 100%;
  font-size: 15px;
  margin-bottom: 10px;
  padding: 15px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
}
.header {
  display: flex;
  padding: 10px;
  .left {
    flex: 1;
    display: flex;
    font-size: 14px;
    .middel {
      margin-left: 15px;
      i {
        color: #fa5e44;
      }
    }
  }
  .van-button {
    width: 75px;
    height: 30px;
  }
}
.description {
  padding: 10px;
  font-size: 14px;
}
.main {
  margin: 10px 0;
}

// 样式
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
.active {
  color: red;
}
#map {
  width: 100%;
  height: 145px;
}
</style>
