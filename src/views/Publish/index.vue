<template>
  <div>
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.push({ name: 'home' })"
    />
    <div class="title top">房源信息</div>
    <!-- 房屋的信息 -->
    <van-cell-group>
      <!-- 小区名称 -->
      <van-cell title="小区名称" is-link @click="gosearch">
        <template #default>
          <p>{{ houseinfo.communityName }}</p>
        </template>
      </van-cell>

      <!-- 租金 -->
      <van-field
        v-model="price"
        type="number"
        label="租金"
        placeholder="请输入租金/月"
      >
        <template #extra> ￥/月 </template>
      </van-field>
      <!-- /租金 -->

      <!-- 建筑面积 -->
      <van-field
        v-model="area"
        type="number"
        label="建筑面积"
        placeholder="请输入建筑面积"
      >
        <template #extra>㎡</template>
      </van-field>
      <!-- /建筑面积 -->

      <!-- 户型 -->
      <van-cell title="户型" is-link @click="show = true">
        <template #default>
          <p>{{ resultone }}</p>
        </template>
      </van-cell>
      <!-- 弹出层 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-picker
          show-toolbar
          :columns="columnsone"
          :default-index="0"
          @confirm="onConfirm"
          @cancel="show = false"
        />
      </van-popup>
      <!-- /户型 -->

      <!-- 所在楼层 -->
      <van-cell title="所在楼层" is-link @click="showtwo = true">
        <template #default>
          <p>{{ resulttwo }}</p>
        </template>
      </van-cell>
      <!-- 弹出层 -->
      <van-popup v-model="showtwo" position="bottom" :style="{ height: '40%' }">
        <van-picker
          show-toolbar
          :columns="columnstwo"
          :default-index="0"
          @confirm="onConfirmtwo"
          @cancel="showtwo = false"
        />
      </van-popup>
      <!-- /所在楼层 -->

      <!-- 朝向 -->
      <van-cell title="朝向" is-link @click="showthree = true">
        <template #default>
          <p>{{ resultshree }}</p>
        </template>
      </van-cell>
      <!-- 弹出层 -->
      <van-popup
        v-model="showthree"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-picker
          show-toolbar
          :columns="columnsthree"
          :default-index="0"
          @confirm="onConfirmthree"
          @cancel="showthree = false"
        />
      </van-popup>
      <!-- /朝向 -->
    </van-cell-group>

    <!-- 房屋标题 -->
    <div class="title">房屋标题</div>
    <!-- 描述标题输入框 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      show-word-limit
    />

    <!-- 房屋图像 -->
    <div class="title">房屋图像</div>
    <!-- 上传图片区域 -->
    <van-uploader :after-read="afterRead" v-model="fileList" multiple />
    <!-- /房屋图像 -->

    <!-- 房屋配置 -->
    <div class="title">房屋配置</div>
    <van-checkbox-group
      v-model="result"
      direction="horizontal"
      checked-color="#fff"
    >
      <van-checkbox
        :name="item"
        v-for="(item, index) in mysupporting"
        :key="index"
        checked-color="#ffffff"
      >
        <template #icon="props">
          <van-icon
            name="flower-o"
            class="myicon"
            :class="{ active: props.checked }"
          >
            <p>{{ item }}</p>
          </van-icon>
        </template>
      </van-checkbox>
    </van-checkbox-group>
    <!-- /房屋配置 -->

    <!-- 房屋描述 -->
    <div class="title">房屋描述</div>
    <van-field
      v-model="messageroom"
      rows="2"
      autosize
      type="textarea"
      placeholder="请输入房屋描述信息"
      show-word-limit
    />
    <!-- /房屋描述 -->

    <!-- 底部按钮 -->
    <div class="footer">
      <van-button type="default" class="reset" @click="$router.back()"
        >取消</van-button
      >
      <van-button type="primary" class="sure" @click="sendhome"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
