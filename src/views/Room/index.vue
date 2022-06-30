<template>
  <div class="home-container">
    <!-- 顶部页面 -->
    <div class="top">
      <van-icon
        name="arrow-left"
        color="#fff"
        size="16px"
        @click="$router.back()"
      />
      <van-search
        v-model="value"
        placeholder="请输入小区或地址"
        class="search-btn"
      >
        <template #label>
          <div class="area" @click="$router.push('/city')">
            <span>{{ currentcity.label }}</span>
            <van-icon name="location" />
          </div>
        </template>
      </van-search>
      <van-icon
        name="map-marked"
        color="#fff"
        size="0.6667rem"
        @click="$router.push('/map')"
      />
    </div>

    <!-- 条件筛选页面 -->
    <!-- 筛选的四个条件按钮 -->
    <van-tabs
      v-model="active"
      :class="{ tab: isActive === active }"
      @click="show = true"
    >
      <van-overlay :show="show" @click="show = false">
        <van-tab title="区域">
          <template v-if="show">
            <van-picker
              :columns="columns"
              show-toolbar
              toolbar-position="bottom"
            >
              <template #cancel>
                <van-button type="default" class="left-btn">取消</van-button>
              </template>
              <template #confirm>
                <van-button type="primary" class="right-btn">确认</van-button>
              </template>
            </van-picker>
          </template>
        </van-tab>

        <van-tab title="方式">
          <template v-if="show">
            <van-picker
              :columns="columnstwo"
              :default-index="0"
              show-toolbar
              toolbar-position="bottom"
            >
              <template #cancel>
                <van-button type="default" class="left-btn">取消</van-button>
              </template>
              <template #confirm>
                <van-button type="primary" class="right-btn">确认</van-button>
              </template>
            </van-picker>
          </template>
        </van-tab>

        <van-tab title="租金">
          <template v-if="show">
            <van-picker
              :columns="columnsthree"
              :default-index="0"
              show-toolbar
              toolbar-position="bottom"
            >
              <template #cancel>
                <van-button type="default" class="left-btn">取消</van-button>
              </template>
              <template #confirm>
                <van-button type="primary" class="right-btn">确认</van-button>
              </template>
            </van-picker>
          </template>
        </van-tab>

        <van-tab title="筛选">
          <template v-if="show">
            <van-popup
              v-model="show"
              position="right"
              :style="{ height: '100%' }"
              class="Zindex"
              >内容</van-popup
            >
          </template>
        </van-tab>
      </van-overlay>
    </van-tabs>
    <!-- /条件筛选页面 -->

    <!-- 房屋信息渲染 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
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
    </van-list>
    <!-- /房屋信息渲染 -->
  </div>
</template>

<script>
// * 导入vuex虚拟模块
import { mapState } from 'vuex'
import { getcondition, gethouses } from '@/api/house'
export default {
  created () {
    this.getlist()
    //* 页面打开的时候我们需要获取数据
  },
  data () {
    return {
      value: '',
      show: false,
      active: '',
      isActive: 3,
      columns: [], //* 地区的筛选数组
      columnstwo: [], //* 单合租的筛选数组
      columnsthree: [], //* 价格的筛选数组
      list: [], //* 文章列表的数据
      loading: false, //* 控制是否加载完毕
      finished: false

    }
  },
  methods: {
    onShow () {
      this.show = true
      //* 当遮罩出现时，我们要发送请求，获取数据
    },
    async getlist () {
      try {
        const { data } = await getcondition(this.currentcity.value)
        console.log(data)
        // * 先转成json字符串
        //* 再使用replace和正则进行替换，将里面的label,换成text
        this.columns[0] = JSON.parse(JSON.stringify(data.body.area).replace(/label/gi, 'text').replace(/不限",/gi, '不限","children":[{"text":""}],'))
        //* 再用正则将value属性给去除
        this.columns[1] = JSON.parse(JSON.stringify(data.body.subway).replace(/label/gi, 'text').replace(/不限",/gi, '不限","children":[null],'))
        data.body.rentType.forEach(item => {
          this.columnstwo.push(item.label)
        })
        data.body.price.forEach(item => {
          this.columnsthree.push(item.label)
        })
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad () {
      try {
        const { data } = await gethouses(this.paramss)
        this.list.push(...data.body.list)
        this.loading = false
        //* 如果请求的数据为0
        if (data.body.list.length <= 0) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
      // 数据全部加载完成
    }
  },
  computed: {
    ...mapState(['currentcity']),
    paramss () {
      return { cityId: this.currentcity.value }
    }

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.top {
  width: 100%;
  height: 50px;
  background-color: #21b97a;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .search-btn {
    width: 310px;
    height: 34px;
    border-radius: 3px;
    background-color: unset;
    .area {
      border-right: 1px solid #ccc;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      margin-top: 6px;
      padding-right: 5px;
    }
  }
}

.header {
  // display: flex;
  border-bottom: 1px solid #ccc;
}
.home-container {
  padding: 50px 0 50px 0;
}

.van-tab__pane {
  position: fixed;
  top: 90px;
}
/deep/.van-tabs__nav {
  z-index: 3;
}
/deep/.Zindex {
  z-index: 2004;
  width: 100px;
}
.tab {
  /deep/.van-tabs__nav {
    z-index: 0 !important;
  }
}
/deep/.van-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}

/deep/.van-picker__cancel {
  flex: 1;
  padding: unset;
}
/deep/.van-picker__confirm {
  flex: 2;
  padding: unset;
}
.left-btn,
.right-btn {
  width: 100%;
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
</style>
