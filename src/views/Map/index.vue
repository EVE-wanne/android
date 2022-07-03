<template>
  <div>
    <van-nav-bar
      title="地图找房"
      left-arrow
      @click-left="$router.push({ name: 'room' })"
    />
    <div id="container"></div>
    <van-popup v-model="showpop" position="bottom" :style="{ height: '50%' }">
      <div class="list">
        <list1>房屋列表</list1>
        <span @click="$router.push({ name: 'room' })">更多房源</span>
      </div>

      <van-cell v-for="(item, index) in homes" :key="index" class="roomlist">
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
    </van-popup>
  </div>
</template>

<script>
// https://lbsyun.baidu.com/jsdemo.htm#eAddMarker
//* 导入虚拟内容模块
import { mapState } from 'vuex'
//* 导入地图请求模块
import { maphouse } from '@/api/map'
import { gethouses } from '@/api/house.js'
export default {
  name: 'mymap',
  created () {
    //* 我们在页面刷新的时候，拿到选中的城市数据
    //* 发送请求，将拿到的数据渲染到页面上
    /*  this.getlist(this.currentcity.value) */
  },
  mounted () {
    this.addpoint(this.currentcity.value, this.currentcity.label, this.level)
  },
  data () {
    return {
      level: 11,
      b: 1, //* 这个是控制点击几层，点击一次后加1，
      showpop: false,
      homes: []
    }
  },
  methods: {
    async gethouse (val) {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        const res = await gethouses({ cityId: this.currentcity.value, area: val })
        console.log(res, '房子')
        this.showpop = true
        this.homes = res.data.body.list
        this.$toast.success({
          message: '加载成功'
        })
      } catch (err) {
        console.log(err)
      }
    },
    async addpoint (val, label, num) { //* 这个是添加点的模块  传入地名和相对应的value值  num为地图的放大缩小
      if (this.b === 1) {
        label = label + '市'
      }
      const { BMapGL } = window
      // 创建地图实例
      const map = new BMapGL.Map('container')

      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(label, num) // 初始化地图,设置中心点坐标和地图级别

      // * 添加地图的一些控件
      const zoomCtrl = new BMapGL.ZoomControl({
        offset: new BMapGL.Size(0, 50)
      }) // 添加缩放控件
      map.addControl(zoomCtrl)
      map.enableScrollWheelZoom(true)
      // 创建文本标注对象
      //* 这个需要单独添加
      //* 这调用请求函数，将结果保存
      // this.getlist(value)
      // console.log(value)
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        const res = await maphouse(val)
        console.log(res)
        const a = res.data.body
        this.$toast.success({
          message: '加载成功'
        })

        console.log(a, '11')
        for (let i = 0; i < a.length; i++) {
          const opts = {
            position: new BMapGL.Point(a[i].coord.longitude, a[i].coord.latitude), // 指定文本标注所在的地理位置
            offset: new BMapGL.Size(-30, -30)
          }
          const txt = `
         <div>${a[i].label}</div>
         <div>${a[i].count}</div>
        `
          const label = new BMapGL.Label(txt, opts)
          map.addOverlay(label)

          label.addEventListener('click', () => {
            //* 判断b为几，如果大于三，就执行拎一个函数
            if (this.b < 3) {
              this.b++
              this.level = this.level + 2
              // *清除原来的原来添加的点位
              map.clearOverlays()
              console.log(a[i].label, a[i].value)
              //* 这个时候，我们拿到数据，需要将点位清除，在外面重新渲染
              this.addpoint(a[i].value, a[i].label, this.level)
              console.log(this.b)
            } else {
              //* 这个时候我们将这个的value值取到，然后调用查询的的函数，将这个数据渲染到弹层里去
              console.log(a[i].value)
              this.gethouse(a[i].value)
            }
          })
        }
      } catch (err) {
        console.log(err)
      }
      //* 我们再调用一个函数
    }
  },
  computed: {
    ...mapState(['currentcity', 'firstlist'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
#container {
  width: 100vw;
  height: 100vh;
}
/deep/.BMapLabel {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  color: #fff;
  background-color: rgba(96, 191, 122, 0.9) !important;
  border-color: #ccc !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
}
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
.list {
  width: 100%;
  height: 60px;
  background-color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  font-size: 16px;
  z-index: 1;
  padding: 10px;
}
</style>
