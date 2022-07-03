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
      <van-search placeholder="请输入小区或地址" class="search-btn">
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
      <van-overlay :show="show">
        <!-- 区域 -->
        <van-tab title="区域">
          <template v-if="show">
            <van-picker
              :columns="columns"
              show-toolbar
              toolbar-position="bottom"
              @confirm="onConfirmone"
              @cancel="onCancel"
            >
            </van-picker>
          </template>
        </van-tab>
        <!-- /区域 -->

        <!-- 方式 -->
        <van-tab title="方式">
          <template v-if="show">
            <van-picker
              :columns="columnstwo"
              :default-index="0"
              show-toolbar
              toolbar-position="bottom"
              @confirm="onConfirmtwo"
              @cancel="onCancel"
            >
            </van-picker>
          </template>
        </van-tab>
        <!-- /方式 -->

        <!-- 租金价格 -->
        <van-tab title="租金">
          <template v-if="show">
            <van-picker
              :columns="columnsthree"
              :default-index="0"
              show-toolbar
              toolbar-position="bottom"
              @confirm="onConfirmthree"
              @cancel="onCancel"
            >
            </van-picker>
          </template>
        </van-tab>
        <!-- /租金价格 -->

        <!-- /筛选 -->
        <van-tab title="筛选">
          <template v-if="show">
            <van-popup
              v-model="show"
              position="right"
              :style="{ height: '100%', width: '80%' }"
              class="Zindex"
            >
              <!-- 户型的筛选 -->
              <van-checkbox-group v-model="result">
                <div class="selectname">户型</div>

                <div class="first">
                  <van-checkbox
                    :name="item.value"
                    v-for="(item, index) in allsearch.roomType"
                    :key="index"
                  >
                    <template #icon="props">
                      <p :class="{ active: props.checked }" class="btn">
                        {{ item.label }}
                      </p>
                    </template>
                  </van-checkbox>
                </div>

                <!-- 朝向的筛选 -->
                <div class="selectname">朝向</div>
                <div class="first">
                  <van-checkbox
                    :name="item.value"
                    v-for="(item, index) in allsearch.oriented"
                    :key="index"
                  >
                    <template #icon="props">
                      <p :class="{ active: props.checked }" class="btn">
                        {{ item.label }}
                      </p>
                    </template>
                  </van-checkbox>
                </div>

                <!-- 楼层的筛选 -->
                <div class="selectname">楼层</div>
                <div class="first">
                  <van-checkbox
                    :name="item.value"
                    v-for="(item, index) in allsearch.floor"
                    :key="index"
                  >
                    <template #icon="props">
                      <p :class="{ active: props.checked }" class="btn">
                        {{ item.label }}
                      </p>
                    </template>
                  </van-checkbox>
                </div>

                <!-- 房屋特点的筛选 -->
                <div class="selectname">房屋亮点</div>
                <div class="first">
                  <van-checkbox
                    :name="item.value"
                    v-for="(item, index) in allsearch.characteristic"
                    :key="index"
                  >
                    <template #icon="props">
                      <p :class="{ active: props.checked }" class="btn">
                        {{ item.label }}
                      </p>
                    </template>
                  </van-checkbox>
                </div>
              </van-checkbox-group>

              <!-- 底部的两个按钮 -->
              <div class="twobtn">
                <van-button type="default" class="left-btn" @click="result = []"
                  >清除</van-button
                >
                <van-button type="primary" class="right-btn" @click="onLoad"
                  >确定</van-button
                >
              </div>
            </van-popup>
          </template>
        </van-tab>
        <!-- /筛选 -->
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
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        class="roomlist"
        @click="gotoinfo(item.houseCode)"
      >
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
//* 导入地图请求模块
import { maphouse } from '@/api/map'
export default {
  created () {
    this.getlist()
    //* 页面打开的时候我们需要获取数据
    this.getmaphouse()
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
      finished: false,
      result: [], //* 这个是筛选的数据被选中后存放的位置，我们直接拿着个数组发送请求
      allsearch: [],
      pricevalue: '', //* 租金对应的value值
      ranttypevalue: '', //* 租房方式的value值
      ereavalue: '', //* 区域的value值
      subwayvalue: '' //* 地铁路线的value值
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
        this.allsearch = data.body
        // * 先转成json字符串
        //* 再使用replace和正则进行替换，将里面的label,换成text
        //! 这个是地区的数据
        this.columns[0] = JSON.parse(JSON.stringify(data.body.area).replace(/label/gi, 'text').replace(/不限",/gi, '不限","children":[{"text":""}],'))
        //* 再用正则将value属性给去除
        //! 这个是地铁的数据
        this.columns[1] = JSON.parse(JSON.stringify(data.body.subway).replace(/label/gi, 'text').replace(/不限",/gi, '不限","children":[{"text":""}],'))

        //! 这个是租房的方式
        data.body.rentType.forEach(item => {
          this.columnstwo.push(item.label)
        })

        //! 这个是租金
        data.body.price.forEach(item => {
          this.columnsthree.push(item.label)
        })
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad () {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        this.show = false
        const { data } = await gethouses(this.paramss)
        console.log('加载成功')
        this.list.push(...data.body.list)
        this.loading = false
        this.$toast.success({
          message: '加载成功'
        })
        //* 如果请求的数据为0
        if (data.body.list.length <= 0) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
      // 数据全部加载完成
    },
    onConfirmone (value, index) { //* 区域
      console.log(value, index)
      //* 每点击一次都会取到新的选中值，我们需要根据这个值将对应的value值给取出，放到请求携带的参数中，并且发送请求
      if (value[0] === '区域') {
        if (value[1] === '不限') {
          this.ereavalue = null
        } else {
          this.allsearch.area.children.forEach(item => {
            if (item.label === value[1]) {
              //* 找到朝阳，再去判断第三个值为空吗
              if (value[2] === '') {
                this.ereavalue = null
              } else {
                item.children.forEach(items => {
                  if (items.label === value[2]) {
                    this.ereavalue = items.value
                  }
                })
              }
            }
          })
        }
      } else {
        if (value[1] === '不限') {
          this.subwayvalue = null
        } else {
          this.allsearch.subway.children.forEach(item => {
            if (item.label === value[1]) {
              //* 找到朝阳，再去判断第三个值为空吗
              if (value[2] === '') {
                this.subwayvalue = null
              } else {
                item.children.forEach(items => {
                  if (items.label === value[2]) {
                    this.subwayvalue = items.value
                  }
                })
              }
            }
          })
        }
      }
      this.filtraterooms()
      this.show = false
    },
    onConfirmtwo (value, index) { //* 方式
      console.log(value, index)
      //* 每点击一次都会取到新的选中值，我们需要根据这个值将对应的value值给取出，放到请求携带的参数中，并且发送请求
      this.allsearch.rentType.forEach(item => {
        if (item.label === value) {
          this.ranttypevalue = item.value
        }
      })
      this.filtraterooms()
      this.show = false
    },
    onConfirmthree (value, index) { //* 租金
      console.log(value, index)
      //* 每点击一次都会取到新的选中值，我们需要根据这个值将对应的value值给取出，放到请求携带的参数中，并且发送请求
      //* 我们根据这个值，去这个allsearch这个数据里去将对应值的value取出
      //* 放到一个变量中，然后将这个数据放到参数中
      //* 因为有默认选项。肯定有值，我们就直接遍历数组去
      this.allsearch.price.forEach(item => {
        if (item.label === value) {
          this.pricevalue = item.value
        }
      })
      this.filtraterooms()
      this.show = false
    },
    onCancel () {
      this.show = false
    },
    gotoinfo (val) {
      this.$router.push({
        name: 'houseinfo'
      })
      this.$store.commit('sethousecode', val)
    },
    async filtraterooms () {
      try {
        const { data } = await gethouses(this.paramss)
        console.log('加载成功')
        this.list.unshift(...data.body.list)
      } catch (err) {
        console.log(err)
      }
    },
    async getmaphouse () {
      try {
        const res = await maphouse(this.currentcity.value)
        console.log(res)
        this.$store.commit('setfirstlist', res.data.body)
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {
    ...mapState(['currentcity']),
    paramss () {
      return {
        cityId: this.currentcity.value,
        more: this.result,
        area: this.ereavalue,
        subway: this.subwayvalue,
        rantType: this.ranttypevalue,
        price: this.pricevalue
      }
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
.active {
  background-color: #defaef;
  color: #21b97a;
}
/deep/.van-checkbox__icon {
  width: 90px;
  height: 32px;
  .btn {
    width: 90px;
    height: 32px;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
  }
}
/deep/.first {
  display: flex;
  width: 200px;
  margin-left: 55px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
}
.van-checkbox {
  width: 90px;
  height: 32px;
  padding-right: 10px;
  margin-bottom: 10px;
}
.selectname {
  width: 265px;
  height: 18px;
  margin: 20px 0;
  padding-left: 15px;
  font-size: 15px;
}
.twobtn {
  display: flex;
  width: 100%;
  height: 50px;
  position: sticky;
  bottom: 0;
  .left-btn {
    flex: 1;
  }
  .right-btn {
    flex: 2;
  }
  .van-button {
    height: 50px;
  }
}

/deep/.van-picker__confirm {
  background-color: #21b97a;
  color: #fff;
}
/deep/.van-picker__cancel {
  color: #21b97a;
}
</style>