//* 导入图片上传接口
import { upimg, housecondition, sendhouseinfo } from '@/api/house'
import { mapState } from 'vuex'
export default {
  created () {
    this.gethousecondition()
  },
  data () {
    return {
      price: '', //* 输入框内的内容，价格
      area: '', //* 面积
      show: false,
      showtwo: false,
      showthree: false,
      columnsone: [],
      columnstwo: [],
      columnsthree: [],
      resultone: '请选择', //* 户型
      roomtypeindex: '', //* 选择户型的索引
      resulttwo: '请选择', //* 楼层
      floorindex: '', //* 楼层的索引
      resultshree: '请选择', //* 方向
      orientedindex: '', //* 方向的索引
      message: '', //* 房屋标题
      fileList: [],
      result: [], //* 复选框的结果
      mysupporting: [],
      messageroom: '', //* 房屋描述
      picinfo: [], //* 图片的数据
      allinfo: [] //* 所有的条件
    }
  },
  methods: {
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      //* 可以拿到当前选择的值
      //* 原来有个默认值，后面取到值后将这个值替换到页面上
      this.show = false
      this.resultone = value
      this.roomtypeindex = index
    },
    onConfirmtwo (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      //* 可以拿到当前选择的值
      //* 原来有个默认值，后面取到值后将这个值替换到页面上
      this.showtwo = false
      this.resulttwo = value
      this.floorindex = index
    },
    onConfirmthree (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      //* 可以拿到当前选择的值
      //* 原来有个默认值，后面取到值后将这个值替换到页面上
      this.showthree = false
      this.resultshree = value
      this.orientedindex = index
    },
    async afterRead (file) { //* 发送图片到后台
      // 此时可以自行将文件上传至服务器
      console.log(file)
      try {
        const res = await upimg(file.file)
        console.log(res)
        this.picinfo.push(res.data.body[0])
      } catch (err) {
        this.$toast('上传失败')
      }
    },
    async gethousecondition () { //* 得到发布房间的一些条件
      try {
        const res = await housecondition()
        this.allinfo = res.data.body
        //* 将每个部分需要的数据全部传入
        // console.log(res)
        // 户型
        res.data.body.roomType.forEach(item => {
          this.columnsone.push(item.label)
        })
        // 楼层
        res.data.body.floor.forEach(item => {
          this.columnstwo.push(item.label)
        })
        // 朝向
        res.data.body.oriented.forEach(item => {
          this.columnsthree.push(item.label)
        })
        // 电器名字
        res.data.body.supporting.forEach(item => {
          this.mysupporting.push(item.label)
        })
      } catch (err) {
        console.log(err)
      }
    },
    gosearch () { //* 跳转到搜索框
      this.$router.push({ name: 'findrooms' })
    },
    async sendhome () { //* 点击搜索后发送数据到后台
      try {
        await sendhouseinfo(this.info)
        //* 成功后，跳转到首页
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['houseinfo']),
    info () {
      return {
        title: this.message,
        description: this.messageroom,
        houseImg: this.picinfo.join('/'),
        oriented: this.allinfo.oriented[this.orientedindex].value,
        supporting: this.result.join('/'),
        price: this.price,
        roomType: this.allinfo.roomType[this.roomtypeindex].value,
        size: this.area,
        floor: this.allinfo.floor[this.floorindex].value,
        community: this.houseinfo.community
      }
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.myicon {
  border-radius: unset;
  border: unset;
  font-size: 23px;
  color: #000;
  width: 100%;
  height: 50px;
  /deep/p {
    font-size: 12px !important;
  }
  background-color: unset;
}
.van-checkbox {
  width: 20%;
  height: 50px;
}
.van-checkbox--horizontal {
  margin-right: unset;
}
/deep/.van-checkbox__icon {
  height: unset;
  width: 100%;
}
.active {
  color: green;
}
.title {
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  padding-left: 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
}
.top {
  color: #21b97a;
  border-bottom: unset;
  margin-bottom: unset;
}
.van-uploader {
  margin-left: 10px;
}
.footer {
  display: flex;
  .reset {
    flex: 1;
  }
  .sure {
    flex: 1;
  }
}
</style>
